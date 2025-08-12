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

    // Create email content
    const emailContent = `
New PowerFlex Enquiry

Contact Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Company: ${company}
- Project Type: ${projectType || 'Not specified'}

Message:
${message}

GDPR Consent:
- Data Processing: ${gdprConsent ? 'Yes' : 'No'}
- Marketing Communications: ${marketingConsent ? 'Yes' : 'No'}

Submitted: ${new Date().toLocaleString('en-GB')}
IP Address: ${request.headers.get('x-forwarded-for') || 'Unknown'}
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
        <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 40px 30px; text-align: center;">
            <div style="margin-bottom: 20px; text-align: center;">
                <svg viewBox="0 0 399.82 84.21" style="height: 50px; width: auto; display: inline-block;">
                    <g>
                        <path fill="#f0ea45" d="M0,0h19.21c13.05,0,19.45,7.23,19.45,20.52v8.18c0,13.28-6.4,20.52-19.45,20.52h-6.17v33.8H0V0ZM19.21,37.36c4.15,0,6.4-1.9,6.4-7.83v-9.84c0-5.93-2.25-7.83-6.4-7.83h-6.17v25.5h6.17Z"/>
                        <path fill="#f0ea45" d="M44.12,64.52v-23.48c0-12.57,6.64-19.69,18.5-19.69s18.5,7.12,18.5,19.69v23.48c0,12.57-6.64,19.69-18.5,19.69s-18.5-7.12-18.5-19.69ZM68.55,65.71v-25.86c0-4.15-1.3-7.35-5.93-7.35s-5.93,3.2-5.93,7.35v25.86c0,4.27,1.42,7.35,5.93,7.35s5.93-3.08,5.93-7.35Z"/>
                        <path fill="#f0ea45" d="M86.11,22.54h12.33l6.4,43.53,5.93-43.53h12.69l5.93,43.53,6.4-43.53h11.15l-9.13,60.49h-15.18l-5.69-37.24-5.69,37.24h-16.01l-9.13-60.49Z"/>
                        <path fill="#f0ea45" d="M189.18,41.04v14.47h-24.67v10.2c0,5.34,2.13,7.35,6.29,7.35s6.29-2.02,6.29-7.35v-2.25h12.1v1.07c0,12.57-6.52,19.69-18.62,19.69s-18.62-7.12-18.62-19.69v-23.48c0-12.57,6.52-19.69,18.62-19.69s18.62,7.12,18.62,19.69ZM176.84,45.54v-5.69c0-5.34-2.25-7.35-6.17-7.35s-6.17,2.02-6.17,7.35v5.69h12.33Z"/>
                        <path fill="#f0ea45" d="M223.57,22.06v12.22c-.95-.24-2.14-.36-3.2-.36-7,0-10.67,4.86-10.67,14.23v34.87h-12.57V22.54h10.91l.24,10.2c1.66-7.59,5.57-11.39,11.74-11.39,1.54,0,2.61.24,3.56.71Z"/>
                        <path fill="#f0ea45" d="M232.82,0h39.26v4.98h-33.68v34.04h27.87v4.98h-27.87v39.02h-5.57V0Z"/>
                        <path fill="#f0ea45" d="M283.58,0h5.46v83.02h-5.46V0Z"/>
                        <path fill="#f0ea45" d="M345.14,44.48v9.25h-36.17v9.61c0,10.32,5.46,16.01,15.42,16.01s15.18-5.81,15.3-14.94h5.46c-.59,12.69-7.95,19.81-20.76,19.81s-20.88-7.71-20.88-21.35v-18.38c0-13.64,7.47-21.35,20.88-21.35s20.76,7.71,20.76,21.35ZM339.69,49.1v-5.1c0-10.44-5.22-16.01-15.3-16.01s-15.42,5.69-15.42,16.01v5.1h30.72Z"/>
                        <path fill="#f0ea45" d="M374.08,53.02l-18.74-28.7h5.93l16.13,24.91,16.01-24.91h5.57l-18.62,28.7,19.45,30.01h-6.05l-16.72-26.33-16.84,26.33h-5.69l19.57-30.01Z"/>
                    </g>
                </svg>
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
                <h4 style="color: #f0ea45; font-size: 18px; font-weight: 600; margin: 0 0 15px 0;">📥 Download Our Brochure</h4>
                <p style="color: #e2e8f0; font-size: 14px; margin: 0 0 20px 0;">
                    Get detailed product specifications, case studies, and installation guides
                </p>
                <a href="https://www.apexwiringsolutions.co.uk/brochure" 
                   style="display: inline-block; background-color: #f0ea45; color: #1e293b; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; transition: all 0.3s ease;">
                    Download PowerFlex Brochure
                </a>
            </div>

            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
                <h4 style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">Your Enquiry Details:</h4>
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; font-size: 14px; color: #475569;">
                    <p style="margin: 0 0 5px 0;"><strong>Company:</strong> ${company}</p>
                    <p style="margin: 0;"><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 30px; border-top: 1px solid #e2e8f0;">
            <div style="text-align: center; margin-bottom: 20px;">
                <svg viewBox="0 0 74.31 112.26" style="height: 80px; width: auto; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto;">
                    <rect fill="#1e293b" x=".03" y="109.15" width="74.28" height="3.1"/>
                    <rect fill="#1e293b" x=".03" width="74.28" height="3.1"/>
                    <path fill="#1e293b" d="M3.7,42H.28L6.65,8.7h5.38l6.38,33.31h-3.71l-1.29-6.71H4.99l-1.29,6.71ZM12.89,32.11l-3.76-19.22-3.66,19.22h7.42Z"/>
                    <path fill="#1e293b" d="M34.23,10.81c1.32,1.72,1.97,3.86,1.83,6.02v4c0,5.36-2.59,8.04-7.76,8.04h-3.28v13.13h-3.71V8.7h7.28c2.1-.17,4.17.61,5.64,2.12ZM31.39,24.49c.76-.97,1.11-2.2,1-3.43v-4.43c.09-1.22-.22-2.43-.9-3.45-.74-.8-1.81-1.22-2.9-1.12h-3.57v13.46h3.28c1.13.09,2.25-.28,3.09-1.05Z"/>
                    <path fill="#1e293b" d="M50.95,26.78h-8.14v11.85h9.99v3.38h-13.7V8.7h13.7v3.38h-9.99v11.37h8.14v3.33Z"/>
                    <path fill="#1e293b" d="M58.94,42h-3.52l6.71-17.18-6.28-16.13h3.85l5.14,13.32,5.19-13.32h3.47l-6.23,16.13,6.66,17.18h-3.9l-5.52-14.37-5.57,14.37Z"/>
                    <path fill="#1e293b" d="M4.99,77.74L0,50.02h.87l4.83,26.54,4.79-26.38h1.07l4.52,26.22,4.67-26.38h.79l-4.91,27.73h-1.15l-4.48-25.67-4.75,25.67h-1.27Z"/>
                    <path fill="#1e293b" d="M25.47,77.74h-.87v-27.73h.87v27.73Z"/>
                    <path fill="#1e293b" d="M39.85,56.23v2.49c.09,1.41-.29,2.82-1.07,4-.83,1.02-2.02,1.67-3.33,1.82,2.93.45,4.4,2.3,4.4,5.54v4.36c-.09,1.15.17,2.29.75,3.29h-.95c-.52-1.01-.75-2.15-.67-3.29v-4.36c.17-1.51-.41-3.01-1.54-4.02-1.35-.84-2.93-1.24-4.52-1.13h-3.41v12.8h-.87v-27.73h5.51c3.8,0,5.7,2.07,5.7,6.22ZM37.49,63.01c1.13-1.07,1.68-2.62,1.49-4.16v-2.53c.1-1.45-.31-2.88-1.15-4.06-.96-1.02-2.33-1.54-3.72-1.41h-4.6v13.27h3.41c1.6.12,3.2-.27,4.57-1.11Z"/>
                    <path fill="#1e293b" d="M44.56,77.74h-.87v-27.73h.87v27.73Z"/>
                    <path fill="#1e293b" d="M47.73,77.74v-27.73h1.23l9.74,25.95v-25.95h.83v27.73h-1.07l-9.9-26.46v26.46h-.83Z"/>
                    <path fill="#1e293b" d="M72.87,51.76c1,1.5,1.49,3.27,1.41,5.07v1.82h-.87v-1.86c.07-1.58-.33-3.14-1.17-4.48-.87-1.18-2.28-1.82-3.74-1.7-1.46-.12-2.89.52-3.76,1.7-.85,1.33-1.26,2.9-1.19,4.48v14.18c-.08,1.57.33,3.13,1.17,4.46.89,1.18,2.32,1.81,3.78,1.68,1.45.12,2.87-.51,3.74-1.68.84-1.33,1.25-2.89,1.17-4.46v-6.3h-4.32v-.79h5.19v7.05c.08,1.8-.41,3.57-1.41,5.07-2.21,2.43-5.98,2.6-8.41.39-.14-.12-.27-.25-.39-.39-1-1.5-1.49-3.27-1.41-5.07v-14.1c-.08-1.8.41-3.57,1.41-5.07,2.22-2.43,5.98-2.6,8.41-.38.13.12.26.25.38.38Z"/>
                    <path fill="#1e293b" d="M6.49,86.96c.62.93.93,2.04.88,3.16v.33h-.55v-.35c.04-.98-.21-1.94-.73-2.77-.54-.74-1.42-1.14-2.33-1.07-.92-.08-1.81.32-2.36,1.05-.52.82-.77,1.79-.73,2.76-.01.63.14,1.25.44,1.81.28.51.66.96,1.10,1.33.44.37,1.02.79,1.74,1.28.63.41,1.24.85,1.82,1.33.47.4.86.88,1.15,1.42.32.61.48,1.28.46,1.97.06,1.13-.26,2.24-.89,3.17-1.47,1.54-3.9,1.59-5.44.13-.04-.04-.09-.08-.13-.13-.63-.93-.95-2.05-.89-3.17v-.85h.53v.88c-.05.98.21,1.95.75,2.77,1.22,1.32,3.27,1.4,4.59.18.06-.06.12-.12.18-.18.54-.82.8-1.79.75-2.77.02-.62-.14-1.24-.44-1.78-.28-.49-.65-.93-1.08-1.29-.56-.45-1.14-.88-1.74-1.27-.63-.42-1.25-.87-1.83-1.35-.47-.4-.86-.89-1.15-1.43-.33-.62-.49-1.31-.48-2.01-.06-1.12.25-2.24.89-3.16.67-.8,1.68-1.24,2.72-1.18,1.06-.09,2.1.37,2.76,1.2Z"/>
                    <path fill="#1e293b" d="M10.24,86.98c.67-.85,1.72-1.31,2.8-1.23,1.09-.09,2.16.37,2.85,1.23.65.94.97,2.07.92,3.21v8.93c.05,1.14-.27,2.27-.92,3.21-.69.86-1.75,1.32-2.85,1.23-1.08.08-2.13-.38-2.8-1.23-.65-.94-.97-2.07-.92-3.21v-8.93c-.05-1.14.27-2.27.92-3.21ZM10.63,101.98c.56.75,1.47,1.16,2.41,1.08.94.07,1.86-.33,2.43-1.08.55-.84.82-1.83.78-2.83v-8.98c.05-1-.23-2-.78-2.83-.58-.75-1.49-1.15-2.43-1.08-.93-.08-1.84.33-2.41,1.08-.54.84-.8,1.83-.75,2.83v8.98c-.05,1,.22,1.99.75,2.83Z"/>
                    <path fill="#1e293b" d="M18.78,85.88h.55v17.03h5.89v.53h-6.45v-17.56Z"/>
                    <path fill="#1e293b" d="M28.38,101.97c1.11,1.3,3.06,1.46,4.36.36.13-.11.25-.23.36-.36.52-.86.77-1.85.73-2.85v-13.24h.53v13.22c.05,1.14-.25,2.26-.87,3.22-1.34,1.52-3.66,1.66-5.18.32-.11-.1-.22-.21-.32-.32-.62-.96-.93-2.08-.88-3.22v-13.22h.55v13.24c-.05,1,.21,1.99.73,2.85Z"/>
                    <path fill="#1e293b" d="M39.62,86.41h-3.81v-.53h8.2v.53h-3.84v17.03h-.55v-17.03Z"/>
                    <path fill="#1e293b" d="M46.09,103.44h-.55v-17.56h.55v17.56Z"/>
                    <path fill="#1e293b" d="M48.99,86.98c.67-.85,1.72-1.31,2.8-1.23,1.09-.09,2.16.37,2.85,1.23.65.94.97,2.07.92,3.21v8.93c.05,1.14-.27,2.27-.92,3.21-.69.86-1.75,1.32-2.85,1.23-1.08.08-2.13-.38-2.8-1.23-.65-.94-.97-2.07-.92-3.21v-8.93c-.05-1.14.27-2.27.92-3.21ZM49.38,101.98c.56.75,1.47,1.16,2.41,1.08.94.07,1.86-.33,2.43-1.08.55-.84.82-1.83.78-2.83v-8.98c.05-1-.23-2-.78-2.83-.58-.75-1.49-1.15-2.43-1.08-.93-.08-1.84.33-2.41,1.08-.54.84-.8,1.83-.75,2.83v8.98c-.05,1,.22,1.99.75,2.83Z"/>
                    <path fill="#1e293b" d="M57.53,103.44v-17.56h.78l6.17,16.43v-16.43h.53v17.56h-.68l-6.27-16.76v16.76h-.53Z"/>
                    <path fill="#1e293b" d="M73.4,86.96c.62.93.93,2.04.88,3.16v.33h-.55v-.35c.04-.98-.21-1.94-.73-2.77-.54-.74-1.42-1.14-2.33-1.07-.92-.08-1.81.32-2.36,1.05-.52.82-.77,1.79-.73,2.76-.01.63.14,1.25.44,1.81.28.51.66.96,1.10,1.33.44.37,1.02.79,1.74,1.28.63.41,1.24.85,1.82,1.33.47.4.86.88,1.15,1.42.32.61.48,1.28.46,1.97.06,1.13-.26,2.24-.89,3.17-1.47,1.54-3.9,1.59-5.44.13-.04-.04-.09-.08-.13-.13-.63-.93-.95-2.05-.89-3.17v-.85h.53v.88c-.05.98.21,1.95.75,2.77,1.22,1.32,3.27,1.4,4.59.18.06-.06.12-.12.18-.18.54-.82.8-1.79.75-2.77.02-.62-.14-1.24-.44-1.78-.28-.49-.65-.93-1.08-1.29-.56-.45-1.14-.88-1.74-1.27-.63-.42-1.25-.87-1.83-1.35-.47-.4-.86-.89-1.15-1.43-.33-.62-.49-1.31-.48-2.01-.06-1.12.25-2.24.89-3.16.67-.8,1.68-1.24,2.72-1.18,1.06-.09,2.1.37,2.76,1.2Z"/>
                </svg>
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
                    <a href="https://powerflex.apexwiringsolutions.co.uk/unsubscribe" style="color: #1e293b; text-decoration: underline;">
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
        subject: `New PowerFlex Enquiry from ${company}`,
        body: {
          contentType: "Text",
          content: emailContent
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