"use client"

import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { HeroSection } from "./sections/HeroSection"
import { HowItWorksSection } from "./sections/HowItWorksSection"
import { SecuritySection } from "./sections/SecuritySection"
import { CtaSection } from "./sections/CtaSection"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <SecuritySection />
      <CtaSection />
      <Footer />
    </main>
  )
}