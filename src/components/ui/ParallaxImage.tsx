"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  speed?: number;
  priority?: boolean;
  aspect?: "square" | "portrait" | "landscape" | "wide";
}

const aspectMap = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

export function ParallaxImage({
  src,
  alt,
  className,
  imageClassName,
  speed = 0.3,
  priority = false,
  aspect = "landscape",
}: ParallaxImageProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <motion.div className={cn("group relative overflow-hidden rounded-3xl", aspectMap[aspect], className)}>
      <motion.div style={{ y, scale }} className="absolute inset-0 h-[120%] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={cn("object-cover transition-transform duration-700 group-hover:scale-105", imageClassName)}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
      <div className="photo-overlay pointer-events-none absolute inset-0 transition-opacity duration-500 group-hover:opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}
