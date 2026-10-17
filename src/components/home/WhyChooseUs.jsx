"use client";

import Image from "next/image";
import { GraduationCap, Users, ShieldCheck, Building, Award, HandCoins } from "lucide-react";
import { TextHoverEffect } from "../ui/text-hover-effect";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const features = [
  {
    icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
    title: "Quality Education",
    description: "Experienced teachers using modern, effective teaching methods to ensure top results.",
    image: "/home/qualityEducation.jpg",
  },
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    title: "Holistic Development",
    description: "We nurture academic excellence alongside sports, arts, and character building.",
    image: "/home/holisticDevelopment.jpg",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
    title: "Safe & Supportive",
    description: "Secure campus, caring staff, and a strong anti-bullying policy for peace of mind.",
    image: "/home/safeandsupportive.jpg",
  },
  {
    icon: <Building className="w-8 h-8 text-blue-600" />,
    title: "Modern Facilities",
    description: "Smart classrooms, labs, library, and playgrounds to support all learning styles.",
    image: "/home/modernFacilities.jpg",
  },
  {
    icon: <Award className="w-8 h-8 text-blue-600" />,
    title: "Proven Results",
    description: "Consistent top positions in board exams and extracurricular competitions.",
    image: "/home/provenResults.jpg",
  },
  {
    icon: <HandCoins className="w-8 h-8 text-blue-600" />,
    title: "Affordable Excellence",
    description: "High-quality education with a fee structure that works for every family.",
    image: "/home/affordableExcellence.jpg",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20" aria-labelledby="why-choose-us-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="w-full sm:w-2/3 md:w-1/2 mx-auto">
            <TextHoverEffect text="Why Choose Future School?" size="text-2xl" />
          </div>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mt-2">
            Committed to academic excellence, moral leadership, and comprehensive student development.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 12px 30px -10px rgba(59, 130, 246, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="group bg-white border border-gray-200/80 rounded-2xl shadow-sm flex flex-col overflow-hidden transition-all duration-300"
            >
              <div className="flex items-center gap-3.5 px-6 pt-6">
                <div className="flex-shrink-0 bg-blue-50 border border-blue-100 rounded-xl p-2.5 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3
                  className={`${poppins.className} text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors`}
                >
                  {feature.title}
                </h3>
              </div>

              <div className="px-6 py-3.5 flex-1">
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>

              <figure className="relative w-full h-52 overflow-hidden bg-gray-100">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={80}
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </figure>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
