"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import WhatsAppButton from "@/components/ui/whatsapp-button"
import {
  GraduationCap,
  Award,
  Users,
  ArrowRight,
  Clock,
  MapPin,
  Calculator,
  BookText,
  FlaskConical,
  Globe2,
  Palette,
  Dumbbell,
  Languages,
  BookOpen,
  Phone,
  Mail,
  Trophy,
  Star,
  TrendingUp,
  Sparkles,
  Atom,
} from "lucide-react"

// Data
const programs = [
  {
    title: "Primary Section",
    grades: "Class 1-5",
    description:
      "Building strong foundations through interactive learning, Urdu & English literacy, and character development in a nurturing environment.",
    image: "/academics/primary-students.jpg",
    icon: Sparkles,
    highlights: ["Urdu & English", "Mathematics", "Islamiat", "General Knowledge"],
  },
  {
    title: "Middle Section",
    grades: "Class 6-8",
    description:
      "Fostering critical thinking through hands-on experiments, collaborative projects, and comprehensive Punjab Board curriculum.",
    image: "/academics/middle-students.jpg",
    icon: Atom,
    highlights: ["Science Labs", "Computer Education", "Pakistan Studies", "Islamic Studies"],
  },
  {
    title: "Secondary Section",
    grades: "Class 9-10",
    description:
      "Preparing students for Matric Board exams with focused academics, career guidance, and competitive exam preparation.",
    image: "/academics/senior-students.jpg",
    icon: BookOpen,
    highlights: ["Matric Board Prep", "Science Stream", "Arts Stream", "Career Counseling"],
  },
]

const subjects = [
  {
    icon: Calculator,
    title: "Mathematics",
    description: "From basic arithmetic to advanced algebra following Punjab Board syllabus.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: BookText,
    title: "Urdu & English",
    description: "Developing bilingual proficiency in reading, writing, and communication.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: FlaskConical,
    title: "Science",
    description: "Practical learning in Physics, Chemistry, and Biology with lab experiments.",
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: Globe2,
    title: "Pakistan Studies",
    description: "Understanding our nation's history, geography, and civic responsibilities.",
    color: "from-rose-500 to-rose-600",
  },
  {
    icon: Palette,
    title: "Arts & Drawing",
    description: "Nurturing creativity through visual arts and Islamic calligraphy.",
    color: "from-violet-500 to-violet-600",
  },
  {
    icon: BookOpen,
    title: "Islamiat",
    description: "Quranic studies, Islamic values, and moral education for character building.",
    color: "from-green-600 to-green-700",
  },
  {
    icon: Dumbbell,
    title: "Physical Education",
    description: "Sports, fitness activities, and annual sports day competitions.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Languages,
    title: "Computer Science",
    description: "Basic to advanced computer skills and IT education for digital literacy.",
    color: "from-indigo-500 to-indigo-600",
  },
]

const achievements = [
  { icon: Trophy, value: 1700, suffix: "+", label: "Total Students", description: "Enrolled this session" },
  { icon: Star, value: 95, suffix: "%", label: "Board Results", description: "Pass percentage" },
  { icon: Users, value: 85, suffix: "+", label: "Qualified Teachers", description: "Experienced faculty" },
  { icon: TrendingUp, value: 17, suffix: "+", label: "Years of Excellence", description: "Serving community" },
]

const events = [
  { date: "Mar 15", title: "Annual Exams Begin", time: "8:30 AM", location: "All Campuses", type: "Academic" },
  { date: "Mar 23", title: "Pakistan Day Celebration", time: "9:00 AM", location: "Main Ground", type: "Event" },
  {
    date: "Apr 5",
    title: "Parent-Teacher Meeting",
    time: "2:00 PM - 5:00 PM",
    location: "Classrooms",
    type: "Meeting",
  },
  {
    date: "May 1",
    title: "Summer Vacation Starts",
    time: "After Final Exams",
    location: "All Campuses",
    type: "Holiday",
  },
  { date: "Aug 14", title: "Independence Day Program", time: "8:00 AM", location: "Main Campus", type: "Event" },
]

const typeColors = {
  Academic: "bg-blue-100 text-blue-700",
  Event: "bg-amber-100 text-amber-700",
  Meeting: "bg-green-100 text-green-700",
  Holiday: "bg-rose-100 text-rose-700",
}

