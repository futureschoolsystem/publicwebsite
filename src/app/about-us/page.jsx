"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Award, Heart, Star, Globe, GraduationCap, Building } from "lucide-react"
import Link from "next/link"
import WhatsAppButton from "@/components/ui/whatsapp-button"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariant = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 py-32 px-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div className="mb-8" {...fadeInUp}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge
                variant="secondary"
                className="mb-4 text-sm font-medium bg-blue-100/20 text-blue-100 border-blue-400/30 hover:bg-blue-100/30"
              >
                Excellence in Education Since 2015
              </Badge>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Future School System
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto text-pretty leading-relaxed drop-shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Nurturing minds, building character, and fostering Islamic values in the heart of Pakistan
            </motion.p>
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact-us">
                <Button
                  size="lg"
                  className="text-lg px-8 bg-white text-blue-900 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all"
                >
                  Schedule a Visit
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent mb-8">
                Our Mission & Vision
              </h2>
              <div className="space-y-8">
                <motion.div
                  className="p-6 rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" />
                    Mission
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    To provide world-class education rooted in Islamic values, preparing students to become responsible
                    global citizens who contribute positively to society while maintaining their cultural identity and
                    faith.
                  </p>
                </motion.div>
                <motion.div
                  className="p-6 rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-500" />
                    Vision
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    To be Pakistan's leading educational institution, recognized for academic excellence, character
                    development, and producing leaders who serve humanity with integrity and compassion.
                  </p>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
            >
              <motion.div
                className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src="/home/qualityEducation.jpg"
                  alt="Students learning in classroom"
                  className="w-full h-96 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-50 via-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              The principles that guide everything we do at Future School System
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={cardVariant}>
              <motion.div whileHover={{ y: -8, scale: 1.03 }} transition={{ duration: 0.2 }}>
                <Card className="text-center h-full border-2 border-blue-100 hover:border-blue-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-blue-50 transition-all duration-300">
                  <CardHeader>
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center mx-auto mb-6 border-2 border-red-200"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Heart className="w-8 h-8 text-red-600" />
                    </motion.div>
                    <CardTitle className="text-lg text-blue-900">Islamic Values</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed text-slate-700">
                      Instilling strong Islamic principles, ethics, and moral values in every aspect of education
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={cardVariant}>
              <motion.div whileHover={{ y: -8, scale: 1.03 }} transition={{ duration: 0.2 }}>
                <Card className="text-center h-full border-2 border-blue-100 hover:border-blue-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-blue-50 transition-all duration-300">
                  <CardHeader>
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl flex items-center justify-center mx-auto mb-6 border-2 border-amber-200"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <BookOpen className="w-8 h-8 text-amber-600" />
                    </motion.div>
                    <CardTitle className="text-lg text-blue-900">Academic Excellence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed text-slate-700">
                      Maintaining the highest standards of education with innovative teaching methodologies
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={cardVariant}>
              <motion.div whileHover={{ y: -8, scale: 1.03 }} transition={{ duration: 0.2 }}>
                <Card className="text-center h-full border-2 border-blue-100 hover:border-blue-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-blue-50 transition-all duration-300">
                  <CardHeader>
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6 border-2 border-blue-200"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Users className="w-8 h-8 text-blue-600" />
                    </motion.div>
                    <CardTitle className="text-lg text-blue-900">Community Focus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed text-slate-700">
                      Building strong connections with families and the broader Pakistani community
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={cardVariant}>
              <motion.div whileHover={{ y: -8, scale: 1.03 }} transition={{ duration: 0.2 }}>
                <Card className="text-center h-full border-2 border-blue-100 hover:border-blue-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-blue-50 transition-all duration-300">
                  <CardHeader>
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-6 border-2 border-emerald-200"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Award className="w-8 h-8 text-emerald-600" />
                    </motion.div>
                    <CardTitle className="text-lg text-blue-900">Character Building</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed text-slate-700">
                      Developing leadership qualities, integrity, and social responsibility in our students
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              className="relative"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
            >
              <motion.div
                className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src="/home/fssbuilding.jpg"
                  alt="School building with Islamic architecture"
                  className="w-full h-96 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent mb-8">
                Our Story
              </h2>
              <motion.div
                className="space-y-6 text-slate-700 leading-relaxed"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.p variants={cardVariant} className="text-lg">
                  Founded in 2015 by a group of visionary educators, Future School System began as a small institution
                  with a big dream: to provide quality education that honors both academic excellence and Islamic
                  values.
                </motion.p>
                <motion.p variants={cardVariant} className="text-lg">
                  Over nearly four decades, we have grown from a modest school serving 50 students to a comprehensive
                  educational institution with over 2,000 students from diverse backgrounds across Pakistan.
                </motion.p>
                <motion.p variants={cardVariant} className="text-lg">
                  Today, our alumni serve in leadership positions across various fields - from medicine and engineering
                  to business and public service - carrying forward the values and knowledge they gained at Future
                  School System.
                </motion.p>
              </motion.div>
              <motion.div
                className="mt-12 grid grid-cols-2 gap-8"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.div
                  className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100"
                  variants={cardVariant}
                >
                  <motion.div
                    className="text-4xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    2000+
                  </motion.div>
                  <div className="text-sm font-semibold text-slate-600 mt-2">Students</div>
                </motion.div>
                <motion.div
                  className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100"
                  variants={cardVariant}
                >
                  <motion.div
                    className="text-4xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    150+
                  </motion.div>
                  <div className="text-sm font-semibold text-slate-600 mt-2">Faculty Members</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 px-4 bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent mb-4">
              Our Leadership
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Experienced educators dedicated to nurturing the next generation
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={cardVariant}>
              <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card className="text-center h-full border-2 border-blue-100 hover:border-blue-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-blue-50 transition-all duration-300">
                  <CardHeader>
                    <motion.div
                      className="w-28 h-28 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border-3 border-blue-200"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <GraduationCap className="w-14 h-14 text-blue-600" />
                    </motion.div>
                    <CardTitle className="text-blue-900">Rao Tanveer</CardTitle>
                    <CardDescription className="text-blue-700 font-semibold">
                      Principal & Academic Director
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Ph.D. in Education from University of Punjab. 25+ years of experience in educational leadership
                      and curriculum development.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={cardVariant}>
              <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card className="text-center h-full border-2 border-blue-100 hover:border-blue-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-blue-50 transition-all duration-300">
                  <CardHeader>
                    <motion.div
                      className="w-28 h-28 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border-3 border-amber-200"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Building className="w-14 h-14 text-amber-600" />
                    </motion.div>
                    <CardTitle className="text-blue-900">abc</CardTitle>
                    <CardDescription className="text-blue-700 font-semibold">
                      Vice Principal & Student Affairs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      M.Ed. from Karachi University. Specialist in student counseling and character development with 20+
                      years of experience.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={cardVariant}>
              <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card className="text-center h-full border-2 border-blue-100 hover:border-blue-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-blue-50 transition-all duration-300">
                  <CardHeader>
                    <motion.div
                      className="w-28 h-28 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border-3 border-emerald-200"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Users className="w-14 h-14 text-emerald-600" />
                    </motion.div>
                    <CardTitle className="text-blue-900">abc</CardTitle>
                    <CardDescription className="text-blue-700 font-semibold">Head of Islamic Studies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Islamic Scholar with expertise in Quranic studies and Islamic jurisprudence. Dedicated to
                      integrating faith with modern education.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        className="py-24 px-4 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 relative overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Join Future School System Okara
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Discover how we can help your child grow academically, spiritually, and personally in a nurturing Islamic
            environment.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={"/contact-us"}>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold transition-all"
                >
                Contact Us
              </Button>
                </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
       <WhatsAppButton />
    </div>
  )
}
