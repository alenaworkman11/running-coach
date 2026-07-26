"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

const paragraphKeys = ["childhood", "national", "usa", "career", "it", "coach", "mission"] as const;
const images = ["/img/story-1.svg", "/img/story-2.svg", "/img/story-3.svg"];

export function MyStory() {
  const t = useTranslations("story");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="story" ref={containerRef} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="relative mt-20">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:left-1/2 md:block">
            <motion.div style={{ height: lineHeight }} className="w-full bg-gradient-to-b from-accent to-gold" />
          </div>

          <div className="space-y-24 md:space-y-32">
            {paragraphKeys.map((key, i) => {
              const isEven = i % 2 === 0;
              const hasImage = i < images.length;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className={`relative grid items-center gap-8 md:grid-cols-2 md:gap-16 ${!isEven ? "md:[direction:rtl]" : ""}`}
                >
                  <div className={`${!isEven ? "md:[direction:ltr]" : ""} ${hasImage ? "" : "md:col-span-2 md:max-w-3xl md:mx-auto md:text-center"}`}>
                    <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-lg leading-relaxed md:text-xl">{t(`paragraphs.${key}`)}</p>
                  </div>

                  {hasImage && (
                    <div className={!isEven ? "md:[direction:ltr]" : ""}>
                      <ParallaxImage src={images[i]} alt={t(`paragraphs.${key}`)} aspect="landscape" speed={0.1 + i * 0.05} />
                    </div>
                  )}

                  <div className="absolute left-4 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-accent bg-background md:left-1/2 md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
