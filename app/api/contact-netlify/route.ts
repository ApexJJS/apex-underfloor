import { NextRequest, NextResponse } from 'next/server'

// Netlify Forms fallback - simpler deployment option
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      company,
      projectType,
      message,
      gdprConsent,
      marketingConsent
    } = body

    // Validation
    if (!firstName || !lastName || !email || !company || !message || !gdprConsent) {
      return NextResponse.json(
        { error: 'Missing required fields or GDPR consent' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // For Netlify deployment, you can use:
    // 1. Netlify Forms (add data-netlify="true" to your form)
    // 2. Third-party services like Formspree, EmailJS, etc.
    // 3. Webhook to external service

    // Example using fetch to external service (replace with your chosen service)
    const formData = new FormData()
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('email', email)
    formData.append('company', company)
    formData.append('projectType', projectType || '')
    formData.append('message', message)
    formData.append('gdprConsent', gdprConsent.toString())
    formData.append('marketingConsent', marketingConsent.toString())
    formData.append('timestamp', new Date().toISOString())

    // Log the enquiry
    console.log('New contact form submission:', {
      timestamp: new Date().toISOString(),
      name: `${firstName} ${lastName}`,
      email,
      company,
      projectType,
      gdprConsent,
      marketingConsent,
      ip: request.headers.get('x-forwarded-for') || 'Unknown'
    })

    // For now, just return success (replace with actual service integration)
    return NextResponse.json(
      { 
        success: true, 
        message: 'Your enquiry has been received. We will respond within 24 hours.',
        note: 'This is using the Netlify Forms fallback. Configure email service for production.'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to send your enquiry. Please try again or contact us directly.',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
}