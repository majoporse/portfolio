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

        <div className="flex flex-col gap-48">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {/* Background Label - positioned behind everything */}
              <div
                className="absolute -top-12 left-0 w-full"
                style={{ fontSize: "20vw", fontWeight: 900, color: "rgba(255,255,255,0.01)", whiteSpace: "nowrap", zIndex: 0 }}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                  className="origin-left"
                >
                  {project.backgroundLabel}
                </motion.div>
              </div>

              {/* Project content */}
              <div className="relative z-10 pt-24">
                {/* Skills - no squares, just text */}
                <div className="flex gap-6 mb-8 flex-wrap">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] text-[#b93d27] uppercase tracking-[0.2em] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <h3 className="text-5xl md:text-7xl font-bold text-white mb-8 text-left">
                  {project.title}
                </h3>

                {/* Blog-style description */}
                <div className="max-w-3xl space-y-6 mb-10">
                  <p className="text-neutral-300 text-xl leading-relaxed text-left">
                    {project.description}
                  </p>
                  {project.blogContent && project.blogContent.length > 0 && (
                    <div className="space-y-4">
                      {project.blogContent.map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-neutral-400 text-lg leading-relaxed text-left"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA Link */}
                <a
                  href={project.link}
                  className="inline-block text-[11px] font-black tracking-[0.4em] uppercase text-white border-b-2 border-[#b93d27] pb-2 hover:text-[#b93d27] transition-colors"
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
