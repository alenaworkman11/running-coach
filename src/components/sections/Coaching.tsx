"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

const programKeys = [
  "beginner",
  "5k10k",
  "half",
  "marathon",
  "boston",
  "ultra",
  "online",
  "oneOnOne",
] as const;

export function Coaching() {
  const t = useTranslations("coaching");

  return (
    <section id="coaching" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-32">
            <SectionHeading title={t("title")} subtitle={t("subtitle")} />
            <div className="mt-10 hidden lg:block">
              <ParallaxImage
                src="/img/coaching.png"
                alt="Coaching"
                aspect="portrait"
                objectPosition="center 95%"
                speed={0.12}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {programKeys.map((key, i) => (
              <motion.a
                key={key}
                href="#contact"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ scale: 1.03, x: 4 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_24px_var(--glow)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative text-xs font-semibold uppercase tracking-widest text-accent">
                  0{i + 1}
                </span>
                <p className="relative mt-2 font-display text-xl font-semibold">{t(`programs.${key}`)}</p>
                <span className="relative mt-4 inline-block text-sm text-muted-foreground transition-colors group-hover:text-accent">
                  Learn more →
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
