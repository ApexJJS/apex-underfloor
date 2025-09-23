import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Info, X, ZoomIn, ZoomOut, RotateCcw, Move, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { PowerFlexBrand } from "./powerflex-brand"

type ComponentKey = 'mdbbox' | 'SDBBOX' | 'PUCS' | 'Grommets' | 't_diistributers'

const COMPONENT_INFO = {
  'mdbbox': {
    title: 'MDB Box',
    description: 'Main Distribution Board - Primary electrical distribution unit.',
    specs: ['MCB Protection', '32A Rating', 'RCD Protected'],
    position: { x: (140 / 981.74) * 100, y: (500 / 572.36) * 100 }
  },
  'SDBBOX': {
    title: 'SDB Box', 
    description: 'Sub Distribution Board for branch circuit distribution.',
    specs: ['IP65 Rated', 'Multiple Outlets', 'Modular Design'],
    position: { x: (710 / 981.74) * 100, y: (500 / 572.36) * 100 }
  },
  'PUCS': {
    title: 'Power Units',
    description: 'PowerFlex underfloor power connection units.',
    specs: ['Tool-free Connection', 'Cat 6 Compatible', 'Low Profile'],
    position: { x: (200 / 981.74) * 100, y: (380 / 572.36) * 100 }
  },
  'Grommets': {
    title: 'Grommets',
    description: 'Cable protection and routing components.',
    specs: ['Flexible Routing', 'Cable Protection', 'Easy Installation'],
    position: { x: (500 / 981.74) * 100, y: (200 / 572.36) * 100 }
  },
  't_diistributers': {
    title: 'T-Distributors',
    description: 'T-junction distributors for power routing.',
    specs: ['Multiple Outputs', 'Compact Design', 'Quick Connect'],
    position: { x: (400 / 981.74) * 100, y: (100 / 572.36) * 100 }
  }
} as const

const COMPONENT_KEYS = Object.keys(COMPONENT_INFO) as ComponentKey[]
const SVG_DIMENSIONS = { width: 981.74, height: 572.36 }
const ZOOM_LEVEL = 2.5
const ANIMATION_DURATION = 500
const AUTO_PLAY_INTERVAL = 3000

