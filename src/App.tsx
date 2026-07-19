import { Routes, Route } from "react-router"
import { Header } from "./components/layout"
import { SquiggleFrame } from "./components/ui/SquiggleFrame"
import { HomePage } from "./pages/HomePage"
import { ProjectsPage } from "./pages/ProjectsPage"
import { AboutPage } from "./pages/AboutPage"
import { BlogListPage } from "./pages/BlogListPage"
import { BlogPostPage } from "./pages/BlogPostPage"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SquiggleFrame />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
