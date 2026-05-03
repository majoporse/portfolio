import { motion, useMotionValue } from "framer-motion";
import { projects } from "../constants/projects";
import { useRef, useState, useEffect } from 'react';
import { SectionHeader } from "./SectionHeader";

export function Projects() {
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        const maxDrag = Math.min(0, containerWidth - contentWidth);
        setConstraints({ left: maxDrag, right: 0 });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  return (
    <div id="work">

      {/* ===== STRIPE CAROUSEL ===== */}
      <section className="min-h-[80vh] relative overflow-hidden flex flex-col justify-center">
        <SectionHeader subtitle="My favourite" title="Projects"/>
        <div className="my-6">
        </div>

        <div ref={containerRef} className="w-full overflow-hidden cursor-grab active:cursor-grabbing py-24 theme-bg-primary">
          <motion.div
            ref={contentRef}
            className="flex gap-8 px-12"
            style={{ x: dragX }}
            drag="x"
            dragConstraints={constraints}
            dragElastic={0.05}
          >
            {projects.map((project) => (
              <div key={project.id} className="flex-shrink-0 w-[400px] md:w-[500px]">
                <div className="theme-border-medium rounded-2xl py-5 h-full flex flex-col">
                  <div className="flex gap-3 mb-4 flex-wrap">
                    {project.skills.map((skill) => (
                      <span key={skill} className="text-[10px] theme-text-accent uppercase tracking-[0.15em]">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <h3 className={`text-3xl md:text-4xl font-bold theme-text-primary mb-4`}>
                    {project.title}
                  </h3>
                  <p className={`theme-text-muted text-base leading-relaxed mb-6 flex-grow`}>
                    {project.description}
                  </p>
                  <a href={project.link} className={`inline-block text-[10px] font-black tracking-[0.4em] uppercase theme-text-primary border-b-2 theme-border-accent pb-1 theme-hover-text-accent transition-colors`}>
                    {project.linkText}
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
