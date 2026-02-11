# Contributing to Ukiyo

## Multi-Language Requirement

ALL user-facing text MUST be provided in **every** supported language simultaneously. Incomplete translations break the user experience.

### Supported Languages

| Code | Language | Status  |
|------|----------|---------|
| `es` | Spanish  | Primary |
| `ja` | Japanese | Full    |

### Before Submitting a PR — Translation Checklist

- [ ] All new strings added to `src/i18n/translations.ts` for **every** locale (`es` and `ja`)
- [ ] The `Translations` interface is updated if new keys were added
- [ ] Components use `useLanguage()` and `t.section.key` instead of hardcoded strings
- [ ] No hardcoded user-facing text remains in `.tsx` components
- [ ] The build passes (`npm run build`) with no type errors

### How to Add Translated Content

```tsx
// 1. Add to Translations interface (bottom of translations.ts)
mySection: {
  title: string;
}

// 2. Add Spanish text in the `es` block
es: {
  mySection: {
    title: "Mi Titulo"
  }
}

// 3. Add Japanese text in the `ja` block
ja: {
  mySection: {
    title: "私のタイトル"
  }
}

// 4. Use in component
import { useLanguage } from "@/i18n/LanguageContext";

export default function MyComponent() {
  const { t } = useLanguage();
  return <h2>{t.mySection.title}</h2>;
}
```

### Common Mistakes to Avoid

- Adding content in one language but not the other
- Hardcoding strings directly in JSX
- Forgetting to update the `Translations` TypeScript interface
- Adding new product entries without translations for all locales

### Adding a New Language

1. Add new locale code to `Locale` type in `translations.ts`
2. Add complete translation object for the new locale
3. Update `LanguageContext.tsx`
4. Update the `LanguageToggle` component
5. Update this document
