"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export function Intro() {
  const t = useTranslations("intro");

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="noise-bg absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-xl leading-relaxed md:text-2xl">{t("text")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("bio")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("achievements")}</p>
            <p className="font-medium leading-relaxed">{t("personalized")}</p>
            <div className="border-l-2 border-accent/50 pl-6 pt-2">
              <p className="font-display text-2xl font-bold text-gradient md:text-3xl">{t("motto")}</p>
              <p className="mt-2 text-muted-foreground">{t("mottoSub")}</p>
            </div>
          </motion.div>

          <ParallaxImage src="/img/intro.jpg" alt="Running" aspect="portrait" speed={0.15} />
        </div>
      </div>
    </section>
  );
}
