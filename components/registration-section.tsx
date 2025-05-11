"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Calendar, Clock, Users, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const RegistrationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const { toast } = useToast()

  // Calculate countdown to May 12, 2025
  useEffect(() => {
    const targetDate = new Date("2025-05-12T23:59:59")

    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate the registration cards
      gsap.utils.toArray<HTMLElement>(".registration-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          },
        )
      })

      // Animate the QR code
      gsap.fromTo(
        ".qr-code",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".qr-code",
            start: "top 90%",
          },
        },
      )

      // Animate the countdown
      gsap.fromTo(
        ".countdown-container",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".countdown-container",
            start: "top 90%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCopyReferral = () => {
    navigator.clipboard.writeText("MX15BC")
    toast({
      title: "Referral Code Copied!",
      description: "Use this code during registration for special benefits.",
    })
  }

  return (
    <section id="register" ref={sectionRef} className="py-20 relative overflow-hidden parallax-section">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Register Now
          </h2>
          <p className="max-w-2xl mx-auto text-white/70">
            Secure your spot in this exclusive bootcamp. Limited to only 25 slots!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="registration-card bg-black/40 backdrop-blur-lg border border-white/10 overflow-hidden group hover:border-cyan-500/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <CardContent className="p-6 relative z-10">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  Individual Pass
                </h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">₹1299</span>
                  <span className="ml-2 text-white/70 text-sm">Valid till May 12</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-cyan-400 mr-2" />
                  <span>Full access to 15-hour live bootcamp</span>
                </li>
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-cyan-400 mr-2" />
                  <span>Participation in mini hackathon</span>
                </li>
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-cyan-400 mr-2" />
                  <span>Certificate of completion</span>
                </li>
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-cyan-400 mr-2" />
                  <span>Career guidance session</span>
                </li>
              </ul>

              <Button
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-none group relative overflow-hidden"
                onClick={() => window.open("https://bit.ly/mentorx-bootcamp2025", "_blank")}
              >
                <span className="relative z-10 flex items-center">
                  Register Now
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </CardContent>
          </Card>

          <Card className="registration-card bg-gradient-to-br from-cyan-900/40 to-purple-900/40 backdrop-blur-lg border border-cyan-500/30 overflow-hidden group hover:border-cyan-500/70 transition-all duration-300 relative">
            <div className="absolute top-0 right-0">
              <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-bold px-4 py-1 transform rotate-45 translate-x-[30%] translate-y-[120%] w-[150px] text-center">
                POPULAR
              </div>
            </div>

            <CardContent className="p-6 relative z-10">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-cyan-400">Team Pass</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">₹2499</span>
                  <span className="ml-2 text-white/70 text-sm">For 2 Members</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-cyan-400 mr-2" />
                  <span>Full access for 2 team members</span>
                </li>
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-cyan-400 mr-2" />
                  <span>Team participation in hackathon</span>
                </li>
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-cyan-400 mr-2" />
                  <span>Certificates for both members</span>
                </li>
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-cyan-400 mr-2" />
                  <span>Priority support during sessions</span>
                </li>
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-cyan-400 mr-2" />
                  <span>Exclusive team resources</span>
                </li>
              </ul>

              <Button
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-none group relative overflow-hidden"
                onClick={() => window.open("https://bit.ly/mentorx-bootcamp2025", "_blank")}
              >
                <span className="relative z-10 flex items-center">
                  Register Team
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </CardContent>
          </Card>

          <div className="registration-card flex flex-col">
            <div className="qr-code bg-white p-4 rounded-lg mb-6 relative group">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-11%20at%201.24.00%20PM-CNVUzXcFw2CdwvRe82utufKPrvZ5uf.jpeg"
                alt="QR Code for registration"
                width={250}
                height={250}
                className="mx-auto"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <p className="text-white font-medium">Scan to Register</p>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-lg p-6 flex-grow">
              <h3 className="text-xl font-bold mb-4">Important Information</h3>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <Calendar className="w-5 h-5 text-cyan-400 mr-2 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Bootcamp Dates:</span>
                    <p className="text-white/70">Summer 2025 (Exact dates to be announced)</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-cyan-400 mr-2 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Duration:</span>
                    <p className="text-white/70">15 hours of live training</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <Users className="w-5 h-5 text-cyan-400 mr-2 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Limited Slots:</span>
                    <p className="text-white/70">Only 25 slots available</p>
                  </div>
                </li>
              </ul>

              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="font-medium mb-2">Referral Code:</p>
                <div
                  className="bg-white/10 rounded px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-white/20 transition-colors duration-200"
                  onClick={handleCopyReferral}
                >
                  <span className="font-mono">MX15BC</span>
                  <span className="text-xs text-cyan-400">Click to Copy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="countdown-container bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">Early Bird Offer Ends In:</h3>

          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Days", value: countdown.days },
              { label: "Hours", value: countdown.hours },
              { label: "Minutes", value: countdown.minutes },
              { label: "Seconds", value: countdown.seconds },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 border border-white/20 rounded-lg p-4">
                  <div className="text-4xl font-bold mb-1">{item.value.toString().padStart(2, "0")}</div>
                  <div className="text-sm text-white/70">{item.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-none group relative overflow-hidden"
              onClick={() => window.open("https://bit.ly/mentorx-bootcamp2025", "_blank")}
            >
              <span className="relative z-10 flex items-center">
                Secure Your Spot Now
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegistrationSection
