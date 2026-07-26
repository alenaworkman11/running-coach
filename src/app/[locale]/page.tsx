import { setRequestLocale } from "next-intl/server";
import { PageTransition } from "@/components/layout/PageTransition";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { ByTheNumbers } from "@/components/sections/ByTheNumbers";
import { MyStory } from "@/components/sections/MyStory";
import { WhyWorkWithMe } from "@/components/sections/WhyWorkWithMe";
import { Coaching } from "@/components/sections/Coaching";
import { RunningJourney } from "@/components/sections/RunningJourney";
import { Philosophy } from "@/components/sections/Philosophy";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageTransition>
      <Hero />
      <Intro />
      <div className="section-divider mx-auto max-w-7xl" />
      <ByTheNumbers />
      <MyStory />
      <WhyWorkWithMe />
      <Coaching />
      <RunningJourney />
      <Philosophy />
      <Testimonials />
      <FAQ />
      <Contact />
    </PageTransition>
  );
}
