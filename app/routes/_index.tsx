import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Projects } from "../components/Projects";
import { Skills } from "../components/Skills";
import { Experience } from "../components/Experience";
import { Footer } from "../components/Footer";
import { ScrollProgress } from "../components/ScrollProgress";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mário Hatalčík | Full-stack Developer" },
    { name: "description", content: "Full-stack developer portfolio showcasing projects and experience" },
  ];
}

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Footer />
      </main>
    </>
  );
}
