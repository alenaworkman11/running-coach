"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/5 to-gold/5" />,
});

export function Hero() {
  const t = useTranslations("hero");
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <HeroScene />

      <div className="hero-overlay absolute inset-0 -z-[5]" />

      <motion.div
        style={{ opacity, y, scale }}
        className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-32 md:px-8 lg:grid-cols-2"
      >
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
          >
            <span className="block">{t("line1")}</span>
            <span className="text-gradient block">{t("line2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-muted-foreground md:text-xl"
          >
            {t("tagline")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-lg text-base text-foreground/80 md:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_var(--glow)]"
            >
              {t("cta")}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          style={{ perspective: 1000 }}
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] glow-ring">
            <Image
              src="/img/hero.jpg"
              alt="Lena"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="photo-overlay absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-card/90 p-4 backdrop-blur-xl md:-left-10">
            <p className="text-3xl font-bold text-accent">2:39</p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Marathon PB</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs uppercase tracking-widest">{t("scroll")}</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </motion.div>
    </section>
  );
}
