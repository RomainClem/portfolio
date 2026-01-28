import { useEffect, useRef, useCallback } from "react";

interface GameOfLifeProps {
  cellSize?: number;
  speed?: number;
  opacity?: number;
  density?: number;
}

export function GameOfLife({
  cellSize = 12,
  speed = 120,
  opacity = 0.1,
  density = 0.30,
}: GameOfLifeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<boolean[][]>([]);
  const animationRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  // Get neighbor count for a cell
  const getNeighborCount = useCallback(
    (grid: boolean[][], x: number, y: number, cols: number, rows: number) => {
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = (x + dx + cols) % cols;
          const ny = (y + dy + rows) % rows;
          if (grid[ny][nx]) count++;
        }
      }
      return count;
    },
    []
  );

  // Compute next generation
  const nextGeneration = useCallback(
    (grid: boolean[][], cols: number, rows: number) => {
      const newGrid: boolean[][] = [];
      for (let y = 0; y < rows; y++) {
        newGrid[y] = [];
        for (let x = 0; x < cols; x++) {
          const neighbors = getNeighborCount(grid, x, y, cols, rows);
          const alive = grid[y][x];
          newGrid[y][x] = alive
            ? neighbors === 2 || neighbors === 3
            : neighbors === 3;
        }
      }
      return newGrid;
    },
    [getNeighborCount]
  );

  // Create random grid
  const createRandomGrid = useCallback(
    (cols: number, rows: number, density: number): boolean[][] => {
      return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Math.random() < density)
      );
    },
    []
  );

  // Draw the grid
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, grid: boolean[][], cols: number, rows: number, cellSize: number) => {
      ctx.clearRect(0, 0, cols * cellSize, rows * cellSize);

      const style = getComputedStyle(document.documentElement);
      const foreground = style.getPropertyValue("--foreground").trim();
      ctx.fillStyle = foreground ? `oklch(${foreground})` : "#888";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (grid[y][x]) {
            ctx.fillRect(
              x * cellSize + 1,
              y * cellSize + 1,
              cellSize - 2,
              cellSize - 2
            );
          }
        }
      }
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);

      gridRef.current = createRandomGrid(cols, rows, density);
      draw(ctx, gridRef.current, cols, rows, cellSize);
    };

    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === "visible";
    };

    const animate = (timestamp: number) => {
      if (isVisibleRef.current && timestamp - lastUpdateRef.current >= speed) {
        lastUpdateRef.current = timestamp;

        const width = window.innerWidth;
        const height = window.innerHeight;
        const cols = Math.ceil(width / cellSize);
        const rows = Math.ceil(height / cellSize);

        gridRef.current = nextGeneration(gridRef.current, cols, rows);
        draw(ctx, gridRef.current, cols, rows, cellSize);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationRef.current);
    };
  }, [cellSize, speed, density, draw, nextGeneration, createRandomGrid]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity, zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
