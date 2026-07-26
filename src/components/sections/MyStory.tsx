"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

const paragraphKeys = ["childhood", "national", "usa", "career", "it", "coach", "mission"] as const;
const storyImages: {
  src: string;
  aspect: "landscape" | "portrait";
  objectFit: "cover";
  objectPosition?: string;
}[] = [
  { src: "/img/story-1.jpg", aspect: "landscape", objectFit: "cover" },
  {
    src: "/img/story-2.jpg",
    aspect: "portrait",
    objectFit: "cover",
    objectPosition: "center 15%",
  },
  {
    src: "/img/story-3.jpg",
    aspect: "portrait",
    objectFit: "cover",
    objectPosition: "center 95%",
  },
];

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
            <motion.div style={{ height: lineHeight }} className="w-full bg-gradient-to-b from-steel/70 via-accent/60 to-sky/45" />
          </div>

          <div className="space-y-24 md:space-y-32">
            {paragraphKeys.map((key, i) => {
              const isEven = i % 2 === 0;
              const hasImage = i < storyImages.length;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="relative grid items-center gap-8 md:grid-cols-2 md:gap-x-16"
                >
                  <div
                    className={
                      isEven
                        ? "md:col-start-1 md:pr-12 lg:pr-16"
                        : "md:col-start-2 md:pl-12 lg:pl-16"
                    }
                  >
                    <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-lg leading-relaxed md:text-xl">{t(`paragraphs.${key}`)}</p>
                  </div>

                  {hasImage ? (
                    <div className={isEven ? "md:col-start-2" : "md:col-start-1 md:row-start-1"}>
                      <ParallaxImage
                        src={storyImages[i].src}
                        alt={t(`paragraphs.${key}`)}
                        aspect={storyImages[i].aspect}
                        objectFit={storyImages[i].objectFit}
                        objectPosition={storyImages[i].objectPosition}
                        speed={0.1 + i * 0.05}
                      />
                    </div>
                  ) : (
                    <div className="hidden md:block" aria-hidden />
                  )}

                  <div className="absolute left-4 top-8 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-accent bg-background md:left-1/2 md:top-1/2 md:-translate-y-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