function Counter({ target, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * target))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, target, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

function App() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${"/academics/students-hero.jpg"})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 opacity-80" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium tracking-widest uppercase bg-yellow-600/30 text-yellow-400 rounded-full border border-yellow-500/30">
              Future School System
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Shaping Tomorrow's
              <span className="block text-yellow-400">Leaders Today</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Providing quality education to 1,700+ students with a focus on academic excellence, Islamic values, and
              holistic development in Pakistan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <motion.a
                href="#programs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-yellow-500 text-slate-950 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Programs
              </motion.a>
              <motion.a
                href="#curriculum"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-transparent border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                View Curriculum
              </motion.a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: GraduationCap, label: "Board Results", value: "100%" },
              { icon: Award, label: "Total Students", value: "1700+" },
              { icon: Users, label: "Student-Teacher Ratio", value: "30:1" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 bg-yellow-600/30 rounded-lg">
                  <stat.icon className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 bg-yellow-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-yellow-500 font-semibold tracking-widest uppercase text-sm">Our Programs</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
              Academic Excellence at Every Level
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              From primary to secondary, our comprehensive programs follow Punjab Board curriculum while nurturing each
              student's unique potential.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-white font-bold text-2xl">{program.title}</span>
                    <span className="px-3 py-1 bg-yellow-500 text-slate-900 text-sm font-semibold rounded-full">
                      {program.grades}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white rounded-lg">
                      <program.icon className="w-5 h-5 text-yellow-500" />
                    </div>
                    <span className="text-slate-500 text-sm font-medium">Punjab Board Curriculum</span>
                  </div>
                  <p className="text-slate-600 mb-5 leading-relaxed">{program.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {program.highlights.map((h) => (
                      <span key={h} className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                        {h}
                      </span>
                    ))}
                  </div>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-yellow-500 font-semibold group/link hover:text-yellow-600 transition-colors"
                  >
                    Learn More <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-yellow-500 font-semibold tracking-widest uppercase text-sm">Curriculum</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">A Well-Rounded Education</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Our curriculum combines academic rigor with Islamic values and co-curricular activities to develop
              well-rounded individuals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-yellow-400 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${subject.color} mb-4 shadow-lg`}>
                  <subject.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-yellow-500 transition-colors">
                  {subject.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{subject.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-yellow-400 font-semibold tracking-widest uppercase text-sm">Our Achievements</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">A Legacy of Excellence</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Future School System has been shaping young minds and producing outstanding results for over a decade.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex p-4 bg-yellow-600/30 rounded-2xl mb-4 backdrop-blur-sm border border-yellow-500/30">
                  <item.icon className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                  <Counter target={item.value} suffix={item.suffix} />
                </div>
                <h3 className="text-yellow-400 font-semibold text-lg mb-1">{item.label}</h3>
                <p className="text-white/60 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-yellow-500 font-semibold tracking-widest uppercase text-sm">Academic Calendar</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
                Upcoming Events & Important Dates
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Stay informed about key academic dates, examinations, and school events. Mark your calendars and join us
                in celebrating our students' achievements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {events.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="flex gap-4 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-transparent hover:border-yellow-400/30"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-slate-900 rounded-xl flex flex-col items-center justify-center text-white">
                    <span className="text-xs font-medium uppercase opacity-80">{event.date.split(" ")[0]}</span>
                    <span className="text-xl font-bold">{event.date.split(" ")[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900 truncate">{event.title}</h3>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full flex-shrink-0 ${typeColors[event.type]}`}
                      >
                        {event.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-slate-950 to-slate-800 rounded-3xl p-8 md:p-16 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block px-4 py-2 mb-6 text-sm font-medium tracking-widest uppercase bg-yellow-600/30 text-yellow-400 rounded-full border border-yellow-500/30"
              >
                Admissions Open
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Join Future School System
                <span className="block text-yellow-400">Today!</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-white/80 text-lg mb-10 leading-relaxed"
              >
                Give your child the gift of quality education. Visit our campus, meet our teachers, and see why 1,700+
                families trust us with their children's future.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
              >
                <Link href="/contact-us" >
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-500 text-slate-950 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
  >
    Schedule Campus Visit
  </motion.div>
</Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
       <WhatsAppButton />
    </main>
  )
}

export default App
