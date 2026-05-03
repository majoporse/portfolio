import { motion } from "framer-motion";
import { projects } from "../constants/projects";

export function Projects() {
  return (
    <section id="work" className="py-20 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-20">
        <div className="mb-20">
          <p className="text-[10px] uppercase tracking-[0.6em] text-neutral-600 mb-4 font-bold">
            Selected Work
          </p>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white italic">
            Projects.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="group relative aspect-video bg-[#0f0f0f] rounded-lg border border-white/5 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ fontSize: "12vw", fontWeight: 900, color: "rgba(255,255,255,0.02)", whiteSpace: "nowrap" }}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.backgroundLabel}
                </motion.div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

              <div className="absolute inset-0 p-10 md:p-16 flex flex-col justify-end z-10">
                <div className="flex gap-3 mb-6 flex-wrap">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-3 py-1 bg-[#b93d27]/10 border border-[#b93d27]/20 text-[#b93d27] uppercase tracking-wider font-bold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {project.title}
                </h3>
                <p className="text-neutral-400 max-w-xl text-lg mb-8 leading-relaxed">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  className="w-fit text-[11px] font-black tracking-[0.3em] uppercase text-white border-b-2 border-[#b93d27] pb-1 hover:text-[#b93d27] transition-colors"
                >
                  {project.linkText}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
