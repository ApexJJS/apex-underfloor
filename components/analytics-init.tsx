"use client"

import { useEffect } from 'react'
import { getCookiePreferences, initializeGoogleAnalytics, initializeLinkedInTracking } from '@/lib/cookies'

export function AnalyticsInit() {
  useEffect(() => {
    // Initialize analytics if user has already consented
    const preferences = getCookiePreferences()
    
    if (preferences?.analytics) {
      initializeGoogleAnalytics('G-XXXXXXXXXX') // Replace with your GA4 ID
    }
    
    if (preferences?.marketing) {
      initializeLinkedInTracking('XXXXXX') // Replace with your LinkedIn Partner ID  
    }
  }, [])

  return null // This component doesn't render anything
}