import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="h-[80vh] flex flex-col justify-center items-start px-6 md:px-20 select-none overflow-hidden relative">
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
        className="w-full"
      >
        <h1
          className="text-[clamp(3rem,16vw,22rem)] font-black leading-[0.85] tracking-[-0.05em] text-right w-full text-[#555]"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
        >
          HATALČÍK
        </h1>
      </motion.div>
    </section>
  );
}
