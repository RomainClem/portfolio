import { Markdown } from "@/components/ui/Markdown";
import heroContent from "../../../pages/hero.md?raw";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl">
        <Markdown content={heroContent} />
      </div>
    </section>
  );
}
