"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
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
    objectPosition: "center 40%",
  },
  {
    src: "/img/story-4.jpg",
    aspect: "portrait",
    objectFit: "cover",
    objectPosition: "center 45%",
  },
];

export function MyStory() {
  const t = useTranslations("story");

  return (
    <section id="story" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="relative mt-20">
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
                      {i + 1}
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
