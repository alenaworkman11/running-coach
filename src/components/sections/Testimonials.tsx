"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} align="center" className="mx-auto" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-3xl space-y-6 text-left"
        >
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-lg leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
