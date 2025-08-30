"use client";
import { GraduationCap, Award, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Geist, Bungee_Spice } from "next/font/google";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const geist = Geist({
  subsets: ["latin"],
});
const bungee = Bungee_Spice({
  weight: "400",
  subsets: ["latin"],
});
const HeroSection = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-br from-blue-50 to-blue-100 pt-10 pb-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side Content */}
          <div className="space-y-10 text-center lg:text-left">
            {/* Badge */}
            <motion.div variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                   className="inline-flex items-center gap-2 text-blue-700 font-semibold bg-blue-100 rounded-full px-4 py-1 shadow-sm text-sm hover:shadow-md transition">
              <GraduationCap className="w-5 h-5" />
              Admissions Open 2025-26
            </motion.div>

            {/* Heading */}
            <motion.h1
            variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  
              className={`${geist.className} text-4xl  sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight`}
            >
              A Vision of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">
                Transformative Education
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
            variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  
                   className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              At Future School System, we provide world-class education with
              modern facilities, experienced faculty, and a nurturing
              environment for holistic development of every student.
            </motion.p>

            {/* Call to Action */}
            <motion.div 
            variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 transition duration-300"
              >
                Apply Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6">
              <div className="text-center">
                <motion.div
                variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  
                  className={`${bungee.className} text-2xl font-bold text-blue-600`}
                >
                  15+
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  
                  className="text-sm text-gray-600"
                >
                  Years Experience
                </motion.div>
              </div>
              <div className="text-center">
                <motion.div
                variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  
                  className={`${bungee.className} text-2xl font-bold text-blue-600`}
                >
                  1700+
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  
                  className="text-sm text-gray-600"
                >
                  Active Students
                </motion.div>
              </div>
              <div className="text-center">
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  
                  className={`${bungee.className} text-2xl font-bold text-blue-600`}
                >
                  100%
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  
                  className="text-sm text-gray-600"
                >
                  Success Rate
                </motion.div>
              </div>
              
            </div>
          </div>

          {/* Right Side Image */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            
            className="relative w-full h-auto max-w-md mx-auto lg:mx-0"
          >
            <Image
              src="/home/transformativeInformation.jpg"
              alt="Future School System Campus"
              width={600}
              height={600}
              className="rounded-2xl shadow-2xl w-full h-[420px] object-cover"
            />

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-4 bg-white p-4 rounded-xl shadow-xl w-[200px]">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    Top Rated School
                  </div>
                  <div className="text-xs text-gray-600">in District Okara</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
