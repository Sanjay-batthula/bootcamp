"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

const BrainModel = (props) => {
  const group = useRef()
  const { nodes, materials } = useGLTF("/duck.glb")
  
  // Get the first available mesh from the loaded model
  const duckGeometry = Object.values(nodes)[0].geometry

  const material = useRef(
    new THREE.MeshStandardMaterial({
      color: new THREE.Color("#00ffff"),
      emissive: new THREE.Color("#00ffff"),
      emissiveIntensity: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    }),
  )

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.002
      material.current.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime) * 0.2
      material.current.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={duckGeometry}
        material={material.current}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.3, 0.3, 0.3]}
      />
    </group>
  )
}

export default BrainModel
