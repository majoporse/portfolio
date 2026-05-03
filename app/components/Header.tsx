import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { getTheme, subscribe } from '../context/themeStore';

export function Header() {
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    const unsubscribe = subscribe((newTheme) => {
      setTheme(newTheme);
    });
    return unsubscribe;
  }, []);

  const headerBg = theme === 'dark' 
    ? 'rgba(5, 5, 5, 0.8)' 
    : 'rgba(245, 245, 245, 0.8)';

  const borderColor = theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'rgba(0, 0, 0, 0.05)';

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 w-full z-100"
      style={{
        background: headerBg,
        backdropFilter: "blur(15px)",
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      <div className="flex justify-between items-center px-6 py-5 md:px-20">
        <div className="flex items-center gap-4">
          <div className="h-3 w-3 bg-[#b93d27]"></div>
          <span className="text-[11px] font-bold tracking-[0.5em] text-white uppercase">
            M. HATALČÍK
          </span>
        </div>
        <nav className="flex gap-12 items-center">
          <a
            href="#work"
            className="nav-link uppercase text-[10px] tracking-widest font-bold text-neutral-500 hover:text-white transition-colors"
          >
            Projects
          </a>
          <a
            href="#experience"
            className="nav-link uppercase text-[10px] tracking-widest font-bold text-neutral-500 hover:text-white transition-colors"
          >
            Experience
          </a>
          <a
            href="mailto:mario.hatalcik@gmail.com"
            className="px-6 py-2 border border-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
          >
            Contact
          </a>
        </nav>
      </div>
    </motion.header>
  );
}