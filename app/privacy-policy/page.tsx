"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { PowerFlexBrand } from "@/components/powerflex-brand"

export default function PrivacyPolicy() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              className="text-white hover:text-brand-yellow hover:bg-white/10 mb-8"
              onClick={() => router.push('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Website
            </Button>
            <h1 className="text-5xl font-bebas font-extrabold mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-300">
              How <PowerFlexBrand theme="white" className="mx-1" /> by Apex Wiring Solutions protects your personal information
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto prose prose-slate max-w-none">
          <div className="bg-brand-yellow/10 border-l-4 border-brand-yellow p-6 mb-8">
            <p className="text-sm text-brand-navy mb-0">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB')}
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Apex Wiring Solutions Ltd ("we", "our", or "us") is committed to protecting and respecting your privacy. 
              This Privacy Policy explains how we collect, use, and protect your personal information when you visit our 
              website or use our services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We are registered in England and Wales under company number [Company Number] and our registered office is 
              at St. Johns Road, Meadowfield Industrial Estate, Co. Durham, DH7 8RJ.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-brand-navy mb-3">Information you give us</h3>
            <ul className="text-gray-600 leading-relaxed mb-6 space-y-2">
              <li>• Contact information (name, email address, phone number)</li>
              <li>• Company information and job title</li>
              <li>• Project requirements and enquiry details</li>
              <li>• Any other information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold text-brand-navy mb-3">Information we collect automatically</h3>
            <ul className="text-gray-600 leading-relaxed mb-6 space-y-2">
              <li>• IP address and browser information</li>
              <li>• Pages visited and time spent on our website</li>
              <li>• Referring website information</li>
              <li>• Device and browser settings</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">We use your personal information to:</p>
            <ul className="text-gray-600 leading-relaxed mb-6 space-y-2">
              <li>• Respond to your enquiries and provide customer support</li>
              <li>• Process and fulfill your requests for information</li>
              <li>• Improve our website and services</li>
              <li>• Send you relevant information about our products and services (with your consent)</li>
              <li>• Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">Legal Basis for Processing</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Under GDPR, we process your personal information based on:
            </p>
            <ul className="text-gray-600 leading-relaxed mb-6 space-y-2">
              <li>• <strong>Legitimate interests:</strong> To respond to enquiries and improve our services</li>
              <li>• <strong>Consent:</strong> For marketing communications and non-essential cookies</li>
              <li>• <strong>Contract:</strong> To provide services you have requested</li>
              <li>• <strong>Legal obligation:</strong> To comply with applicable laws</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">Cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use cookies to enhance your browsing experience and analyze website traffic. Our cookies include:
            </p>
            <ul className="text-gray-600 leading-relaxed mb-6 space-y-2">
              <li>• <strong>Essential cookies:</strong> Required for website functionality</li>
              <li>• <strong>Analytics cookies:</strong> Help us understand how visitors use our website</li>
              <li>• <strong>Marketing cookies:</strong> Used to show relevant advertisements</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              You can manage your cookie preferences using our cookie consent tool or through your browser settings.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">Information Sharing</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="text-gray-600 leading-relaxed mb-6 space-y-2">
              <li>• Trusted service providers who assist in operating our website</li>
              <li>• Professional advisers (lawyers, accountants, etc.)</li>
              <li>• Regulatory authorities when required by law</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">Data Security</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="text-gray-600 leading-relaxed mb-6 space-y-2">
              <li>• SSL encryption for data transmission</li>
              <li>• Regular security assessments</li>
              <li>• Access controls and staff training</li>
              <li>• Secure data storage systems</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Under GDPR, you have the right to:</p>
            <ul className="text-gray-600 leading-relaxed mb-6 space-y-2">
              <li>• Access your personal information</li>
              <li>• Correct inaccurate information</li>
              <li>• Request deletion of your information</li>
              <li>• Object to processing</li>
              <li>• Data portability</li>
              <li>• Withdraw consent</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              To exercise these rights, contact us at{' '}
              <a href="mailto:info@apexwiringsolutions.co.uk" className="text-brand-navy hover:text-brand-yellow">
                info@apexwiringsolutions.co.uk
              </a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">Data Retention</h2>
            <p className="text-gray-600 leading-relaxed">
              We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, 
              typically for up to 7 years for business enquiries, or until you request its deletion.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">Contact Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> info@apexwiringsolutions.co.uk</p>
                <p><strong>Phone:</strong> +44 (0) 191 378 7900</p>
                <p><strong>Address:</strong> St. Johns Road, Meadowfield Industrial Estate, Co. Durham, DH7 8RJ</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by 
              posting the new policy on this page with an updated "Last updated" date.
            </p>
          </section>

          <div className="bg-slate-900 text-white p-8 rounded-lg text-center">
            <PowerFlexBrand theme="white" className="mb-4" />
            <p className="text-gray-300">
              © {new Date().getFullYear()} Apex Wiring Solutions Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}