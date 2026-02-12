/**
 * Translates text from Spanish to Japanese using the free MyMemory API.
 * Returns the translated text, or null if translation fails.
 */
export async function translateToJapanese(text: string): Promise<string | null> {
  const trimmed = text.trim();
  if (!trimmed) return null;

  try {
    const params = new URLSearchParams({
      q: trimmed,
      langpair: "es|ja",
    });

    const res = await fetch(
      `https://api.mymemory.translated.net/get?${params.toString()}`,
      { signal: AbortSignal.timeout(8000) }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (data.responseStatus !== 200) return null;

    const translated: string = data.responseData?.translatedText;
    if (!translated) return null;

    // MyMemory returns the original text unchanged when it can't translate
    if (translated.toLowerCase() === trimmed.toLowerCase()) return null;

    return translated;
  } catch {
    return null;
  }
}
