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
- **Responsive Navigation**: Split-bar design (desktop) with center logo, mobile hamburger menu
- **Section Order**: Hero → Benefits → Products → Comparison → Architecture → Schematic → Contact
- **Navigation State**: `isDarkSection` state changes nav styling based on scroll position (hero/contact = dark, others = light)

### Page Sections (all with section IDs for navigation)
- **Hero** (`#hero`): Main value proposition with stats (FAST, FLEXIBLE, FUTURE)
- **Benefits** (`#benefits`): AdaptingModernWorkspace component - modern office context
- **Products** (`#products`): ProductSidebar - product showcase 
- **Comparison** (`#comparison`): Stand-Alone vs alternatives (placeholder content)
- **Architecture** (`#architecture`): SystemArchitecture - Stand-Alone vs Integrated system cards
- **Schematic** (`#schematic`): SystemSchematic - technical diagrams
- **Contact** (`#contact`): Contact form and company information

### Image Assets
- **Product Images**: `/public/images/products/` - Individual component images
- **Schematics**: `/public/images/schematics/` - Technical diagrams for each product
- **System Diagrams**: `/public/images/standalone.svg`, `/public/images/integrated.svg` - Used in SystemArchitecture component
- **Office Environment**: `/public/images/Modern Office Environment.png` (@2x version available) - Used in AdaptingModernWorkspace

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
- **Desktop Navigation**: Split navigation bars with center logo
- **Mobile Navigation**: Compact floating bar + hamburger menu overlay
- **Breakpoints**: Standard Tailwind breakpoints with container max-width of 1400px

### Backend Integration
- **Email API** (`app/api/contact/route.ts`): Complete email backend using nodemailer with SMTP configuration
- **Form Validation**: Zod schema validation with React Hook Form
- **GDPR Compliance**: Built-in consent handling and data processing compliance
- **Environment Variables**: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS for email configuration

### Cookie Management & Analytics
- **Cookie Consent** (`components/cookie-consent.tsx`): GDPR-compliant banner with granular controls
- **Cookie Utilities** (`lib/cookies.ts`): HTTP cookie management with Secure/SameSite attributes
- **Analytics Integration**: Google Analytics 4 and LinkedIn Insight Tag with consent-based loading
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