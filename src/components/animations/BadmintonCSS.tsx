import { useState } from "react";

/**
 * Pure CSS 3D Animation of badminton rackets hitting a shuttlecock
 * Uses CSS transforms, keyframes, and perspective for 3D effect
 */
export function BadmintonCSS() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-b from-sky-200 to-sky-400 rounded-xl overflow-hidden">
      {/* 3D Scene Container */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Court floor */}
        <div
          className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-green-700 to-green-500"
          style={{
            transform: "rotateX(60deg) translateZ(-100px)",
            transformOrigin: "bottom center",
          }}
        />

        {/* Net */}
        <div
          className="absolute w-2 h-40 bg-white/80"
          style={{
            transform: "translateZ(0px)",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,rgba(0,0,0,0.2)_4px,rgba(0,0,0,0.2)_8px)]" />
        </div>

        {/* Left Racket */}
        <div
          className="absolute left-[15%]"
          style={{
            animation: isPlaying ? "swingLeft 1.2s ease-in-out infinite" : "none",
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
          }}
        >
          <Racket side="left" />
        </div>

        {/* Right Racket */}
        <div
          className="absolute right-[15%]"
          style={{
            animation: isPlaying ? "swingRight 1.2s ease-in-out infinite" : "none",
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
          }}
        >
          <Racket side="right" />
        </div>

        {/* Shuttlecock */}
        <div
          className="absolute"
          style={{
            animation: isPlaying ? "shuttleMove 1.2s ease-in-out infinite" : "none",
            transformStyle: "preserve-3d",
          }}
        >
          <Shuttlecock />
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 rounded-lg shadow-lg text-sm font-medium hover:bg-white transition-colors"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes swingLeft {
          0%, 100% {
            transform: rotateY(-30deg) rotateZ(-45deg) translateX(-20px);
          }
          40%, 50% {
            transform: rotateY(20deg) rotateZ(15deg) translateX(80px);
          }
        }

        @keyframes swingRight {
          0%, 100% {
            transform: rotateY(30deg) rotateZ(45deg) translateX(20px);
          }
          40%, 50% {
            transform: rotateY(-20deg) rotateZ(-15deg) translateX(-80px);
          }
        }

        @keyframes shuttleMove {
          0%, 5% {
            transform: translateX(-150px) translateY(-20px) translateZ(50px) rotateY(180deg) rotateZ(-30deg);
          }
          45%, 55% {
            transform: translateX(150px) translateY(-60px) translateZ(-50px) rotateY(0deg) rotateZ(30deg);
          }
          95%, 100% {
            transform: translateX(-150px) translateY(-20px) translateZ(50px) rotateY(180deg) rotateZ(-30deg);
          }
        }

        @keyframes shuttleSpin {
          from { transform: rotateX(0deg); }
          to { transform: rotateX(360deg); }
        }
      `}</style>
    </div>
  );
}

function Racket({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";

  return (
    <div
      className="relative"
      style={{
        transformStyle: "preserve-3d",
        transform: isLeft ? "rotateY(20deg)" : "rotateY(-20deg)",
      }}
    >
      {/* Handle */}
      <div
        className="absolute w-3 h-28 rounded-full"
        style={{
          background: "linear-gradient(90deg, #8B4513, #A0522D, #8B4513)",
          top: "60px",
          left: "50%",
          marginLeft: "-6px",
          boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          transform: "translateZ(5px)",
        }}
      />

      {/* Racket Head Frame */}
      <div
        className="relative w-24 h-28 rounded-full border-[6px]"
        style={{
          borderColor: "#1a1a1a",
          background: "transparent",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.2), 2px 2px 8px rgba(0,0,0,0.3)",
          transform: "translateZ(10px)",
        }}
      >
        {/* String pattern - horizontal */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-[1px] bg-white/60"
            style={{
              top: `${12 + i * 12}%`,
              left: 0,
            }}
          />
        ))}
        {/* String pattern - vertical */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-[1px] bg-white/60"
            style={{
              left: `${12 + i * 12}%`,
              top: 0,
            }}
          />
        ))}
      </div>

      {/* Throat */}
      <div
        className="absolute w-6 h-4"
        style={{
          background: "#1a1a1a",
          top: "100px",
          left: "50%",
          marginLeft: "-12px",
          clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
          transform: "translateZ(8px)",
        }}
      />
    </div>
  );
}

function Shuttlecock() {
  return (
    <div
      className="relative"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Cork base */}
      <div
        className="w-6 h-6 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, #f5f5dc, #daa520, #8b7355)",
          boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          transform: "translateZ(5px)",
        }}
      />

      {/* Feathers */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-10"
          style={{
            background: "linear-gradient(to top, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
            top: "-35px",
            left: "50%",
            marginLeft: "-6px",
            transformOrigin: "bottom center",
            transform: `rotateY(${i * 45}deg) rotateX(-15deg) translateZ(3px)`,
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
            boxShadow: "0 0 2px rgba(0,0,0,0.2)",
          }}
        />
      ))}
    </div>
  );
}

export default BadmintonCSS;
