"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-movings-cards";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export function TestimonialCards() {
  return (
    <div className="relative flex flex-col items-center justify-center h-[30rem] w-full rounded-md antialiased bg-white dark:bg-black overflow-hidden">
      {/* Decorative grid background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      
      {/* Heading */}
      <h1 className={`relative z-10 text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-400 to-purple-500 mb-10 drop-shadow-lg text-center ${poppins.className}`}>
        Parents Feedback
      </h1>
      
      {/* Testimonials */}
      <div className="relative z-10 w-full flex justify-center">
        <InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Future School System has been the best decision for our children. The caring teachers and innovative learning methods have made a huge difference in their academic performance.",
    name: "Mrs. Ayesha Khan",
    title: "Parent of Grade 4 & 6 Students",
  },
  {
    quote:
      "My son has become more confident and disciplined since joining. The focus on both studies and moral values is truly commendable.",
    name: "Mr. Salman Raza",
    title: "Parent of Grade 7 Student",
  },
  {
    quote:
      "The personalized attention and small class sizes make every child feel valued. My daughter is always excited to share what she learns each day.",
    name: "Mrs. Sana Imran",
    title: "Parent of Grade 2 Student",
  },
  {
    quote:
      "From day one, the school has provided a safe, nurturing environment. The dedication of the teachers is visible in my child’s progress.",
    name: "Mr. Farooq Ahmed",
    title: "Parent of Grade 9 Student",
  },
  {
    quote:
      "Not only has my child improved academically, but also in sports, arts, and leadership skills. The well-rounded approach is outstanding.",
    name: "Mrs. Rabia Waheed",
    title: "Parent of Grade 1 & 5 Students",
  },
  {
    quote:
      "The communication between school and parents is excellent. I always feel updated and involved in my child’s education.",
    name: "Mr. Hamza Tariq",
    title: "Parent of Grade 3 Student",
  },
  {
    quote:
      "Future School System instills discipline, creativity, and a love for learning. I’m proud to see my child thriving here.",
    name: "Mrs. Fatima Ali",
    title: "Parent of Grade 8 Student",
  },
];
