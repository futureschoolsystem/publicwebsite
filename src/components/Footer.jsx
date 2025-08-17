'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
} from 'react-icons/fa';
import Image from 'next/image';


function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* School Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-white to-cyan-500 p-2 rounded-lg mr-3">
                <Image src="/futureschoollogo.png" alt="Future School System Logo" width={200} height={100} />
              </div>
            
            </motion.div>

            <motion.p variants={itemVariants} className="mb-6 text-gray-400">
              A place where students are nurtured with knowledge, discipline, and confidence. Our mission is to inspire excellence and shape future leaders.
            </motion.p>

            <motion.div variants={itemVariants} className="flex space-x-4">
              <a
                href="https://facebook.com/futureschoolsystem"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full transition-all duration-300 hover:text-blue-500 hover:bg-gray-700 transform hover:-translate-y-1"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com/futureschool"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full transition-all duration-300 hover:text-cyan-400 hover:bg-gray-700 transform hover:-translate-y-1"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com/company/futureschool"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full transition-all duration-300 hover:text-blue-400 hover:bg-gray-700 transform hover:-translate-y-1"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://instagram.com/futureschoolsystem"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full transition-all duration-300 hover:text-pink-500 hover:bg-gray-700 transform hover:-translate-y-1"
              >
                <FaInstagram />
              </a>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3 variants={itemVariants} className="text-xl font-bold mb-6 text-white">
              Quick Links
            </motion.h3>

            <motion.ul variants={containerVariants} className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Academics", href: "/academics" },
                { name: "Admissions", href: "/admissions" },
                { name: "Events", href: "/events" },
                { name: "Contact", href: "/contact" }
              ].map((item, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <a
                    href={item.href}
                    className="flex items-center group transition-colors duration-300 hover:text-white"
                  >
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="border-b border-transparent group-hover:border-cyan-400 transition-all">
                      {item.name}
                    </span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* School Programs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3 variants={itemVariants} className="text-xl font-bold mb-6 text-white">
              School Programs
            </motion.h3>

            <motion.ul variants={containerVariants} className="space-y-3">
              {[
                "Pre-School Classes",
                "Primary Section",
                "Middle School",
                "Matriculation Program",
                "Co-Curricular Activities",
                "Summer Camp"
              ].map((program, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <div
                    href="#"
                    className="flex items-center group transition-colors duration-300 hover:text-white"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="border-b border-transparent group-hover:border-blue-400 transition-all">
                      {program}
                    </span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3 variants={itemVariants} className="text-xl font-bold mb-6 text-white">
              Contact Us
            </motion.h3>

            <motion.ul variants={containerVariants} className="space-y-4">
              <motion.li variants={itemVariants} className="flex items-start">
                <FaMapMarkerAlt className="text-cyan-400 mt-1 mr-3 flex-shrink-0" />
                <span>JALAL TOWN G.T Road،5/4L Road,<br />Okara,Punjab, Pakistan</span>
              </motion.li>

              <motion.li variants={itemVariants} className="flex items-center">
                <FaWhatsapp className="text-blue-400 mr-3" />
                <a href="tel:+92 3112306050" className="hover:text-white transition-colors">+92 3112306050</a>
              </motion.li>

              <motion.li variants={itemVariants} className="flex items-center">
                <FaEnvelope className="text-cyan-400 mr-3" />
                <a href="mailto:futureschool786@gmail.com" className="hover:text-white transition-colors">
                  futureschool786@gmail.com
                </a>
              </motion.li>
            </motion.ul>

            <motion.div variants={itemVariants} className="mt-8">
              <h4 className="font-semibold mb-3 text-white">Send Email</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full"
                />
                <button className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 rounded-r-lg font-medium hover:opacity-90 transition-opacity">
                  Send
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Future School System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
