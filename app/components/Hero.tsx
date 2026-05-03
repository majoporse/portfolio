import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { getTheme, subscribe } from '../context/themeStore';

export function Hero() {
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    const unsubscribe = subscribe((newTheme) => {
      setTheme(newTheme);
    });
    return unsubscribe;
  }, []);

  const hatalcikColor = theme === 'dark' ? 'text-[#ebdddd]' : 'text-[#555555]';

  return (
    <section className="min-h-screen flex flex-col justify-center px-12 md:px-24 select-none overflow-hidden relative">
      <div className="flex flex-col items-start">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <h1
            className="text-[clamp(3rem,16vw,22rem)] font-black leading-[0.85] tracking-[-0.05em] uppercase text-[#b93d27]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            MÁRIO
          </h1>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <h1
            className={`text-[clamp(3rem,16vw,22rem)] font-black leading-[0.85] tracking-[-0.05em] text-left ${hatalcikColor}`}
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            HATALČÍK
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
