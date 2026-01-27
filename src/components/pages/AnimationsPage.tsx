import { BadmintonCSS, BadmintonThree, BadmintonCanvas } from "@/components/animations";

/**
 * Animations showcase page featuring 3 different approaches to
 * animating badminton rackets hitting a shuttlecock
 */
export function AnimationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Badminton Animation Showcase
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Three different approaches to creating 3D badminton animations: 
          pure CSS transforms, Three.js WebGL, and HTML Canvas with custom projection.
        </p>
      </header>

      {/* Animations Grid */}
      <main className="max-w-6xl mx-auto px-6 pb-16 space-y-16">
        {/* CSS Animation */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cyan-400" />
            <h2 className="text-2xl font-semibold">1. Pure CSS 3D Animation</h2>
          </div>
          <p className="text-slate-400 ml-6">
            Uses CSS <code className="text-cyan-300 bg-slate-700/50 px-2 py-0.5 rounded">transform</code>, 
            <code className="text-cyan-300 bg-slate-700/50 px-2 py-0.5 rounded ml-1">perspective</code>, and 
            <code className="text-cyan-300 bg-slate-700/50 px-2 py-0.5 rounded ml-1">@keyframes</code> for 
            hardware-accelerated 3D transforms. No JavaScript animation libraries needed.
          </p>
          <div className="ml-6">
            <BadmintonCSS />
          </div>
          <div className="ml-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h3 className="font-medium text-cyan-300 mb-2">Techniques Used:</h3>
            <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
              <li><code className="text-slate-300">perspective</code> and <code className="text-slate-300">perspective-origin</code> for 3D depth</li>
              <li><code className="text-slate-300">transform-style: preserve-3d</code> for nested 3D transforms</li>
              <li><code className="text-slate-300">rotateX/Y/Z</code> and <code className="text-slate-300">translateZ</code> for 3D positioning</li>
              <li>CSS <code className="text-slate-300">@keyframes</code> for smooth animation loops</li>
            </ul>
          </div>
        </section>

        {/* Three.js Animation */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-purple-400" />
            <h2 className="text-2xl font-semibold">2. Three.js WebGL Animation</h2>
          </div>
          <p className="text-slate-400 ml-6">
            Full 3D scene rendered with <code className="text-purple-300 bg-slate-700/50 px-2 py-0.5 rounded">Three.js</code>. 
            Features real 3D geometry, lighting with shadows, and camera-based perspective.
          </p>
          <div className="ml-6">
            <BadmintonThree />
          </div>
          <div className="ml-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h3 className="font-medium text-purple-300 mb-2">Techniques Used:</h3>
            <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
              <li><code className="text-slate-300">THREE.PerspectiveCamera</code> for realistic 3D projection</li>
              <li><code className="text-slate-300">THREE.MeshStandardMaterial</code> for PBR-like rendering</li>
              <li>Shadow mapping with <code className="text-slate-300">PCFSoftShadowMap</code></li>
              <li>Custom 3D geometry using <code className="text-slate-300">ExtrudeGeometry</code> and primitives</li>
              <li>Real-time animation via <code className="text-slate-300">requestAnimationFrame</code></li>
            </ul>
          </div>
        </section>

        {/* Canvas Animation */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-pink-400" />
            <h2 className="text-2xl font-semibold">3. HTML Canvas 3D Projection</h2>
          </div>
          <p className="text-slate-400 ml-6">
            Custom 3D engine using 2D <code className="text-pink-300 bg-slate-700/50 px-2 py-0.5 rounded">Canvas API</code> with 
            manual perspective projection math. Demonstrates how 3D rendering works under the hood.
          </p>
          <div className="ml-6">
            <BadmintonCanvas />
          </div>
          <div className="ml-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h3 className="font-medium text-pink-300 mb-2">Techniques Used:</h3>
            <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
              <li>Manual perspective projection: <code className="text-slate-300">scale = focalLength / (focalLength + z)</code></li>
              <li>Painter's algorithm (back-to-front rendering) for depth sorting</li>
              <li>Canvas 2D drawing primitives (<code className="text-slate-300">ellipse</code>, <code className="text-slate-300">arc</code>, gradients)</li>
              <li>DPI-aware canvas scaling for sharp rendering on Retina displays</li>
            </ul>
          </div>
        </section>

        {/* Comparison */}
        <section className="p-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl border border-slate-600">
          <h2 className="text-xl font-semibold mb-4">Comparison Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left py-2 pr-4">Approach</th>
                  <th className="text-left py-2 px-4">Complexity</th>
                  <th className="text-left py-2 px-4">Performance</th>
                  <th className="text-left py-2 px-4">Best For</th>
                </tr>
              </thead>
              <tbody className="text-slate-400">
                <tr className="border-b border-slate-700/50">
                  <td className="py-3 pr-4 font-medium text-cyan-300">CSS 3D</td>
                  <td className="py-3 px-4">Low</td>
                  <td className="py-3 px-4">Excellent (GPU-accelerated)</td>
                  <td className="py-3 px-4">Simple UI animations, transforms</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="py-3 pr-4 font-medium text-purple-300">Three.js</td>
                  <td className="py-3 px-4">Medium</td>
                  <td className="py-3 px-4">Very Good (WebGL)</td>
                  <td className="py-3 px-4">Complex 3D scenes, games</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-pink-300">Canvas 2D</td>
                  <td className="py-3 px-4">High</td>
                  <td className="py-3 px-4">Good (CPU-bound)</td>
                  <td className="py-3 px-4">Custom rendering, learning</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-700/50 text-center text-slate-500 text-sm">
        <p>Built with React, Tailwind CSS, and Three.js</p>
      </footer>
    </div>
  );
}

export default AnimationsPage;
