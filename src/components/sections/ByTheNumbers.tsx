"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import {
  Trophy,
  GraduationCap,
  Code,
  Timer,
  Medal,
  Globe,
  Flag,
} from "lucide-react";

const statIcons = [Timer, Medal, GraduationCap, GraduationCap, Code, Trophy, Trophy, Globe, Flag, Medal, Timer, Timer];
const statKeys = [
  "years",
  "olympic",
  "masters1",
  "masters2",
  "engineer",
  "marathons",
  "halfs",
  "world",
  "states",
  "majors",
  "marathonPB",
  "halfPB",
] as const;

const numericStats: Record<string, { value: number; suffix?: string }> = {
  marathons: { value: 90 },
  halfs: { value: 300, suffix: "+" },
  states: { value: 20, suffix: "/50" },
};

export function ByTheNumbers() {
  const t = useTranslations("numbers");

  return (
    <section id="numbers" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {statKeys.map((key, i) => {
            const Icon = statIcons[i];
            const numeric = numericStats[key];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-shadow duration-300 hover:shadow-[0_8px_40px_var(--glow)]"
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent/5 transition-transform duration-500 group-hover:scale-150" />
                <Icon className="mb-4 h-6 w-6 text-accent" />
                {numeric ? (
                  <p className="font-display text-3xl font-bold">
                    <AnimatedCounter value={numeric.value} suffix={numeric.suffix} />
                  </p>
                ) : null}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`stats.${key}`)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
