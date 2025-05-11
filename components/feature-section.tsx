"use client"

import { useRef, useEffect } from "react"
import { useInView } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Brain, Code, Cpu, Lightbulb, Rocket, Sparkles } from "lucide-react"

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Crack Internships with AI",
    description: "Learn how to leverage AI to stand out in internship applications and interviews.",
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Mini Hackathon: Solve with AI",
    description: "Participate in a hands-on hackathon to solve real-world problems using AI.",
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Advanced Prompting Techniques",
    description: "Master the art of crafting effective prompts for AI models to get better results.",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Build Your Own GPTs",
    description: "Learn to create and customize your own GPT models for specific use cases.",
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Freelancing with Gen AI",
    description: "Discover how to monetize your AI skills through freelancing opportunities.",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Career Planning & Learning Path",
    description: "Get guidance on building a successful career in AI and machine learning.",
  },
]

const FeatureSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate the feature cards when they come into view
      gsap.utils.toArray<HTMLElement>(".feature-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          },
        )
      })

      // Animate the section title
      gsap.fromTo(
        ".feature-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".feature-title",
            start: "top 90%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="py-20 relative overflow-hidden parallax-section">
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="feature-title text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Bootcamp Features
          </h2>
          <p className="max-w-2xl mx-auto text-white/70">
            Dive into the future of AI and machine learning with our comprehensive bootcamp features designed to
            accelerate your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group relative bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center mb-4 text-cyan-400 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
