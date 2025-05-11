"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Instagram, Linkedin, Mail, Twitter, Youtube } from "lucide-react"

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!footerRef.current) return

      const rect = footerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      footerRef.current.style.setProperty("--x", `${x}px`)
      footerRef.current.style.setProperty("--y", `${y}px`)
    }

    const footer = footerRef.current
    if (footer) {
      footer.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (footer) {
        footer.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative py-16 overflow-hidden"
      style={
        {
          "--x": "50%",
          "--y": "50%",
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black to-black/90"></div>

      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle 400px at var(--x) var(--y), rgba(0, 255, 255, 0.15), transparent 40%)",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              MentorX
            </h3>
            <p className="text-white/70 mb-6">
              Empowering the next generation of AI professionals through immersive learning experiences.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Twitter className="w-5 h-5" />, href: "#" },
                { icon: <Linkedin className="w-5 h-5" />, href: "#" },
                { icon: <Instagram className="w-5 h-5" />, href: "#" },
                { icon: <Youtube className="w-5 h-5" />, href: "#" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Features", "Speaker", "Register"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-white/70 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Bootcamp Features</h4>
            <ul className="space-y-3">
              {[
                "AI/ML Training",
                "Mini Hackathon",
                "Advanced Prompting",
                "Build Your Own GPTs",
                "Freelancing with AI",
              ].map((item) => (
                <li key={item}>
                  <Link href="#features" className="text-white/70 hover:text-cyan-400 transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-cyan-400 mr-2 shrink-0 mt-0.5" />
                <a
                  href="mailto:pavithra@mentorxcommunity.com"
                  className="text-white/70 hover:text-cyan-400 transition-colors duration-200"
                >
                  pavithra@mentorxcommunity.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/mentorx-community/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white/70 hover:text-cyan-400 transition-colors duration-200"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  MentorX Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} MentorX Community. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
