import { BrowserRouter, Routes, Route } from "react-router";
import { GameOfLife } from "./components/ui/GameOfLife";
import { Header } from "./components/layout";
import { MarkdownPage } from "./components/pages/MarkdownPage";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-background text-foreground relative">
        <GameOfLife />
        <Header />
        <Routes>
          <Route path="*" element={<MarkdownPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