export function SystemSchematic() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentKey | null>(null)
  const [svgContent, setSvgContent] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  
  const transformRef = useRef<any>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Global element cache to avoid repeated DOM queries
  const elementsCache = useRef<Map<ComponentKey, HTMLElement>>(new Map())

  // Load SVG content once
  useEffect(() => {
    let mounted = true
    
    fetch('/images/Powerflexschematic.svg')
      .then(response => response.text())
      .then(content => {
        if (mounted) setSvgContent(content)
      })
      .catch(error => console.error('Failed to load SVG:', error))

    return () => { mounted = false }
  }, [])


  // Update visual state when selection changes - optimized
  useEffect(() => {
    if (!svgContent) return

    COMPONENT_KEYS.forEach(componentId => {
      let element = elementsCache.current.get(componentId)
      if (!element) {
        element = document.getElementById(componentId)
        if (!element) return
      }

      // Update selected state tracking and visual styles
      if (selectedComponent === componentId) {
        element.setAttribute('data-selected', 'true')
        element.style.filter = 'drop-shadow(0 0 8px #f0ea45)'
        element.style.opacity = '0.8'
      } else {
        element.removeAttribute('data-selected')
        element.style.filter = 'none'
        element.style.opacity = '1'
      }
    })
  }, [selectedComponent, svgContent])

  // Cached container dimensions to avoid repeated queries
  const containerDimensionsRef = useRef({ width: 800, height: 600 })

  // Memoized core functions - optimized for speed
  const zoomToComponent = useCallback((componentKey: ComponentKey) => {
    if (!transformRef.current) return

    const component = COMPONENT_INFO[componentKey]
    
    // Use cached dimensions - only update if needed
    let { width: containerWidth, height: containerHeight } = containerDimensionsRef.current
    
    // Quick dimension check and update only if significantly different
    const container = document.querySelector('.schematic-container')
    if (container && Math.abs(container.clientWidth - containerWidth) > 10) {
      containerWidth = container.clientWidth
      containerHeight = container.clientHeight
      containerDimensionsRef.current = { width: containerWidth, height: containerHeight }
    }

    const componentX = (component.position.x / 100) * SVG_DIMENSIONS.width
    const componentY = (component.position.y / 100) * SVG_DIMENSIONS.height

    const targetX = (containerWidth / 2) - (componentX * ZOOM_LEVEL)
    const targetY = (containerHeight / 2) - (componentY * ZOOM_LEVEL)

    // Fast animation for cycling, normal for manual selection
    const duration = selectedComponent ? 250 : ANIMATION_DURATION
    transformRef.current.setTransform(targetX, targetY, ZOOM_LEVEL, duration)
  }, [selectedComponent])

  const resetView = useCallback(() => {
    if (transformRef.current) {
      transformRef.current.resetTransform(ANIMATION_DURATION)
    }
  }, [])

  const selectComponent = useCallback((componentKey: ComponentKey, index: number) => {
    // Batch state updates
    requestAnimationFrame(() => {
      setSelectedComponent(componentKey)
      setCurrentIndex(index)
    })
    zoomToComponent(componentKey)
  }, [zoomToComponent])

  const handleComponentClick = useCallback((componentKey: ComponentKey) => {
    if (selectedComponent === componentKey) {
      setSelectedComponent(null)
      resetView()
    } else {
      const index = COMPONENT_KEYS.findIndex(key => key === componentKey)
      selectComponent(componentKey, index)
    }
  }, [selectedComponent, resetView, selectComponent])

  const navigatePrevious = useCallback(() => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : COMPONENT_KEYS.length - 1
    selectComponent(COMPONENT_KEYS[prevIndex], prevIndex)
  }, [currentIndex, selectComponent])

  const navigateNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % COMPONENT_KEYS.length
    selectComponent(COMPONENT_KEYS[nextIndex], nextIndex)
  }, [currentIndex, selectComponent])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev)
  }, [])

  // Auto-play functionality - optimized for 100% reliability
  useEffect(() => {
    if (isAutoPlaying) {
      // Clear any existing interval first
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
      
      // Use direct navigation for more reliable cycling
      autoPlayRef.current = setInterval(() => {
        navigateNext()
      }, 2200) // Optimized timing for smooth feel
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = null
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = null
      }
    }
  }, [isAutoPlaying, navigateNext]) // Include navigateNext for reliability

  // Memoized current component info
  const currentComponentInfo = useMemo(() => 
    selectedComponent ? COMPONENT_INFO[selectedComponent] : null
  , [selectedComponent])

  // Component interaction setup - must be after all callbacks are defined
  useEffect(() => {
    if (!svgContent) return

    let retryCount = 0
    const maxRetries = 5
    let timeoutId: NodeJS.Timeout

    const setupComponent = (componentId: ComponentKey) => {
      const element = document.getElementById(componentId)
      if (!element) {
        console.log(`Element not found: ${componentId}`)
        return false
      }

      // Cache element globally
      elementsCache.current.set(componentId, element)

      // Only set styles and events once
      if (!element.hasAttribute('data-interactive')) {
        console.log(`Setting up component: ${componentId}`)
        element.setAttribute('data-interactive', 'true')
        element.classList.add('interactive-component')
        element.style.cursor = 'pointer'
        element.style.transition = 'all 0.2s ease'
        element.style.pointerEvents = 'auto'

        // Direct event handlers with proper closure
        const handleMouseEnter = () => {
          console.log(`Hover enter: ${componentId}`)
          element.style.filter = 'drop-shadow(0 0 8px #f0ea45)'
          element.style.opacity = '0.8'
        }
        
        const handleMouseLeave = () => {
          // Only reset if not currently selected
          const isSelected = element.hasAttribute('data-selected')
          if (!isSelected) {
            console.log(`Hover leave: ${componentId}`)
            element.style.filter = 'none'
            element.style.opacity = '1'
          }
        }
        
        const handleClick = (e: Event) => {
          e.preventDefault()
          e.stopPropagation()
          console.log(`Click: ${componentId}`)
          handleComponentClick(componentId)
        }

        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', handleMouseLeave)
        element.addEventListener('click', handleClick, { capture: true })
      }
      return true
    }

    const setupAllComponents = () => {
      const setupResults = COMPONENT_KEYS.map(setupComponent)
      const allSetup = setupResults.every(Boolean)
      
      if (!allSetup && retryCount < maxRetries) {
        retryCount++
        console.log(`Retrying component setup, attempt ${retryCount}`)
        timeoutId = setTimeout(setupAllComponents, 100 * retryCount)
      } else if (allSetup) {
        console.log('All components set up successfully')
      }
    }

    // Delay setup to ensure SVG is fully rendered
    timeoutId = setTimeout(setupAllComponents, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [svgContent, handleComponentClick]) // Include handleComponentClick dependency

  return (
    <section id="schematic" className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bebas font-extrabold text-brand-navy mb-8">
            <PowerFlexBrand theme="navy" className="mr-3" /> Underfloor Schematic Example
          </h2>
          <p className="text-xl text-brand-navy max-w-4xl mx-auto leading-relaxed">
            Understanding how our modular components connect together to create a complete 
            underfloor power distribution system from distribution board to desk.
          </p>
        </div>

        {/* System Schematic */}
        <div className="space-y-12">
          {/* Interactive Schematic */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 relative">
            {/* Header */}
            <div className="mb-8">
              <h3 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">Interactive System Diagram</h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-brand-navy leading-relaxed">
                  Interactive component tour with zoom navigation
                </p>
                <div className="flex items-center gap-2">
                  {/* Tour Controls */}
                  <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                    <button
                      onClick={navigatePrevious}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                      aria-label="Previous component"
                    >
                      <ChevronLeft className="w-4 h-4 text-brand-navy" />
                    </button>
                    <button
                      onClick={toggleAutoPlay}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                      aria-label={isAutoPlaying ? "Pause tour" : "Start auto tour"}
                    >
                      {isAutoPlaying ? (
                        <Pause className="w-4 h-4 text-brand-navy" />
                      ) : (
                        <Play className="w-4 h-4 text-brand-navy" />
                      )}
                    </button>
                    <button
                      onClick={navigateNext}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                      aria-label="Next component"
                    >
                      <ChevronRight className="w-4 h-4 text-brand-navy" />
                    </button>
                  </div>
                  
                  {/* Counter */}
                  <div className="flex items-center gap-2 text-sm text-brand-navy bg-brand-yellow/10 px-3 py-1 rounded-full">
                    <span>{currentIndex + 1} / {COMPONENT_KEYS.length}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Schematic Area */}
              <div className="lg:col-span-3">
                <div className="bg-brand-navy rounded-xl overflow-hidden relative schematic-container" style={{ height: '600px' }}>
                  {/* Zoom Controls */}
                  <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
                    <button
                      onClick={() => transformRef.current?.zoomIn()}
                      className="w-10 h-10 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center shadow-lg transition-all"
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="w-5 h-5 text-brand-navy" />
                    </button>
                    <button
                      onClick={() => transformRef.current?.zoomOut()}
                      className="w-10 h-10 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center shadow-lg transition-all"
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="w-5 h-5 text-brand-navy" />
                    </button>
                    <button
                      onClick={resetView}
                      className="w-10 h-10 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center shadow-lg transition-all"
                      aria-label="Reset zoom"
                    >
                      <RotateCcw className="w-5 h-5 text-brand-navy" />
                    </button>
                  </div>

                  {/* Instructions */}
                  <div className="absolute top-4 left-4 z-30 bg-white/90 rounded-lg px-3 py-2 shadow-lg">
                    <div className="flex items-center gap-2 text-sm text-brand-navy">
                      <Move className="w-4 h-4" />
                      <span>Drag to pan • Scroll to zoom</span>
                    </div>
                  </div>

                  <TransformWrapper
                    ref={transformRef}
                    initialScale={1}
                    minScale={0.5}
                    maxScale={4}
                    centerOnInit
                    limitToBounds={false}
                    panning={{ 
                      disabled: false,
                      excludedClass: 'interactive-component'
                    }}
                    wheel={{ disabled: false }}
                    pinch={{ disabled: false }}
                    doubleClick={{ disabled: false }}
                  >
                    <TransformComponent
                      wrapperStyle={{
                        width: '100%',
                        height: '100%'
                      }}
                      contentStyle={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {svgContent && (
                        <div
                          className="schematic-svg w-full h-full flex items-center justify-center"
                          dangerouslySetInnerHTML={{ __html: svgContent }}
                          style={{ minHeight: '400px' }}
                        />
                      )}
                    </TransformComponent>
                  </TransformWrapper>
                </div>
              </div>

              {/* Info Panel Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-0">
                  <AnimatePresence mode="wait">
                    {currentComponentInfo ? (
                      <motion.div
                        key={selectedComponent}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="bg-gray-50 border-2 border-brand-yellow rounded-xl shadow-lg"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-brand-yellow/20 rounded-lg flex items-center justify-center">
                                <Info className="text-brand-navy w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="text-2xl font-bebas font-bold text-brand-navy">
                                  {currentComponentInfo.title}
                                </h4>
                                <p className="text-sm text-gray-500">Component Details</p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleComponentClick(selectedComponent!)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-brand-navy hover:bg-gray-100 transition-all"
                              aria-label="Close panel"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-sm font-semibold text-brand-navy mb-2">Description</h5>
                              <p className="text-brand-navy leading-relaxed">
                                {currentComponentInfo.description}
                              </p>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-semibold text-brand-navy mb-3">Key Specifications</h5>
                              <div className="grid grid-cols-1 gap-2">
                                {currentComponentInfo.specs.map((spec, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg"
                                  >
                                    <div className="w-2 h-2 bg-brand-navy rounded-full"></div>
                                    <span className="text-brand-navy text-sm font-medium">{spec}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-50 rounded-xl p-6 text-center"
                      >
                        <div className="mb-4">
                          <Info className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <h4 className="text-lg font-bebas font-bold text-brand-navy mb-2">
                            Component Information
                          </h4>
                          <p className="text-sm text-gray-600">
                            Click on any component in the schematic or use the tour controls to explore.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs text-gray-500 mb-3">Available components:</p>
                          {COMPONENT_KEYS.map((key, index) => (
                            <button
                              key={key}
                              onClick={() => selectComponent(key, index)}
                              className="block w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:border-brand-yellow hover:bg-brand-yellow/5 transition-colors text-left"
                            >
                              {COMPONENT_INFO[key].title}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Static Schematic */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <div className="mb-8">
              <h3 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">Complete System Layout</h3>
              <p className="text-brand-navy leading-relaxed">
                PowerFlex underfloor power distribution from distribution board to individual desk connections
              </p>
            </div>
            <div className="bg-white rounded-xl overflow-hidden">
              <img 
                src="/images/schematics/powerflexschematicexample.svg" 
                alt="PowerFlex System Schematic - Complete underfloor power distribution layout" 
                className="w-full h-auto max-w-none"
                style={{ minHeight: '400px' }}
              />
            </div>
          </div>
          
          {/* Schematic Key */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <div className="mb-8">
              <h3 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">Component Legend</h3>
              <p className="text-brand-navy leading-relaxed">
                Understanding the symbols and components used in PowerFlex system diagrams
              </p>
            </div>
            <div className="bg-white rounded-xl overflow-hidden flex justify-center">
              <img 
                src="/images/schematics/powerflexschematicexamplekey.svg" 
                alt="PowerFlex System Schematic Key - Component legend" 
                className="max-w-full h-auto"
                style={{ minHeight: '300px', maxWidth: '800px' }}
              />
            </div>
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <p className="text-brand-navy leading-relaxed">
                This comprehensive diagram demonstrates the modular flexibility of PowerFlex systems, 
                showing how components interconnect to create efficient underfloor power distribution. 
                Each symbol represents a specific PowerFlex component designed for fast, flexible installation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}