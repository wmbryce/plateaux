"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { FilledWaveHexagon } from "./filled-wave-hexagon"
import type { WaveParams } from "./control-panel"

interface WaveCanvasProps {
  params: WaveParams
}

function AutoCamera() {
  const controlsRef = useRef<any>(null)

  useFrame((state) => {
    if (!controlsRef.current) return

    const time = state.clock.elapsedTime

    // Automatic orbital movement
    const baseRadius = 12
    const height = 8
    const orbitSpeed = 0.3
    const zoomSpeed = 0.2
    const verticalSpeed = 0.5

    // Dynamic zoom - oscillates between close and far
    const minRadius = 10
    const maxRadius = 40
    const zoomOffset = (Math.sin(time * zoomSpeed) * (maxRadius - minRadius)) / 2
    const currentRadius = baseRadius + zoomOffset

    // Calculate camera position in a circular orbit with dynamic zoom
    const x = Math.cos(time * orbitSpeed) * currentRadius
    const z = Math.sin(time * orbitSpeed) * currentRadius
    const y = height + Math.sin(time * verticalSpeed) * 3

    // Update camera position
    state.camera.position.set(x, y, z)
    state.camera.lookAt(0, 0, 0)

    // Update controls target
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0)
      controlsRef.current.update()
    }
  })

  return (
    <OrbitControls ref={controlsRef} enablePan={false} enableZoom={false} enableRotate={false} autoRotate={false} />
  )
}

export function WaveCanvas({ params }: WaveCanvasProps) {
  return (
    <Canvas camera={{ position: [8, 6, 8], fov: 50 }}>
      <color attach="background" args={["#ffffff"]} />

      {/* Clean, bright lighting for hexagon */}
      <ambientLight intensity={1.0} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-5, 8, -5]} intensity={0.6} />
      <pointLight position={[0, 8, 0]} intensity={0.5} />
      <pointLight position={[4, 6, 4]} intensity={0.3} color="#10b981" />
      <pointLight position={[-4, 6, -4]} intensity={0.3} color="#059669" />

      {/* Filled Wave Hexagon */}
      <FilledWaveHexagon params={params} />

      {/* Ground plane for shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.25} />
      </mesh>

      {/* Auto Camera Controls */}
      <AutoCamera />
    </Canvas>
  )
}
