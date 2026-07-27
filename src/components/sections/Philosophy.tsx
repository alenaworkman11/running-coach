"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export function Philosophy() {
  const t = useTranslations("philosophy");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const quotes = [t("quote1"), t("quote2"), t("quote3")];

  return (
    <section id="philosophy" ref={ref} className="relative py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-32">
            <ParallaxImage src="/img/philosophy.jpg" alt="Philosophy" aspect="portrait" speed={0.08} />
          </div>

          <div className="space-y-8">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{t("title")}</span>
              <h2 className="mt-4 font-display text-heading-primary font-bold">{t("subtitle")}</h2>
            </motion.div>

            {quotes.map((quote, i) => (
              <motion.blockquote
                key={i}
                style={{ x: i === 1 ? x : undefined }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className={`font-display text-heading-secondary font-medium ${
                  i === 2 ? "text-gradient" : ""
                }`}
              >
                {i === 0 && "“"}
                {quote}
                {i === quotes.length - 1 && "”"}
              </motion.blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
