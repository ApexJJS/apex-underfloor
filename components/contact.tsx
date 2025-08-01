import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PowerFlexBrand } from "./powerflex-brand"
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
    gdprConsent: false,
    marketingConsent: false
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required'
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid'
    if (!formData.company.trim()) errors.company = 'Company is required'
    if (!formData.message.trim()) errors.message = 'Message is required'
    if (!formData.gdprConsent) errors.gdprConsent = 'You must consent to data processing'
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        // Success
        alert('Thank you for your enquiry! We have sent you a confirmation email and will respond within 24 hours.')
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          projectType: '',
          message: '',
          gdprConsent: false,
          marketingConsent: false
        })
        setFormErrors({})
      } else {
        // Error from API
        alert(`Error: ${result.error || 'Failed to send your enquiry. Please try again.'}`)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Failed to send your enquiry. Please check your connection and try again, or contact us directly at info@apexwiringsolutions.co.uk')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-brand-yellow/5 rounded-full blur-2xl"></div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="relative mb-8">
              <img 
                src="/apex-logo.svg" 
                alt="Apex Wiring Solutions" 
                className="w-48 h-24 mx-auto object-contain filter invert"
              />
            </div>
            <h2 className="text-5xl md:text-6xl font-bebas font-extrabold text-white mb-6">
              Get In Contact
              <span className="block text-brand-yellow">With Us</span>
            </h2>
            <div className="flex items-center justify-center mb-8">
              <img 
                src="/LOGO-made-in-britain-logo-vector-vertical-transparent.png" 
                alt="Made in Britain" 
                className="w-16 h-20 object-contain"
              />
            </div>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Ready to revolutionise your power distribution? Our experts are standing by to help you discover how
              <PowerFlexBrand theme="white" className="mx-2" /> can transform your commercial space with
              cutting-edge efficiency.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Contact Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h4 className="font-bebas font-extrabold text-2xl text-brand-yellow mb-4">Leaders in Power Distribution Innovation</h4>
                <p className="text-gray-300 text-sm mb-6">
                  With over 45 years of pioneering experience since 1980, Apex has grown into the UK's leading 
                  manufacturer of modular wiring systems, earning a global reputation for excellence.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Revolutionary zero-termination technology",
                    "45+ years of proven expertise (since 1980)", 
                    "UK's leading manufacturer - Made in Durham",
                    "Comprehensive technical support",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Phone, title: "Phone", desc: "+44 (0) 191 378 7900" },
                  { icon: Mail, title: "Email", desc: "info@apexwiringsolutions.co.uk" },
                  { icon: MapPin, title: "Address", desc: "St. Johns Road, Meadowfield Ind Estate, Co. Durham, DH7 8RJ" },
                ].map((contact, index) => (
                  <div key={index} className="group flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-yellow rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:ring-4 group-hover:ring-brand-yellow/30 group-hover:shadow-lg group-hover:shadow-brand-yellow/40 group-hover:animate-pulse transition-all duration-300 cursor-pointer">
                      <contact.icon className="h-6 w-6 text-brand-navy group-hover:scale-110 transition-all duration-300" />
                    </div>
                    <div>
                      <h4 className="font-bebas font-extrabold text-lg mb-2">{contact.title}</h4>
                      <p className="text-gray-300">{contact.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <Card className="border-0 shadow-2xl bg-white">
                <CardHeader className="p-8 bg-gradient-to-r from-brand-yellow/10 to-white border-b border-brand-yellow/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-brand-yellow rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-brand-navy" />
                    </div>
                    <CardTitle className="text-3xl font-bebas font-extrabold text-brand-navy">Request Information</CardTitle>
                  </div>
                  <CardDescription className="text-lg text-brand-navy mt-2">
                    Get in touch to learn more about <PowerFlexBrand theme="navy" /> solutions
                    for your project. Our experts will respond within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="first-name" className="text-sm font-semibold text-brand-navy">
                          First Name *
                        </Label>
                        <Input
                          id="first-name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="John"
                          className={`h-12 border-gray-200 focus:border-brand-yellow focus:ring-brand-yellow ${formErrors.firstName ? 'border-red-500' : ''}`}
                        />
                        {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name" className="text-sm font-semibold text-brand-navy">
                          Last Name *
                        </Label>
                        <Input
                          id="last-name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Doe"
                          className={`h-12 border-gray-200 focus:border-brand-yellow focus:ring-brand-yellow ${formErrors.lastName ? 'border-red-500' : ''}`}
                        />
                        {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-brand-navy">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@company.com"
                        className={`h-12 border-gray-200 focus:border-brand-yellow focus:ring-brand-yellow ${formErrors.email ? 'border-red-500' : ''}`}
                      />
                      {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-semibold text-brand-navy">
                        Company *
                      </Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Your Company Name"
                        className={`h-12 border-gray-200 focus:border-brand-yellow focus:ring-brand-yellow ${formErrors.company ? 'border-red-500' : ''}`}
                      />
                      {formErrors.company && <p className="text-red-500 text-sm">{formErrors.company}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-type" className="text-sm font-semibold text-brand-navy">
                        Project Type
                      </Label>
                      <Input
                        id="project-type"
                        value={formData.projectType}
                        onChange={(e) => handleInputChange('projectType', e.target.value)}
                        placeholder="Office fit-out, new build, refurbishment..."
                        className="h-12 border-gray-200 focus:border-brand-yellow focus:ring-brand-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-semibold text-brand-navy">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your power distribution requirements..."
                        rows={4}
                        className={`border-gray-200 focus:border-brand-yellow focus:ring-brand-yellow resize-none ${formErrors.message ? 'border-red-500' : ''}`}
                      />
                      {formErrors.message && <p className="text-red-500 text-sm">{formErrors.message}</p>}
                    </div>

                    {/* GDPR Consent */}
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <input
                            id="gdpr-consent"
                            type="checkbox"
                            checked={formData.gdprConsent}
                            onChange={(e) => handleInputChange('gdprConsent', e.target.checked)}
                            className={`mt-1 w-4 h-4 text-brand-yellow bg-gray-100 border-gray-300 rounded focus:ring-brand-yellow focus:ring-2 ${formErrors.gdprConsent ? 'border-red-500' : ''}`}
                          />
                          <label htmlFor="gdpr-consent" className="text-sm text-brand-navy leading-relaxed">
                            I consent to Apex Wiring Solutions processing my personal data to respond to my enquiry. 
                            I understand my data will be handled in accordance with the{' '}
                            <Link href="/privacy-policy" target="_blank" className="text-brand-navy hover:text-brand-yellow underline">
                              Privacy Policy
                            </Link>. *
                          </label>
                        </div>
                        {formErrors.gdprConsent && <p className="text-red-500 text-sm ml-7">{formErrors.gdprConsent}</p>}

                        <div className="flex items-start space-x-3">
                          <input
                            id="marketing-consent"
                            type="checkbox"
                            checked={formData.marketingConsent}
                            onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                            className="mt-1 w-4 h-4 text-brand-yellow bg-gray-100 border-gray-300 rounded focus:ring-brand-yellow focus:ring-2"
                          />
                          <label htmlFor="marketing-consent" className="text-sm text-brand-navy leading-relaxed">
                            I would like to receive updates about PowerFlex products and services from Apex Wiring Solutions. 
                            I can unsubscribe at any time.
                          </label>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 leading-relaxed">
                        By submitting this form, you acknowledge that your information will be used in accordance with our{' '}
                        <Link href="/privacy-policy" target="_blank" className="text-brand-navy hover:text-brand-yellow underline">
                          Privacy Policy
                        </Link>{' '}
                        and{' '}
                        <Link href="/terms" target="_blank" className="text-brand-navy hover:text-brand-yellow underline">
                          Terms & Conditions
                        </Link>.
                      </p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-navy text-lg py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group disabled:opacity-50"
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
      </div>
    </section>
  )
}