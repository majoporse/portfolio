import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageCarouselProps {
  images: string[];
  altPrefix: string;
}

const ImageCarousel = ({ images, altPrefix }: ImageCarouselProps) => {
  const [current, setCurrent] = useState(0);

  const paginate = (newIndex: number) => {
    setCurrent(newIndex);
  }; // Variants for linear smooth sliding animation

  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween", // Use tween for linear smooth
        ease: "linear",
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        type: "tween", // Use tween for linear smooth
        ease: "linear",
        duration: 0.5,
      },
    }),
  }; // We use a relative 'direction' state to determine the animation direction
  // and to trigger a re-render of motion components inside AnimatePresence.

  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = page % images.length;
  const imageSrc = images[imageIndex];

  const nextImage = () => {
    setPage([page + 1, 1]);
  };

  const prevImage = () => {
    setPage([page - 1, -1]);
  };

  return (
    <div className="relative aspect-video theme-border-medium border rounded-2xl overflow-hidden group">
        {" "}
      <AnimatePresence initial={false} custom={direction}>
           {" "}
        <motion.img
          key={page}
          src={imageSrc}
          alt={`${altPrefix} featured image ${imageIndex + 1}`}
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
          {" "}
      </AnimatePresence>
         {/* Minimal Prev/Next Buttons (only show on hover) */}  {" "}
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full theme-bg-secondary theme-border-medium border theme-text-primary opacity-0 group-hover:opacity-100 transition-opacity theme-hover-text-accent"
      >
           {" "}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              {" "}
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
             {" "}
        </svg>
          {" "}
      </button>
        {" "}
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full theme-bg-secondary theme-border-medium border theme-text-primary opacity-0 group-hover:opacity-100 transition-opacity theme-hover-text-accent"
      >
           {" "}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              {" "}
          <path
            d="M6 4L10 8L6 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
             {" "}
        </svg>
          {" "}
      </button>
         {/* Minimal Dots (always visible, interactive) */}  {" "}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
           {" "}
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const newDirection = index > imageIndex ? 1 : -1;
              setPage([index, newDirection]);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              index === imageIndex
                ? "theme-bg-accent"
                : "theme-bg-medium hover:theme-bg-accent"
            }`}
          />
        ))}
          {" "}
      </div>
       {" "}
    </div>
  );
};

export default ImageCarousel;
