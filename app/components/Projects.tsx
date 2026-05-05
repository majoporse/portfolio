import { motion, useInView, useMotionValue } from "framer-motion";
import { projects } from "../constants/projects";
import { useRef, useState, useEffect, useCallback } from "react";
import { SectionHeader } from "./SectionHeader";
import { Link } from "react-router";

export function Projects() {
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  // Use useCallback so we can pass it to the animation listener without re-renders
  const updateConstraints = useCallback(() => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = contentRef.current.scrollWidth;

      // The gap happens if contentWidth includes the "initial x" offset.
      // After animation, this will be the true width.
      const maxDrag = Math.min(0, containerWidth - contentWidth);

      setConstraints({ left: maxDrag, right: 0 });
    }
  }, []);

  useEffect(() => {
    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, [updateConstraints]);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div id="work">
      <section
        ref={sectionRef}
        className="min-h-[80vh] relative overflow-hidden flex flex-col justify-center"
      >
        <SectionHeader subtitle="My favourite" title="Projects" />
        <div className="my-6"></div>

        <div
          ref={containerRef}
          className="w-full overflow-hidden cursor-grab active:cursor-grabbing py-24 theme-bg-primary"
        >
          <motion.div
            ref={contentRef}
            // We use w-max to ensure the width is exactly the sum of its parts
            className="flex gap-8 w-max px-10"
            style={{ x: dragX }}
            drag="x"
            dragConstraints={constraints}
            dragElastic={0.05}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="shrink-0 w-80 md:w-125 block"
                initial={{ opacity: 0, y: 100 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  mass: 1,
                  delay: 0.3,
                }}
                // This is the trigger: Only the last element needs to call this
              >
                <div className="theme-border-medium py-5 h-full flex flex-col transition-shadow duration-300">
                  <div className="flex gap-3 mb-4 flex-wrap px-5">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] theme-text-accent uppercase tracking-[0.15em]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold theme-text-primary mb-4 px-5">
                    {project.title}
                  </h3>
                  <p className="theme-text-muted text-base leading-relaxed mb-6 flex-grow px-5">
                    {project.description}
                  </p>
                  <div className="px-5">
                    <Link to={`/projects/${project.id}`}>
                      <span className="inline-block text-[10px] font-black tracking-[0.4em] uppercase theme-text-primary border-b-2 theme-border-accent pb-1 theme-hover-text-accent transition-colors">
                        View Project →
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
