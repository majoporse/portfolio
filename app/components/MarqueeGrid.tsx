import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MarqueeGridProps {
  images: string[];
  altPrefix: string;
  className?: string;
}

const MarqueeGrid = ({
  images,
  altPrefix,
  className = "",
}: MarqueeGridProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  const repeatedImages = [...images, ...images];

  return (
    <>
      {/* 
        Injecting CSS keyframes for the track. 
        This allows us to natively use 'animation-play-state: paused' on hover,
        which creates a flawless pause/resume effect without resetting position.
      */}
      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          animation: scrollMarquee 30s linear infinite;
        }
        .marquee-wrapper:hover .animate-marquee-infinite {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className={`overflow-hidden whitespace-nowrap marquee-wrapper py-4 ${className}`}
      >
        <div
          className="inline-flex gap-6 animate-marquee-infinite w-max"
          // Pause the marquee track in the background while the modal is open
          style={{ animationPlayState: selectedImage ? "paused" : "" }}
        >
          {repeatedImages.map((imageSrc, index) => (
            <motion.div
              key={index}
              className="flex-none w-[300px] md:w-[400px] cursor-pointer"
              // Add a slight Framer Motion pop effect on hover and click
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedImage(imageSrc)}
            >
              <img
                src={imageSrc}
                alt={`${altPrefix} project showcase ${index + 1}`}
                className="w-full h-full object-cover theme-border-accent border"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Framer Motion Popup Dialog */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm cursor-zoom-out"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()} // Prevent clicking the image from closing the dialog
            >
              <img
                src={selectedImage}
                alt="Enlarged project view"
                className="w-full h-auto max-h-[90vh] object-contain theme-border-accent border-2"
              />

              {/* Floating Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 md:top-4 md:right-4 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:scale-110 transition-transform border theme-border-medium cursor-pointer"
                aria-label="Close dialog"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MarqueeGrid;
