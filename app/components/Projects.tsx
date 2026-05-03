import { motion, useDragControls, useMotionValue, useSpring } from "framer-motion";
import { projects } from "../constants/projects";
import { useState } from "react";

// ===== VARIANT SELECTOR =====
// Change this value to switch variants:
// 'vertical' | 'spatial' | 'masonry' | 'carousel'
const ACTIVE_VARIANT = 'vertical';

export function Projects() {
  // ===== VARIANT A: VERTICAL LIST =====
  if (ACTIVE_VARIANT === 'vertical') {
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
                {/* Background Label */}
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

  // ===== VARIANT B: SPATIAL CANVAS =====
  if (ACTIVE_VARIANT === 'spatial') {
    const dragControls = useDragControls();
    const canvasX = useMotionValue(0);
    const canvasY = useMotionValue(0);
    const springX = useSpring(canvasX, { stiffness: 100, damping: 20 });
    const springY = useSpring(canvasY, { stiffness: 100, damping: 20 });

    return (
      <section 
        id="work" 
        className="min-h-screen overflow-hidden relative cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => dragControls.start(e)}
      >
        {/* Instructions */}
        <div className="absolute top-6 left-12 z-50">
          <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-500">
            Drag to explore • Projects arranged on canvas
          </p>
        </div>

        {/* Canvas Header */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white italic">
            Projects.
          </h2>
        </div>

        {/* Canvas Container */}
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
              key={project.id}
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
                {/* Background Label */}
                <div
                  className="absolute -top-8 -left-8 opacity-[0.03]"
                  style={{ fontSize: "15vw", fontWeight: 900, whiteSpace: "nowrap" }}
                >
                  {project.backgroundLabel}
                </div>

                {/* Project Card */}
                <div className="relative bg-[#0a0a0a] border border-white/5 p-8 md:p-12 min-w-[300px] md:min-w-[400px]">
                  <div className="flex gap-4 mb-4 flex-wrap">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] text-[#b93d27] uppercase tracking-[0.2em] font-medium"
                      >
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
    );
  }

  // ===== VARIANT C: MASONRY GRID =====
  if (ACTIVE_VARIANT === 'masonry') {
    return (
      <section id="work" className="py-32 px-12 md:px-24 relative">
        <div className="max-w-[1800px] mx-auto">
          <div className="mb-24">
            <p className="text-[10px] uppercase tracking-[0.8em] text-neutral-600 mb-6 font-bold">
              Selected Work
            </p>
            <h2 className="text-8xl md:text-[10rem] font-black tracking-tighter text-white italic text-left">
              Projects.
            </h2>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="break-inside-avoid mb-8 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-[#0a0a0a] border border-white/5 p-8 group-hover:border-[#b93d27]/30 transition-colors duration-300">
                  <div
                    className="text-[8vw] font-black text-white/3 mb-6 leading-none"
                    style={{ color: "rgba(255,255,255,0.03)" }}
                  >
                    {project.backgroundLabel}
                  </div>

                  <div className="flex gap-3 mb-4 flex-wrap">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[9px] text-[#b93d27] uppercase tracking-[0.15em]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
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
      </section>
    );
  }

  // ===== VARIANT D: HORIZONTAL CAROUSEL =====
  if (ACTIVE_VARIANT === 'carousel') {
    const [activeIndex, setActiveIndex] = useState(0);
    const dragX = useMotionValue(0);

    return (
      <section id="work" className="min-h-screen relative overflow-hidden">
        {/* Header */}
        <div className="absolute top-6 left-12 z-50">
          <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-500">
            Drag to navigate • {activeIndex + 1} / {projects.length}
          </p>
        </div>

        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white italic">
            Projects.
          </h2>
        </div>

        {/* Carousel Track */}
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
            <div
              key={project.id}
              className="min-w-full h-screen flex items-center justify-center px-12 md:px-24"
            >
              <div className="max-w-4xl text-center">
                <div
                  className="text-[15vw] font-black text-white/5 mb-8 leading-none"
                  style={{ color: "rgba(255,255,255,0.02)" }}
                >
                  {project.backgroundLabel}
                </div>

                <div className="flex gap-4 mb-6 justify-center flex-wrap">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] text-[#b93d27] uppercase tracking-[0.2em]"
                    >
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

                <a
                  href={project.link}
                  className="inline-block text-[11px] font-black tracking-[0.4em] uppercase text-white border-b-2 border-[#b93d27] pb-2 hover:text-[#b93d27] transition-colors"
                >
                  {project.linkText}
                </a>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Navigation Dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-50">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                dragX.set(-index * window.innerWidth);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex ? 'bg-[#b93d27] w-8' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>
    );
  }

  // Default fallback
  return null;
}
