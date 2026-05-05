import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useInView,
} from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const categories = [
  {
    title: "C#",
    skills: [".NET", "ASP.NET MVC", "Entity Framework", "MediatR", "Wolverine"],
  },
  {
    title: "Python",
    skills: ["FastAPI", "Django", "PyTorch Lightning", "MLflow", "Pydantic"],
  },
  { title: "Rust", skills: ["Actix-web", "Diesel", "Sqlx", "Dioxus"] },
  {
    title: "TypeScript",
    skills: ["React", "JavaScript", "jQuery", "Bootstrap"],
  },
  { title: "Java", skills: ["Spring", "Quarkus", "Hibernate"] },
  {
    title: "DevOps",
    skills: ["Docker", "Kubernetes", "Terraform", "Helm", "GitHub Pipelines"],
  },
  { title: "Cloud", skills: ["AWS", "Azure", "Azure Blob Storage", "MinIO"] },
  {
    title: "Data",
    skills: ["PostgreSQL", "MongoDB", "SQLite", "Redis", "Kafka"],
  },
  {
    title: "Frontend",
    skills: ["React", "Material-UI", "Leaflet-JS", "HTML/CSS"],
  },
  {
    title: "Tools",
    skills: ["Figma", "Miro", "Linux", "NeoVim", "Vite", "Gradle", "Maven"],
  },
];

const ITEM_WIDTH = 320;
const GAP = 16;
const SPEED = 40;

export function Skills() {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ref for the viewport trigger
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const totalWidth = categories.length * (ITEM_WIDTH + GAP);

  useAnimationFrame((_, delta) => {
    if (isDragging) return;
    const current = x.get();
    const next = current - (delta / 1000) * SPEED;
    // Infinite loop math
    x.set(next % totalWidth);
  });

  const doubled = [...categories, ...categories];

  return (
    <div id="skills" ref={sectionRef}>
      <section className="relative overflow-hidden">
        <SectionHeader subtitle="My previous" title="Experience" />

        <div className="theme-bg-primary py-24 overflow-hidden">
          <div
            ref={containerRef}
            className="cursor-grab active:cursor-grabbing"
          >
            <motion.div
              className="flex gap-4 pl-6"
              style={{ x }}
              drag="x"
              dragConstraints={{ left: -totalWidth, right: 0 }}
              dragElastic={0}
              dragMomentum={false}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
            >
              {doubled.map((cat, index) => (
                <motion.div
                  key={`${cat.title}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: (index % categories.length) * 0.1 + 0.2,
                    ease: [0.16, 1, 0.3, 1], // Custom "expo" ease for a sharp, pointy feel
                  }}
                  className="flex-shrink-0 flex flex-col border-b theme-border-subtle"
                  style={{ width: ITEM_WIDTH }}
                >
                  <div className="flex items-end justify-between pb-3 mb-3 border-b theme-border-subtle">
                    <h3 className="text-lg font-bold theme-text-primary leading-none">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {cat.skills.map((skill, sIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay:
                            (index % categories.length) * 0.1 + sIndex * 0.05,
                        }}
                        className="text-sm theme-text-muted"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
