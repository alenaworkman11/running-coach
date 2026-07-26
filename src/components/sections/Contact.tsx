"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Send, Instagram } from "lucide-react";
import { FormEvent, useState } from "react";

export function Contact() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading title={t("title")} subtitle={t("subtitle")} />
            <div className="mt-8">
              <ParallaxImage
                src="/img/contact.png"
                alt="Contact"
                aspect="wide"
                speed={0.05}
                objectPosition="center 40%"
                overlay={false}
              />
            </div>
            <p className="mt-6 text-muted-foreground leading-relaxed">{t("description")}</p>
          </div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-border bg-card p-8 md:p-10"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                {t("name")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                {t("email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                {t("message")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <button
              type="submit"
              disabled={submitted}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 font-semibold text-accent-foreground transition-all duration-300 hover:shadow-[0_0_24px_var(--glow)] disabled:opacity-60"
            >
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              {submitted ? "✓" : t("send")}
            </button>
            <a
              href="https://www.instagram.com/lena_bogdanova_11"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center text-muted-foreground transition-colors hover:text-accent"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6 transition-transform group-hover:scale-110" />
            </a>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
