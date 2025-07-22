"use client"

import { useState } from "react"
import { ControlPanel, type WaveParams } from "../components/control-panel"
import { WaveCanvas } from "../components/wave-canvas"
import { PageTitle } from "../components/page-title"
import { BottomMenu } from "../components/bottom-menu"

export default function Page() {
  const [params, setParams] = useState<WaveParams>({
    primarySpeed: 1.5,
    primaryAmplitude: 0.8,
    primaryFrequency: 1.2,
    secondarySpeed: 2,
    secondaryAmplitude: 0.4,
    secondaryFrequency: 2,
    tertiarySpeed: 0.8,
    tertiaryAmplitude: 0.3,
    tertiaryFrequency: 0.6,
    rippleSpeed: 3,
    rippleAmplitude: 0.2,
    rippleFrequency: 2,
    rotationSpeed: 0.3,
  })

  return (
    <div
      className="w-full h-screen bg-white relative"
      style={{ fontFamily: 'Monaco, "Lucida Console", "Courier New", monospace' }}
    >
      <ControlPanel params={params} setParams={setParams} />
      <PageTitle />
      <WaveCanvas params={params} />
      <BottomMenu />
    </div>
  )
}
