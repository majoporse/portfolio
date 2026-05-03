import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const experiences = [
  { year: "2025", title: "RationAl", subtitle: "Pipeline Maintainer", description: "Maintaining and improving CI/CD pipelines for reliable software delivery." },
  { year: "2025", title: "PuxDesign", subtitle: "Full-stack Developer", description: "Building modern web applications with focus on performance and design." },
  { year: "2024", title: "Tricentis", subtitle: "QA Automation", description: "Developed automated test frameworks ensuring software quality." },
];

const education = [
  { year: "2024–Present", title: "MSc in Software Engineering", subtitle: "Masaryk University, Brno", description: "Microservices, distributed systems, and advanced architecture." },
  { year: "2021–2024", title: "BSc in Informatics", subtitle: "Masaryk University, Brno", description: "Foundational knowledge in C, C++, and Java." },
];

export function Experience() {
  return (
    <div id="experience">
      <section className="relative overflow-hidden">
        <SectionHeader subtitle="My professional" title="History" />

        <div className="theme-bg-primary px-6 md:px-24 py-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <TimelineColumn title="Work" items={experiences} />
            <TimelineColumn title="Education" items={education} />
          </div>
        </div>
      </section>
    </div>
  );
}

function TimelineColumn({
  title,
  items,
}: {
  title: string;
  items: { year: string; title: string; subtitle: string; description: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm uppercase tracking-[0.3em] theme-text-muted font-bold mb-8">
        {title}
      </h3>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-0 bottom-0 w-[2px] theme-border-medium" />

        <div className="space-y-8">
          {items.map((item, index) => (
            <TimelineItem key={index} {...item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineItem({
  year,
  title,
  subtitle,
  description,
  index,
}: {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-12"
    >
      {/* Dot */}
      <div className="absolute left-0 top-1.5">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.15 }}
          className="w-4 h-4 rounded-full theme-bg-accent border-2 theme-border-accent relative z-10"
        />
      </div>

      <span className="text-[11px] font-bold theme-text-red tracking-[0.3em] uppercase mb-2 block">
        {year}
      </span>
      <h3 className="text-2xl md:text-3xl font-bold theme-text-primary mb-1">
        {title}
      </h3>
      <p className="text-sm theme-text-accent font-medium uppercase mb-2">
        {subtitle}
      </p>
      <p className="text-base theme-text-muted leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
