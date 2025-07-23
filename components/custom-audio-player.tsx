"use client"

import { useRef, useState, useEffect } from "react"

interface VolumeLevel {
  value: number
  label: string
  circles: number
}

const VOLUME_LEVELS: VolumeLevel[] = [
  { value: 0, label: "Muted", circles: 0 },
  { value: 0.3, label: "Low", circles: 1 },
  { value: 0.6, label: "Medium", circles: 2 },
  { value: 1.0, label: "High", circles: 3 },
]

export function CustomAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentVolumeIndex, setCurrentVolumeIndex] = useState(1) // Start at low volume
  const [isLoaded, setIsLoaded] = useState(false)

  const currentVolume = VOLUME_LEVELS[currentVolumeIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleCanPlay = () => setIsLoaded(true)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("ended", handleEnded)

    // Set initial volume
    audio.volume = currentVolume.value

    return () => {
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("ended", handleEnded)
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
  }

  const HornIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-800"
    >
      {/* Horn/Speaker body */}
      <path
        d="M3 9v6h4l5 5V4l-5 5H3z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Horn cone */}
      <path d="M12 4v16l5-5V9l-5-5z" fill="currentColor" opacity="0.7" />
    </svg>
  )

  const VolumeSemiCircles = () => {
    const circles = []
    const baseRadius = 28
    const spacing = 6

    for (let i = 0; i < 3; i++) {
      const isActive = i < currentVolume.circles
      const radius = baseRadius + i * spacing

      circles.push(
        <path
          key={i}
          d={`M ${radius} 12 A ${radius - 12} ${radius - 12} 0 0 1 ${radius} 12`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-20"}`}
          transform="translate(-12, 0)"
        />,
      )
    }

    return (
      <svg width="60" height="24" viewBox="0 0 60 24" className="absolute left-6 top-0 text-gray-800">
        {circles}
      </svg>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-30">
      <audio ref={audioRef} loop preload="auto">
        <source src="/soundtrack.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="relative">
        <button
          onClick={toggleVolumeLevel}
          disabled={!isLoaded}
          className={`
            relative bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg 
            hover:bg-white/95 transition-all duration-200 
            ${!isLoaded ? "opacity-50 cursor-not-allowed" : "hover:scale-105 cursor-pointer"}
            ${isPlaying ? "ring-2 ring-blue-400 ring-opacity-50" : ""}
          `}
          aria-label={`Audio: ${currentVolume.label}`}
          title={`Click to change volume (Currently: ${currentVolume.label})`}
        >
          <HornIcon />

          {/* Loading indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            </div>
          )}
        </button>

        {/* Volume semi-circles */}
        {isLoaded && <VolumeSemiCircles />}

        {/* Status indicator */}
        <div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                     bg-black/80 text-white text-xs px-2 py-1 rounded 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     pointer-events-none whitespace-nowrap"
          style={{ fontFamily: 'Monaco, "Lucida Console", "Courier New", monospace' }}
        >
          {currentVolume.label}
          {isPlaying && currentVolume.value > 0 && " • Playing"}
        </div>
      </div>

      {/* Hover group for tooltip */}
      <style jsx>{`
        .group:hover .group-hover\\:opacity-100 {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}
