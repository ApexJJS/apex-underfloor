// UTM parameter utilities for tracking LinkedIn campaigns

export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

/**
 * Capture UTM parameters from current URL
 */
export function captureUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {}
  
  const urlParams = new URLSearchParams(window.location.search)
  
  return {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
    utm_content: urlParams.get('utm_content') || undefined,
  }
}

/**
 * Store UTM parameters in sessionStorage for persistence across page navigation
 */
export function storeUTMParams(params: UTMParams): void {
  if (typeof window === 'undefined') return
  
  // Only store if we have actual UTM parameters
  const hasUTMParams = Object.values(params).some(value => value && value !== '')
  
  if (hasUTMParams) {
    sessionStorage.setItem('utm_params', JSON.stringify(params))
  }
}

/**
 * Retrieve stored UTM parameters from sessionStorage
 */
export function getStoredUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {}
  
  try {
    const stored = sessionStorage.getItem('utm_params')
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

/**
 * Get UTM parameters from current URL or sessionStorage
 */
export function getUTMParams(): UTMParams {
  const currentParams = captureUTMParams()
  const storedParams = getStoredUTMParams()
  
  // Current URL params take precedence over stored ones
  return {
    utm_source: currentParams.utm_source || storedParams.utm_source,
    utm_medium: currentParams.utm_medium || storedParams.utm_medium,
    utm_campaign: currentParams.utm_campaign || storedParams.utm_campaign,
    utm_term: currentParams.utm_term || storedParams.utm_term,
    utm_content: currentParams.utm_content || storedParams.utm_content,
  }
}

/**
 * Initialize UTM tracking on page load
 */
export function initializeUTMTracking(): void {
  if (typeof window === 'undefined') return
  
  // Capture and store UTM parameters from current URL
  const params = captureUTMParams()
  storeUTMParams(params)
}

/**
 * LinkedIn conversion tracking helper
 */
export function trackLinkedInConversion(conversionId: string): void {
  if (typeof window !== 'undefined' && window.lintrk) {
    try {
      window.lintrk('track', { conversion_id: conversionId })
      console.log('LinkedIn conversion tracked:', conversionId)
    } catch (error) {
      console.warn('LinkedIn conversion tracking failed:', error)
    }
  } else {
    console.warn('LinkedIn tracking not available')
  }
}

// LinkedIn tracking function type
declare global {
  interface Window {
    lintrk?: (action: string, options?: { conversion_id: string }) => void
  }
}