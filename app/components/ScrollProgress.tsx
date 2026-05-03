import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-[2px] bg-[#b93d27] z-[101]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}