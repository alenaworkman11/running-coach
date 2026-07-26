"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  de: "DE",
  ja: "JA",
  tr: "TR",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 items-center gap-2 rounded-full border border-border bg-card px-3 text-sm font-medium transition-all duration-300 hover:border-accent"
      >
        <Globe className="h-4 w-4 text-accent" />
        {localeLabels[locale]}
      </button>
      {open && (
        <div className="absolute right-0 top-12 z-50 min-w-[120px] overflow-hidden rounded-2xl border border-border bg-card shadow-xl backdrop-blur-xl">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => {
                router.replace(pathname, { locale: loc });
                setOpen(false);
              }}
              className={cn(
                "block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted",
                loc === locale && "bg-muted font-semibold text-accent"
              )}
            >
              {localeLabels[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
