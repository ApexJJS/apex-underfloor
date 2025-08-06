import React from 'react'
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { 
  CheckCircle,
  Building2,
  Zap,
  Users,
  Shield,
  TrendingUp,
  Lightbulb
} from "lucide-react"
import { PowerFlexBrand } from "./powerflex-brand"

export function AdaptingModernWorkspace() {
  return (
    <section id="benefits" className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bebas font-extrabold text-brand-navy mb-6">
              Adapting The Modern Workspace
            </h2>
            <p className="text-xl text-brand-navy max-w-4xl mx-auto leading-relaxed">
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
                  <PowerFlexBrand theme="navy" className="mr-1" /> System:
                </h3>
                <p className="text-lg text-brand-navy font-semibold">
                  The Sustainable, Modular Underfloor Power Solution
                </p>
                <p className="text-brand-navy leading-relaxed">
                  Gone are the days of static floorplans, rigid rows of desks, and fixed infrastructure. 
                  Today's offices are agile, collaborative, and constantly evolving.
                </p>
                <p className="text-brand-navy leading-relaxed">
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
                    <p className="text-brand-navy text-sm">Power exactly where it's needed, when it's needed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-brand-navy mb-1">Simplified Installation</h4>
                    <p className="text-brand-navy text-sm">Plug-and-play design reduces complexity and time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-brand-navy mb-1">Reduced Carbon Impact</h4>
                    <p className="text-brand-navy text-sm">Sustainable materials and energy-efficient design</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-brand-navy mb-1">Future-Proof Flexibility</h4>
                    <p className="text-brand-navy text-sm">Modular system adapts to changing workspace needs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Office Image */}
            <div className="relative">
              <Image 
                src="/images/Modern Office Environment.svg"
                alt="Modern Office Environment - Open-plan workspace with flexible power distribution"
                width={608}
                height={398}
                className="w-full object-contain"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 608px"
              />
            </div>
          </div>

          {/* Key Benefits Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                icon: Zap,
                title: "Modular & Cost-Effective",
                desc: "Zero termination, plug-and-play design with significant cost savings",
              },
              { 
                icon: Users, 
                title: "Collaborative Spaces", 
                desc: "Flexible layouts that promote teamwork and creativity" 
              },
              { 
                icon: Shield, 
                title: "Safe & Smart Technology", 
                desc: "Enhanced safety with seamless power delivery for modern digital workplaces" 
              },
              { 
                icon: TrendingUp, 
                title: "Sustainable & Adaptive", 
                desc: "Environmentally conscious solutions that evolve with your business needs" 
              },
            ].map((benefit, index) => (
              <div key={index} className="group text-center">
                <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:ring-4 group-hover:ring-brand-yellow/30 group-hover:shadow-lg group-hover:shadow-brand-yellow/40 group-hover:animate-pulse transition-all duration-300 cursor-pointer">
                  <benefit.icon className="h-8 w-8 text-brand-navy group-hover:scale-110 transition-all duration-300" />
                </div>
                <h3 className="text-xl font-bebas font-extrabold text-brand-navy mb-3">{benefit.title}</h3>
                <p className="text-brand-navy leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}