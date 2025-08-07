import React from 'react'
import { FileImage } from "lucide-react"
import { PowerFlexBrand } from "./powerflex-brand"

export function SystemSchematic() {
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
          {/* Main Schematic - Full Width */}
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
          
          {/* Schematic Key - Full Width */}
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