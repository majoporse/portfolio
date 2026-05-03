import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const categories = [
  { title: "C#", skills: ["C#", ".NET", "ASP.NET MVC", "Entity Framework", "MediatR", "Wolverine"] },
  { title: "Python", skills: ["Python", "FastAPI", "Django", "PyTorch Lightning", "MLflow", "Pydantic"] },
  { title: "Rust", skills: ["Rust", "Actix-web", "Diesel", "Sqlx", "Dioxus"] },
  { title: "TypeScript", skills: ["TypeScript", "React", "JavaScript", "jQuery", "Bootstrap"] },
  { title: "Java", skills: ["Java", "Spring", "Quarkus", "Hibernate"] },
  { title: "DevOps", skills: ["Docker", "Kubernetes", "Terraform", "Helm", "GitHub Pipelines"] },
  { title: "Cloud", skills: ["AWS", "Azure", "Azure Blob Storage", "MinIO"] },
  { title: "Data", skills: ["PostgreSQL", "MongoDB", "SQLite", "Redis", "Kafka"] },
  { title: "Frontend", skills: ["React", "Material-UI", "Leaflet-JS", "HTML/CSS"] },
  { title: "Tools", skills: ["Figma", "Miro", "Linux", "NeoVim", "Vite", "Gradle", "Maven"] },
];

const ITEM_WIDTH = 320;
const GAP = 16;
const SPEED = 40;

export function Skills() {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalWidth = categories.length * (ITEM_WIDTH + GAP);

  useAnimationFrame((_, delta) => {
    if (isDragging) return;
    const current = x.get();
    const next = current - (delta / 1000) * SPEED;
    x.set(next % totalWidth);
  });

  const doubled = [...categories, ...categories];

  return (
    <div id="skills">
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
                <div
                  key={`${cat.title}-${index}`}
                  className="flex-shrink-0 flex flex-col border-b theme-border-subtle"
                  style={{ width: ITEM_WIDTH }}
                >
                  <div className="flex items-end justify-between pb-3 mb-3 border-b theme-border-subtle">
                    <h3 className="text-lg font-bold theme-text-primary leading-none">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {cat.skills.map((skill) => (
                      <span key={skill} className="text-sm theme-text-muted">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
