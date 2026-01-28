import { Hero } from "./components/sections";
import { GameOfLife } from "./components/ui/GameOfLife";

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <GameOfLife />
      <Hero />
    </main>
  );
}

export default App;

