"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { PowerFlexBrand } from "@/components/powerflex-brand"

export default function TermsAndConditions() {
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
            <h1 className="text-5xl font-bebas font-extrabold mb-4">Terms & Conditions</h1>
            <p className="text-xl text-gray-300">
              Terms of use for <PowerFlexBrand theme="white" className="mx-1" /> by Apex Wiring Solutions
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
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              These Terms and Conditions ("Terms") govern your use of the Apex Wiring Solutions Ltd website 
              ("we", "our", or "us") and our PowerFlex underfloor power distribution systems.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Apex Wiring Solutions Ltd is registered in England and Wales under company number [Company Number] 
              and our registered office is at St. Johns Road, Meadowfield Industrial Estate, Co. Durham, DH7 8RJ.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">2. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by these Terms. 
              If you do not agree to these Terms, please do not use our website or services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">3. Use of Website</h2>
            
            <h3 className="text-xl font-semibold text-brand-navy mb-3">Permitted Use</h3>
            <p className="text-gray-600 leading-relaxed mb-4">You may use our website for:</p>
            <ul className="text-gray-600 leading-relaxed mb-6 space-y-2">
              <li>• Viewing product information and specifications</li>
              <li>• Requesting quotes and technical information</li>
              <li>• Contacting us for business purposes</li>
              <li>• Downloading publicly available resources</li>
            </ul>

            <h3 className="text-xl font-semibold text-brand-navy mb-3">Prohibited Use</h3>
            <p className="text-gray-600 leading-relaxed mb-4">You must not:</p>
            <ul className="text-gray-600 leading-relaxed mb-6 space-y-2">
              <li>• Use the website for any unlawful purpose</li>
              <li>• Attempt to gain unauthorized access to our systems</li>
              <li>• Copy, reproduce, or distribute our content without permission</li>
              <li>• Use automated systems to access our website</li>
              <li>• Interfere with the website's operation</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">4. Products and Services</h2>
            
            <h3 className="text-xl font-semibold text-brand-navy mb-3">Product Information</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We strive to ensure all product information is accurate, but specifications may change without notice. 
              Always confirm specifications before placing orders.
            </p>

            <h3 className="text-xl font-semibold text-brand-navy mb-3">Quotations</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Quotations are valid for 30 days unless otherwise stated. Prices exclude VAT unless specified. 
              All orders are subject to our standard terms of sale.
            </p>

            <h3 className="text-xl font-semibold text-brand-navy mb-3">Installation and Support</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              PowerFlex systems should be installed by qualified electricians in accordance with current UK regulations 
              and our installation guidelines. We provide technical support for approved installations.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">5. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              All content on this website, including text, images, logos, and technical drawings, is owned by 
              Apex Wiring Solutions Ltd and protected by copyright and other intellectual property laws.
            </p>
            <p className="text-gray-600 leading-relaxed">
              PowerFlex is a trademark of Apex Wiring Solutions Ltd. Unauthorized use of our trademarks is prohibited.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">6. Liability and Warranties</h2>
            
            <h3 className="text-xl font-semibold text-brand-navy mb-3">Website Disclaimer</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              This website is provided "as is" without warranties of any kind. We do not guarantee that the website 
              will be error-free or continuously available.
            </p>

            <h3 className="text-xl font-semibold text-brand-navy mb-3">Product Warranties</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              PowerFlex products are covered by our standard warranty terms. Warranty coverage depends on proper 
              installation and use according to our guidelines.
            </p>

            <h3 className="text-xl font-semibold text-brand-navy mb-3">Limitation of Liability</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our liability is limited to the maximum extent permitted by law. We are not liable for indirect, 
              consequential, or special damages arising from use of our website or products.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">7. Privacy and Data Protection</h2>
            <p className="text-gray-600 leading-relaxed">
              Your privacy is important to us. Please review our{' '}
              <a href="/privacy-policy" className="text-brand-navy hover:text-brand-yellow underline">
                Privacy Policy
              </a>{' '}
              to understand how we collect, use, and protect your personal information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">8. Third-Party Links</h2>
            <p className="text-gray-600 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the content or 
              privacy practices of these sites. Links do not constitute endorsement of third-party content.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">9. Compliance and Standards</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              PowerFlex products are designed and manufactured to comply with relevant UK and European standards, including:
            </p>
            <ul className="text-gray-600 leading-relaxed mb-6 space-y-2">
              <li>• BS 7909 (Code of practice for temporary electrical systems)</li>
              <li>• IEC 60439 (Low-voltage switchgear and controlgear assemblies)</li>
              <li>• CE marking requirements</li>
              <li>• UK Building Regulations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">10. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms are governed by English law and subject to the exclusive jurisdiction of the English courts. 
              Any disputes will be resolved through the courts of England and Wales.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">11. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update these Terms from time to time. Continued use of our website after changes constitutes 
              acceptance of the updated Terms. Please review these Terms regularly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">12. Contact Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> Please use our contact form or call us</p>
                <p><strong>Phone:</strong> +44 (0) 191 378 7900</p>
                <p><strong>Address:</strong> St. Johns Road, Meadowfield Industrial Estate, Co. Durham, DH7 8RJ</p>
              </div>
            </div>
          </section>

          <div className="bg-slate-900 text-white p-8 rounded-lg text-center">
            <PowerFlexBrand theme="white" className="mb-4" />
            <p className="text-gray-300 mb-2">
              © {new Date().getFullYear()} Apex Wiring Solutions Ltd. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
              Established 1980 • Made in Durham, UK • Company Registration: [Company Number]
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}