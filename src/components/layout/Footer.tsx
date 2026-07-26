"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-muted/30 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:px-8 md:text-left">
        <div>
          <p className="font-display text-2xl font-bold">
            Lena<span className="text-accent">.</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{t("tagline")}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          © {year} Lena. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
