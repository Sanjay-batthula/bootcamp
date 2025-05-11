"use client"

import { useEffect, useRef } from "react"

const CircuitLines = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Circuit node class
    class Node {
      x: number
      y: number
      connections: Node[]
      size: number
      color: string
      pulseSize: number
      pulseOpacity: number
      pulseSpeed: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.connections = []
        this.size = Math.random() * 2 + 1
        this.color = `rgba(0, ${150 + Math.random() * 105}, ${200 + Math.random() * 55}, ${0.3 + Math.random() * 0.7})`
        this.pulseSize = 0
        this.pulseOpacity = 0
        this.pulseSpeed = 0.02 + Math.random() * 0.03
      }

      connect(node: Node) {
        if (!this.connections.includes(node)) {
          this.connections.push(node)
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw connections
        for (const node of this.connections) {
          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(node.x, node.y)
          ctx.strokeStyle = `rgba(0, 200, 255, 0.15)`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }

        // Draw node
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        // Draw pulse effect
        if (this.pulseSize > 0) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.pulseSize, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 200, 255, ${this.pulseOpacity})`
          ctx.fill()
        }

        // Update pulse
        this.pulseSize += this.pulseSpeed
        this.pulseOpacity = Math.max(0, 0.5 - this.pulseSize / 20)

        if (this.pulseOpacity <= 0) {
          this.pulseSize = 0
          // Random chance to start a new pulse
          if (Math.random() < 0.01) {
            this.pulseSize = this.size
            this.pulseOpacity = 0.5
          }
        }
      }
    }

    // Create circuit nodes
    const nodes: Node[] = []
    const nodeCount = Math.floor((window.innerWidth * window.innerHeight) / 20000)

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      nodes.push(new Node(x, y))
    }

    // Connect nodes
    for (const node of nodes) {
      const nearbyNodes = nodes.filter(
        (otherNode) => otherNode !== node && Math.hypot(otherNode.x - node.x, otherNode.y - node.y) < 200,
      )

      // Connect to closest nodes
      nearbyNodes
        .sort((a, b) => Math.hypot(a.x - node.x, a.y - node.y) - Math.hypot(b.x - node.x, b.y - node.y))
        .slice(0, 3)
        .forEach((nearNode) => node.connect(nearNode))
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw all nodes
      for (const node of nodes) {
        node.draw(ctx)
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}

export default CircuitLines
