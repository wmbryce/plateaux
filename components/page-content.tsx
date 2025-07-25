"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ControlPanel, type WaveParams } from "./control-panel";
import { WaveCanvas } from "./wave-canvas";
import { PageTitle } from "./page-title";
import { BottomMenu } from "./bottom-menu";
import { AudioPlayer } from "@/components/audio-player";
import { WelcomeOverlay } from "./welcome-overlay";

export function PageContent() {
  const searchParams = useSearchParams();
  const showControls = searchParams.get("controls") === "true";

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
  });

  const [showOverlay, setShowOverlay] = useState(true);
  const audioRef = useRef<{ play: () => void } | null>(null);

  const handleOverlayDismiss = () => {
    setShowOverlay(false);
    // Try to play audio when overlay is dismissed
    if (audioRef.current && typeof audioRef.current.play === "function") {
      audioRef.current.play();
    } else {
      // fallback: dispatch a custom event for AudioPlayer to listen to
      window.dispatchEvent(new Event("play-audio"));
    }
  };

  return (
    <div
      className="w-full h-screen bg-white relative"
      style={{
        fontFamily: 'Monaco, "Lucida Console", "Courier New", monospace',
      }}
    >
      <WelcomeOverlay
        showOverlay={showOverlay}
        onDismiss={handleOverlayDismiss}
      />
      {showControls && <ControlPanel params={params} setParams={setParams} />}
      <PageTitle />
      <WaveCanvas params={params} />
      <BottomMenu />
      <AudioPlayer ref={audioRef} />
    </div>
  );
}
