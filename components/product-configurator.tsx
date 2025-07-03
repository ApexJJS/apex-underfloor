"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Grid, Trash2, Download, Save, RotateCcw, Calculator, DollarSign, Zap, Settings } from "lucide-react"

interface Component {
  id: string
  type: "outlet" | "usb" | "junction" | "feed" | "data" | "emergency"
  name: string
  icon: string
  cost: number
  specs: {
    voltage?: string
    current?: string
    features?: string[]
  }
  position?: { x: number; y: number }
}

interface PlacedComponent extends Component {
  position: { x: number; y: number }
  placedId: string
}

export function ProductConfigurator() {
  const [placedComponents, setPlacedComponents] = useState<PlacedComponent[]>([])
  const [draggedComponent, setDraggedComponent] = useState<Component | null>(null)
  const [totalCost, setTotalCost] = useState(0)
  const [facilitySize, setFacilitySize] = useState(5000)
  const floorPlanRef = useRef<HTMLDivElement>(null)

  const componentLibrary: Component[] = [
    {
      id: "power-outlet",
      type: "outlet",
      name: "Power Outlet",
      icon: "🔌",
      cost: 45,
      specs: { voltage: "120V", current: "20A", features: ["GFCI Protected", "Tamper Resistant"] },
    },
    {
      id: "usb-charging",
      type: "usb",
      name: "USB Charging",
      icon: "🔋",
      cost: 65,
      specs: { voltage: "5V", current: "3A", features: ["USB-A", "USB-C", "Fast Charging"] },
    },
    {
      id: "junction-box",
      type: "junction",
      name: "Junction Box",
      icon: "📦",
      cost: 180,
      specs: { voltage: "208V", current: "200A", features: ["Load Balancing", "Monitoring"] },
    },
    {
      id: "main-feed",
      type: "feed",
      name: "Main Feed",
      icon: "⚡",
      cost: 320,
      specs: { voltage: "480V", current: "2000A", features: ["Fault Protection", "Emergency Disconnect"] },
    },
    {
      id: "data-port",
      type: "data",
      name: "Data Port",
      icon: "🌐",
      cost: 35,
      specs: { features: ["Cat6A", "Gigabit", "PoE+"] },
    },
    {
      id: "emergency-stop",
      type: "emergency",
      name: "Emergency Stop",
      icon: "🛑",
      cost: 95,
      specs: { voltage: "24V", features: ["Safety Cutoff", "Visual Indicator", "Lockout"] },
    },
  ]

  const handleDragStart = (component: Component) => {
    setDraggedComponent(component)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!draggedComponent || !floorPlanRef.current) return

    const rect = floorPlanRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    const newComponent: PlacedComponent = {
      ...draggedComponent,
      position: { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) },
      placedId: `${draggedComponent.id}-${Date.now()}`,
    }

    setPlacedComponents((prev) => [...prev, newComponent])
    setTotalCost((prev) => prev + draggedComponent.cost)
    setDraggedComponent(null)
  }

  const removeComponent = (placedId: string) => {
    const component = placedComponents.find((c) => c.placedId === placedId)
    if (component) {
      setPlacedComponents((prev) => prev.filter((c) => c.placedId !== placedId))
      setTotalCost((prev) => prev - component.cost)
    }
  }

  const clearAll = () => {
    setPlacedComponents([])
    setTotalCost(0)
  }

  const calculateInstallationCost = () => {
    const baseInstallation = placedComponents.length * 25
    const complexityMultiplier = placedComponents.length > 10 ? 1.2 : 1.0
    return Math.round(baseInstallation * complexityMultiplier)
  }

  const exportConfiguration = () => {
    const config = {
      facilitySize,
      components: placedComponents,
      costs: {
        materials: totalCost,
        installation: calculateInstallationCost(),
        total: totalCost + calculateInstallationCost(),
      },
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "apex-power-configuration.json"
    a.click()
    URL.revokeObjectURL(url)
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
          <Badge className="bg-blue-100 text-blue-800 mb-4 font-semibold">Product Configurator</Badge>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 text-slate-900">
            Design Your Custom Power Solution
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Interactive floor plan builder with drag-and-drop components and real-time cost calculation for your
            specific requirements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Component Library */}
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
                  <Grid className="w-5 h-5 text-blue-600" />
                  <span>Component Library</span>
                </CardTitle>
                <CardDescription>Drag components to your floor plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {componentLibrary.map((component) => (
                  <motion.div
                    key={component.id}
                    className="p-3 bg-white rounded-lg border-2 border-slate-200 cursor-grab active:cursor-grabbing hover:border-blue-300 hover:bg-blue-50 transition-all"
                    draggable
                    onDragStart={() => handleDragStart(component)}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="text-xl">{component.icon}</div>
                        <div>
                          <div className="font-semibold text-sm text-slate-900">{component.name}</div>
                          <div className="text-xs text-slate-600">
                            {component.specs.voltage && `${component.specs.voltage} • `}
                            {component.specs.current && `${component.specs.current}`}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-green-600">${component.cost}</div>
                    </div>
                    {component.specs.features && (
                      <div className="flex flex-wrap gap-1">
                        {component.specs.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Facility Settings */}
            <Card className="shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Facility Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Facility Size (sq ft)</label>
                  <Input
                    type="number"
                    value={facilitySize}
                    onChange={(e) => setFacilitySize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Components:</span>
                    <span className="font-semibold">{placedComponents.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coverage:</span>
                    <span className="font-semibold">
                      {(((placedComponents.length * 400) / facilitySize) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Interactive Floor Plan */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <span>Floor Plan Designer</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={clearAll}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                    <Button variant="outline" size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  ref={floorPlanRef}
                  className="relative bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg border-2 border-dashed border-slate-300 min-h-[500px] overflow-hidden"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {/* Grid Background */}
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id="configGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#configGrid)" />
                    </svg>
                  </div>

                  {/* Room Outline */}
                  <div className="absolute inset-8 border-4 border-slate-400 rounded-lg bg-white/30">
                    <div className="absolute top-2 left-2 text-xs font-semibold text-slate-600">
                      {facilitySize.toLocaleString()} sq ft
                    </div>
                  </div>

                  {/* Placed Components */}
                  <AnimatePresence>
                    {placedComponents.map((component) => (
                      <motion.div
                        key={component.placedId}
                        className="absolute cursor-move group"
                        style={{
                          left: `${component.position.x}%`,
                          top: `${component.position.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        drag
                        dragMomentum={false}
                        onDragEnd={(event, info) => {
                          if (!floorPlanRef.current) return
                          const rect = floorPlanRef.current.getBoundingClientRect()
                          const newX = Math.max(
                            5,
                            Math.min(95, component.position.x + (info.offset.x / rect.width) * 100),
                          )
                          const newY = Math.max(
                            5,
                            Math.min(95, component.position.y + (info.offset.y / rect.height) * 100),
                          )

                          setPlacedComponents((prev) =>
                            prev.map((c) =>
                              c.placedId === component.placedId ? { ...c, position: { x: newX, y: newY } } : c,
                            ),
                          )
                        }}
                      >
                        <div className="relative bg-white rounded-lg p-3 shadow-lg border-2 border-slate-200 group-hover:border-blue-400 transition-colors">
                          <div className="text-center">
                            <div className="text-lg mb-1">{component.icon}</div>
                            <div className="text-xs font-semibold text-slate-900">{component.name}</div>
                            <div className="text-xs text-slate-600">${component.cost}</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeComponent(component.placedId)
                            }}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Drop Zone Indicator */}
                  {placedComponents.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-slate-400 text-center">
                        <div className="text-4xl mb-4">🏗️</div>
                        <div className="text-lg font-medium mb-2">Drag components here to build your layout</div>
                        <div className="text-sm">Real-time cost calculation below</div>
                      </div>
                    </div>
                  )}

                  {/* Power Flow Visualization */}
                  {placedComponents.length > 1 && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {placedComponents
                        .filter((c) => c.type === "feed")
                        .map((feed) =>
                          placedComponents
                            .filter((c) => c.type !== "feed")
                            .map((component) => (
                              <motion.line
                                key={`${feed.placedId}-${component.placedId}`}
                                x1={`${feed.position.x}%`}
                                y1={`${feed.position.y}%`}
                                x2={`${component.position.x}%`}
                                y2={`${component.position.y}%`}
                                stroke="#3b82f6"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                opacity="0.6"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                              />
                            )),
                        )}
                    </svg>
                  )}
                </div>

                {/* Real-time Cost Calculator */}
                <motion.div
                  className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <DollarSign className="w-5 h-5 text-green-600 mr-1" />
                        <span className="text-sm font-medium text-slate-700">Materials</span>
                      </div>
                      <div className="text-2xl font-bold text-green-700">${totalCost.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Settings className="w-5 h-5 text-blue-600 mr-1" />
                        <span className="text-sm font-medium text-slate-700">Installation</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-700">
                        ${calculateInstallationCost().toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Calculator className="w-5 h-5 text-purple-600 mr-1" />
                        <span className="text-sm font-medium text-slate-700">Total Project</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-700">
                        ${(totalCost + calculateInstallationCost()).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <Button onClick={exportConfiguration} className="flex-1 bg-green-600 hover:bg-green-700">
                      <Download className="mr-2 w-4 h-4" />
                      Export Configuration
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Zap className="mr-2 w-4 h-4" />
                      Request Quote
                    </Button>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
