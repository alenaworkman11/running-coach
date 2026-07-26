"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navIds = ["story", "numbers", "coaching", "journey", "philosophy", "faq", "contact"] as const;

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navItems = navIds.map((id) => ({ id, label: t(id) }));

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
          scrolled ? "border-b border-border/50 bg-background/80 py-3 backdrop-blur-xl" : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
          <Link href="/" className="font-display text-xl font-bold tracking-tight md:text-2xl">
            ALENA
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-all duration-300",
                  activeSection === item.id
                    ? "bg-accent/8 font-medium text-accent"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <LanguageSwitcher className="hidden sm:block" />
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:shadow-[0_0_24px_var(--glow)] md:block"
            >
              {t("startJourney")}
            </a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between p-4">
              <span className="font-display text-xl font-bold">ALENA</span>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-6 py-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-border py-4 text-2xl font-display"
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="mt-6 flex items-center gap-3">
                <LanguageSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <aside className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="group flex items-center justify-end gap-2"
            aria-label={item.label}
          >
            <span
              className={cn(
                "rounded-full bg-muted px-2 py-1 text-xs opacity-0 transition-all duration-300 group-hover:opacity-100",
                activeSection === item.id && "opacity-100"
              )}
            >
              {item.label}
            </span>
            <span
              className={cn(
                "h-2 w-2 rounded-full border border-border transition-all duration-300",
                activeSection === item.id ? "scale-125 border-accent bg-accent" : "bg-muted group-hover:border-accent"
              )}
            />
          </a>
        ))}
      </aside>
    </>
  );
}
