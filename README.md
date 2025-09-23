# PowerFlex - Underfloor Power by Apex Wiring Solutions

A modern, responsive Next.js website showcasing PowerFlex underfloor power distribution systems for modern office environments.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/jamies-projects-e83943cf/v0-apex-landing-page)

## Overview

Professional landing page for Apex Wiring Solutions' PowerFlex underfloor power distribution systems. The site showcases modular wiring solutions with comprehensive product information, technical specifications, and system architecture diagrams for both Stand-Alone and Integrated configurations.

### Key Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Product Showcase**: Interactive product catalog with detailed specifications
- **System Architecture**: Visual comparison of Stand-Alone vs Integrated systems
- **Technical Schematics**: Detailed technical drawings and diagrams
- **Smooth Navigation**: Fluid scrolling between sections with dynamic navigation
- **Brand Integration**: Consistent PowerFlex branding throughout

## Website Sections

1. **Hero** - Main value proposition with key benefits (FAST, FLEXIBLE, FUTURE)
2. **Benefits** - Modern workspace context and advantages
3. **Products** - Interactive product sidebar with specifications
4. **Comparison** - Stand-Alone system vs alternatives
5. **Architecture** - System architecture comparison with diagrams
6. **Schematic** - Technical diagrams and schematics
7. **Contact** - Contact form and company information

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Start production server
npm run start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # ShadCN/UI components
│   ├── hero.tsx            # Hero section
│   ├── product-sidebar.tsx # Interactive product showcase
│   ├── system-architecture.tsx # Architecture comparison
│   ├── system-schematic.tsx    # Technical schematics
│   ├── contact.tsx         # Contact form
│   └── powerflex-brand.tsx # Brand logo component
├── public/
│   └── images/
│       ├── products/       # Product images
│       ├── schematics/     # Technical diagrams
│       ├── standalone.svg  # Stand-alone system diagram
│       └── integrated.svg  # Integrated system diagram
└── CLAUDE.md              # Development guidelines
```

## Brand System

The website uses a consistent brand system:
- **Primary Colors**: Navy (#1e293b), Yellow (#f2eb42), White (#ffffff)
- **Typography**: Bebas Neue Pro for headings, Inter for body text
- **Logo**: PowerFlex brand component with multiple variants

## Technical Stack

- **Framework**: Next.js 15.2.4 with TypeScript
- **Styling**: Tailwind CSS with custom brand theme
- **Components**: Radix UI primitives with ShadCN/UI components
- **Icons**: Lucide React
- **Deployment**: Vercel with automatic deployments

## Development Guidelines

See `CLAUDE.md` for detailed development guidelines including:
- Component architecture patterns
- Brand system usage
- Navigation implementation
- Image asset organization
- Responsive design patterns

## Deployment

The project is deployed on Vercel and automatically updates when changes are pushed to the main branch. The production site includes:
- Optimized builds with Next.js
- Automatic static optimization
- Image optimization
- Performance monitoring# Auto-deploy test Tue, Sep 23, 2025  2:57:08 PM
