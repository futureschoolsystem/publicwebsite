'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const images = [
  { src: '/home/fssbuilding.jpg', alt: 'Future School System Campus Building' },
  { src: '/home/holisticDevelopment.jpg', alt: 'Holistic Student Development and Extracurricular Activities' },
  { src: '/home/imgSlider2.jpg', alt: 'Classroom and Academic Environment' },
  { src: '/home/transformativeInformation.jpg', alt: 'Modern Education and Learning at Future School' },
  { src: '/home/modernFacilities.jpg', alt: 'State of the art Facilities and Science Labs' },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  // Automatic slide rotation
  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, isPaused, nextSlide]);

  return (
    <div
      className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] overflow-hidden rounded-xl shadow-lg bg-slate-900 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Campus Highlights"
    >
      {/* Seamless Crossfading Image Stack */}
      {images.map((item, idx) => {
        const isActive = idx === current;
        return (
          <div
            key={item.src}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive
                ? 'opacity-100 z-10 pointer-events-auto'
                : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
              priority={idx === 0 || idx === 1}
              quality={85}
              className="object-cover object-center transform transition-transform duration-[6000ms] ease-out scale-100 hover:scale-105"
            />
            {/* Ambient vignette overlay for rich contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />
          </div>
        );
      })}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        type="button"
        className="absolute top-1/2 left-3 sm:left-5 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 active:scale-95 text-white p-2.5 sm:p-3 rounded-full shadow-lg backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-white/70 cursor-pointer z-20"
        aria-label="Previous Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        type="button"
        className="absolute top-1/2 right-3 sm:right-5 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 active:scale-95 text-white p-2.5 sm:p-3 rounded-full shadow-lg backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-white/70 cursor-pointer z-20"
        aria-label="Next Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2.5 z-20 bg-black/35 backdrop-blur-sm px-3.5 py-1.5 rounded-full">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              idx === current
                ? 'w-6 h-2.5 bg-blue-500 shadow-sm'
                : 'w-2.5 h-2.5 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
