"use client"

import Link from "next/link"

export function BottomMenu() {
  return (
    <div className="fixed bottom-4 right-4 z-30">
      <div
        className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4"
        style={{ fontFamily: 'Monaco, "Lucida Console", "Courier New", monospace' }}
      >
        <div className="flex flex-col items-end gap-2 text-sm">
          <div className="text-gray-800 font-bold">Jacob Bryce</div>
          <Link href="/about" className="text-blue-600 hover:text-blue-800 underline transition-colors">
            About
          </Link>
        </div>
      </div>
    </div>
  )
}
