import { motion } from "framer-motion";
import { projects } from "../constants/projects";

export function Projects() {
  return (
    <section id="work" className="py-32 px-12 md:px-24 relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24">
          <p className="text-[10px] uppercase tracking-[0.8em] text-neutral-600 mb-6 font-bold">
            Selected Work
          </p>
          <h2 className="text-8xl md:text-[10rem] font-black tracking-tighter text-white italic text-left">
            Projects.
          </h2>
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative w-full"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="aspect-video bg-[#0a0a0a] relative overflow-hidden">
                {/* Background Label */}
                <div
                  className="absolute inset-0 flex items-center justify-start pl-8 md:pl-12"
                  style={{ fontSize: "12vw", fontWeight: 900, color: "rgba(255,255,255,0.015)", whiteSpace: "nowrap" }}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.3 }}
                    transition={{ duration: 0.5 }}
                    className="origin-left"
                  >
                    {project.backgroundLabel}
                  </motion.div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-12 md:p-20 flex flex-col justify-end">
                  <div className="flex gap-4 mb-8 flex-wrap">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-4 py-2 bg-[#b93d27]/10 border border-[#b93d27]/30 text-[#b93d27] uppercase tracking-widest font-bold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-5xl md:text-7xl font-bold text-white mb-6 text-left">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 max-w-2xl text-xl mb-10 leading-relaxed text-left">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    className="w-fit text-[12px] font-black tracking-[0.4em] uppercase text-white border-b-2 border-[#b93d27] pb-2 hover:text-[#b93d27] transition-colors"
                  >
                    {project.linkText}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
