import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Zap, 
  Cable, 
  CheckCircle, 
  ArrowRight,
  Network,
  Unplug
} from "lucide-react"
import { PowerFlexBrand } from "./powerflex-brand"

export function SystemArchitecture() {
  return (
    <section id="architecture" className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bebas font-extrabold text-brand-navy mb-6">
            <PowerFlexBrand theme="navy" className="mr-3" /> Architecture
          </h2>
          <p className="text-xl text-brand-navy max-w-4xl mx-auto leading-relaxed">
            Choose between our Stand-Alone and Integrated solutions to perfectly match 
            your installation requirements and maximize efficiency.
          </p>
        </div>

        {/* System Comparison */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          
          {/* Stand-Alone System */}
          <Card className="bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group">
            <CardHeader className="bg-gradient-to-r from-brand-yellow to-yellow-400 text-brand-navy p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-brand-navy rounded-xl flex items-center justify-center">
                  <Unplug className="h-6 w-6 text-brand-yellow" />
                </div>
                <div>
                  <Badge className="bg-brand-navy text-brand-yellow mb-2">Recommended</Badge>
                  <CardTitle className="text-3xl font-bebas font-extrabold">Stand-Alone</CardTitle>
                </div>
              </div>
              <p className="text-brand-navy/80 text-lg font-medium">
                Fully pluggable, modular wiring solution from DB to desk. 
                The most efficient system to power underfloor.
              </p>
            </CardHeader>
            
            <CardContent className="p-8">
              {/* System Diagram */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 mb-8">
                <img 
                  src="/images/standalone.svg" 
                  alt="Stand-Alone System Architecture Diagram" 
                  className="w-full h-48 object-contain"
                />
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-brand-navy">Maximum Efficiency</h4>
                    <p className="text-brand-navy text-sm">Direct connection from distribution board to desk power</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-brand-navy">Zero Termination</h4>
                    <p className="text-brand-navy text-sm">Plug-and-play connections throughout the system</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-brand-navy">Modular Design</h4>
                    <p className="text-brand-navy text-sm">Easy reconfiguration for changing office layouts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-brand-navy">Cost Effective</h4>
                    <p className="text-brand-navy text-sm">Lowest installation and maintenance costs</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Integrated System */}
          <Card className="bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group">
            <CardHeader className="bg-gradient-to-r from-brand-navy to-slate-800 text-white p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <Cable className="h-6 w-6 text-brand-navy" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bebas font-extrabold">Integrated</CardTitle>
                </div>
              </div>
              <p className="text-white/90 text-lg font-medium">
                Fully pluggable track feeder system, eliminating SWA 
                cables and terminations.
              </p>
            </CardHeader>
            
            <CardContent className="p-8">
              {/* System Diagram */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 mb-8">
                <img 
                  src="/images/integrated.svg" 
                  alt="Integrated System Architecture Diagram" 
                  className="w-full h-48 object-contain"
                />
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-brand-navy">No SWA Cables</h4>
                    <p className="text-brand-navy text-sm">Eliminates traditional armoured cable installations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-brand-navy">Plug-and-Play Track</h4>
                    <p className="text-brand-navy text-sm">Quick connection track feeder system</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-brand-navy">Flexible Layout</h4>
                    <p className="text-brand-navy text-sm">Adaptable to existing building infrastructure</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-brand-navy">Reduced Terminations</h4>
                    <p className="text-brand-navy text-sm">Fewer connection points mean faster installation</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Selection Guide */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">
              Choose Your System
            </h3>
            <p className="text-lg text-brand-navy max-w-2xl mx-auto">
              Both systems deliver exceptional performance. Select based on your specific installation requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-xl font-bebas font-extrabold text-brand-navy border-b border-brand-yellow pb-2">
                Choose Stand-Alone When:
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <ArrowRight className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                  <span className="text-brand-navy">New build projects with full design control</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                  <span className="text-brand-navy">Maximum cost efficiency is priority</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                  <span className="text-brand-navy">Long-term installation with minimal changes</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                  <span className="text-brand-navy">Large open-plan office environments</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-bebas font-extrabold text-brand-navy border-b border-brand-navy pb-2">
                Choose Integrated When:
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <ArrowRight className="h-5 w-5 text-brand-navy flex-shrink-0" />
                  <span className="text-brand-navy">Retrofitting existing buildings</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="h-5 w-5 text-brand-navy flex-shrink-0" />
                  <span className="text-brand-navy">Working around structural constraints</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="h-5 w-5 text-brand-navy flex-shrink-0" />
                  <span className="text-brand-navy">Frequent layout reconfiguration needed</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="h-5 w-5 text-brand-navy flex-shrink-0" />
                  <span className="text-brand-navy">Integration with existing track systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}