"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Award, Globe, Laptop, School } from "lucide-react"

const SpeakerSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate the speaker image
      gsap.fromTo(
        ".speaker-image",
        {
          scale: 0.8,
          opacity: 0,
          rotate: -5,
        },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".speaker-image",
            start: "top 80%",
          },
        },
      )

      // Animate the speaker info
      gsap.fromTo(
        ".speaker-info",
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".speaker-info",
            start: "top 80%",
          },
        },
      )

      // Animate the achievements
      gsap.utils.toArray<HTMLElement>(".achievement-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.2 + i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="speaker" ref={sectionRef} className="py-20 relative overflow-hidden parallax-section">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Meet Your Mentor
          </h2>
          <p className="max-w-2xl mx-auto text-white/70">
            Learn from an industry expert with extensive experience in AI and machine learning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="speaker-image relative">
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border-2 border-white/10 group">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-11%20at%201.24.00%20PM-CNVUzXcFw2CdwvRe82utufKPrvZ5uf.jpeg"
                alt="Abhilekh Verma"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold mb-1">Abhilekh Verma</h3>
                <p className="text-cyan-400">Microsoft MVP - AI | Global Speaker</p>
              </div>

              <div className="absolute top-4 right-4">
                <Badge className="bg-cyan-500/80 hover:bg-cyan-500 text-white">MVP Summit 2025 Scholar</Badge>
              </div>

              <div className="absolute -top-5 -left-5 w-32 h-32">
                <div className="w-full h-full animate-spin-slow">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                    </defs>
                    <text fontSize="7.5">
                      <textPath xlinkHref="#circle" className="text-cyan-400">
                        Microsoft MVP • Global Speaker • AI Expert •
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-radial from-purple-600/30 to-transparent rounded-full blur-2xl"></div>
          </div>

          <div className="speaker-info">
            <h3 className="text-3xl font-bold mb-6">About the Speaker</h3>

            <div className="space-y-6">
              <div className="achievement-item flex items-start">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center mr-4 text-cyan-400 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">Microsoft MVP - AI</h4>
                  <p className="text-white/70">
                    Recognized by Microsoft for exceptional expertise and community contributions in AI.
                  </p>
                </div>
              </div>

              <div className="achievement-item flex items-start">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center mr-4 text-cyan-400 shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">Global Speaker</h4>
                  <p className="text-white/70">
                    Travelled across multiple countries sharing knowledge and insights on AI technologies.
                  </p>
                </div>
              </div>

              <div className="achievement-item flex items-start">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center mr-4 text-cyan-400 shrink-0">
                  <Laptop className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">Mentor @ Microsoft for Startups</h4>
                  <p className="text-white/70">
                    Mentors startups at Microsoft, WE Hub, IBM, and IIT Guwahati, helping them leverage AI.
                  </p>
                </div>
              </div>

              <div className="achievement-item flex items-start">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center mr-4 text-cyan-400 shrink-0">
                  <School className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">MVP Summit 2025 Scholar</h4>
                  <p className="text-white/70">Selected as a scholar for the prestigious Microsoft MVP Summit 2025.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SpeakerSection
