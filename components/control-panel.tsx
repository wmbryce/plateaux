"use client"

import { useState } from "react"

export interface WaveParams {
  primarySpeed: number
  primaryAmplitude: number
  primaryFrequency: number
  secondarySpeed: number
  secondaryAmplitude: number
  secondaryFrequency: number
  tertiarySpeed: number
  tertiaryAmplitude: number
  tertiaryFrequency: number
  rippleSpeed: number
  rippleAmplitude: number
  rippleFrequency: number
  rotationSpeed: number
}

interface ControlPanelProps {
  params: WaveParams
  setParams: (params: WaveParams) => void
}

export function ControlPanel({ params, setParams }: ControlPanelProps) {
  const [isOpen, setIsOpen] = useState(true)

  const updateParam = (key: keyof WaveParams, value: number) => {
    setParams({ ...params, [key]: value })
  }

  const resetParams = () => {
    setParams({
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
  }

  const presetPatterns = {
    honeycomb: {
      primarySpeed: 1.2,
      primaryAmplitude: 0.6,
      primaryFrequency: 2.0,
      secondarySpeed: 1.8,
      secondaryAmplitude: 0.4,
      secondaryFrequency: 6.0,
      tertiarySpeed: 0.9,
      tertiaryAmplitude: 0.3,
      tertiaryFrequency: 1.5,
      rippleSpeed: 3.5,
      rippleAmplitude: 0.25,
      rippleFrequency: 2.5,
      rotationSpeed: 0.2,
    },
    flowing: {
      primarySpeed: 2.0,
      primaryAmplitude: 1.0,
      primaryFrequency: 0.8,
      secondarySpeed: 1.5,
      secondaryAmplitude: 0.6,
      secondaryFrequency: 3.0,
      tertiarySpeed: 1.2,
      tertiaryAmplitude: 0.4,
      tertiaryFrequency: 0.9,
      rippleSpeed: 2.8,
      rippleAmplitude: 0.3,
      rippleFrequency: 1.8,
      rotationSpeed: 0.4,
    },
    geometric: {
      primarySpeed: 1.0,
      primaryAmplitude: 0.5,
      primaryFrequency: 1.5,
      secondarySpeed: 3.0,
      secondaryAmplitude: 0.8,
      secondaryFrequency: 6.0,
      tertiarySpeed: 0.6,
      tertiaryAmplitude: 0.2,
      tertiaryFrequency: 0.5,
      rippleSpeed: 4.0,
      rippleAmplitude: 0.15,
      rippleFrequency: 3.0,
      rotationSpeed: 0.1,
    },
    organic: {
      primarySpeed: 0.8,
      primaryAmplitude: 1.2,
      primaryFrequency: 0.6,
      secondarySpeed: 1.3,
      secondaryAmplitude: 0.5,
      secondaryFrequency: 2.5,
      tertiarySpeed: 1.8,
      tertiaryAmplitude: 0.7,
      tertiaryFrequency: 1.2,
      rippleSpeed: 2.5,
      rippleAmplitude: 0.4,
      rippleFrequency: 1.5,
      rotationSpeed: 0.6,
    },
  }

  return (
    <div
      className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-sm z-10"
      style={{ fontFamily: 'Monaco, "Lucida Console", "Courier New", monospace' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Hexagon Wave Controls</h3>
        <div className="flex gap-2">
          <button
            onClick={resetParams}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
          >
            {isOpen ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {/* Preset Patterns */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700 border-b pb-1">Preset Patterns</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(presetPatterns).map(([name, preset]) => (
                <button
                  key={name}
                  onClick={() => setParams(preset)}
                  className="px-3 py-1 bg-emerald-500 text-white rounded text-sm hover:bg-emerald-600 transition-colors capitalize"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Wave */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700 border-b pb-1">Primary Wave (Radial)</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <label className="flex items-center justify-between">
                Speed: {params.primarySpeed.toFixed(1)}
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={params.primarySpeed}
                  onChange={(e) => updateParam("primarySpeed", Number.parseFloat(e.target.value))}
                  className="w-24"
                />
              </label>
              <label className="flex items-center justify-between">
                Amplitude: {params.primaryAmplitude.toFixed(1)}
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={params.primaryAmplitude}
                  onChange={(e) => updateParam("primaryAmplitude", Number.parseFloat(e.target.value))}
                  className="w-24"
                />
              </label>
              <label className="flex items-center justify-between">
                Frequency: {params.primaryFrequency.toFixed(1)}
                <input
                  type="range"
                  min="0.1"
                  max="4"
                  step="0.1"
                  value={params.primaryFrequency}
                  onChange={(e) => updateParam("primaryFrequency", Number.parseFloat(e.target.value))}
                  className="w-24"
                />
              </label>
            </div>
          </div>

          {/* Secondary Wave */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700 border-b pb-1">Secondary Wave (Angular)</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <label className="flex items-center justify-between">
                Speed: {params.secondarySpeed.toFixed(1)}
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={params.secondarySpeed}
                  onChange={(e) => updateParam("secondarySpeed", Number.parseFloat(e.target.value))}
                  className="w-24"
                />
              </label>
              <label className="flex items-center justify-between">
                Amplitude: {params.secondaryAmplitude.toFixed(1)}
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={params.secondaryAmplitude}
                  onChange={(e) => updateParam("secondaryAmplitude", Number.parseFloat(e.target.value))}
                  className="w-24"
                />
              </label>
              <label className="flex items-center justify-between">
                Frequency: {params.secondaryFrequency.toFixed(1)}
                <input
                  type="range"
                  min="0.1"
                  max="8"
                  step="0.1"
                  value={params.secondaryFrequency}
                  onChange={(e) => updateParam("secondaryFrequency", Number.parseFloat(e.target.value))}
                  className="w-24"
                />
              </label>
            </div>
          </div>

          {/* Tertiary Wave */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700 border-b pb-1">Tertiary Wave (Combined)</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <label className="flex items-center justify-between">
                Speed: {params.tertiarySpeed.toFixed(1)}
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={params.tertiarySpeed}
                  onChange={(e) => updateParam("tertiarySpeed", Number.parseFloat(e.target.value))}
                  className="w-24"
                />
              </label>
              <label className="flex items-center justify-between">
                Amplitude: {params.tertiaryAmplitude.toFixed(1)}
                <input
                  type="range"
                  min="0"
                  max="1.5"
                  step="0.1"
                  value={params.tertiaryAmplitude}
                  onChange={(e) => updateParam("tertiaryAmplitude", Number.parseFloat(e.target.value))}
                  className="w-24"
                />
              </label>
              <label className="flex items-center justify-between">
                Frequency: {params.tertiaryFrequency.toFixed(1)}
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={params.tertiaryFrequency}
                  onChange={(e) => updateParam("tertiaryFrequency", Number.parseFloat(e.target.value))}
                  className="w-24"
                />
              </label>
            </div>
          </div>

          {/* Ripple Wave */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700 border-b pb-1">Ripple Wave</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <label className="flex items-center justify-between">
                Speed: {params.rippleSpeed.toFixed(1)}
                <input
                  type="range"
                  min="0.1"
                  max="8"
                  step="0.1"
                  value={params.rippleSpeed}
                  onChange={(e) => updateParam("rippleSpeed", Number.parseFloat(e.target.value))}
                  className="w-24"
                />
              </label>
              <label className="flex items-center justify-between">
                Amplitude: {params.rippleAmplitude.toFixed(1)}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={params.rippleAmplitude}
                  onChange={(e) => updateParam("rippleAmplitude", Number.parseFloat(e.target.value))}
                  className="w-24"
                />
              </label>
              <label className="flex items-center justify-between">
                Frequency: {params.rippleFrequency.toFixed(1)}
                <input
                  type="range"
                  min="0.1"
                  max="6"
                  step="0.1"
                  value={params.rippleFrequency}
                  onChange={(e) => updateParam("rippleFrequency", Number.parseFloat(e.target.value))}
                  className="w-24"
                />
              </label>
            </div>
          </div>

          {/* Rotation */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700 border-b pb-1">Rotation</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <label className="flex items-center justify-between">
                Speed: {params.rotationSpeed.toFixed(1)}
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  value={params.rotationSpeed}
                  onChange={(e) => updateParam("rotationSpeed", Number.parseFloat(e.target.value))}
                  className="w-24"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
