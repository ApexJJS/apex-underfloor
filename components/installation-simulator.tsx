"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  CheckCircle,
  ArrowRight,
  Users,
  Calendar,
  Wrench,
  Zap,
  Shield,
  Eye,
} from "lucide-react"

interface InstallationStep {
  id: string
  title: string
  description: string
  duration: number // in hours
  crew: number
  tools: string[]
  safety: string[]
  progress: number
}

export function InstallationSimulator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [viewMode, setViewMode] = useState<"before" | "during" | "after">("before")
  const [timelapseSpeed, setTimelapseSpeed] = useState(1)

  const installationSteps: InstallationStep[] = [
    {
      id: "site-prep",
      title: "Site Preparation",
      description: "Floor preparation, layout marking, and safety setup",
      duration: 4,
      crew: 2,
      tools: ["Laser Level", "Chalk Line", "Measuring Tools"],
      safety: ["Hard Hats", "Safety Vests", "Non-slip Shoes"],
      progress: 0,
    },
    {
      id: "excavation",
      title: "Floor Excavation",
      description: "Precise cutting and removal of concrete for underfloor channels",
      duration: 8,
      crew: 3,
      tools: ["Concrete Saw", "Jackhammer", "Vacuum System"],
      safety: ["Dust Masks", "Eye Protection", "Hearing Protection"],
      progress: 0,
    },
    {
      id: "conduit-install",
      title: "Conduit Installation",
      description: "Installation of protective conduits and support structures",
      duration: 6,
      crew: 2,
      tools: ["Conduit Bender", "Fish Tape", "Coupling Tools"],
      safety: ["Cut-resistant Gloves", "Safety Glasses"],
      progress: 0,
    },
    {
      id: "cable-pulling",
      title: "Cable Installation",
      description: "Pulling and securing electrical cables through conduit system",
      duration: 10,
      crew: 4,
      tools: ["Cable Puller", "Wire Lubricant", "Cable Tester"],
      safety: ["Electrical Safety Gear", "Lockout/Tagout"],
      progress: 0,
    },
    {
      id: "junction-install",
      title: "Junction Box Installation",
      description: "Installing and connecting distribution junction boxes",
      duration: 6,
      crew: 2,
      tools: ["Torque Wrench", "Multimeter", "Wire Strippers"],
      safety: ["Insulated Tools", "Arc Flash Protection"],
      progress: 0,
    },
    {
      id: "outlet-install",
      title: "Outlet Installation",
      description: "Installing floor outlets and making final connections",
      duration: 8,
      crew: 3,
      tools: ["Outlet Tester", "Screwdrivers", "Level"],
      safety: ["GFCI Tester", "Voltage Detector"],
      progress: 0,
    },
    {
      id: "testing",
      title: "System Testing",
      description: "Comprehensive testing and commissioning of the complete system",
      duration: 4,
      crew: 2,
      tools: ["Megohmmeter", "Power Quality Analyzer", "Thermal Camera"],
      safety: ["PPE", "Test Equipment Safety"],
      progress: 0,
    },
    {
      id: "restoration",
      title: "Floor Restoration",
      description: "Concrete patching, finishing, and final cleanup",
      duration: 6,
      crew: 3,
      tools: ["Concrete Mixer", "Trowels", "Polisher"],
      safety: ["Dust Control", "Ventilation"],
      progress: 0,
    },
  ]

  const totalDuration = installationSteps.reduce((sum, step) => sum + step.duration, 0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + timelapseSpeed * 0.5
          if (newProgress >= 100) {
            setIsPlaying(false)
            return 100
          }

          // Update current step based on progress
          let cumulativeDuration = 0
          for (let i = 0; i < installationSteps.length; i++) {
            cumulativeDuration += installationSteps[i].duration
            if ((newProgress / 100) * totalDuration <= cumulativeDuration) {
              setCurrentStep(i)
              break
            }
          }

          return newProgress
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, timelapseSpeed, totalDuration])

  const resetSimulation = () => {
    setProgress(0)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const getCurrentStepProgress = () => {
    let cumulativeDuration = 0
    for (let i = 0; i < currentStep; i++) {
      cumulativeDuration += installationSteps[i].duration
    }
    const currentStepStart = cumulativeDuration
    const currentStepEnd = cumulativeDuration + installationSteps[currentStep].duration
    const overallProgress = (progress / 100) * totalDuration

    if (overallProgress <= currentStepStart) return 0
    if (overallProgress >= currentStepEnd) return 100

    return ((overallProgress - currentStepStart) / installationSteps[currentStep].duration) * 100
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="bg-orange-100 text-orange-800 mb-4 font-semibold">Installation Simulator</Badge>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 text-slate-900">
            Virtual Installation Experience
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Step-by-step installation process with interactive timeline, before/after comparisons, and detailed
            installation views.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Control Panel */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="w-5 h-5 text-orange-600" />
                  <span>Simulation Controls</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Playback Controls */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={togglePlayPause}
                      className={`flex-1 ${isPlaying ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                    >
                      {isPlaying ? <Pause className="mr-2 w-4 h-4" /> : <Play className="mr-2 w-4 h-4" />}
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                    <Button onClick={resetSimulation} variant="outline">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Progress</span>
                      <span className="font-semibold">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  </div>

                  {/* Speed Control */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Timelapse Speed: {timelapseSpeed}x</label>
                    <Slider
                      value={[timelapseSpeed]}
                      onValueChange={([value]) => setTimelapseSpeed(value)}
                      max={5}
                      min={0.5}
                      step={0.5}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* View Mode Toggle */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">View Mode</label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { value: "before", label: "Before" },
                      { value: "during", label: "During" },
                      { value: "after", label: "After" },
                    ].map((mode) => (
                      <motion.button
                        key={mode.value}
                        onClick={() => setViewMode(mode.value as any)}
                        className={`p-2 rounded-lg text-xs font-semibold transition-all ${
                          viewMode === mode.value
                            ? "bg-orange-500 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {mode.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Current Step Info */}
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    <span className="font-semibold text-orange-800">
                      Step {currentStep + 1} of {installationSteps.length}
                    </span>
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-1">{installationSteps[currentStep]?.title}</h4>
                  <p className="text-sm text-slate-600 mb-3">{installationSteps[currentStep]?.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Step Progress</span>
                      <span className="font-semibold">{getCurrentStepProgress().toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-orange-200 rounded-full h-2">
                      <motion.div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${getCurrentStepProgress()}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Timeline */}
            <Card className="shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {installationSteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-all ${
                        index === currentStep
                          ? "bg-orange-100 border border-orange-300"
                          : index < currentStep
                            ? "bg-green-100 border border-green-300"
                            : "bg-slate-50 border border-slate-200"
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === currentStep
                            ? "bg-orange-500 text-white"
                            : index < currentStep
                              ? "bg-green-500 text-white"
                              : "bg-slate-300 text-slate-600"
                        }`}
                      >
                        {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-slate-900">{step.title}</div>
                        <div className="text-xs text-slate-600">
                          {step.duration}h • {step.crew} crew
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Visualization */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-orange-600" />
                  <span>Installation Visualization</span>
                </CardTitle>
                <CardDescription>
                  {viewMode === "before" && "Original facility layout before installation"}
                  {viewMode === "during" && `Installation in progress: ${installationSteps[currentStep]?.title}`}
                  {viewMode === "after" && "Completed underfloor power distribution system"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gradient-to-br from-slate-100 to-blue-100 rounded-xl overflow-hidden h-96 lg:h-[500px]">
                  {/* Before/During/After Views */}
                  <AnimatePresence mode="wait">
                    {viewMode === "before" && (
                      <motion.div
                        key="before"
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="text-center">
                          <div className="w-32 h-32 bg-slate-300 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <div className="text-4xl">🏢</div>
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 mb-2">Original Facility</h3>
                          <p className="text-slate-600 max-w-md">
                            Traditional overhead power distribution with exposed busways and limited flexibility.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {viewMode === "during" && (
                      <motion.div
                        key="during"
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Construction Animation */}
                        <div className="relative w-full h-full">
                          <svg viewBox="0 0 800 400" className="w-full h-full">
                            {/* Floor */}
                            <rect x="100" y="300" width="600" height="50" fill="#64748b" />

                            {/* Installation Progress Visualization */}
                            {currentStep >= 0 && (
                              <motion.g
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                              >
                                {/* Site preparation markers */}
                                <circle cx="200" cy="280" r="5" fill="#f59e0b" />
                                <circle cx="400" cy="280" r="5" fill="#f59e0b" />
                                <circle cx="600" cy="280" r="5" fill="#f59e0b" />
                              </motion.g>
                            )}

                            {currentStep >= 1 && (
                              <motion.g
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                              >
                                {/* Excavation lines */}
                                <motion.line
                                  x1="150"
                                  y1="300"
                                  x2="650"
                                  y2="300"
                                  stroke="#ef4444"
                                  strokeWidth="4"
                                  strokeDasharray="10,5"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: getCurrentStepProgress() / 100 }}
                                  transition={{ duration: 0.5 }}
                                />
                              </motion.g>
                            )}

                            {currentStep >= 2 && (
                              <motion.g
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                              >
                                {/* Conduit installation */}
                                <rect x="180" y="295" width="440" height="10" fill="#3b82f6" rx="5" />
                              </motion.g>
                            )}

                            {currentStep >= 3 && (
                              <motion.g
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                              >
                                {/* Cable installation */}
                                <motion.path
                                  d="M 200 300 Q 400 280 600 300"
                                  stroke="#f97316"
                                  strokeWidth="3"
                                  fill="none"
                                  strokeDasharray="5,3"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: getCurrentStepProgress() / 100 }}
                                  transition={{ duration: 1 }}
                                />
                              </motion.g>
                            )}

                            {currentStep >= 4 && (
                              <motion.g
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                              >
                                {/* Junction boxes */}
                                <rect x="290" y="285" width="20" height="20" fill="#8b5cf6" rx="3" />
                                <rect x="490" y="285" width="20" height="20" fill="#8b5cf6" rx="3" />
                              </motion.g>
                            )}

                            {currentStep >= 5 && (
                              <motion.g
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 1 }}
                              >
                                {/* Outlets */}
                                <circle cx="250" cy="295" r="8" fill="#10b981" />
                                <circle cx="400" cy="295" r="8" fill="#10b981" />
                                <circle cx="550" cy="295" r="8" fill="#10b981" />
                              </motion.g>
                            )}

                            {/* Workers Animation */}
                            <motion.g
                              animate={{ x: [0, 50, 0] }}
                              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <circle cx="350" cy="250" r="15" fill="#fbbf24" />
                              <text x="350" y="255" textAnchor="middle" className="text-xs font-bold">
                                👷
                              </text>
                            </motion.g>
                          </svg>

                          {/* Progress Overlay */}
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                            <div className="flex items-center space-x-2">
                              <Wrench className="w-4 h-4 text-orange-600" />
                              <span className="text-sm font-semibold text-slate-900">
                                {installationSteps[currentStep]?.title}
                              </span>
                            </div>
                            <div className="text-xs text-slate-600 mt-1">
                              {getCurrentStepProgress().toFixed(0)}% Complete
                            </div>
                          </div>

                          {/* Time Remaining */}
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-semibold text-slate-900">
                                {((totalDuration * (100 - progress)) / 100).toFixed(1)}h remaining
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {viewMode === "after" && (
                      <motion.div
                        key="after"
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="text-center">
                          <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <Zap className="w-16 h-16 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 mb-2">Completed Installation</h3>
                          <p className="text-slate-600 max-w-md">
                            Modern underfloor power distribution system with enhanced safety, flexibility, and
                            efficiency.
                          </p>
                          <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                            <div className="text-center">
                              <div className="font-bold text-green-600">98.5%</div>
                              <div className="text-slate-600">Efficiency</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-blue-600">IP54</div>
                              <div className="text-slate-600">Protection</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-purple-600">30yr</div>
                              <div className="text-slate-600">Lifespan</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Installation Details */}
                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-blue-800">Crew Size</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">{installationSteps[currentStep]?.crew || 0}</div>
                    <div className="text-sm text-blue-700">Technicians</div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-800">Duration</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      {installationSteps[currentStep]?.duration || 0}h
                    </div>
                    <div className="text-sm text-green-700">This Step</div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-purple-800">Safety</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900">100%</div>
                    <div className="text-sm text-purple-700">Compliance</div>
                  </div>
                </div>

                {/* Tools and Safety Requirements */}
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                      <Wrench className="w-4 h-4 text-slate-600" />
                      <span>Required Tools</span>
                    </h4>
                    <div className="space-y-2">
                      {installationSteps[currentStep]?.tools.map((tool, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-slate-700">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-slate-600" />
                      <span>Safety Requirements</span>
                    </h4>
                    <div className="space-y-2">
                      {installationSteps[currentStep]?.safety.map((safety, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-orange-500" />
                          <span className="text-sm text-slate-700">{safety}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-lg py-6">
                      <Calendar className="mr-2 w-5 h-5" />
                      Schedule Installation
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button variant="outline" className="w-full text-lg py-6 border-2 bg-transparent">
                      <ArrowRight className="mr-2 w-5 h-5" />
                      Get Timeline Quote
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
