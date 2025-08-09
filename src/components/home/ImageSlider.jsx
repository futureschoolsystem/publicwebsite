import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
const images = [
  '/herosectionimage.jpg',
  '/frontpageposter.jpg',
  '/herosectionimage.jpg',
  // Add more image paths as needed
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full  overflow-hidden rounded-lg shadow-lg bg-gray-70">
        <AnimatePresence mode='wait'>
      <motion.img
      key={current}
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="w-full h-[450px] object-cover transition-all duration-700"
        initial={{ opacity: 0  }}
          animate={{ opacity: 1}}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      </AnimatePresence>
      {/* Navigation Buttons */}
     <button
  onClick={prevSlide}
  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full shadow-lg hover:bg-black/40 transition"
  aria-label="Previous Slide"
>
  <span className="text-xl font-bold">
    
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#FFFFFF" fill="none">
    <path d="M11.5 18C11.5 18 5.50001 13.5811 5.5 12C5.49999 10.4188 11.5 6 11.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M18.5 18C18.5 18 12.5 13.5811 12.5 12C12.5 10.4188 18.5 6 18.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>

</span>
</button>
    <button
  onClick={nextSlide}
  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full shadow-lg hover:bg-black/40 transition"
  aria-label="Next Slide"
>
  <span className="text-xl font-bold">
    
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#FFFFFF" fill="none">
    <path d="M12.5 18C12.5 18 18.5 13.5811 18.5 12C18.5 10.4188 12.5 6 12.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M5.50005 18C5.50005 18 11.5 13.5811 11.5 12C11.5 10.4188 5.5 6 5.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>

</span>
</button>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-blue-700' : 'bg-white/50'} border border-blue-700`}
          />
        ))}
      </div>
    </div>
  );
};
export default ImageSlider;