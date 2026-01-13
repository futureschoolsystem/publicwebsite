"use client";
import React from "react";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import ContactInfo from "@/components/ui/contactInfo";
import ContactForm from "@/components/ui/contact-form";
import {motion} from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};
const fadeInDown = {
  initial: { opacity: 0, y: -60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeIn" },
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white py-16 md:py-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 10 }}
        transition={{ duration: 0.3 }}
      >
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/3 translate-y-1/3" />
        </div>

        <motion.div className="container mx-auto px-4 relative z-10 text-center" {...fadeInUp}>
          <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" {...fadeInDown}>
            Get In Touch
          </motion.h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Have questions about admissions or want to schedule a campus visit?
            We're here to help you every step of the way.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <motion.div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full" {...fadeInLeft}>
              <span className="font-medium">17+ Years of Excellence</span>
            </motion.div>
            <motion.div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full" {...fadeInUp}>
              <span className="font-medium">1700+ Students</span>
            </motion.div>
            <motion.div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full" {...fadeInRight}>
              <span className="font-medium">100% Success Rate</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and we'll respond within 24 hours.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Contact Info */}
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-6">
                Reach out to us through any of these channels.
              </p>
              <ContactInfo />

              {/* Map */}
              <div className="mt-8 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3427.2064950884674!2d73.4417323!3d30.796842999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922a76b2d3846fd%3A0x934f9f194984721f!2sFuture%20School%20System!5e0!3m2!1sen!2s!4v1767695852961!5m2!1sen!2s"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="School Location"
                  className="transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default page;
