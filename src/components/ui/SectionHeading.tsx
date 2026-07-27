"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ title, subtitle, align = "left", className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(align === "center" && "text-center", className)}
    >
      <h2 className="font-display text-heading-primary font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">{subtitle}</p>}
    </motion.div>
  );
}
