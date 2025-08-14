"use client";
import React, { useRef, useEffect, useState, useId } from "react";
import { motion } from "framer-motion"; // Changed to framer-motion

export const TextHoverEffect = ({
  text,
  duration,
  size = "text-3xl"
}) => {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const uniqueId = useId().replace(/:/g, ''); // Generate unique ID

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 350 60"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        {/* Gradient for masked reveal text */}
        <linearGradient
          id={`textGradient-${uniqueId}`}
          gradientUnits="userSpaceOnUse"
          x1="0%" y1="0%" x2="100%" y2="0%"
        >
          <stop offset="0%" stopColor="#14b8a6" /> {/* teal */}
          <stop offset="50%" stopColor="#6366f1" /> {/* indigo */}
          <stop offset="100%" stopColor="#a21caf" /> {/* purple */}
        </linearGradient>
        {/* Gradient for animated stroke text */}
        <linearGradient
          id={`animatedGradient-${uniqueId}`}
          gradientUnits="userSpaceOnUse"
          x1="0%" y1="0%" x2="100%" y2="0%"
        >
          <stop offset="0%" stopColor="#ec4899" /> {/* pink */}
          <stop offset="100%" stopColor="#f59e42" /> {/* orange */}
        </linearGradient>
        {/* Mask for reveal effect */}
        <motion.radialGradient
          id={`revealMask-${uniqueId}`}
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={`textMask-${uniqueId}`}>
          <rect 
            x="0" 
            y="0" 
            width="100%" 
            height="100%" 
            fill={`url(#revealMask-${uniqueId})`} 
          />
        </mask>
      </defs>
      
      {/* Background text with soft blue fill */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className={`fill-blue-200 font-[helvetica] ${size} font-bold stroke-neutral-200 dark:stroke-neutral-800`}
        style={{ opacity: 0.7 }}
      >
        {text}
      </text>
      
      {/* Animated stroke text with pink-orange gradient */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={`url(#animatedGradient-${uniqueId})`}
        strokeWidth="0.7"
        className={`fill-none font-[helvetica] ${size} font-bold`}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
      
      {/* Masked reveal text with teal-purple gradient */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={`url(#textGradient-${uniqueId})`}
        strokeWidth="0.7"
        mask={`url(#textMask-${uniqueId})`}
        className={`fill-teal-400 font-[helvetica] ${size} font-bold`}
      >
        {text}
      </text>
    </svg>
  );
};