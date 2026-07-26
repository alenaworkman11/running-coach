"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Check } from "lucide-react";

const benefitKeys = [
  "olympic",
  "personalized",
  "science",
  "life",
  "adjustments",
  "communication",
  "strategy",
  "support",
] as const;

export function WhyWorkWithMe() {
  const t = useTranslations("why");

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-transparent to-muted/50" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} align="center" className="mx-auto" />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefitKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10">
                <Check className="h-4 w-4 text-accent" />
              </div>
              <p className="font-medium leading-snug">{t(`benefits.${key}`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
