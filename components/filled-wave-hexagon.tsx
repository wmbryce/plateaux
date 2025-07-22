"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import type { WaveParams } from "./control-panel"

interface FilledWaveHexagonProps {
  params: WaveParams
}

export function FilledWaveHexagon({ params }: FilledWaveHexagonProps) {
  const meshRef = useRef<THREE.Group>(null)
  const radius = 3.5
  const spacing = 0.16
  const circlesPerEdge = 8

  // Create positions for filled hexagon
  const positions = useMemo(() => {
    const pos = []
    const sides = 6

    // Generate hexagon vertices
    const vertices = []
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2 // Start from top
      vertices.push([Math.cos(angle) * radius, Math.sin(angle) * radius])
    }

    // Create the 6 edges of the hexagon
    const edges = []
    for (let i = 0; i < sides; i++) {
      const start = vertices[i]
      const end = vertices[(i + 1) % sides]
      edges.push([start, end])
    }

    // Add circles along each edge
    edges.forEach((edge, edgeIndex) => {
      const [start, end] = edge
      for (let i = 0; i < circlesPerEdge; i++) {
        const t = i / (circlesPerEdge - 1)
        const x = start[0] + (end[0] - start[0]) * t
        const z = start[1] + (end[1] - start[1]) * t

        const distanceFromCenter = Math.sqrt(x * x + z * z)
        const angleFromCenter = Math.atan2(z, x)
        pos.push([x, 0, z, distanceFromCenter, angleFromCenter, `edge-${edgeIndex}-${i}`])
      }
    })

    // Function to check if point is inside hexagon
    const isInsideHexagon = (x: number, z: number) => {
      // Use point-in-polygon algorithm for hexagon
      let inside = false
      for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        const xi = vertices[i][0],
          zi = vertices[i][1]
        const xj = vertices[j][0],
          zj = vertices[j][1]

        if (zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) {
          inside = !inside
        }
      }
      return inside
    }

    // Generate grid and filter points inside hexagon
    const gridSize = Math.ceil((radius * 2) / spacing)
    for (let i = -gridSize; i <= gridSize; i++) {
      for (let j = -gridSize; j <= gridSize; j++) {
        const x = i * spacing
        const z = j * spacing

        if (isInsideHexagon(x, z)) {
          const distanceFromCenter = Math.sqrt(x * x + z * z)
          const angleFromCenter = Math.atan2(z, x)

          // Check if this position is too close to an edge circle
          let tooClose = false
          for (const edgePos of pos) {
            const dx = x - edgePos[0]
            const dz = z - edgePos[2]
            if (Math.sqrt(dx * dx + dz * dz) < spacing * 0.65) {
              tooClose = true
              break
            }
          }

          if (!tooClose) {
            pos.push([x, 0, z, distanceFromCenter, angleFromCenter, "interior"])
          }
        }
      }
    }

    return pos
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime

    meshRef.current.children.forEach((child, index) => {
      const [baseX, baseY, baseZ, distanceFromCenter, angleFromCenter] = positions[index]

      // Create wave patterns using adjustable parameters
      const primaryWave =
        Math.sin(time * params.primarySpeed + distanceFromCenter * params.primaryFrequency) * params.primaryAmplitude
      const secondaryWave =
        Math.cos(time * params.secondarySpeed + angleFromCenter * params.secondaryFrequency) * params.secondaryAmplitude
      const tertiaryWave =
        Math.sin(time * params.tertiarySpeed + distanceFromCenter * params.tertiaryFrequency + angleFromCenter * 1.5) *
        params.tertiaryAmplitude
      const rippleWave =
        Math.sin(time * params.rippleSpeed + distanceFromCenter * params.rippleFrequency) * params.rippleAmplitude

      // Add hexagon-specific wave patterns
      const hexagonWave = Math.sin(time * 1.6 + angleFromCenter * 6) * 0.3 // 6-fold symmetry
      const concentricWave = Math.sin(time * 2.2 + distanceFromCenter * 3) * 0.2 // Concentric rings

      // Combine waves for smooth surface movement
      const y = primaryWave + secondaryWave + tertiaryWave + rippleWave + hexagonWave + concentricWave

      child.position.set(baseX, y, baseZ)

      // Adjustable rotation with hexagon-specific patterns
      child.rotation.y = time * params.rotationSpeed + angleFromCenter * 0.5
      child.rotation.x = Math.sin(time * 0.7 + distanceFromCenter * 0.9) * 0.12
      child.rotation.z = Math.sin(time * 0.5 + angleFromCenter * 6) * 0.06 // Hexagon rotation
    })
  })

  return (
    <group ref={meshRef}>
      {positions.map((pos, index) => (
        <mesh key={index} position={[pos[0], pos[1], pos[2]]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      ))}
    </group>
  )
}
