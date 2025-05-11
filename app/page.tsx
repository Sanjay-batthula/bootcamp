"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import FeatureSection from "@/components/feature-section"
import SpeakerSection from "@/components/speaker-section"
import RegistrationSection from "@/components/registration-section"
import Footer from "@/components/footer"
import AIParticles from "@/components/ai-particles"
import CircuitLines from "@/components/circuit-lines"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Initialize animations
    const ctx = gsap.context(() => {
      // Parallax effect for sections
      gsap.utils.toArray<HTMLElement>(".parallax-section").forEach((section) => {
        gsap.to(section, {
          y: () => section.offsetHeight * 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })

      // Reveal animations for sections
      gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section, i) => {
        gsap.fromTo(
          section,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          },
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={containerRef} className="relative overflow-hidden bg-black text-white">
      <div className="fixed inset-0 z-0">
        <AIParticles />
      </div>
      <div className="fixed inset-0 z-0 opacity-30">
        <CircuitLines />
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeatureSection />
        <SpeakerSection />
        <RegistrationSection />
        <Footer />
      </div>

      <Toaster />
    </main>
  )
}
