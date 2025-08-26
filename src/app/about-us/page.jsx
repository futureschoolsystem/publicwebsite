"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Award, Heart, Star, Globe, GraduationCap, Building } from "lucide-react"

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-primary/10 via-card to-background py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div className="mb-8" {...fadeInUp}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge variant="secondary" className="mb-4 text-sm font-medium">
                Excellence in Education Since 2015
              </Badge>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Future School System
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty"
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
              <Button size="lg" className="text-lg px-8">
                Schedule a Visit
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                View Admissions
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Mission & Vision</h2>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Mission
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide world-class education rooted in Islamic values, preparing students to become responsible
                    global citizens who contribute positively to society while maintaining their cultural identity and
                    faith.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Vision
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
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
              <motion.img
                src="/home/qualityEducation.jpg"
                alt="Students learning in classroom"
                className="rounded-lg shadow-lg w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Future School System
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={cardVariant}>
              <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <motion.div
                      className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Heart className="w-6 h-6 text-primary" />
                    </motion.div>
                    <CardTitle className="text-lg">Islamic Values</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      Instilling strong Islamic principles, ethics, and moral values in every aspect of education
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={cardVariant}>
              <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <motion.div
                      className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <BookOpen className="w-6 h-6 text-primary" />
                    </motion.div>
                    <CardTitle className="text-lg">Academic Excellence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      Maintaining the highest standards of education with innovative teaching methodologies
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={cardVariant}>
              <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <motion.div
                      className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Users className="w-6 h-6 text-primary" />
                    </motion.div>
                    <CardTitle className="text-lg">Community Focus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      Building strong connections with families and the broader Pakistani community
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={cardVariant}>
              <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <motion.div
                      className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Award className="w-6 h-6 text-primary" />
                    </motion.div>
                    <CardTitle className="text-lg">Character Building</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
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
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
            >
              <motion.img
                src="/home/fssbuilding.jpg"
                alt="School building with Islamic architecture"
                className="rounded-lg shadow-lg w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <motion.div
                className="space-y-4 text-muted-foreground leading-relaxed"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.p variants={cardVariant}>
                  Founded in 2015 by a group of visionary educators, Future School System began as a small institution with a
                  big dream: to provide quality education that honors both academic excellence and Islamic values.
                </motion.p>
                <motion.p variants={cardVariant}>
                  Over nearly four decades, we have grown from a modest school serving 50 students to a comprehensive
                  educational institution with over 2,000 students from diverse backgrounds across Pakistan.
                </motion.p>
                <motion.p variants={cardVariant}>
                  Today, our alumni serve in leadership positions across various fields - from medicine and engineering
                  to business and public service - carrying forward the values and knowledge they gained at Future School System.
                </motion.p>
              </motion.div>
              <motion.div
                className="mt-8 grid grid-cols-2 gap-6"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.div className="text-center" variants={cardVariant}>
                  <motion.div
                    className="text-3xl font-bold text-primary"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    2000+
                  </motion.div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </motion.div>
                <motion.div className="text-center" variants={cardVariant}>
                  <motion.div
                    className="text-3xl font-bold text-primary"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    150+
                  </motion.div>
                  <div className="text-sm text-muted-foreground">Faculty Members</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Leadership</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experienced educators dedicated to nurturing the next generation
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={cardVariant}>
              <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card className="text-center h-full">
                  <CardHeader>
                    <motion.div
                      className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <GraduationCap className="w-12 h-12 text-primary" />
                    </motion.div>
                    <CardTitle>Rao Tanveer</CardTitle>
                    <CardDescription>Principal & Academic Director</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Ph.D. in Education from University of Punjab. 25+ years of experience in educational leadership
                      and curriculum development.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={cardVariant}>
              <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card className="text-center h-full">
                  <CardHeader>
                    <motion.div
                      className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Building className="w-12 h-12 text-primary" />
                    </motion.div>
                    <CardTitle>abc</CardTitle>
                    <CardDescription>Vice Principal & Student Affairs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      M.Ed. from Karachi University. Specialist in student counseling and character development with 20+
                      years of experience.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={cardVariant}>
              <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card className="text-center h-full">
                  <CardHeader>
                    <motion.div
                      className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Users className="w-12 h-12 text-primary" />
                    </motion.div>
                    <CardTitle>abc</CardTitle>
                    <CardDescription>Head of Islamic Studies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
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
        className="py-16 px-4 bg-primary/5"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Join Future School System Okara
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Discover how we can help your child grow academically, spiritually, and personally in a nurturing Islamic
            environment.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="text-lg px-8">
                Apply for Admission
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
