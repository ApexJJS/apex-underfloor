"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PowerFlexBrand } from "@/components/powerflex-brand"
import {
  X,
  Phone,
  Mail,
  MapPin,
  Download,
  FileText,
  Shield,
  ArrowRight,
  Clock,
  Star,
  Zap,
  Award,
  CheckCircle,
  ExternalLink,
  ImageIcon,
  Building,
  Users,
  Target,
  Lightbulb,
  BarChart3,
} from "lucide-react"

export default function ApexWiringLanding() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    projectType: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDarkSection, setIsDarkSection] = useState(true)

  // Handle navigation color change based on scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroSection = document.getElementById('hero')
      const contactSection = document.getElementById('contact')
      
      if (heroSection && contactSection) {
        const heroRect = heroSection.getBoundingClientRect()
        const contactRect = contactSection.getBoundingClientRect()
        
        // Check if we're in a dark section (hero or contact)
        const inDarkSection = heroRect.bottom > 100 || contactRect.top < 100
        setIsDarkSection(inDarkSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required'
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid'
    if (!formData.company.trim()) errors.company = 'Company is required'
    if (!formData.message.trim()) errors.message = 'Message is required'
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setIsSubmitting(true)
    // TODO: Implement actual form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Thank you for your enquiry! We will get back to you within 24 hours.')
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-white font-inter" suppressHydrationWarning={true}>
      {/* Floating Navigation */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="relative flex items-center">
          {/* Left Nav Bar */}
          <div className={`backdrop-blur-md rounded-l-full pl-8 pr-24 py-3 shadow-xl transition-all duration-300 ${
            isDarkSection 
              ? 'bg-slate-800/90 border border-white/20' 
              : 'bg-white/90 border border-gray-200/50'
          }`}>
            <div className="flex items-center space-x-6">
              <a href="#benefits" className={`transition-colors text-sm font-medium ${
                isDarkSection 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}>Benefits</a>
              <a href="#products" className={`transition-colors text-sm font-medium ${
                isDarkSection 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}>Products</a>
            </div>
          </div>
          
          {/* Right Nav Bar */}
          <div className={`backdrop-blur-md rounded-r-full pr-8 pl-24 py-3 shadow-xl transition-all duration-300 ${
            isDarkSection 
              ? 'bg-slate-800/90 border border-white/20' 
              : 'bg-white/90 border border-gray-200/50'
          }`}>
            <div className="flex items-center space-x-6">
              <a href="#comparison" className={`transition-colors text-sm font-medium ${
                isDarkSection 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}>Comparison</a>
              <a href="#contact" className={`transition-colors text-sm font-medium ${
                isDarkSection 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}>Contact</a>
            </div>
          </div>
          
          {/* Center Logo Circle - positioned above nav bars */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <a 
              href="#hero" 
              className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-105 ${
                isDarkSection 
                  ? 'bg-slate-800/90 border border-white/20 hover:bg-slate-700/90' 
                  : 'bg-white/90 border border-gray-200/50 hover:bg-gray-50/90'
              }`}
            >
              <img
                src="/apex-logo.svg"
                alt="Apex Wiring Solutions"
                className={`w-16 h-16 object-contain transition-all duration-300 ${
                  isDarkSection 
                    ? 'filter invert' 
                    : ''
                }`}
              />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>

        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-8">
                  <h1 className="text-6xl md:text-8xl font-bebas font-extrabold leading-none">
                    <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                      <PowerFlexBrand className="text-transparent bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text" />
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                      Underfloor Power
                    </span>
                  </h1>

                  <p className="text-2xl md:text-3xl text-orange-400 font-light">Connections without compromise</p>

                  <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                    Apex Wiring Solutions delivers cutting-edge electrical innovation for modern commercial spaces. Our
                    underfloor modular wiring represents a quantum leap in power distribution technology.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4" suppressHydrationWarning>
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                    suppressHydrationWarning
                  >
                    <a href="#contact" suppressHydrationWarning>
                      Get Quote
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-8 py-4 text-lg font-semibold bg-transparent backdrop-blur-sm transition-all duration-300"
                    suppressHydrationWarning
                  >
                    <a href="#products" suppressHydrationWarning>
                      View Products
                    </a>
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-700">
                  <div className="text-center">
                    <div className="text-3xl font-bebas font-extrabold text-orange-400">£3,834</div>
                    <div className="text-sm text-gray-400">Cost Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bebas font-extrabold text-orange-400">36hrs</div>
                    <div className="text-sm text-gray-400">Time Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bebas font-extrabold text-orange-400">0min</div>
                    <div className="text-sm text-gray-400">Termination</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="text-gray-400 text-sm space-y-1 pt-4">
                  <p>+44 (0) 191 378 7900</p>
                  <p>info@apexwiringsolutions.co.uk</p>
                  <p>www.apexwiringsolutions.co.uk</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-slate-500/20 rounded-3xl blur-3xl"></div>
                <img
                  src="/placeholder.svg?height=700&width=900"
                  alt="PowerFlex Underfloor Power System Installation"
                  className="relative w-full h-auto rounded-3xl shadow-2xl border border-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section id="benefits" className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-3 rounded-full text-sm font-semibold mb-6">
                <Star className="h-4 w-4" />
                Why Choose <PowerFlexBrand className="text-orange-700 ml-1" />
              </div>
              <h2 className="text-5xl md:text-6xl font-bebas font-extrabold text-slate-900 mb-6">
                Revolutionary Power Distribution
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Experience the future of commercial power infrastructure with our cutting-edge underfloor solutions that
                deliver unprecedented efficiency, flexibility, and cost savings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {[
                {
                  icon: Clock,
                  title: "0 Minute Termination",
                  desc: "Zero labour costs for connections",
                },
                { icon: Zap, title: "Modular Design", desc: "Enhanced flexibility and scalability" },
                { icon: Shield, title: "Enhanced Safety", desc: "Secure and reliable connections" },
                { icon: Award, title: "Cost Savings", desc: "£3,834 savings on 50 desk installation" },
              ].map((benefit, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bebas font-extrabold text-slate-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cost Savings Showcase */}
            <div className="space-y-16">
              {/* Header */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full text-sm font-semibold mb-6">
                  <BarChart3 className="h-4 w-4" />
                  Cost Analysis
                </div>
                <h2 className="text-5xl md:text-6xl font-bebas font-extrabold text-slate-900 mb-6">
                  Revolutionary
                  <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Cost Savings</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Experience dramatic reductions in both material costs and installation time with our innovative zero-termination technology.
                </p>
              </div>

              {/* Main Comparison Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Termination Comparison */}
                <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bebas font-extrabold text-slate-900 text-center">
                      Termination Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-xl text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bebas font-extrabold">0 MIN</div>
                            <div className="text-sm opacity-90"><PowerFlexBrand className="text-white" /></div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bebas font-extrabold">£0</div>
                            <div className="text-sm opacity-90">Labour</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-100 p-4 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-bebas font-extrabold text-gray-700">5 MIN</div>
                            <div className="text-sm text-gray-600">Quick Term</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bebas font-extrabold text-gray-700">£3</div>
                            <div className="text-sm text-gray-600">Labour</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-100 p-4 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-bebas font-extrabold text-gray-700">25 MIN</div>
                            <div className="text-sm text-gray-600">Traditional</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bebas font-extrabold text-gray-700">£16</div>
                            <div className="text-sm text-gray-600">Labour</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Installation Comparison */}
                <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bebas font-extrabold text-center">
                      50 Desk Installation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-orange-400 uppercase tracking-wide">Traditional Track</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Materials</span>
                            <span className="font-semibold">£7,918</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Labour</span>
                            <span className="font-semibold">£1,946</span>
                          </div>
                          <div className="border-t border-gray-600 pt-2">
                            <div className="flex justify-between">
                              <span className="font-semibold">Total</span>
                              <span className="font-bold text-lg">£9,864</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wide">
                          <PowerFlexBrand className="text-green-400 inline" /> System
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Materials</span>
                            <span className="font-semibold text-green-400">£5,343</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Labour</span>
                            <span className="font-semibold text-green-400">£857</span>
                          </div>
                          <div className="border-t border-gray-600 pt-2">
                            <div className="flex justify-between">
                              <span className="font-semibold">Total</span>
                              <span className="font-bold text-lg text-green-400">£6,200</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Savings Summary */}
                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bebas font-extrabold text-center">
                      Your Savings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-8 text-center">
                      <div>
                        <div className="text-4xl font-bebas font-extrabold mb-2">£3,834</div>
                        <div className="text-sm opacity-90 uppercase tracking-wide">Cost Reduction</div>
                        <div className="text-xs opacity-75 mt-1">39% Less Expensive</div>
                      </div>
                      
                      <div className="border-t border-green-400 pt-6">
                        <div className="text-3xl font-bebas font-extrabold mb-2">36 HOURS</div>
                        <div className="text-sm opacity-90 uppercase tracking-wide">Time Saved</div>
                        <div className="text-xs opacity-75 mt-1">75% Faster Installation</div>
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-sm font-semibold mb-1">Break-even Point</div>
                        <div className="text-lg font-bebas font-extrabold">First Project</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Bottom Impact Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bebas font-extrabold text-orange-600 mb-2">0min</div>
                  <div className="text-sm text-gray-600 font-medium">Termination Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bebas font-extrabold text-orange-600 mb-2">39%</div>
                  <div className="text-sm text-gray-600 font-medium">Cost Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bebas font-extrabold text-orange-600 mb-2">75%</div>
                  <div className="text-sm text-gray-600 font-medium">Faster Install</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bebas font-extrabold text-orange-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600 font-medium">ROI Guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unified Product Showcase */}
      <section id="products" className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-slate-100 text-slate-700 px-6 py-3 rounded-full text-sm font-semibold mb-6">
                <Zap className="h-4 w-4" />
                Complete Product Range
              </div>
              <h2 className="text-5xl md:text-6xl font-bebas font-extrabold text-slate-900 mb-6">
                <PowerFlexBrand size="xl" className="text-slate-900" /> Distribution Systems
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Engineered for excellence. Our comprehensive range of modular power distribution components sets the
                standard for modern commercial environments.
              </p>
            </div>

            {/* Unified Product Tabs */}
            <Card className="bg-gradient-to-br from-slate-50 via-white to-gray-50 border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <Tabs defaultValue="master" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-12 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg h-16">
                    <TabsTrigger
                      value="master"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white font-bebas font-extrabold text-sm h-12"
                    >
                      <Building className="h-4 w-4 mr-2" />
                      MASTER DISTRIBUTION
                    </TabsTrigger>
                    <TabsTrigger
                      value="slave"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white font-bebas font-extrabold text-sm h-12"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      SLAVE DISTRIBUTION
                    </TabsTrigger>
                    <TabsTrigger
                      value="tee"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white font-bebas font-extrabold text-sm h-12"
                    >
                      <Target className="h-4 w-4 mr-2" />
                      TEE DISTRIBUTORS
                    </TabsTrigger>
                    <TabsTrigger
                      value="leads"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white font-bebas font-extrabold text-sm h-12"
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      POWER LEADS
                    </TabsTrigger>
                  </TabsList>

                  {/* Master Distribution Tab */}
                  <TabsContent value="master" className="mt-0">
                    <div className="mb-12">
                      <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                        <div className="space-y-6">
                          <h3 className="text-4xl font-bebas font-extrabold text-slate-900">
                            Centralised Power Distribution
                          </h3>
                          <p className="text-lg text-gray-700 leading-relaxed">
                            Master Distribution Boxes provide centralised solutions for connecting multiple workstations
                            in commercial environments. Engineered to simplify installation and reduce deployment time.
                          </p>
                          <div className="grid grid-cols-1 gap-4">
                            {[
                              "Single point connection architecture",
                              "Clamped or pluggable configurations",
                              "Self-locking disconnect mechanism",
                            ].map((feature, index) => (
                              <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                                <span className="text-gray-700 font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <Target className="h-6 w-6 text-orange-600" />
                                <h4 className="font-bebas font-extrabold text-lg text-slate-900">CENTRALIZED CONTROL</h4>
                              </div>
                              <p className="text-gray-600 leading-relaxed">
                                Single point connection architecture simplifies installation and reduces wiring complexity across multiple workstations.
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <CheckCircle className="h-6 w-6 text-orange-600" />
                                <h4 className="font-bebas font-extrabold text-lg text-slate-900">SELF-LOCKING DISCONNECT</h4>
                              </div>
                              <p className="text-gray-600 leading-relaxed">
                                Advanced disconnect mechanism ensures secure connections while allowing easy maintenance and reconfiguration.
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>

                    {/* Master Distribution Products */}
                    <Tabs defaultValue="6-port" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-8 bg-white border border-gray-200">
                        <TabsTrigger
                          value="6-port"
                          className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 font-bebas font-extrabold"
                        >
                          6 PORT MASTER
                        </TabsTrigger>
                        <TabsTrigger
                          value="9-port"
                          className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 font-bebas font-extrabold"
                        >
                          9 PORT MASTER
                        </TabsTrigger>
                        <TabsTrigger
                          value="10-port"
                          className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 font-bebas font-extrabold"
                        >
                          10 PORT MASTER
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="6-port" className="mt-0">
                        <Card className="border-0 shadow-xl bg-white">
                          <CardHeader className="pb-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-2xl font-bebas font-extrabold text-slate-900">
                                  6 Port Master Distribution
                                </CardTitle>
                                <CardDescription className="text-gray-600 font-mono text-sm mt-2">
                                  MDB.0339.N.6 (length)
                                </CardDescription>
                              </div>
                              <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2">
                                32A Rated
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid lg:grid-cols-4 gap-8">
                              <div className="lg:col-span-3">
                                <div className="grid md:grid-cols-2 gap-8">
                                  <div className="space-y-4">
                                    <h4 className="font-bebas font-extrabold text-slate-900 mb-4">POWER SPECIFICATIONS</h4>
                                    <div className="space-y-3">
                                      {[
                                        { label: "Home Run", value: "38mm ³⁄₄ B.L.N + 1 x CPC" },
                                        { label: "CSA", value: "6mm²" },
                                        { label: "Power Outputs", value: "6 Port (3 Pin)" },
                                        { label: "Rated Current", value: "32A" },
                                      ].map((spec, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between py-3 px-4 bg-gray-50 rounded-lg"
                                        >
                                          <span className="text-gray-600 font-medium">{spec.label}</span>
                                          <span className="text-slate-900 font-semibold">{spec.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h4 className="font-bebas font-extrabold text-slate-900 mb-4">TECHNICAL DETAILS</h4>
                                    <div className="space-y-3">
                                      {[
                                        { label: "Rated Voltage", value: "250/400V" },
                                        { label: "Frequency", value: "50Hz" },
                                        { label: "Max Operating Temp", value: "+70°C" },
                                        { label: "Protection (IP)", value: "IP2XD" },
                                      ].map((spec, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between py-3 px-4 bg-gray-50 rounded-lg"
                                        >
                                          <span className="text-gray-600 font-medium">{spec.label}</span>
                                          <span className="text-slate-900 font-semibold">{spec.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
                                  <CardContent className="p-6">
                                    <div className="text-center py-2 mb-4">
                                      <span className="text-sm text-gray-500 font-medium">Product Image</span>
                                    </div>
                                    <img
                                      src="/images/products/6port%20MDB%20Box%20Image.png"
                                      alt="6-port Master Distribution Box featuring multiple power outlets and through-power capability"
                                      className="w-full h-32 object-contain rounded-lg"
                                    />
                                  </CardContent>
                                </Card>
                                <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
                                  <CardContent className="p-6">
                                    <div className="text-center py-2 mb-4">
                                      <span className="text-sm text-gray-500 font-medium">Product Schematic</span>
                                    </div>
                                    <img
                                      src="/images/schematics/6port%20MDB%20Box%20Schematic.png"
                                      alt="6-port Master Distribution Box technical wiring diagram"
                                      className="w-full h-32 object-contain rounded-lg"
                                    />
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                                  <span className="text-sm text-gray-600 font-medium">Mechanical Coding: A Black</span>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent font-semibold"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Full Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="9-port" className="mt-0">
                        <Card className="border-0 shadow-xl bg-white">
                          <CardHeader className="pb-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-2xl font-bebas font-extrabold text-slate-900">
                                  9 Port Master Distribution
                                </CardTitle>
                                <CardDescription className="text-gray-600 font-mono text-sm mt-2">
                                  MDB.0340.N.6 (length)
                                </CardDescription>
                              </div>
                              <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2">
                                32A Rated
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid lg:grid-cols-4 gap-8">
                              <div className="lg:col-span-3">
                                <div className="grid md:grid-cols-2 gap-8">
                                  <div className="space-y-4">
                                    <h4 className="font-bebas font-extrabold text-slate-900 mb-4">POWER SPECIFICATIONS</h4>
                                    <div className="space-y-3">
                                      {[
                                        { label: "Home Run", value: "38mm 27 x L, E, N + 1 x CPC" },
                                        { label: "CSA", value: "6mm²" },
                                        { label: "Power Outputs", value: "9 Port (3 Pin)" },
                                        { label: "Rated Current", value: "32A" },
                                      ].map((spec, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between py-3 px-4 bg-gray-50 rounded-lg"
                                        >
                                          <span className="text-gray-600 font-medium">{spec.label}</span>
                                          <span className="text-slate-900 font-semibold">{spec.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h4 className="font-bebas font-extrabold text-slate-900 mb-4">TECHNICAL DETAILS</h4>
                                    <div className="space-y-3">
                                      {[
                                        { label: "Rated Voltage", value: "250/400V" },
                                        { label: "Frequency", value: "50Hz" },
                                        { label: "Max Operating Temp", value: "+70°C" },
                                        { label: "Protection (IP)", value: "IP2XD" },
                                      ].map((spec, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between py-3 px-4 bg-gray-50 rounded-lg"
                                        >
                                          <span className="text-gray-600 font-medium">{spec.label}</span>
                                          <span className="text-slate-900 font-semibold">{spec.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
                                  <CardContent className="p-6">
                                    <div className="text-center py-2 mb-4">
                                      <span className="text-sm text-gray-500 font-medium">Product Image</span>
                                    </div>
                                    <img
                                      src="/images/products/9port%20MDB%20Box%20Image.png"
                                      alt="9-port Master Distribution Box with advanced power distribution for large installations"
                                      className="w-full h-32 object-contain rounded-lg"
                                    />
                                  </CardContent>
                                </Card>
                                <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
                                  <CardContent className="p-6">
                                    <div className="text-center py-2 mb-4">
                                      <span className="text-sm text-gray-500 font-medium">Product Schematic</span>
                                    </div>
                                    <img
                                      src="/images/schematics/9port%20MDB%20Box%20Schematic.png"
                                      alt="9-port Master Distribution Box technical wiring diagram"
                                      className="w-full h-32 object-contain rounded-lg"
                                    />
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                                  <span className="text-sm text-gray-600 font-medium">Mechanical Coding: A Black</span>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent font-semibold"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Full Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="10-port" className="mt-0">
                        <Card className="border-0 shadow-xl bg-white">
                          <CardHeader className="pb-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-2xl font-bebas font-extrabold text-slate-900">
                                  10 Port Master Distribution
                                </CardTitle>
                                <CardDescription className="text-gray-600 font-mono text-sm mt-2">
                                  SDB.0006.Y.6.1
                                </CardDescription>
                              </div>
                              <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2">
                                32A Rated
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid lg:grid-cols-4 gap-8">
                              <div className="lg:col-span-3">
                                <div className="grid md:grid-cols-2 gap-8">
                                  <div className="space-y-4">
                                    <h4 className="font-bebas font-extrabold text-slate-900 mb-4">POWER SPECIFICATIONS</h4>
                                    <div className="space-y-3">
                                      {[
                                        {
                                          label: "Description",
                                          value: "1 x power in, 1 x through power, 10 x power out",
                                        },
                                        { label: "CSA", value: "6mm²" },
                                        { label: "Power Outputs", value: "10 Port (3 Pin)" },
                                        { label: "Rated Current", value: "32A" },
                                      ].map((spec, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between py-3 px-4 bg-gray-50 rounded-lg"
                                        >
                                          <span className="text-gray-600 font-medium">{spec.label}</span>
                                          <span className="text-slate-900 font-semibold">{spec.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h4 className="font-bebas font-extrabold text-slate-900 mb-4">TECHNICAL DETAILS</h4>
                                    <div className="space-y-3">
                                      {[
                                        { label: "Rated Voltage", value: "250/400V" },
                                        { label: "Frequency", value: "50Hz" },
                                        { label: "Max Operating Temp", value: "+70°C" },
                                        { label: "Protection (IP)", value: "IP2XD" },
                                      ].map((spec, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between py-3 px-4 bg-gray-50 rounded-lg"
                                        >
                                          <span className="text-gray-600 font-medium">{spec.label}</span>
                                          <span className="text-slate-900 font-semibold">{spec.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
                                  <CardContent className="p-6">
                                    <div className="text-center py-2 mb-4">
                                      <span className="text-sm text-gray-500 font-medium">Product Image</span>
                                    </div>
                                    <img
                                      src="/images/products/10port%20SDB%20image.png"
                                      alt="10-port Master Distribution Box providing centralized power distribution for multiple workstations"
                                      className="w-full h-32 object-contain rounded-lg"
                                    />
                                  </CardContent>
                                </Card>
                                <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
                                  <CardContent className="p-6">
                                    <div className="text-center py-2 mb-4">
                                      <span className="text-sm text-gray-500 font-medium">Product Schematic</span>
                                    </div>
                                    <img
                                      src="/images/schematics/10port%20SDB%20schematic.png"
                                      alt="10-port Master Distribution Box technical wiring diagram"
                                      className="w-full h-32 object-contain rounded-lg"
                                    />
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                                  <span className="text-sm text-gray-600 font-medium">Mechanical Coding: A Black</span>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent font-semibold"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Full Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </TabsContent>

                  {/* Slave Distribution Tab */}
                  <TabsContent value="slave" className="mt-0">
                    <div className="mb-12">
                      <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                        <div className="space-y-6">
                          <h3 className="text-4xl font-bebas font-extrabold text-slate-900">Single Circuit Distribution</h3>
                          <p className="text-lg text-gray-700 leading-relaxed">
                            Single Circuit Slave Distribution Boxes provide centralised connection for multiple
                            workstations. Engineered for simplified wiring with single point connection architecture.
                          </p>
                          <div className="grid grid-cols-1 gap-4">
                            {[
                              "Through power capability",
                              "ISO 9001:2015 certified",
                              "IEC 61535:2009+A1:2013 compliant",
                            ].map((feature, index) => (
                              <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                                <span className="text-gray-700 font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <Zap className="h-6 w-6 text-orange-600" />
                                <h4 className="font-bebas font-extrabold text-lg text-slate-900">THROUGH POWER CAPABILITY</h4>
                              </div>
                              <p className="text-gray-600 leading-relaxed">
                                Advanced through power design allows seamless connection of multiple distribution points for scalable installations.
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <Award className="h-6 w-6 text-orange-600" />
                                <h4 className="font-bebas font-extrabold text-lg text-slate-900">CERTIFIED QUALITY</h4>
                              </div>
                              <p className="text-gray-600 leading-relaxed">
                                ISO 9001:2015 certified and IEC 61535:2009+A1:2013 compliant for guaranteed performance and safety standards.
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>

                    {/* Slave Distribution Products */}
                    <Tabs defaultValue="4-port" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-8 bg-white border border-gray-200">
                        <TabsTrigger
                          value="4-port"
                          className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 font-bebas font-extrabold"
                        >
                          4 PORT SLAVE
                        </TabsTrigger>
                        <TabsTrigger
                          value="6-port"
                          className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 font-bebas font-extrabold"
                        >
                          6 PORT SLAVE
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="4-port" className="mt-0">
                        <Card className="border-0 shadow-xl bg-white">
                          <CardHeader className="pb-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-2xl font-bebas font-extrabold text-slate-900">
                                  4 Port Slave Distribution
                                </CardTitle>
                                <CardDescription className="text-gray-600 font-mono text-sm mt-2">
                                  SDB.0004.Y.6.1
                                </CardDescription>
                              </div>
                              <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2">
                                32A Rated
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid lg:grid-cols-4 gap-8">
                              <div className="lg:col-span-3">
                                <div className="grid md:grid-cols-2 gap-8">
                                  <div className="space-y-4">
                                    <h4 className="font-bebas font-extrabold text-slate-900 mb-4">POWER SPECIFICATIONS</h4>
                                    <div className="space-y-3">
                                      {[
                                        {
                                          label: "Description",
                                          value: "1 x power in, 1 x through power, 4 x power out",
                                        },
                                        { label: "CSA", value: "6mm²" },
                                        { label: "Power Outputs", value: "4 Port (3 Pin)" },
                                        { label: "Rated Current", value: "32A" },
                                      ].map((spec, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between py-3 px-4 bg-gray-50 rounded-lg"
                                        >
                                          <span className="text-gray-600 font-medium">{spec.label}</span>
                                          <span className="text-slate-900 font-semibold">{spec.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h4 className="font-bebas font-extrabold text-slate-900 mb-4">TECHNICAL DETAILS</h4>
                                    <div className="space-y-3">
                                      {[
                                        { label: "Rated Voltage", value: "250/400V" },
                                        { label: "Frequency", value: "50Hz" },
                                        { label: "Max Operating Temp", value: "+70°C" },
                                        { label: "Protection (IP)", value: "IP2XD" },
                                      ].map((spec, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between py-3 px-4 bg-gray-50 rounded-lg"
                                        >
                                          <span className="text-gray-600 font-medium">{spec.label}</span>
                                          <span className="text-slate-900 font-semibold">{spec.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
                                  <CardContent className="p-6">
                                    <div className="text-center py-2 mb-4">
                                      <span className="text-sm text-gray-500 font-medium">Product Image</span>
                                    </div>
                                    <img
                                      src="/images/products/4port%20single%20circuit%20SDB%20image.png"
                                      alt="4-port single circuit Slave Distribution Box with compact design for smaller installations"
                                      className="w-full h-32 object-contain rounded-lg"
                                    />
                                  </CardContent>
                                </Card>
                                <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
                                  <CardContent className="p-6">
                                    <div className="text-center py-2 mb-4">
                                      <span className="text-sm text-gray-500 font-medium">Product Schematic</span>
                                    </div>
                                    <img
                                      src="/images/schematics/4port%20single%20circuit%20SDB%20schematic.png"
                                      alt="4-port single circuit Slave Distribution Box technical wiring diagram"
                                      className="w-full h-32 object-contain rounded-lg"
                                    />
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                                  <span className="text-sm text-gray-600 font-medium">
                                    Standard: IEC 61535:2009+A1:2013
                                  </span>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent font-semibold"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Full Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="6-port" className="mt-0">
                        <Card className="border-0 shadow-xl bg-white">
                          <CardHeader className="pb-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-2xl font-bebas font-extrabold text-slate-900">
                                  6 Port Slave Distribution
                                </CardTitle>
                                <CardDescription className="text-gray-600 font-mono text-sm mt-2">
                                  SDB.0005.Y.6.1
                                </CardDescription>
                              </div>
                              <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2">
                                32A Rated
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid lg:grid-cols-4 gap-8">
                              <div className="lg:col-span-3">
                                <div className="grid md:grid-cols-2 gap-8">
                                  <div className="space-y-4">
                                    <h4 className="font-bebas font-extrabold text-slate-900 mb-4">POWER SPECIFICATIONS</h4>
                                    <div className="space-y-3">
                                      {[
                                        {
                                          label: "Description",
                                          value: "1 x power in, 1 x through power, 6 x power out",
                                        },
                                        { label: "CSA", value: "6mm²" },
                                        { label: "Power Outputs", value: "6 Port (3 Pin)" },
                                        { label: "Rated Current", value: "32A" },
                                      ].map((spec, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between py-3 px-4 bg-gray-50 rounded-lg"
                                        >
                                          <span className="text-gray-600 font-medium">{spec.label}</span>
                                          <span className="text-slate-900 font-semibold">{spec.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h4 className="font-bebas font-extrabold text-slate-900 mb-4">TECHNICAL DETAILS</h4>
                                    <div className="space-y-3">
                                      {[
                                        { label: "Rated Voltage", value: "250/400V" },
                                        { label: "Frequency", value: "50Hz" },
                                        { label: "Max Operating Temp", value: "+70°C" },
                                        { label: "Protection (IP)", value: "IP2XD" },
                                      ].map((spec, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between py-3 px-4 bg-gray-50 rounded-lg"
                                        >
                                          <span className="text-gray-600 font-medium">{spec.label}</span>
                                          <span className="text-slate-900 font-semibold">{spec.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
                                  <CardContent className="p-6">
                                    <div className="text-center py-2 mb-4">
                                      <span className="text-sm text-gray-500 font-medium">Product Image</span>
                                    </div>
                                    <img
                                      src="/images/products/6port-single-circuit-SDB-image.png"
                                      alt="6-port single circuit Slave Distribution Box for medium-scale office power distribution"
                                      className="w-full h-32 object-contain rounded-lg"
                                    />
                                  </CardContent>
                                </Card>
                                <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
                                  <CardContent className="p-6">
                                    <div className="text-center py-2 mb-4">
                                      <span className="text-sm text-gray-500 font-medium">Product Schematic</span>
                                    </div>
                                    <img
                                      src="/images/schematics/6port%20single%20circuit%20SDB%20schematic.png"
                                      alt="6-port single circuit Slave Distribution Box technical wiring diagram"
                                      className="w-full h-32 object-contain rounded-lg"
                                    />
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                                  <span className="text-sm text-gray-600 font-medium">QMS: ISO 9001:2015</span>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent font-semibold"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Full Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </TabsContent>

                  {/* Tee Distributors Tab */}
                  <TabsContent value="tee" className="mt-0">
                    <div className="mb-12">
                      <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                        <div className="space-y-6">
                          <h3 className="text-4xl font-bebas font-extrabold text-slate-900">
                            3 Pole <PowerFlexBrand className="text-slate-900" /> Tee
                          </h3>
                          <p className="text-lg text-gray-700 leading-relaxed">
                            ENSTO XL Tee distributor with 1 power input and 2 power outputs. Seamless integration with
                            other connectors for simplified wiring and reduced installation time.
                          </p>
                          <div className="grid grid-cols-1 gap-4">
                            {["Integrated plug-in connector", "Quick connection capability"].map((feature, index) => (
                              <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                                <span className="text-gray-700 font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <Lightbulb className="h-6 w-6 text-orange-600" />
                                <h4 className="font-bebas font-extrabold text-lg text-slate-900">INTEGRATED CONNECTOR</h4>
                              </div>
                              <p className="text-gray-600 leading-relaxed">
                                Built-in plug-in connector system provides secure lockable connections for reliable power distribution without additional components.
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <Clock className="h-6 w-6 text-orange-600" />
                                <h4 className="font-bebas font-extrabold text-lg text-slate-900">QUICK CONNECTION</h4>
                              </div>
                              <p className="text-gray-600 leading-relaxed">
                                Rapid installation capability reduces deployment time while maintaining seamless integration with other system connectors.
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>

                    <Card className="border-0 shadow-xl bg-white">
                      <CardHeader className="pb-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-2xl font-bebas font-extrabold text-slate-900">3 Pole ENSTO XL Tee</CardTitle>
                            <CardDescription className="text-gray-600 font-mono text-sm mt-2">
                              1.4.E.3.0.BKT
                            </CardDescription>
                          </div>
                          <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2">
                            32A Rated
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid lg:grid-cols-4 gap-8">
                          <div className="lg:col-span-3">
                            <div className="grid md:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                <h4 className="font-bebas font-extrabold text-slate-900 mb-4">POWER SPECIFICATIONS</h4>
                                <div className="space-y-3">
                                  {[
                                    { label: "Description", value: "3 Pole Ensto XL Tee - XLAD3" },
                                    { label: "Power Outputs", value: "1 x input left, 2 x outputs" },
                                    { label: "Rated Current", value: "32A" },
                                    { label: "Rated Voltage", value: "250/400V" },
                                  ].map((spec, index) => (
                                    <div key={index} className="flex justify-between py-3 px-4 bg-gray-50 rounded-lg">
                                      <span className="text-gray-600 font-medium">{spec.label}</span>
                                      <span className="text-slate-900 font-semibold">{spec.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-4">
                                <h4 className="font-bebas font-extrabold text-slate-900 mb-4">TECHNICAL DETAILS</h4>
                                <div className="space-y-3">
                                  {[
                                    { label: "Frequency", value: "50Hz" },
                                    { label: "Max Operating Temp", value: "+70°C" },
                                    { label: "Protection (IP)", value: "IP2XD" },
                                    { label: "Mechanical Coding", value: "A Black" },
                                  ].map((spec, index) => (
                                    <div key={index} className="flex justify-between py-3 px-4 bg-gray-50 rounded-lg">
                                      <span className="text-gray-600 font-medium">{spec.label}</span>
                                      <span className="text-slate-900 font-semibold">{spec.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
                              <CardContent className="p-6">
                                <div className="text-center py-2 mb-4">
                                  <span className="text-sm text-gray-500 font-medium">Product Image</span>
                                </div>
                                <img
                                  src="/images/products/3POLE%20powerflex%20TEE.png"
                                  alt="3-Pole PowerFlex TEE connector with integrated plug-in system for quick installations"
                                  className="w-full h-32 object-contain rounded-lg"
                                />
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                              <span className="text-sm text-gray-600 font-medium">
                                Lockable: Integrated Plug-in Connector
                              </span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent font-semibold"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Full Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Power Leads Tab */}
                  <TabsContent value="leads" className="mt-0">
                    <div className="mb-12">
                      <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                        <div className="space-y-6">
                          <h3 className="text-4xl font-bebas font-extrabold text-slate-900">
                            3 Pole <PowerFlexBrand className="text-slate-900" /> Leads
                          </h3>
                          <p className="text-lg text-gray-700 leading-relaxed">
                            Armoured connection and extender leads for flexible power distribution. Engineered for quick
                            installation and reliable performance in commercial environments.
                          </p>
                          <div className="grid grid-cols-1 gap-4">
                            {["3 Pole armoured construction", "Quick installation capability"].map((feature, index) => (
                              <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                                <span className="text-gray-700 font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <Shield className="h-6 w-6 text-orange-600" />
                                <h4 className="font-bebas font-extrabold text-lg text-slate-900">ARMOURED CONSTRUCTION</h4>
                              </div>
                              <p className="text-gray-600 leading-relaxed">
                                Heavy-duty armoured design provides superior protection and durability for demanding commercial environments.
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <Zap className="h-6 w-6 text-orange-600" />
                                <h4 className="font-bebas font-extrabold text-lg text-slate-900">FLEXIBLE EXTENSIONS</h4>
                              </div>
                              <p className="text-gray-600 leading-relaxed">
                                Extender leads allow for flexible power distribution across complex installation layouts and configurations.
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>

                    {/* Power Leads Products */}
                    <Tabs defaultValue="connection" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-8 bg-white border border-gray-200">
                        <TabsTrigger
                          value="connection"
                          className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 font-bebas font-extrabold"
                        >
                          CONNECTION LEAD
                        </TabsTrigger>
                        <TabsTrigger
                          value="extender"
                          className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 font-bebas font-extrabold"
                        >
                          EXTENDER LEAD
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="connection" className="mt-0">
                        <Card className="border-0 shadow-xl bg-white">
                          <CardHeader className="pb-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-2xl font-bebas font-extrabold text-slate-900">
                                  3 Pole Connection Lead
                                </CardTitle>
                                <CardDescription className="text-gray-600 font-mono text-sm mt-2">
                                  CON3PA40P3G6S(length)
                                </CardDescription>
                              </div>
                              <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2">
                                32A Rated
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid lg:grid-cols-4 gap-8">
                              <div className="lg:col-span-3">
                                <div className="grid md:grid-cols-2 gap-8">
                                  <div className="space-y-4">
                                    <h4 className="font-bebas font-extrabold text-slate-900 mb-4">POWER SPECIFICATIONS</h4>
                                    <div className="space-y-3">
                                      {[
                                        {
                                          label: "Description",
                                          value: "3 Pole (3 x 6mm) ENSTO XL Armoured Connection Lead",
                                        },
                                        { label: "CSA", value: "6mm²" },
                                        { label: "Rated Current", value: "32A" },
                                        { label: "Rated Voltage", value: "250/400V" },
                                      ].map((spec, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between py-3 px-4 bg-gray-50 rounded-lg"
                                        >
                                          <span className="text-gray-600 font-medium">{spec.label}</span>
                                          <span className="text-slate-900 font-semibold">{spec.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h4 className="font-bebas font-extrabold text-slate-900 mb-4">TECHNICAL DETAILS</h4>
                                    <div className="space-y-3">
                                      {[
                                        { label: "Frequency", value: "50Hz" },
                                        { label: "Max Operating Temp", value: "+70°C" },
                                        { label: "Protection (IP)", value: "IP2XD" },
                                        { label: "Application", value: "Free wiring to power outlets" },
                                      ].map((spec, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between py-3 px-4 bg-gray-50 rounded-lg"
                                        >
                                          <span className="text-gray-600 font-medium">{spec.label}</span>
                                          <span className="text-slate-900 font-semibold">{spec.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
                                  <CardContent className="p-6">
                                    <div className="text-center py-2 mb-4">
                                      <span className="text-sm text-gray-500 font-medium">Product Image</span>
                                    </div>
                                    <img
                                      src="/images/products/3Pole%20powerflex%20connection%20lead.png"
                                      alt="3-Pole PowerFlex connection lead with reinforced connector for industrial applications"
                                      className="w-full h-32 object-contain rounded-lg"
                                    />
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                                  <span className="text-sm text-gray-600 font-medium">
                                    Armoured construction for durability
                                  </span>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent font-semibold"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Full Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="extender" className="mt-0">
                        <Card className="border-0 shadow-xl bg-white">
                          <CardHeader className="pb-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-2xl font-bebas font-extrabold text-slate-900">
                                  3 Pole Extender Lead
                                </CardTitle>
                                <CardDescription className="text-gray-600 font-mono text-sm mt-2">
                                  EXT3PA40P3G6S(length)
                                </CardDescription>
                              </div>
                              <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2">
                                32A Rated
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid lg:grid-cols-4 gap-8">
                              <div className="lg:col-span-3">
                                <div className="grid md:grid-cols-2 gap-8">
                                  <div className="space-y-4">
                                    <h4 className="font-bebas font-extrabold text-slate-900 mb-4">POWER SPECIFICATIONS</h4>
                                    <div className="space-y-3">
                                      {[
                                        {
                                          label: "Description",
                                          value: "3 Pole (3 x 6mm) ENSTO XL Armoured Extender Lead",
                                        },
                                        { label: "CSA", value: "6mm²" },
                                        { label: "Rated Current", value: "32A" },
                                        { label: "Rated Voltage", value: "250/400V" },
                                      ].map((spec, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between py-3 px-4 bg-gray-50 rounded-lg"
                                        >
                                          <span className="text-gray-600 font-medium">{spec.label}</span>
                                          <span className="text-slate-900 font-semibold">{spec.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h4 className="font-bebas font-extrabold text-slate-900 mb-4">TECHNICAL DETAILS</h4>
                                    <div className="space-y-3">
                                      {[
                                        { label: "Frequency", value: "50Hz" },
                                        { label: "Max Operating Temp", value: "+70°C" },
                                        { label: "Protection (IP)", value: "IP2XD" },
                                        { label: "Application", value: "Power distribution extension" },
                                      ].map((spec, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between py-3 px-4 bg-gray-50 rounded-lg"
                                        >
                                          <span className="text-gray-600 font-medium">{spec.label}</span>
                                          <span className="text-slate-900 font-semibold">{spec.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
                                  <CardContent className="p-6">
                                    <div className="text-center py-2 mb-4">
                                      <span className="text-sm text-gray-500 font-medium">Product Image</span>
                                    </div>
                                    <img
                                      src="/images/products/3Pole%20powerflex%20extender%20lead.png"
                                      alt="3-Pole PowerFlex extender lead with male connector and female socket for daisy-chaining"
                                      className="w-full h-32 object-contain rounded-lg"
                                    />
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                                  <span className="text-sm text-gray-600 font-medium">
                                    Connector on one end, female on other
                                  </span>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent font-semibold"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Full Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-slate-100 text-slate-700 px-6 py-3 rounded-full text-sm font-semibold mb-6">
                <BarChart3 className="h-4 w-4" />
                Performance Comparison
              </div>
              <h2 className="text-5xl md:text-6xl font-bebas font-extrabold text-slate-900 mb-6">
                Why Choose <PowerFlexBrand size="xl" className="text-slate-900" />?
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                See how our revolutionary underfloor power systems outperform traditional overhead solutions across
                every critical metric that matters to your business.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* PowerFlex Advantages */}
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bebas font-extrabold">
                        <PowerFlexBrand className="text-white" /> Underfloor System
                      </CardTitle>
                      <CardDescription className="text-green-100 text-lg">Modern Modular Solution</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <ul className="space-y-4">
                    {[
                      "0 minute termination - zero labour costs",
                      "Completely hidden infrastructure",
                      "Modular design for enhanced flexibility",
                      "Rapid installation - minimise disruption",
                      "Optimised materials - reduced waste",
                      "Secure and reliable connections",
                      "Enhanced safety features",
                      "Future-proof scalable design",
                    ].map((advantage, index) => (
                      <li key={index} className="flex items-start gap-4 p-3 bg-white rounded-lg shadow-sm">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Traditional Track Systems */}
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-red-50 to-pink-50 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <X className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bebas font-extrabold">Traditional Power Track</CardTitle>
                      <CardDescription className="text-red-100 text-lg">Legacy Overhead Solution</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <ul className="space-y-4">
                    {[
                      "25 minute termination - £16 labour cost",
                      "Visible cable trays and conduits",
                      "Limited workspace flexibility",
                      "Disruption during modifications",
                      "Higher material and labour costs",
                      "Complex installation requirements",
                      "Aesthetic limitations",
                      "Higher long-term maintenance",
                    ].map((disadvantage, index) => (
                      <li key={index} className="flex items-start gap-4 p-3 bg-white rounded-lg shadow-sm">
                        <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{disadvantage}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Card className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-2xl">
                <CardContent className="p-12">
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-5xl font-bebas font-extrabold mb-2">£3,834</div>
                      <div className="text-xl text-orange-100">Total Savings</div>
                    </div>
                    <div className="w-px h-16 bg-orange-300"></div>
                    <div className="text-center">
                      <div className="text-5xl font-bebas font-extrabold mb-2">36</div>
                      <div className="text-xl text-orange-100">Hours Saved</div>
                    </div>
                  </div>
                  <p className="text-xl mt-6 text-orange-100">on a typical 50 desk installation</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-orange-500/5 rounded-full blur-2xl"></div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="w-20 h-28">
                  <img
                    src="/apex-logo.svg"
                    alt="Apex Wiring Solutions"
                    className="w-full h-full object-contain filter invert"
                  />
                </div>
              </div>
              <h2 className="text-5xl md:text-6xl font-bebas font-extrabold mb-6">
                Connections Without
                <span className="block text-orange-400">Compromise</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                Ready to revolutionise your power distribution? Our experts are standing by to help you discover how
                <PowerFlexBrand className="text-orange-400 mx-2" /> can transform your commercial space with
                cutting-edge efficiency.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div className="space-y-12">
                <div>
                  <h3 className="text-4xl font-bebas font-extrabold mb-8 text-gradient bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Get In Touch
                  </h3>
                  <div className="space-y-8">
                    {[
                      { icon: Phone, title: "Phone", info: "+44 (0) 191 378 7900" },
                      { icon: Mail, title: "Email", info: "info@apexwiringsolutions.co.uk" },
                      { icon: MapPin, title: "Website", info: "www.apexwiringsolutions.co.uk" },
                    ].map((contact, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                          <contact.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bebas font-extrabold text-lg mb-2">{contact.title}</h4>
                          <p className="text-gray-300 text-lg">{contact.info}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <h4 className="font-bebas font-extrabold text-2xl text-orange-400 mb-4">Why Choose Apex?</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-orange-400 flex-shrink-0" />
                      <span>Expert consultation and design support</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-orange-400 flex-shrink-0" />
                      <span>Rapid response within 24 hours</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-orange-400 flex-shrink-0" />
                      <span>Tailored PowerFlex solutions</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-orange-400 flex-shrink-0" />
                      <span>Comprehensive technical documentation</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <Card className="bg-white text-slate-900 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <CardHeader className="p-8 bg-gradient-to-r from-orange-50 to-white border-b border-orange-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bebas font-extrabold text-slate-900">Request Information</CardTitle>
                  </div>
                  <CardDescription className="text-lg text-gray-600 mt-2">
                    Get in touch to learn more about <PowerFlexBrand className="text-orange-600" /> solutions
                    for your project. Our experts will respond within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="first-name" className="text-sm font-semibold text-gray-700">
                          First Name *
                        </Label>
                        <Input
                          id="first-name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="John"
                          className={`h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 ${formErrors.firstName ? 'border-red-500' : ''}`}
                        />
                        {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name" className="text-sm font-semibold text-gray-700">
                          Last Name *
                        </Label>
                        <Input
                          id="last-name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Doe"
                          className={`h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 ${formErrors.lastName ? 'border-red-500' : ''}`}
                        />
                        {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@company.com"
                        className={`h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 ${formErrors.email ? 'border-red-500' : ''}`}
                      />
                      {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-semibold text-gray-700">
                        Company *
                      </Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Your Company Name"
                        className={`h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 ${formErrors.company ? 'border-red-500' : ''}`}
                      />
                      {formErrors.company && <p className="text-red-500 text-sm">{formErrors.company}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-type" className="text-sm font-semibold text-gray-700">
                        Project Type
                      </Label>
                      <Input
                        id="project-type"
                        value={formData.projectType}
                        onChange={(e) => handleInputChange('projectType', e.target.value)}
                        placeholder="Office fit-out, new build, refurbishment..."
                        className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your power distribution requirements..."
                        rows={4}
                        className={`border-gray-200 focus:border-orange-500 focus:ring-orange-500 resize-none ${formErrors.message ? 'border-red-500' : ''}`}
                      />
                      {formErrors.message && <p className="text-red-500 text-sm">{formErrors.message}</p>}
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
