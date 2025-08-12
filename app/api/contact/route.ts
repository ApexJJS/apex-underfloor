import { NextRequest, NextResponse } from 'next/server'
import { ConfidentialClientApplication } from '@azure/msal-node'
import axios from 'axios'

// Microsoft Graph configuration
const clientConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID!,
    clientSecret: process.env.AZURE_CLIENT_SECRET!,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`
  }
}

const cca = new ConfidentialClientApplication(clientConfig)

// Get access token for Microsoft Graph
async function getAccessToken() {
  const clientCredentialRequest = {
    scopes: ['https://graph.microsoft.com/.default'],
  }

  try {
    const response = await cca.acquireTokenByClientCredential(clientCredentialRequest)
    return response?.accessToken
  } catch (error) {
    console.error('Error acquiring token:', error)
    throw error
  }
}

// Send email using Microsoft Graph API
async function sendEmail(accessToken: string, emailData: any) {
  const graphUrl = `https://graph.microsoft.com/v1.0/users/${process.env.FROM_EMAIL}/sendMail`
  
  try {
    const response = await axios.post(graphUrl, emailData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

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
      marketingConsent,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent
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

    // Create branded HTML email content for sales notification
    const salesNotificationHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New PowerFlex Enquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header -->
        <div style="background-color: #1e293b; padding: 30px; text-align: center;">
            <img src="https://powerflex.apexwiringsolutions.co.uk/powerflexyellow@3x.png" alt="PowerFlex" style="height: 50px; width: auto; display: inline-block;" />
            <h2 style="margin: 10px 0 0 0; color: #ffffff; font-size: 20px; font-weight: normal;">New Website Enquiry</h2>
        </div>

        <!-- Main Content -->
        <div style="padding: 30px;">

            <h3 style="color: #1e293b; font-size: 18px; font-weight: bold; margin: 0 0 15px 0;">Contact Information</h3>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #1e293b;">${email}</a></p>
                <p style="margin: 0 0 8px 0;"><strong>Company:</strong> ${company}</p>
                <p style="margin: 0;"><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
            </div>

            <h3 style="color: #1e293b; font-size: 18px; font-weight: bold; margin: 0 0 15px 0;">Message</h3>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0; line-height: 1.6; color: #374151;">${message}</p>
            </div>

            <h3 style="color: #1e293b; font-size: 18px; font-weight: bold; margin: 0 0 15px 0;">GDPR Consent</h3>
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0 0 5px 0;">${gdprConsent ? '✓' : '✗'} <strong>Data Processing:</strong> ${gdprConsent ? 'Consent given' : 'No consent'}</p>
                <p style="margin: 0;">${marketingConsent ? '✓' : '✗'} <strong>Marketing Communications:</strong> ${marketingConsent ? 'Opted in' : 'Opted out'}</p>
            </div>

            <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 14px; color: #6b7280;">
                <p style="margin: 0 0 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString('en-GB')}</p>
                <p style="margin: 0;"><strong>IP Address:</strong> ${request.headers.get('x-forwarded-for') || 'Unknown'}</p>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <img src="https://powerflex.apexwiringsolutions.co.uk/ApexLogoNavy@2x.png" alt="Apex Wiring Solutions" style="height: 50px; width: auto; margin-bottom: 10px;" />
            <p style="margin: 0; font-size: 12px; color: #6b7280;">PowerFlex Enquiry System</p>
        </div>
    </div>
</body>
</html>
    `.trim()

    // Auto-reply content (plain text)
    const autoReplyText = `
Dear ${firstName},

Thank you for your enquiry about PowerFlex underfloor power systems.

We have received your message and will respond within 24 hours. Our technical team will review your requirements and provide you with detailed information about how PowerFlex can benefit your project.

Your enquiry details:
- Company: ${company}
- Project Type: ${projectType || 'Not specified'}

In the meantime, download our product brochure:
https://www.apexwiringsolutions.co.uk/brochure

Best regards,
Apex Wiring Solutions Team

---
Apex Wiring Solutions Ltd
St. Johns Road, Meadowfield Industrial Estate
Co. Durham, DH7 8RJ
Tel: +44 (0) 191 378 7900
Email: sales@apexwiringsolutions.co.uk
    `.trim()

    // Auto-reply content (HTML - modern branded design)
    const autoReplyHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank you for your PowerFlex enquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header -->
        <div style="background-color: #1e293b; padding: 40px 30px; text-align: center;">
            <div style="margin-bottom: 20px; text-align: center;">
                <img src="https://powerflex.apexwiringsolutions.co.uk/powerflexyellow@3x.png" alt="PowerFlex" style="height: 50px; width: auto; display: inline-block;" />
            </div>
            <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Thank you for your enquiry!</h2>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px;">
            <h3 style="color: #1e293b; font-size: 20px; font-weight: 600; margin: 0 0 20px 0;">Dear ${firstName},</h3>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for your interest in <strong>PowerFlex underfloor power distribution systems</strong>. 
                We're excited to help you discover how our innovative solutions can transform your commercial space.
            </p>

            <div style="background-color: #f1f5f9; border-left: 4px solid #f0ea45; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <h4 style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">✅ What happens next:</h4>
                <ul style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li>Our technical team will review your requirements</li>
                    <li>We'll respond with detailed information within <strong>24 hours</strong></li>
                    <li>We'll provide tailored solutions for your project</li>
                </ul>
            </div>

            <div style="background-color: #1e293b; border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center;">
                <h4 style="color: #f0ea45; font-size: 18px; font-weight: 600; margin: 0 0 15px 0;">📖 View/Download Our Brochure</h4>
                <p style="color: #e2e8f0; font-size: 14px; margin: 0 0 20px 0;">
                    Get detailed product specifications, case studies, and installation guides
                </p>
                <a href="https://heyzine.com/flip-book/f9763cbeda.html" 
                   style="display: inline-block; background-color: #f0ea45; color: #1e293b; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; transition: all 0.3s ease;">
                    View/Download PowerFlex Brochure
                </a>
            </div>

            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
                <h4 style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">Your Enquiry Details:</h4>
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; font-size: 14px; color: #475569;">
                    <p style="margin: 0 0 5px 0;"><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p style="margin: 0 0 5px 0;"><strong>Email:</strong> ${email}</p>
                    <p style="margin: 0 0 5px 0;"><strong>Company:</strong> ${company}</p>
                    <p style="margin: 0 0 10px 0;"><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
                    <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0 0 5px 0;"><strong>Message:</strong></p>
                        <p style="margin: 0; padding: 10px; background-color: #ffffff; border-radius: 4px; border-left: 3px solid #f0ea45;">${message}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 30px; border-top: 1px solid #e2e8f0;">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="https://powerflex.apexwiringsolutions.co.uk/ApexLogoNavy@2x.png" alt="Apex Wiring Solutions" style="height: 80px; width: auto; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto;" />
                <div style="background-color: #1e293b; display: inline-block; padding: 8px 16px; border-radius: 6px;">
                    <span style="color: #f0ea45; font-size: 14px; font-weight: 600;">Made in Durham, UK since 1980</span>
                </div>
            </div>
            
            <div style="text-align: center; color: #64748b; font-size: 14px; line-height: 1.6;">
                <p style="margin: 0 0 5px 0;">St. Johns Road, Meadowfield Industrial Estate</p>
                <p style="margin: 0 0 5px 0;">Co. Durham, DH7 8RJ</p>
                <p style="margin: 0 0 15px 0;">
                    📞 <a href="tel:+441913787900" style="color: #1e293b; text-decoration: none;">+44 (0) 191 378 7900</a> | 
                    ✉️ <a href="mailto:sales@apexwiringsolutions.co.uk" style="color: #1e293b; text-decoration: none;">sales@apexwiringsolutions.co.uk</a>
                </p>
                <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                    This email was sent because you submitted an enquiry on our website. 
                    ${marketingConsent ? 'You have opted in to receive marketing communications.' : 'You will only receive responses to your enquiry.'}
                </p>
                ${marketingConsent ? `
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #94a3b8;">
                    <a href="mailto:sales@apexwiringsolutions.co.uk?subject=Unsubscribe%20Request&body=Please%20unsubscribe%20me%20from%20marketing%20emails.%0A%0AMy%20email:%20" style="color: #1e293b; text-decoration: underline;">
                        Unsubscribe from marketing emails
                    </a>
                </p>
                ` : ''}
            </div>
        </div>
    </div>
</body>
</html>
    `.trim()

    // Get access token
    const accessToken = await getAccessToken()
    
    if (!accessToken) {
      throw new Error('Failed to acquire access token for Microsoft Graph API')
    }

    // Create Microsoft Graph email objects
    const notificationEmailData = {
      message: {
        subject: `🔥 New PowerFlex Enquiry from ${company}`,
        body: {
          contentType: "HTML",
          content: salesNotificationHTML
        },
        toRecipients: [{
          emailAddress: {
            address: process.env.CONTACT_EMAIL || 'sales@apexwiringsolutions.co.uk'
          }
        }]
      }
    }

    const autoReplyEmailData = {
      message: {
        subject: 'Thank you for your PowerFlex enquiry - Apex Wiring Solutions',
        body: {
          contentType: "HTML",
          content: autoReplyHTML
        },
        toRecipients: [{
          emailAddress: {
            address: email
          }
        }]
      }
    }

    // Send both emails using Microsoft Graph
    await Promise.all([
      sendEmail(accessToken, notificationEmailData),
      sendEmail(accessToken, autoReplyEmailData)
    ])

    // Log the enquiry (in production, you might want to save to database)
    console.log('New contact form submission:', {
      timestamp: new Date().toISOString(),
      name: `${firstName} ${lastName}`,
      email,
      company,
      projectType,
      gdprConsent,
      marketingConsent,
      ip: request.headers.get('x-forwarded-for') || 'Unknown',
      utm: {
        source: utmSource,
        medium: utmMedium,
        campaign: utmCampaign,
        term: utmTerm,
        content: utmContent
      }
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your enquiry has been sent successfully. We will respond within 24 hours.',
        conversionData: {
          linkedinConversion: true,
          utmSource: utmSource || 'direct',
          timestamp: new Date().toISOString()
        }
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