"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Phone,
  Mail,
  MapPin,
  Star,
  Play,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion"

export default function ApexWiringLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const benefitsRef = useRef(null)
  const comparisonRef = useRef(null)

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3])
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -300])

  // Mouse tracking for magnetic effects
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleScroll = () => {
      const sections = ["hero", "benefits", "comparison", "solutions", "testimonials", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [cursorX, cursorY])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const slideInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const slideInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-blue-500/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Floating Background Elements */}
      <motion.div className="fixed inset-0 pointer-events-none" style={{ y: backgroundY }}>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Zap className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Apex Wiring Solutions
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: "hero", label: "Home" },
                { id: "benefits", label: "Benefits" },
                { id: "comparison", label: "Comparison" },
                { id: "solutions", label: "Solutions" },
                { id: "testimonials", label: "Testimonials" },
                { id: "contact", label: "Contact" },
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 relative ${
                    activeSection === item.id ? "text-blue-600" : "text-gray-600"
                  }`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Get Consultation
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.95 }}>
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden py-4 border-t border-gray-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="flex flex-col space-y-4"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    { id: "hero", label: "Home" },
                    { id: "benefits", label: "Benefits" },
                    { id: "comparison", label: "Comparison" },
                    { id: "solutions", label: "Solutions" },
                    { id: "testimonials", label: "Testimonials" },
                    { id: "contact", label: "Contact" },
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                      variants={fadeInUp}
                      whileHover={{ x: 10 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  <motion.div variants={fadeInUp}>
                    <Button
                      onClick={() => scrollToSection("contact")}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
                    >
                      Get Consultation
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        id="hero"
        ref={heroRef}
        className="pt-16 min-h-screen flex items-center relative overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10" />
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-8" initial="hidden" animate="visible" variants={staggerContainer}>
              <div className="space-y-4">
                <motion.div variants={fadeInUp}>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Revolutionary Wiring Technology</Badge>
                </motion.div>
                <motion.h1 className="text-4xl md:text-6xl font-bold leading-tight" variants={fadeInUp}>
                  <motion.span
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Underfloor Wiring
                  </motion.span>
                  <br />
                  Solutions That
                  <br />
                  <motion.span
                    className="text-gray-900 inline-block"
                    whileHover={{
                      background: "linear-gradient(45deg, #3B82F6, #6366F1)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Transform
                  </motion.span>{" "}
                  Infrastructure
                </motion.h1>
                <motion.p className="text-xl text-gray-600 leading-relaxed" variants={fadeInUp}>
                  Discover the superior alternative to traditional bus bars. Our cutting-edge underfloor wiring
                  solutions deliver unmatched efficiency, safety, and cost-effectiveness for modern industrial
                  applications.
                </motion.p>
              </div>

              <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6"
                    onClick={() => scrollToSection("contact")}
                  >
                    Schedule Consultation
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 border-2 hover:bg-blue-50 bg-transparent"
                    onClick={() => scrollToSection("benefits")}
                  >
                    <motion.div
                      className="mr-2"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Play className="w-5 h-5" />
                    </motion.div>
                    Learn More
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div className="grid grid-cols-3 gap-8 pt-8" variants={staggerContainer}>
                {[
                  { value: "50%", label: "Cost Reduction" },
                  { value: "99.9%", label: "Reliability" },
                  { value: "24/7", label: "Support" },
                ].map((stat, index) => (
                  <motion.div key={index} className="text-center" variants={scaleIn} whileHover={{ y: -5 }}>
                    <motion.div
                      className="text-3xl font-bold text-blue-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + index * 0.2, type: "spring", stiffness: 200 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div className="relative" initial="hidden" animate="visible" variants={slideInRight}>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl opacity-20"
                animate={{
                  rotate: [6, 8, 6],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="relative bg-white rounded-3xl p-8 shadow-2xl"
                whileHover={{
                  y: -10,
                  boxShadow: "0 40px 80px rgba(0,0,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Underfloor Wiring Solution"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-2xl"
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <CheckCircle className="w-6 h-6" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.button
          onClick={() => scrollToSection("benefits")}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          whileHover={{ scale: 1.2 }}
        >
          <ChevronDown className="w-8 h-8 text-blue-600" />
        </motion.button>
      </motion.section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-blue-100 text-blue-700 mb-4">Why Choose Underfloor Wiring</Badge>
            </motion.div>
            <motion.h2 className="text-4xl font-bold mb-6" variants={fadeInUp}>
              Unmatched Benefits for
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                style={{ display: "inline-block" }}
              >
                {" "}
                Modern Infrastructure
              </motion.span>
            </motion.h2>
            <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={fadeInUp}>
              Our underfloor wiring solutions provide superior performance, safety, and cost-effectiveness compared to
              traditional bus bar systems.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Enhanced Safety",
                description:
                  "Reduced electrical hazards with enclosed wiring systems and improved fire safety ratings.",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Cost Efficiency",
                description:
                  "Up to 50% reduction in installation and maintenance costs compared to traditional bus bars.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Superior Performance",
                description: "Higher current capacity and better heat dissipation for optimal electrical performance.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Easy Installation",
                description: "Streamlined installation process that reduces downtime and labor requirements.",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Compliance Ready",
                description: "Meets all industry standards and regulations for electrical safety and performance.",
                color: "from-indigo-500 to-blue-500",
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Future-Proof",
                description: "Scalable design that adapts to evolving electrical demands and technology upgrades.",
                color: "from-teal-500 to-green-500",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                  scale: 1.02,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="group border-0 shadow-lg h-full bg-gradient-to-br from-white to-gray-50/50">
                  <CardHeader>
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center text-white mb-4`}
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -10, 10, 0],
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {benefit.icon}
                    </motion.div>
                    <CardTitle className="text-xl font-bold">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-indigo-100 text-indigo-700 mb-4">Head-to-Head Comparison</Badge>
            </motion.div>
            <motion.h2 className="text-4xl font-bold mb-6" variants={fadeInUp}>
              Underfloor Wiring vs
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                style={{ display: "inline-block" }}
              >
                {" "}
                Traditional Bus Bars
              </motion.span>
            </motion.h2>
            <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={fadeInUp}>
              See why industry leaders are making the switch to our advanced underfloor wiring solutions.
            </motion.p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Underfloor Wiring */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInLeft}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 30px 60px rgba(34, 197, 94, 0.2)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-2 border-green-200 bg-green-50/50 shadow-xl h-full">
                  <CardHeader className="text-center pb-6">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Zap className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-green-700">Underfloor Wiring</CardTitle>
                    <CardDescription className="text-green-600">Modern Solution</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      "50% lower installation costs",
                      "Enhanced safety with enclosed systems",
                      "Superior heat dissipation",
                      "Minimal maintenance requirements",
                      "Flexible and scalable design",
                      "Compliance with latest standards",
                      "Reduced electromagnetic interference",
                      "Longer lifespan (25+ years)",
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        </motion.div>
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Traditional Bus Bars */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInRight}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 30px 60px rgba(107, 114, 128, 0.2)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-2 border-gray-200 bg-gray-50/50 shadow-xl h-full">
                  <CardHeader className="text-center pb-6">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: -360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Shield className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-gray-700">Traditional Bus Bars</CardTitle>
                    <CardDescription className="text-gray-600">Legacy Solution</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      "Higher installation and material costs",
                      "Exposed conductors pose safety risks",
                      "Heat buildup and efficiency issues",
                      "Regular maintenance required",
                      "Limited flexibility for changes",
                      "May not meet modern standards",
                      "Electromagnetic interference concerns",
                      "Shorter lifespan (15-20 years)",
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ x: -5 }}
                      >
                        <motion.div whileHover={{ scale: 1.2, rotate: 180 }} transition={{ duration: 0.3 }}>
                          <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                        </motion.div>
                        <span className="text-gray-600">{feature}</span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6"
                  onClick={() => scrollToSection("contact")}
                >
                  Get Detailed Comparison Report
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-purple-100 text-purple-700 mb-4">Our Solutions</Badge>
            </motion.div>
            <motion.h2 className="text-4xl font-bold mb-6" variants={fadeInUp}>
              Tailored Underfloor Wiring
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                style={{ display: "inline-block" }}
              >
                {" "}
                for Every Industry
              </motion.span>
            </motion.h2>
            <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={fadeInUp}>
              From manufacturing facilities to data centers, we provide customized solutions that meet your specific
              requirements.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Manufacturing Facilities",
                description: "Heavy-duty wiring solutions for industrial equipment and production lines.",
                image: "/placeholder.svg?height=200&width=300",
                features: ["High current capacity", "Vibration resistant", "Easy maintenance access"],
              },
              {
                title: "Data Centers",
                description: "Precision wiring for critical IT infrastructure and server environments.",
                image: "/placeholder.svg?height=200&width=300",
                features: ["Low EMI design", "Redundant pathways", "Hot-swappable components"],
              },
              {
                title: "Commercial Buildings",
                description: "Flexible wiring systems for office spaces and retail environments.",
                image: "/placeholder.svg?height=200&width=300",
                features: ["Modular design", "Future expansion ready", "Aesthetic integration"],
              },
            ].map((solution, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  y: -15,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                  scale: 1.02,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="group overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }}>
                      <Image
                        src={solution.image || "/placeholder.svg"}
                        alt={solution.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{solution.title}</CardTitle>
                    <CardDescription className="text-gray-600">{solution.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {solution.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1, duration: 0.3 }}
                        >
                          <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </motion.div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated Background Pattern */}
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{
                backgroundImage:
                  'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
                backgroundSize: "60px 60px",
              }}
            />

            <motion.h3
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Ready to Transform Your Infrastructure?
            </motion.h3>
            <motion.p
              className="text-xl mb-8 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Join hundreds of companies that have already made the switch to superior underfloor wiring solutions.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
                  onClick={() => scrollToSection("contact")}
                >
                  Schedule Site Assessment
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6 bg-transparent"
                >
                  Download Brochure
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-yellow-100 text-yellow-700 mb-4">Client Success Stories</Badge>
            </motion.div>
            <motion.h2 className="text-4xl font-bold mb-6" variants={fadeInUp}>
              What Our
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                style={{ display: "inline-block" }}
              >
                {" "}
                Clients Say
              </motion.span>
            </motion.h2>
            <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={fadeInUp}>
              Discover how Apex Wiring Solutions has transformed businesses across various industries.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                name: "Sarah Johnson",
                title: "Facilities Manager",
                company: "TechCorp Manufacturing",
                content:
                  "The underfloor wiring solution reduced our installation time by 60% and eliminated safety concerns we had with our old bus bar system. Outstanding results!",
                rating: 5,
              },
              {
                name: "Michael Chen",
                title: "Chief Engineer",
                company: "DataFlow Systems",
                content:
                  "Apex delivered a custom solution that perfectly met our data center requirements. The reliability and performance have exceeded our expectations.",
                rating: 5,
              },
              {
                name: "Emily Rodriguez",
                title: "Operations Director",
                company: "GreenTech Industries",
                content:
                  "The cost savings and improved safety features made this an easy decision. The team's expertise and support throughout the project was exceptional.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                  scale: 1.02,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-white shadow-lg h-full">
                  <CardHeader>
                    <motion.div
                      className="flex items-center space-x-1 mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: 0.5 + i * 0.1,
                            duration: 0.5,
                            type: "spring",
                            stiffness: 200,
                          }}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                        >
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </motion.div>
                    <CardDescription className="text-gray-700 text-base leading-relaxed">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </motion.div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.title}</div>
                        <div className="text-sm text-blue-600 font-medium">{testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-green-100 text-green-700 mb-4">Get Started Today</Badge>
            </motion.div>
            <motion.h2 className="text-4xl font-bold mb-6" variants={fadeInUp}>
              Ready to Upgrade Your
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                style={{ display: "inline-block" }}
              >
                {" "}
                Electrical Infrastructure?
              </motion.span>
            </motion.h2>
            <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={fadeInUp}>
              Contact our experts for a free consultation and discover how underfloor wiring can transform your
              facility.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInLeft}
            >
              <motion.div
                whileHover={{
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                  y: -5,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Request Consultation</CardTitle>
                    <CardDescription>
                      Fill out the form below and our team will contact you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <motion.div
                      className="grid md:grid-cols-2 gap-4"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                    >
                      <motion.div className="space-y-2" variants={fadeInUp}>
                        <label className="text-sm font-medium text-gray-700">First Name</label>
                        <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                          <Input placeholder="John" />
                        </motion.div>
                      </motion.div>
                      <motion.div className="space-y-2" variants={fadeInUp}>
                        <label className="text-sm font-medium text-gray-700">Last Name</label>
                        <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                          <Input placeholder="Doe" />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <label className="text-sm font-medium text-gray-700">Company</label>
                      <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Input placeholder="Your Company Name" />
                      </motion.div>
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Input type="email" placeholder="john@company.com" />
                      </motion.div>
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Input type="tel" placeholder="+1 (555) 123-4567" />
                      </motion.div>
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <label className="text-sm font-medium text-gray-700">Project Details</label>
                      <motion.textarea
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                        placeholder="Tell us about your project requirements..."
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-6">
                        Schedule Consultation
                        <motion.div
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInRight}
            >
              <div>
                <motion.h3 className="text-2xl font-bold mb-6" variants={fadeInUp}>
                  Get in Touch
                </motion.h3>
                <motion.div className="space-y-6" variants={staggerContainer}>
                  {[
                    {
                      icon: <Phone className="w-6 h-6 text-blue-600" />,
                      title: "Phone",
                      content: "+1 (555) 123-4567",
                      subtitle: "Mon-Fri 8AM-6PM EST",
                    },
                    {
                      icon: <Mail className="w-6 h-6 text-blue-600" />,
                      title: "Email",
                      content: "info@apexwiring.com",
                      subtitle: "We'll respond within 24 hours",
                    },
                    {
                      icon: <MapPin className="w-6 h-6 text-blue-600" />,
                      title: "Office",
                      content: "123 Industrial Blvd\nTech City, TC 12345",
                      subtitle: "Visit by appointment",
                    },
                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      variants={fadeInUp}
                      whileHover={{ x: 10, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgb(59 130 246)",
                          color: "white",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {contact.icon}
                      </motion.div>
                      <div>
                        <div className="font-semibold text-gray-900">{contact.title}</div>
                        <div className="text-gray-600 whitespace-pre-line">{contact.content}</div>
                        <div className="text-sm text-gray-500">{contact.subtitle}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8"
                variants={scaleIn}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.h4
                  className="text-xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Why Choose Apex?
                </motion.h4>
                <motion.ul className="space-y-3" variants={staggerContainer} initial="hidden" whileInView="visible">
                  {[
                    "25+ years of industry experience",
                    "Certified electrical engineers",
                    "24/7 technical support",
                    "Nationwide service coverage",
                    "Comprehensive warranty programs",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center space-x-3"
                      variants={fadeInUp}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      </motion.div>
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="bg-gray-900 text-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            className="grid md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="space-y-4" variants={fadeInUp}>
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Zap className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-xl font-bold">Apex Wiring Solutions</span>
              </motion.div>
              <p className="text-gray-400">
                Leading provider of innovative underfloor wiring solutions for modern industrial applications.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-gray-400">
                {[
                  { label: "Manufacturing", href: "#" },
                  { label: "Data Centers", href: "#" },
                  { label: "Commercial", href: "#" },
                  { label: "Industrial", href: "#" },
                ].map((item, index) => (
                  <motion.li key={index} whileHover={{ x: 5, color: "#ffffff" }}>
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                {[
                  { label: "About Us", href: "#" },
                  { label: "Careers", href: "#" },
                  { label: "News", href: "#" },
                  { label: "Contact", href: "#" },
                ].map((item, index) => (
                  <motion.li key={index} whileHover={{ x: 5, color: "#ffffff" }}>
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                {[
                  { label: "Documentation", href: "#" },
                  { label: "Technical Support", href: "#" },
                  { label: "Warranty", href: "#" },
                  { label: "Training", href: "#" },
                ].map((item, index) => (
                  <motion.li key={index} whileHover={{ x: 5, color: "#ffffff" }}>
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-gray-400">© {new Date().getFullYear()} Apex Wiring Solutions. All rights reserved.</p>
            <motion.div
              className="flex space-x-6 mt-4 md:mt-0"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
