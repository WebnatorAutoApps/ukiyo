/**
 * Base URL used for generating deep links (QR codes, copy-to-clipboard, etc.)
 * in the admin panel. Set via NEXT_PUBLIC_SITE_URL env var.
 *
 * Defaults to the test/preview deployment. For production, set:
 *   NEXT_PUBLIC_SITE_URL=https://www.mochisukiyo.com
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ukiyo-ez5ysi8z.vercel.app";
