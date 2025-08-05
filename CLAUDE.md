# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development**: `npm run dev` - Start Next.js development server
- **Build**: `npm run build` - Build for production
- **Lint**: `npm run lint` - Run ESLint for code quality
- **Start**: `npm run start` - Start production server

## Project Overview

This is the Apex Wiring Solutions website - a production-ready Next.js landing page for PowerFlex underfloor power distribution systems. The site showcases modular wiring solutions with both Stand-Alone and Integrated system architectures, complete with GDPR compliance, email backend, and analytics integration.

## Architecture & Key Components

### Brand System
- **PowerFlexBrand Component** (`components/powerflex-brand.tsx`): Reusable brand logo component with multiple size and theme variants (navy, white, yellow). Critical for brand consistency across all sections.
- **Brand Colors**: Defined in Tailwind config - `brand-navy` (#1e293b), `brand-yellow` (#f0ea45), `brand-yellow-light` (#f4ee5a), `brand-white` (#ffffff)
- **Color Consistency**: All text colors use `text-brand-navy` for headings and content, with neutral grays only for subtle UI elements

### Main Landing Page Structure
The main page (`app/page.tsx`) orchestrates the entire site with:
- **Responsive Navigation**: Single centered navigation bar (desktop) with Apex logo separator, mobile hamburger menu
- **Section Order**: Hero → Benefits → Products → Architecture → Schematic → Contact
- **Navigation State**: `isDarkSection` state changes nav styling based on scroll position (hero/contact = dark, others = light)

### Page Sections (all with section IDs for navigation)
- **Hero** (`#hero`): Main value proposition with stats (FAST, FLEXIBLE, FUTURE)
- **Benefits** (`#benefits`): AdaptingModernWorkspace component - modern office context
- **Products** (`#products`): ProductSidebar - comprehensive product showcase with real product images and technical drawings
- **Architecture** (`#architecture`): SystemArchitecture - Stand-Alone vs Integrated system cards
- **Schematic** (`#schematic`): SystemSchematic - technical diagrams
- **Contact** (`#contact`): Contact form with GDPR compliance and UTM tracking

### Image Assets
- **Product Images**: `/public/images/products/` - Real product photos in SVG/PNG format (prefer SVG when available)
- **Technical Drawings**: Same directory, technical schematics for each product component
- **System Diagrams**: `/public/images/standalone.svg`, `/public/images/integrated.svg` - Used in SystemArchitecture component
- **Office Environment**: `/public/images/Modern Office Environment.png` (@2x version available) - Used in AdaptingModernWorkspace
- **Brochure Pages**: `/public/brochure/` - Official product specification pages (a4underfloorbrochure1-10.png to 24.png)

### UI Framework
- **Radix UI**: Comprehensive component library for accessibility
- **Tailwind CSS**: Utility-first styling with custom brand theme
- **Lucide React**: Icon system throughout the site
- **ShadCN/UI**: Component system in `/components/ui/`

### Navigation & Scrolling
- **Smooth Scrolling**: Custom `smoothScrollTo` function with proper offset for fixed navigation
- **Scroll Detection**: Throttled scroll handler updates navigation theme based on section visibility
- **Mobile Menu**: Full-screen overlay with scroll lock functionality

## Technical Notes

### Fonts
- **Bebas Neue Pro**: Primary display font for headings (`font-bebas`)
- **Inter**: Body text font (`font-inter`)

### Responsive Design
- **Desktop Navigation**: Single centered navigation bar with Apex logo and vertical separator
- **Mobile Navigation**: Compact floating bar + hamburger menu overlay
- **Breakpoints**: Standard Tailwind breakpoints with container max-width of 1400px
- **Mobile Viewport**: Proper viewport meta tag and overflow-x-hidden for mobile compatibility

### Backend Integration
- **Email API** (`app/api/contact/route.ts`): Complete email backend using nodemailer with SMTP configuration
- **UTM Tracking**: Full UTM parameter capture and persistence via `lib/utm.ts`
- **Form Validation**: Built-in validation with comprehensive error handling
- **GDPR Compliance**: Built-in consent handling and data processing compliance
- **Environment Variables**: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS for email configuration
- **Email Templates**: Professional HTML email templates with PowerFlex and Apex branding

### Cookie Management & Analytics
- **Cookie Consent** (`components/cookie-consent.tsx`): GDPR-compliant banner with granular controls (defaults to all enabled)
- **Cookie Utilities** (`lib/cookies.ts`): HTTP cookie management with Secure/SameSite attributes
- **Analytics Integration**: Google Analytics 4 and LinkedIn Insight Tag with consent-based loading
- **LinkedIn Conversion Tracking**: Full conversion tracking implementation with UTM attribution
- **Analytics Init** (`components/analytics-init.tsx`): Conditional analytics initialization based on user consent

### Legal Compliance
- **Privacy Policy** (`app/privacy-policy/page.tsx`): Complete GDPR-compliant privacy policy
- **Terms & Conditions** (`app/terms/page.tsx`): Comprehensive terms covering UK legal requirements
- **Contact Form GDPR**: Built-in consent checkboxes and data processing notices

### Component Patterns
- Most components are self-contained with their own section IDs
- PowerFlexBrand component is used consistently across sections for brand integration
- Card-based layouts for product showcases and system comparisons
- Form fields use `focus:border-brand-navy focus:ring-0` for clean single-border focus states
- Product images use `object-contain` CSS to display complete SVG images without cropping

## SEO & Performance

### SEO Implementation
- **XML Sitemap**: Auto-generated at `/sitemap.xml` via `app/sitemap.ts`
- **Robots.txt**: Search engine directives in `/public/robots.txt`
- **Structured Data**: JSON-LD schema for Organization and Product markup
- **Meta Tags**: Complete Open Graph and Twitter Card implementation
- **UK Targeting**: Proper locale and canonical URL setup

### Performance Optimization
- **Image Preloading**: Hero images preloaded for instant display
- **SVG Optimization**: Vector graphics for scalable product images
- **Responsive Images**: Multiple formats and sizes for different viewports
- **Mobile-First**: Optimized mobile experience with proper viewport handling

## Configuration Requirements

### LinkedIn Integration Setup
- Replace `'XXXXXX'` in analytics files with actual LinkedIn Partner ID
- Replace `'CONVERSION_ID_PLACEHOLDER'` with actual LinkedIn conversion ID
- Set up conversion events in LinkedIn Campaign Manager

### Email Configuration
- Configure SMTP environment variables for contact form functionality
- Update contact phone number placeholder in structured data
- Verify all contact information accuracy

### Product Data Management
- Product specifications should be updated from official brochure data (pages 10-21)
- Brochure images available in `/public/brochure/` for reference
- Use SVG product images when available, fallback to PNG