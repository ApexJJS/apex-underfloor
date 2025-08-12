"use client"

import React, { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, Maximize2 } from 'lucide-react'
import { PowerFlexBrand } from '@/components/powerflex-brand'
import HTMLFlipBook from 'react-pageflip'

// Brochure pages array - using existing PNG files
const brochurePages = [
  '/brochure/a4underfloorbrochure1-01.png',
  '/brochure/a4underfloorbrochure1-02.png',
  '/brochure/a4underfloorbrochure1-03.png',
  '/brochure/a4underfloorbrochure1-04.png',
  '/brochure/a4underfloorbrochure1-05.png',
  '/brochure/a4underfloorbrochure1-06.png',
  '/brochure/a4underfloorbrochure1-07.png',
  '/brochure/a4underfloorbrochure1_Artboard 8-08.png',
  '/brochure/a4underfloorbrochure1_Artboard 9-09.png',
  '/brochure/a4underfloorbrochure1-10.png',
  '/brochure/a4underfloorbrochure1-11.png',
  '/brochure/a4underfloorbrochure1-12.png',
  '/brochure/a4underfloorbrochure1-13.png',
  '/brochure/a4underfloorbrochure1-14.png',
  '/brochure/a4underfloorbrochure1-15.png',
  '/brochure/a4underfloorbrochure1-16.png',
  '/brochure/a4underfloorbrochure1-17.png',
  '/brochure/a4underfloorbrochure1-18.png',
  '/brochure/a4underfloorbrochure1-19.png',
  '/brochure/a4underfloorbrochure1-20.png',
  '/brochure/a4underfloorbrochure1-21.png',
  '/brochure/a4underfloorbrochure1-22.png',
  '/brochure/a4underfloorbrochure1-23.png',
  '/brochure/a4underfloorbrochure1-24.png'
]

// Page component using forwardRef as per documentation
const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode; number: string }>((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      {props.children}
    </div>
  )
})
Page.displayName = 'Page'

export default function BrochurePage() {
  const bookRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(brochurePages.length)

  // Event handlers using useCallback as per documentation
  const onFlip = useCallback((e: any) => {
    console.log('Current page: ' + e.data)
    setCurrentPage(e.data)
  }, [])

  const onInit = useCallback((e: any) => {
    console.log('Book initialized:', e.data)
    if (bookRef.current) {
      setTotalPages(bookRef.current.pageFlip().getPageCount())
    }
  }, [])

  // Navigation methods using ref.pageFlip() as per documentation
  const nextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext()
    }
  }

  const prevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev()
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center relative"
    >
      {/* Header Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-30">
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-white hover:text-brand-yellow transition-colors bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </Link>
          <PowerFlexBrand theme="white" className="scale-75" />
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 text-white hover:text-brand-yellow transition-colors bg-black/20 rounded-lg backdrop-blur-sm"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Book Container */}
      <div className="book-wrapper">
        <HTMLFlipBook
          width={400}
          height={566}
          size="stretch"
          minWidth={300}
          maxWidth={800}
          minHeight={400}
          maxHeight={1000}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={true}
          startZIndex={0}
          autoSize={false}
          maxShadowOpacity={0.8}
          showCover={true}
          mobileScrollSupport={false}
          swipeDistance={30}
          clickEventForward={true}
          useMouseEvents={true}
          onFlip={onFlip}
          onInit={onInit}
          ref={bookRef}
          className="flipbook-container"
        >
          {brochurePages.map((page, index) => (
            <Page key={index} number={`${index + 1}`}>
              <div className="page-content">
                <img 
                  src={page} 
                  alt={`Brochure page ${index + 1}`}
                  className="page-image"
                  draggable={false}
                />
              </div>
            </Page>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Bottom Control Bar */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-brand-navy/90 backdrop-blur-sm rounded-2xl px-6 py-3 flex items-center gap-4 border border-brand-yellow/20 shadow-lg">
          <button
            onClick={prevPage}
            className="p-2 text-white hover:text-brand-yellow transition-colors rounded-lg hover:bg-brand-yellow/20"
            title="Previous Page"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="text-white text-sm font-medium min-w-[100px] text-center">
            Page {currentPage + 1} of {totalPages}
          </div>
          
          <button
            onClick={nextPage}
            className="p-2 text-white hover:text-brand-yellow transition-colors rounded-lg hover:bg-brand-yellow/20"
            title="Next Page"
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>
        
        <div className="text-center text-white/70 text-xs mt-2">
          Click pages or use controls to navigate
        </div>
      </div>

      <style jsx global>{`
        .book-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 2rem;
          perspective: 2400px;
        }
        
        .flipbook-container {
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          border-radius: 8px;
        }
        
        .demoPage {
          background: white;
          color: #333;
          border: 1px solid #ddd;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .page-content {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        
        .page-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          user-select: none;
          pointer-events: none;
        }
        
        /* Mobile adjustments */
        @media (max-width: 768px) {
          .book-wrapper {
            margin: 1rem;
          }
        }
      `}</style>
    </div>
  )
}