import { useEffect, useRef } from "react"

// --- Scene constants ---
const WIDTH = 80 // grid size in characters
const HEIGHT = 38
const K1 = 100 // projection scale -- the tail tip may clip at extreme angles
const K2 = 5 // camera distance
const ASPECT = 0.55 // character cells are ~1.8x taller than wide
const B_RATE = 0.45 // second axis speed, relative to the first
const SHADES = ".,-~:;=!*#$@"

type Vec3 = [number, number, number]

function normalize([x, y, z]: Vec3): Vec3 {
  const len = Math.hypot(x, y, z)
  return [x / len, y / len, z / len]
}

const LIGHT = normalize([0.4, 0.8, -0.6]) // above, in front, slightly left

interface SurfacePoint {
  pos: Vec3
  normal: Vec3
}

// Sample the surface of an axis-aligned ellipsoid as a lat/long grid of
// points. The surface normal of an ellipsoid at a point is the unit
// direction scaled by the inverse radii -- that is what makes the shading
// follow the squashed shape instead of a plain sphere.
function ellipsoid(
  center: Vec3,
  radii: Vec3,
  uSteps: number,
  vSteps: number
): SurfacePoint[] {
  const points: SurfacePoint[] = []
  for (let i = 0; i < uSteps; i++) {
    const u = (i / uSteps) * Math.PI * 2 // longitude
    for (let j = 1; j < vSteps; j++) {
      const v = (j / vSteps) * Math.PI - Math.PI / 2 // latitude
      const x = Math.cos(v) * Math.cos(u)
      const y = Math.sin(v)
      const z = Math.cos(v) * Math.sin(u)
      points.push({
        pos: [
          center[0] + radii[0] * x,
          center[1] + radii[1] * y,
          center[2] + radii[2] * z,
        ],
        normal: normalize([x / radii[0], y / radii[1], z / radii[2]]),
      })
    }
  }
  return points
}

// A rat is just ellipsoids in a trench coat. It faces +x; y is up.
function buildRat(): SurfacePoint[] {
  const points = [
    ...ellipsoid([-0.75, 0.0, 0], [0.62, 0.62, 0.54], 48, 24), // haunches
    ...ellipsoid([0.1, 0.04, 0], [0.78, 0.53, 0.46], 48, 24), // torso
    ...ellipsoid([0.95, 0.2, 0], [0.42, 0.31, 0.29], 36, 18), // head
    ...ellipsoid([1.4, 0.1, 0], [0.26, 0.15, 0.14], 24, 12), // snout
    ...ellipsoid([0.78, 0.58, 0.24], [0.17, 0.2, 0.07], 24, 12), // ears
    ...ellipsoid([0.78, 0.58, -0.24], [0.17, 0.2, 0.07], 24, 12),
    ...ellipsoid([0.5, -0.42, 0.3], [0.14, 0.12, 0.1], 16, 8), // front feet
    ...ellipsoid([0.5, -0.42, -0.3], [0.14, 0.12, 0.1], 16, 8),
    ...ellipsoid([-0.65, -0.5, 0.34], [0.18, 0.14, 0.12], 16, 8), // hind feet
    ...ellipsoid([-0.65, -0.5, -0.34], [0.18, 0.14, 0.12], 16, 8),
  ]
  // Tail: a tapering tube of little spheres swept along a curve that
  // droops, rises, and wiggles sideways.
  for (let i = 0; i <= 60; i++) {
    const t = i / 60
    const r = 0.06 * (1 - 0.6 * t)
    points.push(
      ...ellipsoid(
        [
          -1.28 - 1.15 * t,
          -0.18 + 0.7 * t - 0.55 * t * t,
          0.3 * Math.sin(2.5 * t) * t,
        ],
        [r, r, r],
        10,
        5
      )
    )
  }
  return points
}

const RAT = buildRat()

function frame(a: number, b: number): string {
  const zBuffer = new Float32Array(WIDTH * HEIGHT).fill(Infinity)
  const screen: string[] = new Array(WIDTH * HEIGHT).fill(" ")
  const cosA = Math.cos(a)
  const sinA = Math.sin(a)
  const cosB = Math.cos(b)
  const sinB = Math.sin(b)

  for (const { pos, normal } of RAT) {
    // Rotate around the y axis by a, then around the x axis by b. Two
    // axes advancing at different speeds makes the rat tumble through
    // every orientation instead of spinning like a turntable.
    const x = pos[0] * cosA + pos[2] * sinA
    const zSpin = pos[2] * cosA - pos[0] * sinA
    const y = pos[1] * cosB - zSpin * sinB
    const z = pos[1] * sinB + zSpin * cosB

    // Perspective projection onto the character grid.
    const depth = z + K2
    const px = Math.round(WIDTH / 2 + (K1 * x) / depth)
    const py = Math.round(HEIGHT / 2 - (K1 * ASPECT * y) / depth)
    if (px < 0 || px >= WIDTH || py < 0 || py >= HEIGHT) continue

    // Z-buffer: only keep the point nearest to the camera per cell.
    const idx = py * WIDTH + px
    if (depth >= zBuffer[idx]) continue
    zBuffer[idx] = depth

    // Rotate the normal the same way, then light it. Faces pointing away
    // from the light clamp to the dimmest character, so the silhouette
    // stays solid.
    const nx = normal[0] * cosA + normal[2] * sinA
    const nzSpin = normal[2] * cosA - normal[0] * sinA
    const ny = normal[1] * cosB - nzSpin * sinB
    const nz = normal[1] * sinB + nzSpin * cosB

    const lum = nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2]
    screen[idx] = SHADES[Math.max(0, Math.floor(lum * (SHADES.length - 1)))]
  }

  const rows: string[] = []
  for (let row = 0; row < HEIGHT; row++) {
    rows.push(screen.slice(row * WIDTH, (row + 1) * WIDTH).join(""))
  }
  return rows.join("\n")
}

interface SpinningRatProps {
  speed?: number // radians per second
}

export function SpinningRat({ speed = 0.9 }: SpinningRatProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    const pre = preRef.current
    if (!pre) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pausedRef.current = true
    }

    let a = 0
    let b = 0.35 // start slightly tilted so the first frame reads well
    let last = performance.now()
    let raf = 0

    pre.textContent = frame(a, b)

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(now - last, 100) / 1000
      last = now
      if (pausedRef.current) return
      a += speed * dt
      b += speed * B_RATE * dt
      pre.textContent = frame(a, b)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [speed])

  return (
    <div className="not-prose flex justify-center">
      <pre
        ref={preRef}
        role="img"
        aria-label="ASCII art of a rat spinning in 3D"
        title="Click to pause"
        onClick={() => {
          pausedRef.current = !pausedRef.current
        }}
        className="cursor-pointer font-mono select-none"
        style={{ fontSize: "clamp(5px, 1.8vw, 13px)", lineHeight: 1.1 }}
      />
    </div>
  )
}
