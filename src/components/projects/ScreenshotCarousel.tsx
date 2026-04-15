'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScreenshotCarouselProps {
  images: { url: string | null; caption: string; mobile?: boolean }[];
}

export function ScreenshotCarousel({ images }: ScreenshotCarouselProps) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
        <div className="w-full aspect-video border border-dashed border-mech-silver/20 bg-mech-base/30 flex flex-col items-center justify-center p-8">
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(15,211,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(15,211,255,0.3)_1px,transparent_1px)] bg-[size:20px_20px]" />
            <span className="font-orbitron font-bold text-mech-silver/40 tracking-widest">VISUAL REPOSITORY PENDING</span>
        </div>
    );
  }

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full overflow-hidden border border-mech-silver/10 bg-mech-base">
      <div className="relative aspect-video flex items-center justify-center p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className={`relative w-full h-full ${images[index].mobile ? 'max-w-[300px] aspect-[9/19]' : 'aspect-video'}`}
          >
            {images[index].url ? (
              <Image 
                src={images[index].url} 
                alt={images[index].caption} 
                fill 
                className={`object-cover object-top border border-mech-silver/20 ${images[index].mobile ? 'rounded-[32px]' : 'rounded-sm'}`} 
              />
            ) : (
                <div className={`w-full h-full border border-mech-silver/20 bg-mech-panel/50 flex flex-col items-center justify-center ${images[index].mobile ? 'rounded-[32px]' : 'rounded-sm'}`}>
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(15,211,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(15,211,255,0.3)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    <span className="font-orbitron text-mech-silver/40">IMAGE PENDING</span>
                </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <>
          <button onClick={prev} aria-label="Previous Image" title="Previous Image" className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 bg-mech-base/80 border border-mech-silver/20 text-mech-silver hover:text-mech-cyan transition-colors z-10 backdrop-blur-md">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={next} aria-label="Next Image" title="Next Image" className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 bg-mech-base/80 border border-mech-silver/20 text-mech-silver hover:text-mech-cyan transition-colors z-10 backdrop-blur-md">
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-mech-base to-transparent flex items-end justify-center pb-4 z-10">
         <p className="font-inter text-xs text-mech-silver tracking-widest uppercase bg-mech-base/80 px-4 py-1 rounded backdrop-blur-sm border border-mech-silver/10">
            {images[index].caption}
         </p>
      </div>
    </div>
  );
}
