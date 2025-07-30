import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Laptop, 
  Recycle, 
  TrendingUp,
  Building2,
  Lightbulb,
  ArrowRight,
  CheckCircle
} from "lucide-react"
import { PowerFlexBrand } from "./powerflex-brand"

export function ModernWorkspace() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bebas font-extrabold text-brand-navy mb-6">
            Adapting The Modern Workspace
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Open-plan office layouts have undergone significant changes over the past 20 years, 
            driven by evolving work cultures, technological advancements, and a renewed 
            emphasis on employee well-being.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bebas font-extrabold text-brand-navy">
                <PowerFlexBrand theme="navy" className="mr-2" /> Power Flex System:
              </h3>
              <p className="text-lg text-brand-navy font-semibold">
                The Sustainable, Modular Underfloor Power Solution
              </p>
              <p className="text-gray-600 leading-relaxed">
                Gone are the days of static floorplans, rigid rows of desks, and fixed infrastructure. 
                Today's offices are agile, collaborative, and constantly evolving.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The Apex Power Flex System was designed to meet this new reality. It's a smart, 
                sustainable underfloor power distribution solution that delivers power exactly where 
                it's needed, simplifies installation, reduces carbon impact, and future-proofs the 
                workspace with modular, plug-and-play flexibility.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-brand-navy mb-1">Smart Distribution</h4>
                  <p className="text-gray-600 text-sm">Power exactly where it's needed, when it's needed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-brand-navy mb-1">Simplified Installation</h4>
                  <p className="text-gray-600 text-sm">Plug-and-play design reduces complexity and time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-brand-navy mb-1">Reduced Carbon Impact</h4>
                  <p className="text-gray-600 text-sm">Sustainable materials and energy-efficient design</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-brand-navy mb-1">Future-Proof Flexibility</h4>
                  <p className="text-gray-600 text-sm">Modular system adapts to changing workspace needs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Office Image Placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] flex items-center justify-center">
                <div className="text-center p-8">
                  <Building2 className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-600 mb-2">Modern Office Environment</p>
                  <p className="text-sm text-gray-500">Open-plan workspace with flexible power distribution</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workspace Evolution Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bebas font-extrabold text-slate-900 mb-2">
                Collaborative Spaces
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Flexible layouts that promote teamwork and creativity
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Laptop className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bebas font-extrabold text-slate-900 mb-2">
                Technology Integration
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Seamless power delivery for modern digital workplaces
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Recycle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bebas font-extrabold text-slate-900 mb-2">
                Sustainability Focus
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Environmentally conscious solutions for responsible businesses
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-bebas font-extrabold text-slate-900 mb-2">
                Adaptive Growth
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Infrastructure that evolves with your business needs
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Innovation Callout */}
        <div className="bg-gradient-to-r from-brand-navy to-slate-800 rounded-3xl p-8 lg:p-12 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Lightbulb className="h-8 w-8 text-brand-yellow" />
              <h3 className="text-3xl font-bebas font-extrabold text-white">
                Innovation Meets Practicality
              </h3>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Where traditional power distribution systems fall short, the PowerFlex System provides power exactly 
              where it's needed, simplifies installation, reduces carbon impact, and future-proofs the workspace 
              with modular, plug-and-play flexibility.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-brand-yellow text-brand-navy px-4 py-2 text-sm font-semibold">
                Zero Termination
              </Badge>
              <Badge className="bg-white/10 text-white px-4 py-2 text-sm font-semibold">
                Modular Design
              </Badge>
              <Badge className="bg-white/10 text-white px-4 py-2 text-sm font-semibold">
                Future-Ready
              </Badge>
              <Badge className="bg-white/10 text-white px-4 py-2 text-sm font-semibold">
                Sustainable
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}