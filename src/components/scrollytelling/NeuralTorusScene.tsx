import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshTransmissionMaterial, Environment, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

interface ChromaticTorusProps {
  progress?: number
  mouseX?: number
  mouseY?: number
}

function ChromaticTorus({ progress = 0, mouseX = 0, mouseY = 0 }: ChromaticTorusProps) {
  const torusRef = useRef<THREE.Mesh>(null)

  // Subtle, continuous rotation for a modest animation
  useFrame((_state, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.15
      torusRef.current.rotation.y += delta * 0.1

      // Subtle responsive tilt to mouse position and scroll progress
      torusRef.current.rotation.z = progress * Math.PI * 0.5 + mouseX * 0.1
      torusRef.current.position.x = mouseX * 0.2
      torusRef.current.position.y = mouseY * 0.2
    }
  })

  return (
    <mesh ref={torusRef}>
      {/* 3D Torus matching the section's theme */}
      <torusGeometry args={[2.5, 0.8, 64, 128]} />
      <MeshTransmissionMaterial
        backside
        thickness={0.5} // Depth of the glass volume
        roughness={0.05} // Slight blur for a premium frosted look
        transmission={1} // Fully transmissive glass
        ior={1.2} // Index of Refraction (bends light)
        chromaticAberration={0.06} // Splits light into RGB spectrum at the edges
        distortion={0.1} // Subtle surface warping
        distortionScale={0.2}
      />
    </mesh>
  )
}

export interface NeuralTorusSceneProps {
  progress?: number
  inspectMode?: boolean
  mouseX?: number
  mouseY?: number
}

export default function NeuralTorusScene({
  progress = 0,
  inspectMode = false,
  mouseX = 0,
  mouseY = 0,
}: NeuralTorusSceneProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: inspectMode ? "auto" : "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        {/* Environment map provides light for reflection and refraction */}
        <Environment preset="city" />
        <ChromaticTorus mouseX={mouseX} mouseY={mouseY} progress={progress} />
        {inspectMode && (
          <OrbitControls
            dampingFactor={0.06}
            enableDamping={true}
            enablePan={false}
            enableRotate={true}
            enableZoom={true}
            makeDefault={true}
            maxDistance={14}
            minDistance={3.5}
          />
        )}
      </Canvas>
    </div>
  )
}
