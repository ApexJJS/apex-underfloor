// Cookie management utilities for GDPR compliance

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

// Set a cookie with proper attributes
export function setCookie(name: string, value: string, days: number = 365) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`
}

// Get a cookie value
export function getCookie(name: string): string | null {
  const nameEQ = name + "="
  const ca = document.cookie.split(';')
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

// Delete a cookie
export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

// Get cookie preferences
export function getCookiePreferences(): CookiePreferences | null {
  const preferences = getCookie('cookiePreferences')
  if (!preferences) return null
  
  try {
    return JSON.parse(preferences)
  } catch {
    return null
  }
}

// Set cookie preferences
export function setCookiePreferences(preferences: CookiePreferences) {
  setCookie('cookiePreferences', JSON.stringify(preferences))
  setCookie('cookieConsent', 'true')
}

// Check if user has consented to a specific cookie type
export function hasConsentFor(type: keyof CookiePreferences): boolean {
  const preferences = getCookiePreferences()
  if (!preferences) return false
  return preferences[type]
}

// Initialize Google Analytics based on consent
export function initializeGoogleAnalytics(measurementId: string) {
  if (!hasConsentFor('analytics')) return

  // Load Google Analytics script
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script1)

  // Initialize gtag
  ;(window as any).dataLayer = (window as any).dataLayer || []
  function gtag(...args: any[]) {
    ;(window as any).dataLayer.push(arguments)
  }
  
  gtag('js', new Date())
  gtag('config', measurementId, {
    cookie_flags: 'SameSite=Lax;Secure',
    anonymize_ip: true // GDPR compliance
  })
}

// Initialize LinkedIn Insight Tag based on consent
export function initializeLinkedInTracking(partnerId: string) {
  if (!hasConsentFor('marketing')) return

  // LinkedIn Insight Tag
  const script = document.createElement('script')
  script.innerHTML = `
    _linkedin_partner_id = "${partnerId}";
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(_linkedin_partner_id);
  `
  document.head.appendChild(script)

  const linkedInScript = document.createElement('script')
  linkedInScript.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
  linkedInScript.async = true
  document.head.appendChild(linkedInScript)
}

// Clean up tracking cookies when consent is withdrawn
export function cleanupTrackingCookies() {
  // Google Analytics cookies
  const gaCookies = ['_ga', '_ga_', '_gid', '_gat', '_gtag']
  gaCookies.forEach(cookie => {
    deleteCookie(cookie)
    // Also delete with domain variants
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`
  })

  // LinkedIn cookies
  const linkedInCookies = ['li_gc', 'lidc', 'li_mc', 'li_at']
  linkedInCookies.forEach(cookie => {
    deleteCookie(cookie)
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.linkedin.com`
  })
}