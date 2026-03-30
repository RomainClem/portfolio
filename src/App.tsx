import { Routes, Route } from "react-router"
import { GameOfLife } from "./components/ui/GameOfLife"
import { Header, Footer } from "./components/layout"
import { HomePage } from "./pages/HomePage"
import { BlogListPage } from "./pages/BlogListPage"
import { BlogPostPage } from "./pages/BlogPostPage"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <GameOfLife />
      {/* <Header /> */}
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default App
