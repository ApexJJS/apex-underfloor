import React from 'react'
import { FileImage } from "lucide-react"
import { PowerFlexBrand } from "./powerflex-brand"

export function SystemSchematic() {
  return (
    <section id="schematic" className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bebas font-extrabold text-brand-navy mb-6">
            <PowerFlexBrand theme="navy" className="mr-3" /> Underfloor
          </h2>
          <p className="text-4xl md:text-5xl font-bebas font-extrabold text-slate-700 mb-8">
            Schematic Example
          </p>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Understanding how our modular components connect together to create a complete 
            underfloor power distribution system from distribution board to desk.
          </p>
        </div>

        {/* Placeholder */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
            <div className="aspect-[16/10] flex items-center justify-center">
              <div className="text-center p-8">
                <FileImage className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                <p className="text-2xl font-bebas font-extrabold text-gray-600 mb-2">Interactive System Schematic</p>
                <p className="text-lg text-gray-500 mb-4">Coming Soon</p>
                <p className="text-sm text-gray-400 max-w-md mx-auto">
                  Interactive diagram showing complete PowerFlex system architecture with clickable components
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}