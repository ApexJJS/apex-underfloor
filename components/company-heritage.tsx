import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  Calendar, 
  Award, 
  TrendingUp,
  Factory,
  Globe,
  Users,
  Target
} from "lucide-react"

export function CompanyHeritage() {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bebas font-extrabold text-white mb-6">
            Innovating Wiring Solutions
          </h2>
          <p className="text-6xl md:text-7xl font-bebas font-extrabold text-brand-yellow mb-8">
            For 45 Years
          </p>
          <div className="max-w-16 h-1 bg-brand-yellow mx-auto mb-8"></div>
          <h3 className="text-3xl font-bebas font-extrabold text-white mb-6">
            APEX WIRING SOLUTIONS
          </h3>
        </div>

        {/* Heritage Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h4 className="text-2xl font-bebas font-extrabold text-brand-yellow">
                Leaders in Power Distribution Innovation
              </h4>
              <p className="text-lg text-gray-300 leading-relaxed">
                Apex Wiring Solutions stands at the forefront of electrical innovation, with a 
                proud heritage dating back to 1980. Founded in Durham, England, Apex has 
                grown into the UK's leading manufacturer of modular wiring systems, earning a 
                global reputation for excellence in power distribution.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                With over four decades of pioneering experience, Apex continues to redefine 
                how modern office spaces and critical infrastructure are powered. Our 
                underfloor modular wiring systems represent a significant leap 
                forward—delivering flexible, efficient, and future-ready solutions that meet the 
                evolving demands of today's built environments.
              </p>
            </div>

            {/* Made in Britain Badge */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Building2 className="h-8 w-8 text-slate-900" />
              </div>
              <div>
                <Badge className="bg-brand-yellow text-brand-navy px-4 py-2 text-sm font-bold mb-2">
                  MADE IN BRITAIN
                </Badge>
                <p className="text-gray-300 text-sm">
                  Proudly manufactured in Durham, England since 1980
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Company Stats */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-brand-yellow rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-brand-navy" />
                  </div>
                  <div className="text-3xl font-bebas font-extrabold text-brand-yellow mb-2">1980</div>
                  <p className="text-white/80 text-sm">Founded</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-brand-yellow rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-brand-navy" />
                  </div>
                  <div className="text-3xl font-bebas font-extrabold text-brand-yellow mb-2">45+</div>
                  <p className="text-white/80 text-sm">Years Experience</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-brand-yellow rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Factory className="h-6 w-6 text-brand-navy" />
                  </div>
                  <div className="text-3xl font-bebas font-extrabold text-brand-yellow mb-2">UK</div>
                  <p className="text-white/80 text-sm">Leading Manufacturer</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-brand-yellow rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-6 w-6 text-brand-navy" />
                  </div>
                  <div className="text-3xl font-bebas font-extrabold text-brand-yellow mb-2">Global</div>
                  <p className="text-white/80 text-sm">Reputation</p>
                </CardContent>
              </Card>
            </div>

            {/* Durham Location Highlight */}
            <Card className="bg-brand-yellow text-brand-navy">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-navy rounded-xl flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-brand-yellow" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bebas font-extrabold mb-1">Durham, England</h4>
                    <p className="text-brand-navy/80 font-medium">
                      Headquarters & Manufacturing Hub
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Innovation Timeline */}
        <div className="bg-white/5 rounded-3xl p-8 lg:p-12 backdrop-blur-sm border border-white/10">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bebas font-extrabold text-white mb-4">
              Four Decades of Innovation
            </h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              From our humble beginnings in Durham to becoming the UK's leading manufacturer of modular wiring systems, 
              our journey has been defined by continuous innovation and unwavering commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="h-8 w-8 text-brand-navy" />
              </div>
              <h4 className="text-lg font-bebas font-extrabold text-brand-yellow mb-2">Foundation</h4>
              <p className="text-gray-300 text-sm">
                Established in Durham, England with a vision to revolutionize electrical infrastructure
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-bebas font-extrabold text-white mb-2">Growth</h4>
              <p className="text-gray-300 text-sm">
                Expanded capabilities and became a trusted partner for major commercial projects
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-bebas font-extrabold text-white mb-2">Leadership</h4>
              <p className="text-gray-300 text-sm">
                Achieved market leadership in modular wiring systems across the UK
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-brand-navy" />
              </div>
              <h4 className="text-lg font-bebas font-extrabold text-brand-yellow mb-2">Innovation</h4>
              <p className="text-gray-300 text-sm">
                Continuing to pioneer future-ready solutions for modern built environments
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}