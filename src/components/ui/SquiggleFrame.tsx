import { useEffect, useState } from "react"
import type { CSSProperties } from "react"

// SVG rect geometry (x/y/width/height) set via CSS so calc() works;
// React's CSSProperties doesn't know the SVG geometry properties, hence the cast.
const rectStyle = {
  stroke: "var(--faint)",
  x: "5px",
  y: "5px",
  width: "calc(100% - 10px)",
  height: "calc(100% - 10px)",
} as CSSProperties

// Each seed is a different wobble of the same line; cycling them gives the
// frame a hand-drawn "boiling" effect. Starts on the design's seed 7. A long
// cycle keeps the loop from reading as repetitive.
const seeds = [7, 4, 27, 11, 33, 52, 68, 85, 13, 19]

export function SquiggleFrame() {
  const [seedIndex, setSeedIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(
      () => setSeedIndex((i) => (i + 1) % seeds.length),
      500
    )
    return () => clearInterval(id)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-2 z-60 sm:inset-3"
    >
      {/* key forces a remount per seed: Chromium doesn't repaint filtered
          elements when only a filter primitive attribute (seed) mutates */}
      <svg
        key={seeds[seedIndex]}
        width="100%"
        height="100%"
        className="block overflow-visible"
      >
        <filter id="squiggle-frame" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="2"
            seed={seeds[seedIndex]}
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" />
        </filter>
        <rect
          fill="none"
          strokeWidth="1.5"
          rx="24"
          strokeDasharray="8 6"
          filter="url(#squiggle-frame)"
          style={rectStyle}
        />
      </svg>
    </div>
  )
}
