"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Cookie, Settings } from "lucide-react"
import { setCookiePreferences, getCookie, initializeGoogleAnalytics, initializeLinkedInTracking, cleanupTrackingCookies, type CookiePreferences } from "@/lib/cookies"

interface CookieConsentProps {
  onAccept: () => void
  onDecline: () => void
}

export function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = getCookie('cookieConsent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const preferences: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true
    }
    setCookiePreferences(preferences)
    
    // Initialize tracking with your IDs (replace with actual IDs)
    initializeGoogleAnalytics('G-XXXXXXXXXX') // Replace with your GA4 ID
    initializeLinkedInTracking('XXXXXX') // Replace with your LinkedIn Partner ID
    
    setIsVisible(false)
    onAccept()
  }

  const handleDeclineAll = () => {
    const preferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false
    }
    setCookiePreferences(preferences)
    cleanupTrackingCookies()
    setIsVisible(false)
    onDecline()
  }

  const handleSavePreferences = (preferences: CookiePreferences) => {
    setCookiePreferences(preferences)
    
    if (preferences.analytics) {
      initializeGoogleAnalytics('G-XXXXXXXXXX') // Replace with your GA4 ID
    }
    
    if (preferences.marketing) {
      initializeLinkedInTracking('XXXXXX') // Replace with your LinkedIn Partner ID
    }
    
    if (!preferences.analytics && !preferences.marketing) {
      cleanupTrackingCookies()
    }
    
    setIsVisible(false)
    if (preferences.analytics || preferences.marketing) {
      onAccept()
    } else {
      onDecline()
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[10001] bg-black/50 backdrop-blur-sm flex items-end lg:items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white shadow-2xl border-0">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 bg-brand-yellow rounded-lg flex items-center justify-center flex-shrink-0">
              <Cookie className="h-5 w-5 text-brand-navy" />
            </div>
            <div className="flex-1">
              <h3 className="font-bebas font-extrabold text-xl text-brand-navy mb-2">
                We Use Cookies
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or 
                learn more in our{' '}
                <Link href="/privacy-policy" className="text-brand-navy underline hover:text-brand-yellow">
                  Privacy Policy
                </Link>.
              </p>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {!showSettings ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAcceptAll}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-navy font-semibold"
              >
                Accept All Cookies
              </Button>
              <Button
                onClick={handleDeclineAll}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Decline All
              </Button>
              <Button
                onClick={() => setShowSettings(true)}
                variant="ghost"
                className="text-gray-600 hover:text-brand-navy"
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage Preferences
              </Button>
            </div>
          ) : (
            <CookieSettings onSave={handleSavePreferences} onBack={() => setShowSettings(false)} />
          )}
        </div>
      </Card>
    </div>
  )
}

function CookieSettings({ onSave, onBack }: { onSave: (preferences: any) => void, onBack: () => void }) {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  })

  const handleSave = () => {
    onSave(preferences)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-brand-navy">Necessary Cookies</h4>
            <p className="text-xs text-gray-600">Required for the website to function properly</p>
          </div>
          <div className="text-xs text-gray-500 font-medium">Always Active</div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-brand-navy">Analytics Cookies</h4>
            <p className="text-xs text-gray-600">Help us understand how visitors interact with our website</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-yellow"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-brand-navy">Marketing Cookies</h4>
            <p className="text-xs text-gray-600">Used to track visitors and display relevant ads</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-yellow"></div>
          </label>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
        <Button
          onClick={handleSave}
          className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-navy font-semibold"
        >
          Save Preferences
        </Button>
        <Button
          onClick={onBack}
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Back
        </Button>
      </div>
    </div>
  )
}