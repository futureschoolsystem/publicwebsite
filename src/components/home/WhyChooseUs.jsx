"use client";
import { GraduationCap, Users, ShieldCheck, Building, Award, HandCoins,   } from "lucide-react";
import { TextHoverEffect } from "../ui/text-hover-effect";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});


const features = [
	{
		icon: <GraduationCap className="w-10 h-10 text-black" />,
		title: "Quality Education",
		description:
			"Experienced teachers using modern, effective teaching methods to ensure top results.",
		image: "/home/qualityEducation.jpg",
	},
	{
		icon: <Users className="w-10 h-10 text-black" />,
		title: "Holistic Development",
		description:
			"We nurture academic excellence alongside sports, arts, and character building.",
		image: "/home/holisticDevelopment.jpg",
	},
	{
		icon: <ShieldCheck className="w-10 h-10 text-black" />,
		title: "Safe & Supportive",
		description:
			"Secure campus, caring staff, and a strong anti-bullying policy for peace of mind.",
		image: "/home/safeAndSupportive.jpg",
	},
	{
		icon: <Building className="w-10 h-10 text-black" />,
		title: "Modern Facilities",
		description:
			"Smart classrooms, labs, library, and playgrounds to support all learning styles.",
		image: "/home/modernFacilities.jpg",
	},
	{
		icon: <Award className="w-10 h-10 text-black" />,
		title: "Proven Results",
		description:
			"Consistent top positions in board exams and extracurricular competitions.",
		image: "/home/provenResults.jpg",
	},
	{
		icon: <HandCoins  className="w-10 h-10 text-black" />,
		title: "Affordable Excellence",
		description:
			"High-quality education with a fee structure that works for every family.",
		image: "/home/affordableExcellence.jpg",
	},
];

export default function WhyChooseUs() {
    return (
        <section className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-2">
                {/* Heading */}
                <div className="text-center ">
                    <div className="w-full sm:w-2/3 md:w-1/2 mx-auto">
                        <TextHoverEffect
                            text={"Why Choose Future School?"}
                            size="text-2xl"
                        />
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 8px 32px 0 rgba(59,130,246,0.15)",
                                borderColor: "#6366f1",
                                background: "linear-gradient(135deg, #e0e7ff 0%, #bae6fd 100%)",
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="group bg-white border border-blue-200 rounded-2xl shadow-md flex flex-col overflow-hidden transition-all duration-300"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="flex items-center gap-3 px-6 pt-6"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                    className="flex-shrink-0 bg-blue-50 rounded-full p-2"
                                >
                                    {feature.icon}
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className={`${poppins.className} text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-400 to-purple-500`}
                                >
                                    {feature.title}
                                </motion.h2>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="px-6 py-3 flex-1"
                            >
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                            <motion.figure
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="w-full h-60 overflow-hidden"
                            >
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </motion.figure>
                        </motion.div>
                    ))}
                </div>

                
            </div>
        </section>
    );
}
