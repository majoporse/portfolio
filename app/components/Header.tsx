import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 w-full z-100 theme-header-bg"
    >
      <div className="flex justify-between items-center px-6 py-5 md:px-20">
        <div className="flex items-center gap-4">
          <div className="h-3 w-3 bg-[#b93d27]"></div>
          <span className="text-[11px] font-bold tracking-[0.5em] theme-text-primary uppercase">
            M. HATALČÍK
          </span>
        </div>
        <nav className="flex gap-12 items-center">
          <a
            href="#work"
            className="nav-link uppercase text-[10px] tracking-widest font-bold theme-text-muted theme-hover-text transition-colors"
          >
            Projects
          </a>
          <a
            href="#experience"
            className="nav-link uppercase text-[10px] tracking-widest font-bold theme-text-muted theme-hover-text transition-colors"
          >
            Experience
          </a>
          <a
            href="mailto:mario.hatalcik@gmail.com"
            className="px-6 py-2 border theme-border-medium rounded-full text-[10px] font-bold tracking-widest uppercase theme-button-hover transition-all"
          >
            Contact
          </a>
        </nav>
      </div>
    </motion.header>
  );
}