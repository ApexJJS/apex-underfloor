"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  ChevronDown,
  Menu,
  X,
  FileText,
  Award,
  Download,
  AlertTriangle,
} from "lucide-react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { ProductConfigurator } from "@/components/product-configurator"

export default function ApexWiringLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [roiInputs, setRoiInputs] = useState({
    facilitySize: 50000,
    currentSystem: "busway",
    installationComplexity: "standard",
  })

  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  // Mouse tracking for magnetic effects
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleScroll = () => {
      const sections = [
        "hero",
        "specifications",
        "comparison",
        "product-configurator",
        "case-studies",
        "roi-calculator",
        "certifications",
        "contact",
      ]
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

  // Calculate ROI
  const calculateROI = () => {
    const baseCostPerSqFt = roiInputs.currentSystem === "busway" ? 45 : 38
    const apexCostPerSqFt = 28
    const complexityMultiplier = roiInputs.installationComplexity === "complex" ? 1.3 : 1.0

    const traditionalCost = roiInputs.facilitySize * baseCostPerSqFt * complexityMultiplier
    const apexCost = roiInputs.facilitySize * apexCostPerSqFt
    const savings = traditionalCost - apexCost
    const roiPercentage = ((savings / apexCost) * 100).toFixed(1)

    return {
      traditionalCost,
      apexCost,
      savings,
      roiPercentage,
      paybackMonths: Math.round((apexCost / (savings / 12)) * 10) / 10,
    }
  }

  const roiResults = calculateROI()

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
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
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const slideInLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const slideInRight = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Custom Cursor - Hidden on mobile */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-orange-500/30 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-slate-700 to-slate-900 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="w-4 h-4 text-orange-500" />
              </motion.div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-slate-900">Apex Wiring Solutions</span>
                <div className="text-xs text-slate-600 font-medium">Industrial Power Distribution</div>
              </div>
              <div className="sm:hidden">
                <span className="text-lg font-bold text-slate-900">Apex</span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {[
                { id: "hero", label: "Overview" },
                { id: "specifications", label: "Specs" },
                { id: "comparison", label: "Comparison" },
                { id: "product-configurator", label: "Configurator" },
                { id: "case-studies", label: "Case Studies" },
                { id: "roi-calculator", label: "ROI" },
                { id: "contact", label: "Contact" },
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-orange-600 relative ${
                    activeSection === item.id ? "text-orange-600" : "text-slate-700"
                  }`}
                  whileHover={{ y: -1 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-600"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white px-6 py-2"
                >
                  Get Quote
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
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
                className="lg:hidden py-4 border-t border-gray-200"
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
                    { id: "hero", label: "Overview" },
                    { id: "specifications", label: "Specifications" },
                    { id: "comparison", label: "Comparison" },
                    { id: "product-configurator", label: "Configurator" },
                    { id: "case-studies", label: "Case Studies" },
                    { id: "roi-calculator", label: "ROI Calculator" },
                    { id: "contact", label: "Contact" },
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-2"
                      variants={fadeInUp}
                      whileHover={{ x: 5 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  <motion.div variants={fadeInUp} className="pt-2">
                    <Button
                      onClick={() => scrollToSection("contact")}
                      className="w-full bg-gradient-to-r from-slate-700 to-slate-900"
                    >
                      Get Quote
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
        className="pt-16 min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              className="space-y-6 lg:space-y-8"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <div className="space-y-4 lg:space-y-6">
                <motion.div variants={fadeInUp}>
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 font-semibold text-sm px-3 py-1">
                    UL Listed • NEC Compliant • 25+ Years Experience
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-slate-900"
                  variants={fadeInUp}
                >
                  <motion.span
                    className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Underfloor Power Distribution Systems
                  </motion.span>
                  <br />
                  <motion.span
                    className="text-orange-600"
                    whileHover={{
                      background: "linear-gradient(45deg, #ea580c, #dc2626)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Engineered for Performance
                  </motion.span>
                </motion.h1>

                <motion.p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl" variants={fadeInUp}>
                  Replace costly busway installations with our UL-listed underfloor power distribution systems. Reduce
                  installation costs by $12-18/sq ft while improving safety, flexibility, and long-term reliability.
                </motion.p>
              </div>

              <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 w-full sm:w-auto"
                    onClick={() => scrollToSection("contact")}
                  >
                    Request Engineering Consultation
                    <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 border-2 border-slate-300 hover:bg-slate-50 bg-transparent text-slate-700 w-full sm:w-auto"
                    onClick={() => scrollToSection("specifications")}
                  >
                    <FileText className="mr-2 w-4 h-4 lg:w-5 lg:h-5" />
                    Technical Specs
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div className="grid grid-cols-3 gap-4 lg:gap-8 pt-6 lg:pt-8" variants={staggerContainer}>
                {[
                  { value: "600V", label: "Max Voltage", unit: "UL Listed" },
                  { value: "2000A", label: "Current Capacity", unit: "Per Circuit" },
                  { value: "500+", label: "Installations", unit: "Nationwide" },
                ].map((stat, index) => (
                  <motion.div key={index} className="text-center" variants={scaleIn} whileHover={{ y: -2 }}>
                    <motion.div
                      className="text-xl lg:text-3xl font-bold text-slate-800"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + index * 0.2, type: "spring", stiffness: 200 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs lg:text-sm text-slate-600 font-medium">{stat.label}</div>
                    <div className="text-xs text-orange-600 font-semibold">{stat.unit}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Certifications */}
              <motion.div className="flex flex-wrap items-center gap-4 pt-4" variants={fadeInUp}>
                <div className="text-sm text-slate-600 font-medium">Certified by:</div>
                <div className="flex flex-wrap items-center gap-2">
                  {["UL", "CSA", "NEC", "OSHA"].map((cert, index) => (
                    <motion.div
                      key={cert}
                      className="px-2 lg:px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-700"
                      whileHover={{ scale: 1.05, backgroundColor: "#f1f5f9" }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5 + index * 0.1 }}
                    >
                      {cert}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="relative mt-8 lg:mt-0" initial="hidden" animate="visible" variants={slideInRight}>
              <motion.div
                className="relative bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-slate-200"
                whileHover={{
                  y: -5,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Underfloor Power Distribution System Cross-Section"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-xl lg:rounded-2xl"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-bold">
                  UL Listed
                </div>
                <motion.div
                  className="absolute -bottom-3 -right-3 lg:-bottom-4 lg:-right-4 bg-orange-500 text-white p-2 lg:p-3 rounded-full shadow-lg"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <Award className="w-4 h-4 lg:w-6 lg:h-6" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.button
          onClick={() => scrollToSection("specifications")}
          className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          whileHover={{ scale: 1.1 }}
        >
          <ChevronDown className="w-6 h-6 lg:w-8 lg:h-8 text-slate-600" />
        </motion.button>
      </motion.section>

      {/* Technical Specifications Section */}
      <section id="specifications" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-slate-100 text-slate-700 mb-4 font-semibold">Technical Specifications</Badge>
            </motion.div>
            <motion.h2
              className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 text-slate-900"
              variants={fadeInUp}
            >
              Engineered for Industrial Performance
            </motion.h2>
            <motion.p
              className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Our underfloor power distribution systems meet the most demanding industrial requirements with UL-listed
              components and NEC-compliant installations.
            </motion.p>
          </motion.div>

          <Tabs defaultValue="electrical" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6 lg:mb-8 h-auto">
              <TabsTrigger value="electrical" className="font-semibold text-sm lg:text-base py-3">
                Electrical
              </TabsTrigger>
              <TabsTrigger value="mechanical" className="font-semibold text-sm lg:text-base py-3">
                Mechanical
              </TabsTrigger>
              <TabsTrigger value="environmental" className="font-semibold text-sm lg:text-base py-3">
                Environmental
              </TabsTrigger>
              <TabsTrigger value="compliance" className="font-semibold text-sm lg:text-base py-3">
                Compliance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="electrical">
              <motion.div
                className="grid lg:grid-cols-2 gap-6 lg:gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp}>
                  <Card className="h-full">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
                        <Zap className="w-5 h-5 text-orange-600" />
                        <span>Power Ratings</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3 lg:gap-4">
                        <div className="bg-slate-50 p-3 lg:p-4 rounded-lg text-center">
                          <div className="text-xl lg:text-2xl font-bold text-slate-900">600V</div>
                          <div className="text-xs lg:text-sm text-slate-600">Maximum Voltage</div>
                        </div>
                        <div className="bg-slate-50 p-3 lg:p-4 rounded-lg text-center">
                          <div className="text-xl lg:text-2xl font-bold text-slate-900">2000A</div>
                          <div className="text-xs lg:text-sm text-slate-600">Current Capacity</div>
                        </div>
                        <div className="bg-slate-50 p-3 lg:p-4 rounded-lg text-center">
                          <div className="text-xl lg:text-2xl font-bold text-slate-900">65kA</div>
                          <div className="text-xs lg:text-sm text-slate-600">Fault Current Rating</div>
                        </div>
                        <div className="bg-slate-50 p-3 lg:p-4 rounded-lg text-center">
                          <div className="text-xl lg:text-2xl font-bold text-slate-900">3Ø</div>
                          <div className="text-xs lg:text-sm text-slate-600">Phase Configuration</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Card className="h-full">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
                        <Shield className="w-5 h-5 text-green-600" />
                        <span>Safety Features</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        "Ground fault protection (30mA sensitivity)",
                        "Arc fault circuit interruption (AFCI)",
                        "Overcurrent protection per NEC 240",
                        "IP54 rated enclosures",
                        "Class I, Division 2 hazardous location rated",
                        "Emergency disconnect capability",
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm lg:text-base text-slate-700 leading-relaxed">{feature}</span>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="mechanical">
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {[
                  {
                    title: "Installation Depth",
                    specs: [
                      { label: "Minimum depth", value: "4 inches" },
                      { label: "Standard depth", value: "6 inches" },
                      { label: "Maximum depth", value: "12 inches" },
                      { label: "Access floor compatibility", value: "Yes" },
                    ],
                  },
                  {
                    title: "Load Capacity",
                    specs: [
                      { label: "Distributed load", value: "250 lbs/sq ft" },
                      { label: "Concentrated load", value: "2000 lbs" },
                      { label: "Rolling load", value: "1000 lbs" },
                      { label: "Seismic rating", value: "Zone 4" },
                    ],
                  },
                  {
                    title: "Materials",
                    specs: [
                      { label: "Conductor", value: "Copper (99.9%)" },
                      { label: "Insulation", value: "XLPE rated 90°C" },
                      { label: "Enclosure", value: "Aluminum/Steel" },
                      { label: "Finish", value: "Powder coat" },
                    ],
                  },
                ].map((section, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="h-full">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {section.specs.map((spec, specIndex) => (
                          <div key={specIndex} className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">{spec.label}</span>
                            <span className="text-sm font-semibold text-slate-900">{spec.value}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="environmental">
              <motion.div
                className="grid lg:grid-cols-2 gap-6 lg:gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg lg:text-xl">Operating Conditions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3 lg:gap-4">
                        <div className="text-center p-3 lg:p-4 bg-blue-50 rounded-lg">
                          <div className="text-lg lg:text-xl font-bold text-blue-900">-40°C to +75°C</div>
                          <div className="text-xs lg:text-sm text-blue-700">Operating Temperature</div>
                        </div>
                        <div className="text-center p-3 lg:p-4 bg-blue-50 rounded-lg">
                          <div className="text-lg lg:text-xl font-bold text-blue-900">5% to 95%</div>
                          <div className="text-xs lg:text-sm text-blue-700">Relative Humidity</div>
                        </div>
                        <div className="text-center p-3 lg:p-4 bg-blue-50 rounded-lg">
                          <div className="text-lg lg:text-xl font-bold text-blue-900">IP54</div>
                          <div className="text-xs lg:text-sm text-blue-700">Ingress Protection</div>
                        </div>
                        <div className="text-center p-3 lg:p-4 bg-blue-50 rounded-lg">
                          <div className="text-lg lg:text-xl font-bold text-blue-900">3000m</div>
                          <div className="text-xs lg:text-sm text-blue-700">Max Altitude</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg lg:text-xl">Environmental Resistance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        "Corrosion resistant coating (1000+ hour salt spray)",
                        "UV stable materials for outdoor applications",
                        "Chemical resistance to industrial solvents",
                        "Vibration tested per IEC 60068-2-6",
                        "Thermal cycling tested (-40°C to +85°C)",
                        "Moisture resistance per ASTM D570",
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Shield className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm lg:text-base text-slate-700 leading-relaxed">{feature}</span>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="compliance">
              <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {[
                  {
                    title: "UL Listed",
                    number: "UL 857",
                    description: "Busways and associated fittings",
                    icon: <Award className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />,
                  },
                  {
                    title: "NEC Compliant",
                    number: "Article 368",
                    description: "Busway installation requirements",
                    icon: <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />,
                  },
                  {
                    title: "CSA Certified",
                    number: "CSA C22.2",
                    description: "Canadian electrical standards",
                    icon: <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-red-600" />,
                  },
                  {
                    title: "OSHA Approved",
                    number: "29 CFR 1910",
                    description: "Workplace electrical safety",
                    icon: <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600" />,
                  },
                ].map((cert, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="text-center h-full hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-4">
                        <div className="flex justify-center mb-3">{cert.icon}</div>
                        <CardTitle className="text-lg">{cert.title}</CardTitle>
                        <CardDescription className="font-mono text-sm">{cert.number}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 leading-relaxed">{cert.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-orange-100 text-orange-800 mb-4 font-semibold">Performance Comparison</Badge>
            </motion.div>
            <motion.h2
              className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 text-slate-900"
              variants={fadeInUp}
            >
              Underfloor Power vs Traditional Busway
            </motion.h2>
            <motion.p
              className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Engineering analysis shows significant advantages in cost, safety, and performance when comparing our
              underfloor systems to overhead busway installations.
            </motion.p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Apex Underfloor System */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInLeft}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 20px 40px rgba(34, 197, 94, 0.15)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-2 border-green-200 bg-green-50/50 shadow-lg h-full">
                  <CardHeader className="text-center pb-4 lg:pb-6">
                    <motion.div
                      className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4"
                      whileHover={{ rotate: 180, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl lg:text-2xl font-bold text-green-800">
                      Apex Underfloor Power
                    </CardTitle>
                    <CardDescription className="text-green-700 font-semibold">Advanced Solution</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 lg:space-y-4">
                    {[
                      { metric: "Installation Cost", value: "$28/sq ft", improvement: "40% lower" },
                      { metric: "Installation Time", value: "2-3 days", improvement: "60% faster" },
                      { metric: "Safety Rating", value: "IP54 enclosed", improvement: "Superior protection" },
                      { metric: "Maintenance", value: "Minimal", improvement: "5-year intervals" },
                      { metric: "Flexibility", value: "Modular design", improvement: "Easy reconfiguration" },
                      { metric: "Heat Dissipation", value: "Excellent", improvement: "Underground cooling" },
                      { metric: "EMI Interference", value: "Minimal", improvement: "Shielded design" },
                      { metric: "Service Life", value: "30+ years", improvement: "Extended warranty" },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 lg:p-4 bg-white rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ x: 2, backgroundColor: "#f0fdf4" }}
                      >
                        <div>
                          <div className="font-semibold text-slate-900 text-sm lg:text-base">{feature.metric}</div>
                          <div className="text-xs lg:text-sm text-green-600 font-medium">{feature.improvement}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-700 text-sm lg:text-base">{feature.value}</div>
                          <CheckCircle className="w-4 h-4 text-green-500 ml-auto mt-1" />
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Traditional Busway */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInRight}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 20px 40px rgba(107, 114, 128, 0.15)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-2 border-red-200 bg-red-50/50 shadow-lg h-full">
                  <CardHeader className="text-center pb-4 lg:pb-6">
                    <motion.div
                      className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4"
                      whileHover={{ rotate: -180, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AlertTriangle className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl lg:text-2xl font-bold text-red-800">Traditional Busway</CardTitle>
                    <CardDescription className="text-red-700 font-semibold">Legacy Solution</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 lg:space-y-4">
                    {[
                      { metric: "Installation Cost", value: "$45/sq ft", issue: "Higher material costs" },
                      { metric: "Installation Time", value: "5-7 days", issue: "Complex overhead work" },
                      { metric: "Safety Rating", value: "Exposed conductors", issue: "Arc flash hazards" },
                      { metric: "Maintenance", value: "Frequent", issue: "Annual inspections" },
                      { metric: "Flexibility", value: "Limited", issue: "Difficult modifications" },
                      { metric: "Heat Dissipation", value: "Poor", issue: "Heat buildup issues" },
                      { metric: "EMI Interference", value: "Significant", issue: "Unshielded design" },
                      { metric: "Service Life", value: "20 years", issue: "Standard warranty" },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 lg:p-4 bg-white rounded-lg"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ x: -2, backgroundColor: "#fef2f2" }}
                      >
                        <div>
                          <div className="font-semibold text-slate-900 text-sm lg:text-base">{feature.metric}</div>
                          <div className="text-xs lg:text-sm text-red-600 font-medium">{feature.issue}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-red-700 text-sm lg:text-base">{feature.value}</div>
                          <X className="w-4 h-4 text-red-400 ml-auto mt-1" />
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              className="text-center mt-8 lg:mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4"
                  onClick={() => scrollToSection("contact")}
                >
                  <Download className="mr-2 w-4 h-4 lg:w-5 lg:h-5" />
                  Download Engineering Comparison Report
                  <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Configurator */}
      <div id="product-configurator">
        <ProductConfigurator />
      </div>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-green-100 text-green-800 mb-4 font-semibold">Industry Case Studies</Badge>
            </motion.div>
            <motion.h2
              className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 text-slate-900"
              variants={fadeInUp}
            >
              Proven Results Across Industries
            </motion.h2>
            <motion.p
              className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Real-world implementations demonstrating cost savings, improved safety, and enhanced operational
              efficiency across manufacturing, data centers, and commercial facilities.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                industry: "Manufacturing",
                company: "Automotive Assembly Plant",
                location: "Detroit, MI",
                size: "250,000 sq ft",
                challenge: "Replace aging overhead busway system causing production delays",
                solution: "Complete underfloor power distribution with modular outlets",
                results: {
                  costSavings: "$1.2M",
                  installationTime: "3 weeks vs 8 weeks",
                  downtime: "Zero production impact",
                  efficiency: "15% energy savings",
                },
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                industry: "Data Center",
                company: "Cloud Computing Facility",
                location: "Austin, TX",
                size: "100,000 sq ft",
                challenge: "High-density power distribution with future expansion flexibility",
                solution: "Underfloor power with integrated cooling and monitoring",
                results: {
                  costSavings: "$800K",
                  installationTime: "2 weeks vs 6 weeks",
                  downtime: "Phased installation",
                  efficiency: "20% cooling savings",
                },
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                industry: "Commercial",
                company: "Corporate Headquarters",
                location: "Seattle, WA",
                size: "150,000 sq ft",
                challenge: "Open office reconfiguration with sustainable power solution",
                solution: "Flexible underfloor system with smart monitoring",
                results: {
                  costSavings: "$600K",
                  installationTime: "4 weeks vs 10 weeks",
                  downtime: "Weekend installation",
                  efficiency: "LEED Platinum certified",
                },
                image: "/placeholder.svg?height=200&width=300",
              },
            ].map((study, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <Image
                      src={study.image || "/placeholder.svg"}
                      alt={`${study.industry} case study`}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600 text-white">{study.industry}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg lg:text-xl">{study.company}</CardTitle>
                    <CardDescription className="text-slate-600">
                      {study.location} • {study.size}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Challenge</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Solution</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Results</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                          <div className="font-bold text-green-700">{study.results.costSavings}</div>
                          <div className="text-xs text-green-600">Cost Savings</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <div className="font-bold text-blue-700">{study.results.installationTime}</div>
                          <div className="text-xs text-blue-600">Installation</div>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg text-center">
                          <div className="font-bold text-purple-700">{study.results.downtime}</div>
                          <div className="text-xs text-purple-600">Downtime</div>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg text-center">
                          <div className="font-bold text-orange-700">{study.results.efficiency}</div>
                          <div className="text-xs text-orange-600">Efficiency</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi-calculator" className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-blue-100 text-blue-800 mb-4 font-semibold">ROI Calculator</Badge>
            </motion.div>
            <motion.h2
              className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 text-slate-900"
              variants={fadeInUp}
            >
              Calculate Your Project Savings
            </motion.h2>
            <motion.p
              className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Interactive calculator showing real-time cost comparisons, payback periods, and long-term savings for your
              specific facility requirements.
            </motion.p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Card className="shadow-xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl lg:text-3xl">Project ROI Analysis</CardTitle>
                  <CardDescription className="text-lg">
                    Customize the parameters below to see your potential savings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Input Controls */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-slate-700">Facility Size (sq ft)</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={roiInputs.facilitySize}
                          onChange={(e) =>
                            setRoiInputs({ ...roiInputs, facilitySize: Number.parseInt(e.target.value) || 0 })
                          }
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="50000"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-slate-700">Current System</label>
                      <select
                        value={roiInputs.currentSystem}
                        onChange={(e) => setRoiInputs({ ...roiInputs, currentSystem: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="busway">Traditional Busway</option>
                        <option value="conduit">Conduit & Wire</option>
                        <option value="cable-tray">Cable Tray System</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-slate-700">Installation Complexity</label>
                      <select
                        value={roiInputs.installationComplexity}
                        onChange={(e) => setRoiInputs({ ...roiInputs, installationComplexity: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="standard">Standard</option>
                        <option value="complex">Complex</option>
                      </select>
                    </div>
                  </div>

                  {/* Results Display */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 lg:p-8 border border-green-200">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">
                          ${roiResults.traditionalCost.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-600 font-medium">Traditional System Cost</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl lg:text-3xl font-bold text-green-700 mb-1">
                          ${roiResults.apexCost.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-600 font-medium">Apex System Cost</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl lg:text-3xl font-bold text-blue-700 mb-1">
                          ${roiResults.savings.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-600 font-medium">Total Savings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl lg:text-3xl font-bold text-purple-700 mb-1">
                          {roiResults.roiPercentage}%
                        </div>
                        <div className="text-sm text-slate-600 font-medium">ROI</div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-green-300">
                      <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="text-center sm:text-left mb-4 sm:mb-0">
                          <div className="text-lg font-semibold text-slate-900">
                            Payback Period: {roiResults.paybackMonths} months
                          </div>
                          <div className="text-sm text-slate-600">
                            Based on energy savings and reduced maintenance costs
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <Button className="bg-green-600 hover:bg-green-700">
                            <Download className="mr-2 w-4 h-4" />
                            Download Report
                          </Button>
                          <Button variant="outline" onClick={() => scrollToSection("contact")}>
                            Get Detailed Quote
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Benefits */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Installation Speed",
                        value: "60% Faster",
                        description: "Reduced project timeline means faster ROI realization",
                        icon: "⚡",
                      },
                      {
                        title: "Maintenance Savings",
                        value: "$15K/year",
                        description: "Lower ongoing maintenance and inspection costs",
                        icon: "🔧",
                      },
                      {
                        title: "Energy Efficiency",
                        value: "12% Savings",
                        description: "Improved power distribution efficiency reduces utility costs",
                        icon: "💡",
                      },
                    ].map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="text-center p-4 bg-white rounded-lg border border-slate-200"
                        whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                      >
                        <div className="text-2xl mb-2">{benefit.icon}</div>
                        <div className="font-bold text-lg text-slate-900 mb-1">{benefit.value}</div>
                        <div className="font-semibold text-slate-700 mb-2">{benefit.title}</div>
                        <div className="text-sm text-slate-600">{benefit.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-slate-100 text-slate-700 mb-4 font-semibold">Certifications & Standards</Badge>
            </motion.div>
            <motion.h2
              className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 text-slate-900"
              variants={fadeInUp}
            >
              Industry-Leading Compliance
            </motion.h2>
            <motion.p
              className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Our systems meet and exceed all major electrical safety standards, ensuring reliable operation and
              regulatory compliance for your facility.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                name: "UL Listed",
                standard: "UL 857",
                description: "Underwriters Laboratories certification for busways and electrical distribution systems",
                logo: "🏆",
                color: "blue",
              },
              {
                name: "NEC Compliant",
                standard: "Article 368",
                description: "National Electrical Code compliance for safe electrical installations",
                logo: "⚡",
                color: "green",
              },
              {
                name: "CSA Certified",
                standard: "CSA C22.2",
                description: "Canadian Standards Association certification for electrical equipment",
                logo: "🍁",
                color: "red",
              },
              {
                name: "OSHA Approved",
                standard: "29 CFR 1910",
                description: "Occupational Safety and Health Administration workplace safety standards",
                logo: "🛡️",
                color: "orange",
              },
              {
                name: "IEEE Standards",
                standard: "IEEE 1584",
                description: "Institute of Electrical and Electronics Engineers arc flash calculation standards",
                logo: "⚙️",
                color: "purple",
              },
              {
                name: "NEMA Rated",
                standard: "NEMA 1-12",
                description: "National Electrical Manufacturers Association enclosure ratings",
                logo: "🔒",
                color: "indigo",
              },
              {
                name: "IEC Compliant",
                standard: "IEC 61439",
                description: "International Electrotechnical Commission switchgear standards",
                logo: "🌍",
                color: "teal",
              },
              {
                name: "ISO Certified",
                standard: "ISO 9001",
                description: "International Organization for Standardization quality management",
                logo: "✅",
                color: "emerald",
              },
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="h-full text-center shadow-lg hover:shadow-xl transition-all">
                  <CardHeader className="pb-4">
                    <div className="text-4xl mb-3">{cert.logo}</div>
                    <CardTitle className="text-lg lg:text-xl">{cert.name}</CardTitle>
                    <CardDescription className="font-mono text-sm font-semibold">{cert.standard}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 leading-relaxed">{cert.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12 lg:mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 lg:p-8 border border-slate-200">
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4">
                25+ Years of Electrical Engineering Excellence
              </h3>
              <p className="text-slate-600 mb-6 max-w-3xl mx-auto">
                Our commitment to safety and quality is backed by decades of experience and continuous compliance with
                evolving industry standards. Every installation is performed by certified electricians and inspected to
                ensure complete regulatory compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-slate-700 to-slate-900">
                  <Download className="mr-2 w-5 h-5" />
                  Download Compliance Documentation
                </Button>
                <Button size="lg" variant="outline">
                  <Award className="mr-2 w-5 h-5" />
                  View All Certifications
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-orange-100 text-orange-800 mb-4 font-semibold">Get Started Today</Badge>
            </motion.div>
            <motion.h2
              className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 text-slate-900"
              variants={fadeInUp}
            >
              Ready to Transform Your Power Distribution?
            </motion.h2>
            <motion.p
              className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Contact our engineering team for a comprehensive consultation, custom system design, and detailed project
              proposal tailored to your facility's specific requirements.
            </motion.p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="grid lg:grid-cols-2 gap-8 lg:gap-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* Contact Information */}
              <motion.div variants={fadeInUp} className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: "📞",
                        title: "Phone",
                        value: "(555) 123-4567",
                        description: "Mon-Fri 8AM-6PM EST",
                      },
                      {
                        icon: "✉️",
                        title: "Email",
                        value: "engineering@apexwiring.com",
                        description: "Technical inquiries welcome",
                      },
                      {
                        icon: "📍",
                        title: "Address",
                        value: "123 Industrial Blvd, Suite 100",
                        description: "Manufacturing City, ST 12345",
                      },
                      {
                        icon: "🕒",
                        title: "Response Time",
                        value: "Within 24 hours",
                        description: "For all project inquiries",
                      },
                    ].map((contact, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm"
                        whileHover={{ x: 5, backgroundColor: "#f8fafc" }}
                      >
                        <div className="text-2xl">{contact.icon}</div>
                        <div>
                          <div className="font-semibold text-slate-900">{contact.title}</div>
                          <div className="text-slate-700">{contact.value}</div>
                          <div className="text-sm text-slate-600">{contact.description}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
                  <h4 className="font-bold text-orange-800 mb-3">Emergency Support Available</h4>
                  <p className="text-sm text-orange-700 mb-4">
                    24/7 emergency support for critical power distribution issues. Our certified technicians are
                    available for urgent repairs and system failures.
                  </p>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    Emergency Hotline: (555) 911-POWER
                  </Button>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div variants={fadeInUp}>
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl lg:text-2xl">Request Engineering Consultation</CardTitle>
                    <CardDescription>
                      Fill out the form below and our team will contact you within 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">First Name *</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Last Name *</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Smith"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Company *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Your Company Name"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Email *</label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="john@company.com"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Phone</label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Project Type</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option>New Installation</option>
                        <option>System Upgrade</option>
                        <option>Retrofit/Replacement</option>
                        <option>Maintenance/Repair</option>
                        <option>Consultation Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">
                        Project Details & Requirements
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Please describe your facility size, power requirements, timeline, and any specific challenges or goals for this project..."
                      />
                    </div>

                    <div className="flex items-start space-x-3">
                      <input type="checkbox" className="mt-1" />
                      <div className="text-sm text-slate-600">
                        I agree to receive communications from Apex Wiring Solutions regarding my project inquiry. You
                        can unsubscribe at any time.
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" className="w-full bg-gradient-to-r from-slate-700 to-slate-900 text-lg py-4">
                        Submit Engineering Request
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </motion.div>

                    <div className="text-center text-sm text-slate-600">
                      Or call us directly at <span className="font-semibold text-slate-900">(555) 123-4567</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
