"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { MapPin, Target, Globe2 } from "lucide-react";
import { marathonCityKeys, type MarathonCityKey } from "@/lib/marathonCities";
import { cn } from "@/lib/utils";

const MarathonMap = dynamic(
  () => import("@/components/map/MarathonMap").then((m) => m.MarathonMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-muted/50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    ),
  }
);

export function RunningJourney() {
  const t = useTranslations("journey");
  const [selectedCity, setSelectedCity] = useState<MarathonCityKey | null>(null);

  const cityLabels = Object.fromEntries(
    marathonCityKeys.map((key) => [key, t(`cities.${key}`)])
  ) as Record<MarathonCityKey, string>;

  return (
    <section id="journey" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-sky/[0.04]" />
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
                <p className="font-display text-heading-stat-lg font-bold">
                  <AnimatedCounter value={item.counter} suffix={item.suffix ?? ""} />
                </p>
              )}
              <p className="mt-2 text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 font-display text-heading-tertiary font-bold">{t("majorsLabel")}</h3>
            <div className="flex flex-wrap gap-3">
              {marathonCityKeys.map((city, i) => (
                <motion.button
                  key={city}
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCity(city)}
                  className={cn(
                    "rounded-full border bg-card px-5 py-2.5 text-sm font-medium transition-colors",
                    selectedCity === city
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border hover:border-accent hover:text-accent"
                  )}
                >
                  🏙 {t(`cities.${city}`)}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-card"
          >
            <MarathonMap
              selectedCity={selectedCity}
              onCitySelect={setSelectedCity}
              cityLabels={cityLabels}
              majorLabel={t("majorsLabel")}
              hereLabel={t("mapHere")}
            />
            <p className="pointer-events-none absolute bottom-4 left-4 right-4 text-center text-xs text-muted-foreground drop-shadow-sm">
              {t("mapHint")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
