import type { Route } from "./+types/home";
import { Hero } from "../components/Hero";
import { Projects } from "../components/Projects";
import { Experience } from "../components/Experience";
import { Footer } from "../components/Footer";
import { ScrollProgress } from "../components/ScrollProgress";

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
        <Projects />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
