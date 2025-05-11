"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Cpu, Sparkles } from "lucide-react"
import gsap from "gsap"
import { Canvas } from "@react-three/fiber"
import { Float, OrbitControls, Environment } from "@react-three/drei"
import BrainModel from "./brain-model"

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-title-char", {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        delay: 0.2,
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1,
        ease: "power2.out",
      })

      gsap.to(".hero-cta", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 1.5,
        ease: "power2.out",
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
        <Canvas className="!absolute inset-0">
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <BrainModel position={[0, 0, -2]} scale={2} />
          </Float>
          <Environment preset="night" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <motion.div style={{ y, opacity }} className="container mx-auto px-4 relative z-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Sparkles className="w-4 h-4 mr-2 text-cyan-400" />
            <span className="text-sm font-medium">Summer 2025 Bootcamp</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          {"MentorX AI/ML".split("").map((char, index) => (
            <span
              key={index}
              className="hero-title-char inline-block opacity-0 translate-y-8"
              style={{
                textShadow: "0 0 15px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3)",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
          <br />
          {"Bootcamp".split("").map((char, index) => (
            <span
              key={index}
              className="hero-title-char inline-block opacity-0 translate-y-8"
              style={{
                textShadow: "0 0 15px rgba(255, 0, 255, 0.5), 0 0 30px rgba(255, 0, 255, 0.3)",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <div className="hero-subtitle opacity-0 translate-y-8 mb-8 text-xl md:text-2xl text-white/80">
          <TypeAnimation
            sequence={[
              "Learn AI/ML & Freelancing",
              2000,
              "15 Hours Live | Certified",
              2000,
              "Limited to Only 25 Slots",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Number.POSITIVE_INFINITY}
          />
        </div>

        <div className="hero-cta opacity-0 translate-y-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-none group relative overflow-hidden"
            onClick={() => window.open("https://bit.ly/mentorx-bootcamp2025", "_blank")}
          >
            <span className="relative z-10 flex items-center">
              Register Now
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>

          <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
            Learn More
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mb-3">
              <Brain className="w-8 h-8 text-cyan-400" />
            </div>
            <p className="text-sm md:text-base font-medium">AI/ML Training</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
              <Cpu className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-sm md:text-base font-medium">Mini Hackathon</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center mb-3">
              <Sparkles className="w-8 h-8 text-pink-400" />
            </div>
            <p className="text-sm md:text-base font-medium">Career Planning</p>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-1 rounded-full bg-white"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
