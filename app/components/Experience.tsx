import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const experiences = [
  {
    year: "2025",
    title: "RationAl",
    role: "Pipeline Maintainer",
  },
  {
    year: "2025",
    title: "PuxDesign",
    role: "Full-stack Developer",
  },
  {
    year: "2024",
    title: "Tricentis",
    role: "QA Automation",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-48 px-12 md:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-24">
          <p className="text-[10px] uppercase tracking-[0.8em] text-neutral-600 mb-6 font-bold">
            Professional Journey
          </p>
          <h2 className="text-8xl md:text-[10rem] font-black tracking-tighter text-white italic text-left">
            Timeline.
          </h2>
        </div>
        <div className="space-y-20">
          {experiences.map((exp, index) => (
            <ExperienceItem key={index} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ year, title, role }: { year: string; title: string; role: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.1, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-start"
    >
      <span className="text-[12px] font-bold text-[#b93d27] tracking-[0.3em] mb-4">
        {year}
      </span>
      <h3 className="text-4xl md:text-5xl font-bold text-white text-left">
        {title}
      </h3>
      <p className="text-xl text-neutral-400 mt-2 tracking-wide text-left">
        {role}
      </p>
    </motion.div>
  );
}
