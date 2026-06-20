import { useAuth } from "@/context/AuthContext";
import { translations, TranslationKey } from "@/lib/translations";
import type { Language } from "@/types";

export function useI18n() {
  const { profile } = useAuth();
  const lang: Language = profile?.language ?? "en";

  const t = (key: TranslationKey): string => {
    return translations[key]?.[lang] || translations[key]?.["en"] || key;
  };

  return { t, lang };
}
