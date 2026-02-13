#!/usr/bin/env node

/**
 * One-time migration script: uploads mochi product images from public/images/
 * to Supabase Storage and updates the DB image_url for each mochi.
 *
 * Usage:
 *   SUPABASE_SECRET_KEY=<service-role-key> node scripts/migrate-images-to-storage.mjs
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL in .env.local (or as env var).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

// ---------- resolve project root ----------
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ---------- load .env.local if present ----------
const envPath = path.join(ROOT, ".env.local");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

// ---------- validate env ----------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing env vars. Ensure NEXT_PUBLIC_SUPABASE_URL is set (via .env.local or env)\n" +
      "and pass SUPABASE_SECRET_KEY as an env var:\n\n" +
      "  SUPABASE_SECRET_KEY=<key> node scripts/migrate-images-to-storage.mjs\n"
  );
  process.exit(1);
}

// ---------- Supabase client with service role (bypasses RLS) ----------
const supabase = createClient(supabaseUrl, serviceRoleKey);

const BUCKET = "images";
const STORAGE_PREFIX = "mochis";

async function main() {
  // 1. Fetch mochis whose image_url points to a local file
  const { data: mochis, error } = await supabase
    .from("mochis")
    .select("id, title_es, image_url")
    .like("image_url", "/images/%");

  if (error) {
    console.error("Failed to query mochis:", error.message);
    process.exit(1);
  }

  if (!mochis || mochis.length === 0) {
    console.log("No mochis with local image URLs found. Nothing to migrate.");
    return;
  }

  console.log(`Found ${mochis.length} mochis with local image URLs.\n`);

  // Track uploaded filenames to avoid uploading the same file twice
  // (e.g. Lotus Biscoff reuses mochi-oreo.jpg)
  const uploadedMap = new Map(); // localPath -> publicUrl

  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  for (const mochi of mochis) {
    const localRelative = mochi.image_url; // e.g. "/images/mochi-oreo.jpg"
    const localAbsolute = path.join(ROOT, "public", localRelative);
    const filename = path.basename(localRelative);

    console.log(`[${mochi.title_es}] ${localRelative}`);

    // Check file exists
    if (!fs.existsSync(localAbsolute)) {
      console.log(`  ⚠ File not found at ${localAbsolute} — skipping\n`);
      skipCount++;
      continue;
    }

    let publicUrl = uploadedMap.get(localRelative);

    if (!publicUrl) {
      // Upload to Supabase Storage
      const fileBuffer = fs.readFileSync(localAbsolute);
      const storagePath = `${STORAGE_PREFIX}/${filename}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, fileBuffer, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (uploadError) {
        console.log(`  ✗ Upload failed: ${uploadError.message}\n`);
        failCount++;
        continue;
      }

      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(storagePath);

      publicUrl = urlData.publicUrl;
      uploadedMap.set(localRelative, publicUrl);
      console.log(`  ↑ Uploaded to ${storagePath}`);
    } else {
      console.log(`  ↑ Reusing already-uploaded file`);
    }

    // Update DB
    const { error: updateError } = await supabase
      .from("mochis")
      .update({ image_url: publicUrl })
      .eq("id", mochi.id);

    if (updateError) {
      console.log(`  ✗ DB update failed: ${updateError.message}\n`);
      failCount++;
      continue;
    }

    console.log(`  ✓ Updated image_url → ${publicUrl}\n`);
    successCount++;
  }

  console.log("─".repeat(50));
  console.log(
    `Done! ${successCount} migrated, ${skipCount} skipped, ${failCount} failed.`
  );
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
