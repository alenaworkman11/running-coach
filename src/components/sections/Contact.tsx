"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Send, Instagram } from "lucide-react";
import { FormEvent, useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const isDisabled = status === "sending" || status === "success";

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
                disabled={isDisabled}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
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
                disabled={isDisabled}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
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
                disabled={isDisabled}
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
              />
            </div>

            {status === "success" && (
              <p className="rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400">
                {t("success")}
              </p>
            )}
            {status === "error" && (
              <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {t("error")}
              </p>
            )}

            <button
              type="submit"
              disabled={isDisabled}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 font-semibold text-accent-foreground transition-all duration-300 hover:shadow-[0_0_24px_var(--glow)] disabled:opacity-60"
            >
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              {status === "success" ? "✓" : status === "sending" ? t("sending") : t("send")}
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
