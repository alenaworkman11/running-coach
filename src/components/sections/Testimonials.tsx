"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Quote } from "lucide-react";

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} align="center" className="mx-auto" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-2xl rounded-3xl border border-dashed border-border bg-muted/30 p-12 text-center"
        >
          <Quote className="mx-auto mb-6 h-10 w-10 text-accent/40" />
          <p className="text-lg text-muted-foreground">{t("placeholder")}</p>
        </motion.div>
      </div>
    </section>
  );
}
