/**
 * Base URL used for generating deep links (QR codes, copy-to-clipboard, etc.)
 * in the admin panel. Set via NEXT_PUBLIC_SITE_URL env var.
 *
 * Defaults to the test/preview deployment. For production, set:
 *   NEXT_PUBLIC_SITE_URL=https://www.mochisukiyo.com
 */
function normalizeSiteUrl(raw: string): string {
  let url = raw.trim().replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }
  return url;
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ukiyo-ez5ysi8z.vercel.app"
);
