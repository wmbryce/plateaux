import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export function WelcomeOverlay({
  showOverlay,
  onDismiss,
}: {
  showOverlay: boolean;
  onDismiss: () => void;
}) {
  const searchParams = useSearchParams();
  const hideOverlay = searchParams.get("hideOverlay") === "true";
  const [isVisible, setIsVisible] = useState(true);
  const [showClickToStart, setShowClickToStart] = useState(false);

  useEffect(() => {
    if (!showOverlay) {
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }
  }, [showOverlay]);

  useEffect(() => {
    if (showOverlay) {
      setShowClickToStart(false);
      const timer = setTimeout(() => {
        setShowClickToStart(true);
      }, 2000); // 2 seconds for fade-in-welcome
      return () => clearTimeout(timer);
    }
  }, [showOverlay]);

  return (
    isVisible &&
    !hideOverlay && (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-lg transition-opacity duration-500 ${
          showOverlay ? "opacity-100" : "opacity-0 z-[-1]"
        }`}
        style={{ cursor: "pointer" }}
        onClick={onDismiss}
      >
        <div className="text-center h-[100px] flex flex-col items-center justify-start">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 fade-in-welcome">
            willkommen
          </h1>
          <p
            className={`text-base text-gray-700 animate-blink ${
              !showClickToStart && "hidden"
            }`}
          >
            Click to start
          </p>
          <style jsx global>{`
            @keyframes blink {
              0%,
              100% {
                opacity: 0;
              }
              40% {
                opacity: 1;
              }
              60% {
                opacity: 1;
              }
            }
            .animate-blink {
              animation: blink 2s ease-out infinite;
            }
            @keyframes fadeInWelcome {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            .fade-in-welcome {
              animation: fadeInWelcome 2s ease-in forwards;
            }
          `}</style>
        </div>
      </div>
    )
  );
}
