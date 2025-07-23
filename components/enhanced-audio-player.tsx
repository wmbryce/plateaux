"use client"

import { useRef, useState, useEffect } from "react"

interface VolumeLevel {
  value: number
  label: string
  circles: number
}

const VOLUME_LEVELS: VolumeLevel[] = [
  { value: 0, label: "Muted", circles: 0 },
  { value: 0.25, label: "Quiet", circles: 1 },
  { value: 0.5, label: "Medium", circles: 2 },
  { value: 0.75, label: "Loud", circles: 3 },
  { value: 1.0, label: "Max", circles: 4 },
]

export function EnhancedAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentVolumeIndex, setCurrentVolumeIndex] = useState(2) // Start at medium
  const [isLoaded, setIsLoaded] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const currentVolume = VOLUME_LEVELS[currentVolumeIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleCanPlay = () => setIsLoaded(true)
    const handleEnded = () => setIsPlaying(false)
    const handleError = () => console.error("Audio failed to load")

    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    // Set initial volume
    audio.volume = currentVolume.value

    return () => {
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = currentVolume.value
    }
  }, [currentVolume.value])

  const toggleVolumeLevel = async () => {
    if (!audioRef.current || !isLoaded) return

    // Cycle to next volume level
    const nextIndex = (currentVolumeIndex + 1) % VOLUME_LEVELS.length
    setCurrentVolumeIndex(nextIndex)

    const nextVolume = VOLUME_LEVELS[nextIndex]

    try {
      if (nextVolume.value > 0 && !isPlaying) {
        // Start playing if we're unmuting and not already playing
        await audioRef.current.play()
        setIsPlaying(true)
      } else if (nextVolume.value === 0 && isPlaying) {
        // Pause if muting
        audioRef.current.pause()
        setIsPlaying(false)
      }
    } catch (error) {
      console.error("Audio playback failed:", error)
    }

    // Show tooltip briefly when changing volume
    setShowTooltip(true)
    setTimeout(() => setShowTooltip(false), 1500)
  }

  const HornIcon = () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-800"
    >
      {/* Horn/Speaker body */}
      <path
        d="M4 10v8h4l6 6V4l-6 6H4z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Horn flare */}
      <path d="M14 4v20l6-6V10l-6-6z" fill="currentColor" opacity="0.6" />
      {/* Sound waves indicator when playing */}
      {isPlaying && currentVolume.value > 0 && (
        <g className="animate-pulse">
          <circle cx="21" cy="14" r="1" fill="currentColor" opacity="0.8" />
          <circle cx="23" cy="14" r="0.5" fill="currentColor" opacity="0.6" />
        </g>
      )}
    </svg>
  )

  const VolumeSemiCircles = () => {
    const circles = []
    const centerX = 14
    const centerY = 14
    const baseRadius = 32
    const spacing = 8

    for (let i = 0; i < 4; i++) {
      const isActive = i < currentVolume.circles
      const radius = baseRadius + i * spacing
      const startAngle = -45 // degrees
      const endAngle = 45 // degrees

      // Convert to radians
      const startRad = (startAngle * Math.PI) / 180
      const endRad = (endAngle * Math.PI) / 180

      // Calculate arc path
      const x1 = centerX + radius * Math.cos(startRad)
      const y1 = centerY + radius * Math.sin(startRad)
      const x2 = centerX + radius * Math.cos(endRad)
      const y2 = centerY + radius * Math.sin(endRad)

      circles.push(
        <path
          key={i}
          d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className={`transition-all duration-300 ${
            isActive ? "opacity-100 stroke-gray-800" : "opacity-15 stroke-gray-400"
          }`}
        />,
      )
    }

    return (
      <svg
        width="100"
        height="28"
        viewBox="0 0 100 28"
        className="absolute left-8 top-0 text-gray-800 pointer-events-none"
      >
        {circles}
      </svg>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-30">
      <audio ref={audioRef} loop preload="auto">
        <source src="/soundtrack.mp3" type="audio/mpeg" />
        <source src="/soundtrack.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      <div className="relative group">
        <button
          onClick={toggleVolumeLevel}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          disabled={!isLoaded}
          className={`
            relative bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-lg 
            border border-gray-200/50
            hover:bg-white hover:shadow-xl transition-all duration-300 
            ${!isLoaded ? "opacity-50 cursor-not-allowed" : "hover:scale-110 cursor-pointer"}
            ${isPlaying && currentVolume.value > 0 ? "ring-2 ring-blue-400/30 shadow-blue-100" : ""}
            ${currentVolume.value === 0 ? "grayscale" : ""}
          `}
          aria-label={`Audio: ${currentVolume.label}`}
          title={`Click to change volume (Currently: ${currentVolume.label})`}
        >
          <HornIcon />

          {/* Loading indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            </div>
          )}
        </button>

        {/* Volume semi-circles */}
        {isLoaded && <VolumeSemiCircles />}

        {/* Enhanced tooltip */}
        {(showTooltip || !isLoaded) && (
          <div
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 
                       bg-black/90 text-white text-xs px-3 py-2 rounded-lg
                       transition-all duration-200 pointer-events-none whitespace-nowrap
                       shadow-lg border border-gray-600"
            style={{ fontFamily: 'Monaco, "Lucida Console", "Courier New", monospace' }}
          >
            {!isLoaded ? (
              "Loading audio..."
            ) : (
              <>
                {currentVolume.label}
                {isPlaying && currentVolume.value > 0 && <span className="text-green-400"> • Playing</span>}
                <div className="text-gray-400 text-xs mt-1">Click to cycle volume</div>
              </>
            )}
            {/* Tooltip arrow */}
            <div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 
                           border-l-4 border-r-4 border-b-4 border-transparent border-b-black/90"
            />
          </div>
        )}
      </div>
    </div>
  )
}
