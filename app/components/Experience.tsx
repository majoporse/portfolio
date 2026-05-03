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
    <section id="experience" className="py-40 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold italic text-white mb-16">
          Timeline
        </h2>
        <div className="space-y-12 border-l border-white/5 pl-8">
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
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <span className="text-[10px] font-bold text-[#b93d27] tracking-widest">
        {year}
      </span>
      <h3 className="text-2xl font-bold text-white mt-2">
        {title} / {role}
      </h3>
    </motion.div>
  );
}
