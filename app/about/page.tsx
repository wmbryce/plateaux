"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div
      className="min-h-screen bg-white p-8"
      style={{
        fontFamily:
          'Space Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link
            href="/?hideOverlay=true"
            className="text-blue-600 hover:text-blue-800 underline text-sm"
          >
            ← Back to plateux
          </Link>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-black mb-8">
            About virginboi69
          </h1>

          <div className="space-y-4 text-gray-800 leading-relaxed">
            <p>Welcome. I'm Jacob Bryce</p>

            <p>
              This site is built with React Three Fiber, the visualization runs
              entirely in your browser using WebGL, allowing for smooth 60fps
              animations with hundreds of animated spheres.
            </p>
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Technical Details:</h2>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• React Three Fiber for 3D rendering</li>
                <li>
                  • Custom wave mathematics with multiple frequency layers
                </li>
                <li>• Hexagonal point-in-polygon algorithms</li>
                <li>• CSS backdrop-filter for text effects</li>
                <li>• Automatic camera movement and dynamic zoom</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
