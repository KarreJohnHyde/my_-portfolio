import React, { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import {
  neuralVertexShader,
  neuralFragmentShader,
  energyBeamVertexShader,
  energyBeamFragmentShader,
} from "./shaders/neuralShaders"

interface NeuralTorusMeshProps {
  progress: number
  inspectMode: boolean
  mouseX: number
  mouseY: number
}

const PARTICLE_COUNT = 2400

function NeuralTorusParticles({ progress, inspectMode, mouseX, mouseY }: NeuralTorusMeshProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const beamRef = useRef<THREE.Mesh>(null)
  const torusWireframeRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const beamMaterialRef = useRef<THREE.ShaderMaterial>(null)
  const { camera, gl } = useThree()

  // Generate 4 procedural mathematical topologies
  const {
    scatteredPoints,
    torusPoints,
    beamPoints,
    latticePoints,
    randoms,
    sizes,
  } = useMemo(() => {
    const scattered = new Float32Array(PARTICLE_COUNT * 3)
    const torus = new Float32Array(PARTICLE_COUNT * 3)
    const beam = new Float32Array(PARTICLE_COUNT * 3)
    const lattice = new Float32Array(PARTICLE_COUNT * 3)
    const rnd = new Float32Array(PARTICLE_COUNT)
    const sz = new Float32Array(PARTICLE_COUNT)

    // Stage 2: 5 Centroid clusters on Torus for FAISS partitioning
    const clusterAngles = [0, 1.25, 2.5, 3.75, 5.0]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3

      // 1. Stage 1: High-dimensional scattered vector cloud
      const rCloud = 3.5 + Math.random() * 2.5
      const thetaC = Math.random() * Math.PI * 2
      const phiC = Math.acos(2 * Math.random() - 1)
      scattered[i3] = rCloud * Math.sin(phiC) * Math.cos(thetaC)
      scattered[i3 + 1] = rCloud * Math.sin(phiC) * Math.sin(thetaC)
      scattered[i3 + 2] = rCloud * Math.cos(phiC)

      // 2. Stage 2: Geometric Neural Torus (FAISS Vector Index)
      const u = Math.random() * Math.PI * 2
      const v = Math.random() * Math.PI * 2
      const R = 3.1
      const r = 1.05 + Math.sin(v * 2.0) * 0.25
      const torusX = (R + r * Math.cos(v)) * Math.cos(u)
      const torusY = (R + r * Math.cos(v)) * Math.sin(u)
      const torusZ = r * Math.sin(v)

      // Cluster weighting around 5 nearest neighbor centroids
      const clusterBias = Math.random() < 0.4 ? clusterAngles[i % 5] : u
      const blendedU = THREE.MathUtils.lerp(u, clusterBias, 0.4)
      torus[i3] = (R + r * Math.cos(v)) * Math.cos(blendedU) + (Math.random() - 0.5) * 0.2
      torus[i3 + 1] = (R + r * Math.cos(v)) * Math.sin(blendedU) + (Math.random() - 0.5) * 0.2
      torus[i3 + 2] = torusZ + (Math.random() - 0.5) * 0.2

      // 3. Stage 3: Context Injection Axial Beam & Excitation Nodes
      if (i < PARTICLE_COUNT * 0.45) {
        // High density axial query vector beam along Y axis
        const beamY = (Math.random() - 0.5) * 8.0
        const beamRadius = 0.25 + Math.random() * 0.55
        const beamAngle = Math.random() * Math.PI * 2
        beam[i3] = Math.cos(beamAngle) * beamRadius
        beam[i3 + 1] = beamY
        beam[i3 + 2] = Math.sin(beamAngle) * beamRadius
      } else {
        // Orbiting excited semantic nodes around the torus
        beam[i3] = torusX * 1.15 + (Math.random() - 0.5) * 0.3
        beam[i3 + 1] = torusY * 1.15 + (Math.random() - 0.5) * 0.3
        beam[i3 + 2] = torusZ * 1.15 + (Math.random() - 0.5) * 0.3
      }

      // 4. Stage 4: Stabilized Crystalline Lattice (Production Deployment)
      const side = Math.cbrt(PARTICLE_COUNT)
      const ix = (i % side) - side / 2
      const iy = (Math.floor(i / side) % side) - side / 2
      const iz = Math.floor(i / (side * side)) - side / 2
      const spacing = 0.42
      lattice[i3] = ix * spacing + (Math.random() - 0.5) * 0.08
      lattice[i3 + 1] = iy * spacing + (Math.random() - 0.5) * 0.08
      lattice[i3 + 2] = iz * spacing + (Math.random() - 0.5) * 0.08

      rnd[i] = Math.random()
      sz[i] = 14.0 + Math.random() * 24.0
    }

    return {
      scatteredPoints: scattered,
      torusPoints: torus,
      beamPoints: beam,
      latticePoints: lattice,
      randoms: rnd,
      sizes: sz,
    }
  }, [])

  // GLSL Uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uNoiseFrequency: { value: 0.22 },
      uDpr: { value: Math.min(window.devicePixelRatio, 2) },
      uColorPrimary: { value: new THREE.Color("#00FF66") },   // Electric Lime
      uColorSecondary: { value: new THREE.Color("#D4FF00") }, // Cyber Yellow
    }),
    [],
  )

  const beamUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uColor: { value: new THREE.Color("#00F0FF") },          // Electric Cyan
    }),
    [],
  )

  // Smooth camera orchestration tied to scroll stages when NOT in manual inspect mode
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time
      materialRef.current.uniforms.uProgress.value = progress
      materialRef.current.uniforms.uDpr.value = gl.getPixelRatio()
    }

    if (beamMaterialRef.current) {
      beamMaterialRef.current.uniforms.uTime.value = time
      beamMaterialRef.current.uniforms.uProgress.value = progress
    }

    if (torusWireframeRef.current) {
      torusWireframeRef.current.rotation.z = time * 0.12 + progress * Math.PI
      torusWireframeRef.current.rotation.x = Math.PI / 2.5 + Math.sin(time * 0.4) * 0.08
      // Fade wireframe in only during Stage 2 & 3
      const wireOpacity = smoothstep(0.18, 0.4, progress) * (1.0 - smoothstep(0.8, 0.98, progress)) * 0.22
      const mat = torusWireframeRef.current.material as THREE.MeshBasicMaterial
      if (mat) mat.opacity = wireOpacity
    }

    // Camera orbit & dolly zoom tied to narrative stage when NOT in manual Inspect Mode
    if (!inspectMode) {
      let targetZ = 8.8
      let targetY = 0.0
      let targetX = 0.0

      if (progress < 0.25) {
        // Stage 1: Wide, floating overview of raw vector space
        targetZ = 9.2 + Math.sin(progress * Math.PI * 4) * 0.4
        targetY = 0.4
        targetX = mouseX * 0.8
      } else if (progress < 0.50) {
        // Stage 2: Dynamic dolly zoom pitching into a primary cluster
        const p2 = (progress - 0.25) / 0.25
        targetZ = THREE.MathUtils.lerp(9.2, 5.8, p2)
        targetY = THREE.MathUtils.lerp(0.4, 1.4, p2)
        targetX = THREE.MathUtils.lerp(0.0, 1.2, p2) + mouseX * 0.6
      } else if (progress < 0.75) {
        // Stage 3: Orbiting macro shot following axial energy beam
        const p3 = (progress - 0.50) / 0.25
        const orbitAngle = p3 * Math.PI * 1.5
        targetZ = 6.2 + Math.cos(orbitAngle) * 1.2
        targetX = Math.sin(orbitAngle) * 2.2 + mouseX * 0.5
        targetY = 0.8 + Math.sin(p3 * Math.PI) * 0.6
      } else {
        // Stage 4: Smooth pullback to neutral balanced perspective
        const p4 = (progress - 0.75) / 0.25
        targetZ = THREE.MathUtils.lerp(6.2, 8.4, p4)
        targetY = THREE.MathUtils.lerp(0.8, 0.0, p4)
        targetX = THREE.MathUtils.lerp(1.0, 0.0, p4) + mouseX * 0.4
      }

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 4.0, delta)
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY + mouseY * 0.6, 4.0, delta)
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4.0, delta)
      camera.lookAt(0, 0, 0)
    }
  })

  return (
    <>
      {/* 2,400 Procedural Neural Particles with Custom GLSL Shaders */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            args={[scatteredPoints, 3]}
            attach="attributes-position"
          />
          <bufferAttribute
            args={[scatteredPoints, 3]}
            attach="attributes-aRandomPoint"
          />
          <bufferAttribute
            args={[torusPoints, 3]}
            attach="attributes-aTorusPoint"
          />
          <bufferAttribute
            args={[beamPoints, 3]}
            attach="attributes-aBeamPoint"
          />
          <bufferAttribute
            args={[latticePoints, 3]}
            attach="attributes-aLatticePoint"
          />
          <bufferAttribute
            args={[randoms, 1]}
            attach="attributes-aRandom"
          />
          <bufferAttribute
            args={[sizes, 1]}
            attach="attributes-aSize"
          />
        </bufferGeometry>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fragmentShader={neuralFragmentShader}
          ref={materialRef}
          transparent={true}
          uniforms={uniforms}
          vertexShader={neuralVertexShader}
        />
      </points>

      {/* Central Pulsing Energy Beam (Activates on Stage 3) */}
      <mesh ref={beamRef}>
        <cylinderGeometry args={[0.06, 0.06, 12, 16]} />
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fragmentShader={energyBeamFragmentShader}
          ref={beamMaterialRef}
          transparent={true}
          uniforms={beamUniforms}
          vertexShader={energyBeamVertexShader}
        />
      </mesh>

      {/* Geometric Torus Wireframe (Calculates Topological Retrieval) */}
      <mesh ref={torusWireframeRef}>
        <torusGeometry args={[3.1, 0.02, 16, 100]} />
        <meshBasicMaterial
          color="#00FF66"
          opacity={0.0}
          transparent={true}
          wireframe={true}
        />
      </mesh>
    </>
  )
}

function smoothstep(min: number, max: number, value: number) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)))
  return x * x * (3 - 2 * x)
}

export interface NeuralTorusSceneProps {
  progress: number
  inspectMode: boolean
  mouseX: number
  mouseY: number
}

export default function NeuralTorusScene({
  progress,
  inspectMode,
  mouseX,
  mouseY,
}: NeuralTorusSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.8], fov: 52, near: 0.1, far: 100 }}
      className="neural-torus-canvas"
      dpr={Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2)}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <color args={["#0a0a0c"]} attach="background" />
      <fog args={["#0a0a0c", 10, 22]} attach="fog" />

      {/* Ambient Cyber Light */}
      <ambientLight intensity={0.4} />

      {/* 3D Scene Core */}
      <NeuralTorusParticles
        inspectMode={inspectMode}
        mouseX={mouseX}
        mouseY={mouseY}
        progress={progress}
      />

      {/* Interactive OrbitControls enabled ONLY when user activates Inspect 3D Mode */}
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
  )
}
