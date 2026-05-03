import { motion, useDragControls, useMotionValue, useSpring } from "framer-motion";
import { projects } from "../constants/projects";
import { useState } from "react";

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const dragX = useMotionValue(0);
  const dragControls = useDragControls();
  const canvasX = useMotionValue(0);
  const canvasY = useMotionValue(0);
  const springX = useSpring(canvasX, { stiffness: 100, damping: 20 });
  const springY = useSpring(canvasY, { stiffness: 100, damping: 20 });

  return (
    <div id="work">
      {/* ===== VARIANT A: VERTICAL LIST ===== */}
      <section className="py-32 px-12 md:px-24 relative bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 pb-6 border-b border-white/10">
            <p className="text-[10px] uppercase tracking-[0.8em] text-[#b93d27] mb-2 font-bold">
              Variant A
            </p>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white italic">
              Vertical List
            </h2>
          </div>

          <div className="flex flex-col gap-48">
            {projects.map((project, index) => (
              <motion.div
                key={`vertical-${project.id}`}
                className="group relative"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="relative z-10 pt-24">
                  <div className="flex gap-6 mb-8 flex-wrap">
                    {project.skills.map((skill) => (
                      <span key={skill} className="text-[11px] text-[#b93d27] uppercase tracking-[0.2em] font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-5xl md:text-7xl font-bold text-white mb-8 text-left">
                    {project.title}
                  </h3>

                  <div className="max-w-3xl space-y-6 mb-10">
                    <p className="text-neutral-300 text-xl leading-relaxed text-left">
                      {project.description}
                    </p>
                  </div>

                  <a href={project.link} className="inline-block text-[11px] font-black tracking-[0.4em] uppercase text-white border-b-2 border-[#b93d27] pb-2 hover:text-[#b93d27] transition-colors">
                    {project.linkText}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VARIANT B: SPATIAL CANVAS ===== */}
      <section className="min-h-screen overflow-hidden relative bg-[#080808]">
        <div className="absolute top-6 left-12 z-50">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#b93d27] font-bold">
            Variant B - Drag to explore
          </p>
        </div>
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white italic">
            Spatial Canvas
          </h2>
        </div>

        <motion.div
          className="absolute inset-0"
          style={{ x: springX, y: springY }}
          drag
          dragControls={dragControls}
          dragMomentum={false}
          dragElastic={0.1}
        >
          {projects.map((project, index) => (
            <motion.div
              key={`spatial-${project.id}`}
              className="absolute"
              style={{
                left: project.position?.x || 200 + index * 300,
                top: project.position?.y || 200 + index * 200,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="relative group cursor-pointer">
                <div className="relative bg-[#0a0a0a] border border-white/5 p-8 md:p-12 min-w-[300px] md:min-w-[400px]">
                  <div className="flex gap-4 mb-4 flex-wrap">
                    {project.skills.map((skill) => (
                      <span key={skill} className="text-[10px] text-[#b93d27] uppercase tracking-[0.2em] font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== VARIANT C: MASONRY GRID ===== */}
      <section className="py-32 px-12 md:px-24 relative bg-[#050505]">
        <div className="max-w-[1800px] mx-auto">
          <div className="mb-12 pb-6 border-b border-white/10">
            <p className="text-[10px] uppercase tracking-[0.8em] text-[#b93d27] mb-2 font-bold">
              Variant C
            </p>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white italic">
              Masonry Grid
            </h2>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={`masonry-${project.id}`}
                className="break-inside-avoid mb-8 group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="bg-[#0a0a0a] border border-white/5 p-8 group-hover:border-[#b93d27]/50 transition-all duration-300">
                  <div className="flex gap-3 mb-4 flex-wrap">
                    {project.skills.map((skill) => (
                      <span key={skill} className="text-[9px] text-[#b93d27] uppercase tracking-[0.15em]">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#b93d27] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dialog Overlay */}
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-12"
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setHoveredProject(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-[#0a0a0a] border border-white/10 max-w-3xl w-full p-12"
            >
              {(() => {
                const project = projects.find(p => p.id === hoveredProject);
                if (!project) return null;
                return (
                  <>
                    <div className="flex gap-4 mb-6 flex-wrap">
                      {project.skills.map((skill) => (
                        <span key={skill} className="text-[11px] text-[#b93d27] uppercase tracking-[0.2em] font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                      {project.title}
                    </h3>
                    <div className="space-y-4 mb-8">
                      <p className="text-neutral-300 text-lg leading-relaxed">
                        {project.description}
                      </p>
                      {project.blogContent?.map((paragraph, i) => (
                        <p key={i} className="text-neutral-400 text-base leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <div className="flex gap-6">
                      <a href={project.link} className="text-[11px] font-black tracking-[0.4em] uppercase text-white border-b-2 border-[#b93d27] pb-2 hover:text-[#b93d27] transition-colors">
                        {project.linkText}
                      </a>
                      <button
                        onClick={() => setHoveredProject(null)}
                        className="text-[11px] font-black tracking-[0.4em] uppercase text-neutral-500 hover:text-white transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* ===== VARIANT D: HORIZONTAL CAROUSEL ===== */}
      <section className="min-h-screen relative overflow-hidden bg-[#080808]">
        <div className="absolute top-6 left-12 z-50">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#b93d27] font-bold">
            Variant D - Drag to navigate • {activeIndex + 1} / {projects.length}
          </p>
        </div>
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white italic">
            Horizontal Carousel
          </h2>
        </div>

        <motion.div
          className="flex h-screen items-center"
          style={{ x: dragX }}
          drag="x"
          dragConstraints={{ left: -((projects.length - 1) * window.innerWidth), right: 0 }}
          dragElastic={0.1}
          onDragEnd={(e, info) => {
            const threshold = 100;
            if (info.offset.x < -threshold && activeIndex < projects.length - 1) {
              setActiveIndex(activeIndex + 1);
            } else if (info.offset.x > threshold && activeIndex > 0) {
              setActiveIndex(activeIndex - 1);
            }
            dragX.set(-activeIndex * window.innerWidth);
          }}
        >
          {projects.map((project, index) => (
            <div key={`carousel-${project.id}`} className="min-w-full h-screen flex items-center justify-center px-12 md:px-24">
              <div className="max-w-4xl text-center">
                <div className="flex gap-4 mb-6 justify-center flex-wrap">
                  {project.skills.map((skill) => (
                    <span key={skill} className="text-[11px] text-[#b93d27] uppercase tracking-[0.2em]">
                      {skill}
                    </span>
                  ))}
                </div>
                <h3 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  {project.title}
                </h3>
                <p className="text-neutral-300 text-xl leading-relaxed max-w-2xl mx-auto mb-8">
                  {project.description}
                </p>
                <a href={project.link} className="inline-block text-[11px] font-black tracking-[0.4em] uppercase text-white border-b-2 border-[#b93d27] pb-2 hover:text-[#b93d27] transition-colors">
                  {project.linkText}
                </a>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-50">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                dragX.set(-index * window.innerWidth);
              }}
              className={`w-2 h-2 rounded-full transition-all ${index === activeIndex ? 'bg-[#b93d27] w-8' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
