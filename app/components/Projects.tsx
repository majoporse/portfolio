import { motion, useDragControls, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projects } from "../constants/projects";
import { useState, useRef } from 'react';

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const dragX = useMotionValue(0);
  const dragControls = useDragControls();
  const canvasX = useMotionValue(0);
  const canvasY = useMotionValue(0);
  const springX = useSpring(canvasX, { stiffness: 100, damping: 20 });
  const springY = useSpring(canvasY, { stiffness: 100, damping: 20 });
  
  // Carousel state for Variant E
  const carouselDragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalWidth = projects.length * 288; // 256px card + 32px gap

  return (
    <div id="work">
      {/* ===== VARIANT A: VERTICAL LIST ===== */}
      <section className="py-32 px-12 md:px-24 relative ">
        <div className="max-w-[1400px] mx-auto">
          <div className={`mb-12 pb-6 border-b theme-border-medium`}>
            <p className="text-[10px] uppercase tracking-[0.8em] text-[#b93d27] mb-2 font-bold">
              Variant A
            </p>
            <h2 className={`text-6xl md:text-8xl font-black tracking-tighter theme-text-primary italic`}>
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

                  <h3 className={`text-5xl md:text-7xl font-bold theme-text-primary mb-8 text-left`}>
                    {project.title}
                  </h3>
                  <p className={`theme-text-muted text-xl leading-relaxed text-left`}>
                    {project.description}
                  </p>
                  <p className={`theme-text-muted mt-4 text-sm`}>
                    {project.backgroundLabel}
                  </p>
                  <a href={project.link} className={`inline-block text-[11px] font-black tracking-[0.4em] uppercase theme-text-primary border-b-2 border-[#b93d27] pb-2 hover:text-[#b93d27] transition-colors`}>
                    View Project
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VARIANT B: SPATIAL CANVAS ===== */}
      <section className="min-h-screen overflow-hidden relative ">
        <div className="absolute top-6 left-12 z-50">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#b93d27] font-bold">
            Variant B - Drag to explore
          </p>
        </div>
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
          <h2 className={`text-6xl md:text-8xl font-black tracking-tighter theme-text-primary italic`}>
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
                 <div className={`relative  border theme-border-medium p-8 md:p-12 min-w-[300px] md:min-w-[400px]`}>
                   <div className="flex gap-4 mb-4 flex-wrap">
                     {project.skills.map((skill) => (
                       <span key={skill} className="text-[10px] text-[#b93d27] uppercase tracking-[0.2em] font-medium">
                         {skill}
                       </span>
                     ))}
                   </div>
                   <h3 className={`text-2xl md:text-3xl font-bold theme-text-primary mb-3`}>
                     {project.title}
                   </h3>
                   <p className={`theme-text-muted text-sm leading-relaxed`}>
                     {project.description}
                   </p>
                 </div>
               </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== VARIANT C: MASONRY GRID ===== */}
      <section className="py-32 px-12 md:px-24 relative ">
        <div className="max-w-[1800px] mx-auto">
          <div className={`mb-12 pb-6 border-b theme-border-medium`}>
            <p className="text-[10px] uppercase tracking-[0.8em] text-[#b93d27] mb-2 font-bold">
              Variant C
            </p>
            <h2 className={`text-6xl md:text-8xl font-black tracking-tighter theme-text-primary italic`}>
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
                <div className={` border theme-border-subtle p-8 group-hover:border-[#b93d27]/50 transition-all duration-300`}>
                  <div className="flex gap-3 mb-4 flex-wrap">
                    {project.skills.map((skill) => (
                      <span key={skill} className="text-[9px] text-[#b93d27] uppercase tracking-[0.15em]">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <h3 className={`text-xl md:text-2xl font-bold theme-text-primary mb-3 group-hover:text-[#b93d27] transition-colors`}>
                    {project.title}
                  </h3>
                  <p className={`theme-text-muted text-sm leading-relaxed`}>
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
                className={`relative  border theme-border-medium max-w-3xl w-full p-12`}
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
                      <h3 className={`text-4xl md:text-5xl font-bold theme-text-primary mb-6`}>
                        {project.title}
                      </h3>
                      <div className="space-y-4 mb-8">
                          <p className={`theme-text-muted text-lg leading-relaxed`}>
                          {project.description}
                        </p>
                        {project.blogContent?.map((paragraph, i) => (
                          <p key={i} className={`theme-text-muted text-base leading-relaxed`}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <div className="flex gap-6">
                          <a href={project.link} className={`text-[11px] font-black tracking-[0.4em] uppercase theme-text-primary border-b-2 border-[#b93d27] pb-2 hover:text-[#b93d27] transition-colors`}>
                          {project.linkText}
                        </a>
                          <button
                          onClick={() => setHoveredProject(null)}
                          className={`text-[11px] font-black tracking-[0.4em] uppercase theme-text-muted hover:theme-text-primary transition-colors`}
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
      <section className="min-h-screen relative overflow-hidden ">
        <div className="absolute top-6 left-12 z-50">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#b93d27] font-bold">
            Variant D - Drag to navigate • {activeIndex + 1} / {projects.length}
          </p>
        </div>
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
          <h2 className={`text-6xl md:text-8xl font-black tracking-tighter theme-text-primary italic`}>
            Horizontal Carousel
          </h2>
        </div>

        <motion.div
          className="flex h-screen items-center"
          style={{ x: dragX }}
          drag="x"
          dragConstraints={{ left: -10000, right: 10000 }}
          dragElastic={0.1}
          onDragEnd={(e, info) => {
            const threshold = 100;
            if (info.offset.x < -threshold && activeIndex < projects.length - 1) {
              setActiveIndex(activeIndex + 1);
            } else if (info.offset.x > threshold && activeIndex > 0) {
              setActiveIndex(activeIndex - 1);
            }
            dragX.set(-activeIndex * (typeof window !== 'undefined' ? window.innerWidth : 1024));
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
                <h3 className={`text-5xl md:text-7xl font-bold theme-text-primary mb-6`}>
                  {project.title}
                </h3>
                <p className={`theme-text-muted text-xl leading-relaxed max-w-2xl mx-auto mb-8`}>
                  {project.description}
                </p>
                <a href={project.link} className={`inline-block text-[11px] font-black tracking-[0.4em] uppercase theme-text-primary border-b-2 border-[#b93d27] pb-2 hover:text-[#b93d27] transition-colors`}>
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
                dragX.set(-index * (typeof window !== 'undefined' ? window.innerWidth : 1024));
              }}
              className={`w-2 h-2 rounded-full transition-all ${index === activeIndex ? 'bg-[#b93d27] w-8' : 'theme-dot-inactive'}`}
            />
          ))}
        </div>
      </section>

      {/* ===== VARIANT E: THUMBNAIL GALLERY ===== */}
      <section className="min-h-screen relative  flex flex-col">
        <div className={`py-12 px-12 md:px-24 border-b theme-border-medium`}>
          <p className="text-[10px] uppercase tracking-[0.8em] text-[#b93d27] mb-2 font-bold">
            Variant E
          </p>
          <h2 className={`text-6xl md:text-8xl font-black tracking-tighter theme-text-primary italic`}>
            Thumbnail Gallery
          </h2>
        </div>

        {/* Carousel Strip */}
        <div className="flex-1 flex items-center py-12 relative overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{ left: -200, right: 200 }}
            className="flex gap-8 items-center px-12 cursor-grab active:cursor-grabbing"
            onDragEnd={(e, info) => {
              const threshold = 50;
              if (info.offset.x < -threshold && activeIndex < projects.length - 1) {
                setActiveIndex(activeIndex + 1);
              } else if (info.offset.x > threshold && activeIndex > 0) {
                setActiveIndex(activeIndex - 1);
              }
            }}
          >
            {projects.map((project, index) => {
              const isSelected = index === activeIndex;
              return (
                <motion.div
                  key={`gallery-${project.id}`}
                  className={`cursor-pointer flex-shrink-0 transition-all duration-300 ${
                    isSelected ? 'scale-115 z-10' : 'scale-90 opacity-40 hover:scale-100 hover:opacity-70'
                  }`}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: isSelected ? 1.15 : 1.08 }}
                >
                  <div
                    className={`w-56 h-56 md:w-72 md:h-72  border-2 transition-all duration-300 flex flex-col justify-end p-6 relative overflow-hidden ${
                      isSelected ? 'border-[#b93d27]' : 'theme-border-medium'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="relative z-10">
                      <h4 className={`text-xl md:text-2xl font-bold theme-text-primary mb-1 truncate`}>
                        {project.title}
                      </h4>
                      <div className="flex gap-2 flex-wrap mb-2">
                        {project.skills.slice(0, 2).map((skill) => (
                          <span key={skill} className="text-[9px] text-[#b93d27] uppercase tracking-wider">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Minimap Navigation */}
        <div className="flex justify-center py-6 px-12">
          <div className="flex gap-2">
            {projects.map((project, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-200 ${
                  index === activeIndex 
                    ? 'w-12 h-3 bg-[#b93d27]' 
                    : 'w-3 h-3 theme-dot-inactive'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="px-12 md:px-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              key={projects[activeIndex].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={` border theme-border-medium p-8 md:p-12`}
            >
              <div className="flex gap-4 mb-6 flex-wrap">
                {projects[activeIndex].skills.map((skill) => (
                  <span key={skill} className="text-[11px] text-[#b93d27] uppercase tracking-[0.2em] font-medium">
                    {skill}
                  </span>
                ))}
              </div>
                <h3 className={`text-3xl md:text-5xl font-bold theme-text-primary mb-4`}>
                {projects[activeIndex].title}
              </h3>
                <p className={`theme-text-muted text-lg leading-relaxed mb-6`}>
                {projects[activeIndex].description}
              </p>
                {projects[activeIndex].blogContent?.map((paragraph, i) => (
                  <p key={i} className={`theme-text-muted text-base leading-relaxed mb-4`}>
                  {paragraph}
                </p>
              ))}
                <a
                  href={projects[activeIndex].link}
                  className={`inline-block mt-4 text-[11px] font-black tracking-[0.4em] uppercase theme-text-primary border-b-2 border-[#b93d27] pb-2 hover:text-[#b93d27] transition-colors`}
                >
                {projects[activeIndex].linkText}
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
