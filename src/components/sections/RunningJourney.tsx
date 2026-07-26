"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { MapPin, Target, Globe2 } from "lucide-react";

const cityKeys = ["boston", "london", "berlin", "chicago", "newYork"] as const;

const mapDots = [
  { x: 18, y: 42, label: "USA" },
  { x: 22, y: 38, label: "Boston" },
  { x: 20, y: 45, label: "NYC" },
  { x: 19, y: 40, label: "Chicago" },
  { x: 48, y: 32, label: "London" },
  { x: 52, y: 30, label: "Berlin" },
  { x: 50, y: 35, label: "Europe" },
  { x: 25, y: 50, label: "TX" },
  { x: 15, y: 48, label: "CA" },
  { x: 30, y: 44, label: "FL" },
];

export function RunningJourney() {
  const t = useTranslations("journey");

  return (
    <section id="journey" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-gold/5" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 max-w-3xl text-lg text-muted-foreground"
        >
          {t("intro")}
        </motion.p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { icon: MapPin, text: t("states"), counter: 20, suffix: "" },
            { icon: Target, text: t("statesGoal"), counter: 50, suffix: "" },
            { icon: Globe2, text: t("europe"), counter: null, suffix: null },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <item.icon className="mb-3 h-6 w-6 text-accent" />
              {item.counter !== null && (
                <p className="font-display text-4xl font-bold">
                  <AnimatedCounter value={item.counter} suffix={item.suffix ?? ""} />
                </p>
              )}
              <p className="mt-2 text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 font-display text-2xl font-bold">{t("majorsLabel")}</h3>
            <div className="flex flex-wrap gap-3">
              {cityKeys.map((city, i) => (
                <motion.span
                  key={city}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.08 }}
                  className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  🏙 {t(`cities.${city}`)}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-card"
          >
            <svg viewBox="0 0 100 60" className="h-full w-full" aria-hidden>
              <defs>
                <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              <rect width="100" height="60" fill="url(#mapGrad)" />
              <ellipse cx="25" cy="42" rx="18" ry="12" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="0.3" />
              <ellipse cx="50" cy="32" rx="15" ry="10" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="0.3" />
              {mapDots.map((dot, i) => (
                <g key={i}>
                  <motion.circle
                    cx={dot.x}
                    cy={dot.y}
                    r="1.2"
                    fill="var(--accent)"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  />
                  <motion.circle
                    cx={dot.x}
                    cy={dot.y}
                    r="2"
                    fill="none"
                    stroke="var(--accent)"
                    strokeOpacity="0.4"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                </g>
              ))}
            </svg>
            <div className="photo-overlay absolute inset-0 pointer-events-none" />
            <p className="absolute bottom-4 left-4 right-4 text-center text-xs text-muted-foreground">{t("mapHint")}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
