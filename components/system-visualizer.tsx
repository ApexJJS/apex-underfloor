"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, ZoomIn, ZoomOut, RotateCcw, Layers, Zap, Settings, Activity, Thermometer, Shield } from "lucide-react"

interface Hotspot {
  id: string
  x: number
  y: number
  title: string
  specs: {
    voltage?: string
    current?: string
    power?: string
    type: string
  }
  description: string
}

export function SystemVisualizer() {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [showPowerFlow, setShowPowerFlow] = useState(true)
  const [viewMode, setViewMode] = useState<"overview" | "detailed" | "thermal">("overview")
  const containerRef = useRef<HTMLDivElement>(null)

  const hotspots: Hotspot[] = [
    {
      id: "main-feed",
      x: 15,
      y: 25,
      title: "Main Power Feed",
      specs: { voltage: "480V", current: "2000A", power: "1.7MW", type: "Primary Distribution" },
      description: "Primary electrical connection point with full fault protection and monitoring capabilities.",
    },
    {
      id: "junction-1",
      x: 35,
      y: 40,
      title: "Distribution Junction A",
      specs: { voltage: "208V", current: "400A", power: "144kW", type: "Secondary Distribution" },
      description: "Secondary distribution hub serving workstation clusters with load balancing.",
    },
    {
      id: "workstation-1",
      x: 60,
      y: 30,
      title: "Workstation Cluster 1",
      specs: { voltage: "120V", current: "20A", power: "2.4kW", type: "End User Power" },
      description: "Individual workstation power outlets with USB charging and data connectivity.",
    },
    {
      id: "workstation-2",
      x: 75,
      y: 55,
      title: "Workstation Cluster 2",
      specs: { voltage: "120V", current: "20A", power: "2.4kW", type: "End User Power" },
      description: "Modular outlet configuration with GFCI protection and surge suppression.",
    },
    {
      id: "server-room",
      x: 85,
      y: 75,
      title: "Server Room Feed",
      specs: { voltage: "208V", current: "100A", power: "36kW", type: "High Density" },
      description: "High-density power distribution for server racks with redundant feeds.",
    },
    {
      id: "hvac-feed",
      x: 25,
      y: 70,
      title: "HVAC Distribution",
      specs: { voltage: "480V", current: "200A", power: "166kW", type: "Mechanical Systems" },
      description: "Dedicated power feed for HVAC systems with motor protection.",
    },
  ]

  const resetView = () => {
    setZoomLevel(100)
    setSelectedHotspot(null)
  }

  const getHotspotColor = (type: string) => {
    switch (type) {
      case "Primary Distribution":
        return "bg-red-500"
      case "Secondary Distribution":
        return "bg-blue-500"
      case "End User Power":
        return "bg-green-500"
      case "High Density":
        return "bg-purple-500"
      case "Mechanical Systems":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="bg-purple-100 text-purple-800 mb-4 font-semibold">Interactive System Visualizer</Badge>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 text-slate-900">
            3D Office Layout Tool
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore our underfloor power distribution system with interactive hotspots, animated power flow
            visualization, and detailed component specifications.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
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
                  <Settings className="w-5 h-5 text-blue-600" />
                  <span>View Controls</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* View Mode */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">View Mode</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { value: "overview", label: "Overview", icon: <Eye className="w-4 h-4" /> },
                      { value: "detailed", label: "Detailed", icon: <Layers className="w-4 h-4" /> },
                      { value: "thermal", label: "Thermal", icon: <Thermometer className="w-4 h-4" /> },
                    ].map((mode) => (
                      <motion.button
                        key={mode.value}
                        onClick={() => setViewMode(mode.value as any)}
                        className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                          viewMode === mode.value
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {mode.icon}
                        <span className="text-sm font-medium">{mode.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Zoom Control */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Zoom Level: {zoomLevel}%</label>
                  <Slider
                    value={[zoomLevel]}
                    onValueChange={([value]) => setZoomLevel(value)}
                    max={200}
                    min={50}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>50%</span>
                    <span>200%</span>
                  </div>
                </div>

                {/* Power Flow Toggle */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Power Flow Animation</span>
                    <motion.button
                      onClick={() => setShowPowerFlow(!showPowerFlow)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        showPowerFlow ? "bg-blue-500" : "bg-slate-300"
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="w-5 h-5 bg-white rounded-full shadow-sm"
                        animate={{ x: showPowerFlow ? 24 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </div>
                </div>

                {/* Reset Button */}
                <Button onClick={resetView} variant="outline" className="w-full bg-transparent">
                  <RotateCcw className="mr-2 w-4 h-4" />
                  Reset View
                </Button>
              </CardContent>
            </Card>

            {/* Component Legend */}
            <Card className="shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Component Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { type: "Primary Distribution", color: "bg-red-500", count: 1 },
                  { type: "Secondary Distribution", color: "bg-blue-500", count: 1 },
                  { type: "End User Power", color: "bg-green-500", count: 2 },
                  { type: "High Density", color: "bg-purple-500", count: 1 },
                  { type: "Mechanical Systems", color: "bg-orange-500", count: 1 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm text-slate-700">{item.type}</span>
                    </div>
                    <span className="text-xs text-slate-500">{item.count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Visualizer */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <span>Interactive Office Layout</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  ref={containerRef}
                  className="relative bg-gradient-to-br from-blue-50 to-slate-100 rounded-xl overflow-hidden"
                  style={{
                    height: "500px",
                    transform: `scale(${zoomLevel / 100})`,
                    transformOrigin: "center center",
                  }}
                >
                  {/* Office Layout SVG */}
                  <svg viewBox="0 0 800 500" className="w-full h-full">
                    {/* Background Office Structure */}
                    <rect width="800" height="500" fill="url(#officeGradient)" />
                    <defs>
                      <linearGradient id="officeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f8fafc" />
                        <stop offset="100%" stopColor="#e2e8f0" />
                      </linearGradient>
                      <pattern id="floorPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <rect width="40" height="40" fill="#f1f5f9" />
                        <rect width="38" height="38" x="1" y="1" fill="#ffffff" />
                      </pattern>
                    </defs>

                    {/* Floor Pattern */}
                    <rect width="800" height="500" fill="url(#floorPattern)" opacity="0.5" />

                    {/* Office Walls */}
                    <rect x="50" y="50" width="700" height="400" fill="none" stroke="#64748b" strokeWidth="4" />
                    <rect x="100" y="100" width="200" height="150" fill="none" stroke="#94a3b8" strokeWidth="2" />
                    <rect x="350" y="100" width="200" height="150" fill="none" stroke="#94a3b8" strokeWidth="2" />
                    <rect x="600" y="100" width="120" height="300" fill="none" stroke="#94a3b8" strokeWidth="2" />

                    {/* Workstation Areas */}
                    <circle cx="200" cy="175" r="30" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2" opacity="0.7" />
                    <circle cx="450" cy="175" r="30" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2" opacity="0.7" />
                    <circle cx="660" cy="250" r="40" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" opacity="0.7" />

                    {/* Animated Power Flow Lines */}
                    <AnimatePresence>
                      {showPowerFlow && (
                        <g>
                          {/* Main distribution lines */}
                          <motion.path
                            d="M 120 125 Q 300 200 480 125"
                            stroke="#ef4444"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray="10,5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                          <motion.path
                            d="M 280 200 Q 400 300 520 275"
                            stroke="#3b82f6"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="8,4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 0.5 }}
                          />
                          <motion.path
                            d="M 200 350 Q 400 250 600 275"
                            stroke="#f97316"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="6,3"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 1 }}
                          />
                        </g>
                      )}
                    </AnimatePresence>
                  </svg>

                  {/* Interactive Hotspots */}
                  {hotspots.map((hotspot) => (
                    <motion.div
                      key={hotspot.id}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${hotspot.x}%`,
                        top: `${hotspot.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedHotspot(selectedHotspot === hotspot.id ? null : hotspot.id)}
                    >
                      <div className="relative">
                        <motion.div
                          className={`w-4 h-4 rounded-full ${getHotspotColor(hotspot.specs.type)} border-2 border-white shadow-lg`}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.7, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: Math.random() * 2,
                          }}
                        />
                        <motion.div
                          className="absolute -inset-2 rounded-full border-2 border-blue-400 opacity-50"
                          animate={{
                            scale: [1, 2, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: Math.random() * 2,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}

                  {/* Hotspot Details Popup */}
                  <AnimatePresence>
                    {selectedHotspot && (
                      <motion.div
                        className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-slate-200 max-w-xs z-10"
                        initial={{ opacity: 0, x: 20, y: -20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 20, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {(() => {
                          const hotspot = hotspots.find((h) => h.id === selectedHotspot)
                          if (!hotspot) return null

                          return (
                            <div>
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="font-semibold text-slate-900">{hotspot.title}</h4>
                                <button
                                  onClick={() => setSelectedHotspot(null)}
                                  className="text-slate-400 hover:text-slate-600"
                                >
                                  ×
                                </button>
                              </div>
                              <p className="text-sm text-slate-600 mb-3">{hotspot.description}</p>
                              <div className="space-y-2">
                                {hotspot.specs.voltage && (
                                  <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Voltage:</span>
                                    <span className="font-semibold">{hotspot.specs.voltage}</span>
                                  </div>
                                )}
                                {hotspot.specs.current && (
                                  <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Current:</span>
                                    <span className="font-semibold">{hotspot.specs.current}</span>
                                  </div>
                                )}
                                {hotspot.specs.power && (
                                  <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Power:</span>
                                    <span className="font-semibold">{hotspot.specs.power}</span>
                                  </div>
                                )}
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-600">Type:</span>
                                  <span className="font-semibold">{hotspot.specs.type}</span>
                                </div>
                              </div>
                            </div>
                          )
                        })()}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* System Status Indicator */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-slate-700">System Online</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-slate-600">2.1MW Load</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-slate-600">Protected</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
