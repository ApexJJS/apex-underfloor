"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Box, 
  Zap, 
  Cable, 
  Shield, 
  Power, 
  Settings,
  ChevronRight,
  ChevronDown,
  FileImage,
  Image
} from "lucide-react"
import { PowerFlexBrand } from "./powerflex-brand"

const productCategories = [
  {
    id: "distribution",
    name: "Distribution Boxes",
    icon: Box,
    products: [
      {
        id: "master-distribution",
        name: "Master Distribution Boxes",
        description: "Centralised solution for connecting multiple devices in industrial and commercial environments",
        hasVariants: true,
        variants: [
          {
            id: "6-port",
            name: "6 Port",
            image: "/images/webp/6portMDB.webp",
            specs: {
              powerOutputs: "6 Port (3 Pin)",
              ports: "6"
            }
          },
          {
            id: "9-port", 
            name: "9 Port",
            image: "/images/webp/9portMDB.webp",
            specs: {
              powerOutputs: "9 Port (3 Pin)",
              ports: "9"
            }
          }
        ],
        commonSpecs: {
          material: "Enclosure: Galv Steel, Home Run: Aluminium",
          homeRun: "38mm 18 x L, E, N + 1 x CPC",
          csa: "4mm²/6mm²",
          connectorMaterial: "Polycarbonate",
          terminals: "Silver-plated brass",
          ratedCurrent: "32A",
          ratedVoltage: "250/400V",
          frequency: "50Hz",
          maxTemp: "+70°C",
          protection: "IP2XD",
          mechanicalCoding: "A Black",
          lockable: "Self-locking (unlocking by disconnect tool)",
          standard: "IEC 61535:2009+A1:2013",
          qms: "ISO 9001:2015",
          wiringStandard: "BS 8488:2009+A1:2010"
        },
        technicalDrawing: "/images/webp/MDBtechnicaldrawing.webp"
      },
      {
        id: "slave-distribution",
        name: "Slave Distribution Boxes",
        description: "Additional power distribution points in industrial environments connecting to master distribution boxes",
        hasVariants: true,
        variants: [
          {
            id: "4-port",
            name: "4 Port",
            image: "/images/webp/4portSDB.webp",
            specs: {
              powerOutputs: "4 Port (3 Pin)",
              ports: "4"
            }
          },
          {
            id: "6-port",
            name: "6 Port", 
            image: "/images/webp/6portSDB.webp",
            specs: {
              powerOutputs: "6 Port (3 Pin)",
              ports: "6"
            }
          },
          {
            id: "10-port",
            name: "10 Port",
            image: "/images/webp/10portSDB.webp",
            specs: {
              powerOutputs: "10 Port (3 Pin)",
              ports: "10"
            }
          }
        ],
        commonSpecs: {
          material: "Enclosure: Galv Steel",
          csa: "4mm²/6mm²",
          connectorMaterial: "Polycarbonate",
          terminals: "Silver-plated brass",
          ratedCurrent: "32A",
          ratedVoltage: "250/400V",
          frequency: "50Hz",
          maxTemp: "+70°C",
          protection: "IP2XD",
          mechanicalCoding: "A Black",
          lockable: "Self-locking (unlocking by disconnect tool)",
          standard: "IEC 61535:2009+A1:2013",
          qms: "ISO 9001:2015",
          wiringStandard: "BS 8488:2009+A1:2010"
        },
        technicalDrawing: "/images/webp/SDBtechnicaldrawing.webp"
      }
    ]
  },
  {
    id: "connections",
    name: "Connection Components",
    icon: Cable,
    products: [
      {
        id: "distribution-tee",
        name: "Distribution Tee",
        description: "1 power input and 2 power outputs, connecting seamlessly with other connectors for quick device connections",
        hasVariants: false,
        variants: [],
        commonSpecs: {
          material: "Enclosure: Standard",
          csa: "4mm²/6mm²",
          connectorMaterial: "Polycarbonate",
          terminals: "Silver-plated brass",
          powerOutputs: "1 x input (left), 2 x outputs",
          ratedCurrent: "32A",
          ratedVoltage: "250/400V",
          frequency: "50Hz",
          maxTemp: "+70°C",
          protection: "IP2XD",
          mechanicalCoding: "A Black",
          lockable: "Integrated Plug-in Connector",
          standard: "IEC 61535:2009+A1:2013",
          qms: "ISO 9001:2015",
          wiringStandard: "BS 8488:2009+A1:2010"
        },
        image: "/images/webp/3poletee.webp",
        technicalDrawing: "/images/webp/3pteetechnicaldrawing.webp"
      },
      {
        id: "armoured-connection",
        name: "Armoured Connection",
        description: "Connector on one end and free wiring on the other end for device connections",
        specs: {
          material: "Enclosure: Aluminium",
          csa: "4mm²/6mm²",
          connectorMaterial: "Polycarbonate",
          terminals: "Silver-plated brass",
          ratedCurrent: "32A",
          ratedVoltage: "250/400V",
          frequency: "50Hz",
          maxTemp: "+70°C",
          protection: "IP2XD",
          mechanicalCoding: "A Black",
          standard: "IEC 61535:2009+A1:2013",
          qms: "ISO 9001:2015",
          wiringStandard: "BS 8488:2009+A1:2010"
        },
        image: "/images/webp/armouredconnection.webp",
        technicalDrawing: "/images/webp/armouredconnectionandextendertechnicaldrawing.webp"
      },
      {
        id: "unarmoured-connection",
        name: "Unarmoured Connection",
        description: "LSOH cable for safer indoor installation with connector on one end and free wiring for device connection",
        specs: {
          cableType: "LSOH (Low Smoke Zero Halogen)",
          csa: "4mm²/6mm²",
          connectorMaterial: "Polycarbonate",
          terminals: "Silver-plated brass",
          ratedCurrent: "32A",
          ratedVoltage: "250/400V",
          frequency: "50Hz",
          maxTemp: "+70°C",
          standard: "IEC 61535:2009+A1:2013",
          cableStandard: "BS 7671 compliant",
          installation: "Indoor use - LSOH for safer installation"
        },
        image: "/images/webp/unarmouredconnection.webp",
        technicalDrawing: "/images/webp/unarmouredconnectiontechnicaldrawing.webp"
      },
      {
        id: "armoured-extender",
        name: "Armoured Extender",
        description: "Male connector on one end and female on the other for quick and easy power distribution within the system",
        specs: {
          material: "Enclosure: Aluminium",
          csa: "4mm²/6mm²",
          connectorMaterial: "Polycarbonate",
          terminals: "Silver-plated brass",
          ratedCurrent: "32A",
          ratedVoltage: "250/400V",
          frequency: "50Hz",
          maxTemp: "+70°C",
          protection: "IP2XD",
          mechanicalCoding: "A Black",
          standard: "IEC 61535:2009+A1:2013",
          qms: "ISO 9001:2015",
          wiringStandard: "BS 8488:2009+A1:2010"
        },
        image: "/images/webp/armouredextender.webp",
        technicalDrawing: "/images/webp/armouredconnectionandextendertechnicaldrawing.webp"
      },
      {
        id: "unarmoured-extender",
        name: "Unarmoured Extender",
        description: "LSOH cable for safer indoor installation with connectors on both ends for easy device connection",
        specs: {
          cableType: "LSOH (Low Smoke Zero Halogen)",
          csa: "4mm²/6mm²",
          connectorMaterial: "Polycarbonate",
          terminals: "Silver-plated brass",
          ratedCurrent: "32A",
          ratedVoltage: "250/400V",
          frequency: "50Hz",
          maxTemp: "+70°C",
          standard: "IEC 61535:2009+A1:2013",
          cableStandard: "BS 7671 compliant",
          installation: "Indoor use - LSOH for safer installation"
        },
        image: "/images/webp/unarmouredextender.webp",
        technicalDrawing: "/images/webp/unarmouredextendertechnicaldrawing.webp"
      }
    ]
  },
  {
    id: "power-safety",
    name: "Power & Safety",
    icon: Shield,
    products: [
      {
        id: "rcd-module",
        name: "RCD Module",
        description: "Input socket and RCBO protection designed for high-current installations with robust circuit protection",
        specs: {
          inputSocket: "Neutrik 32A input socket",
          protection: "16A RCBO",
          ratedCurrent: "32A",
          voltageRating: "230-250V AC",
          frequency: "50-60Hz",
          moduleType: "E-Link Input",
          connectorType: "Neutrik 32A",
          operatingTemp: "-40°C to +85°C",
          standards: "CE Marked"
        },
        image: "/images/webp/rcdmodule.webp",
        technicalDrawing: "/images/webp/rcdmodule.webp"
      }
    ]
  },
  {
    id: "power-modules",
    name: "Power Modules",
    icon: Power,
    products: [
      {
        id: "power-modules",
        name: "Power Modules",
        description: "E-Link Power Modules with 3-pole connector input and UK sockets with individual breakers",
        hasVariants: true,
        variants: [
          {
            id: "2-gang",
            name: "2 Gang",
            image: "/images/products/2gangpowermodule.png",
            specs: {
              output: "2 BS1363 UK sockets",
              socketCount: "2 Gang"
            }
          },
          {
            id: "3-gang",
            name: "3 Gang",
            image: "/images/products/3gangpowermodule.png",
            specs: {
              output: "3 BS1363 UK sockets",
              socketCount: "3 Gang"
            }
          },
          {
            id: "4-gang",
            name: "4 Gang",
            image: "/images/webp/4gangpowermodeule.webp",
            specs: {
              output: "4 BS1363 UK sockets",
              socketCount: "4 Gang"
            }
          }
        ],
        commonSpecs: {
          inputVoltage: "AC230-250V AC 60Hz",
          inputConnection: "GST18/3 3 pole connector",
          ratedCurrent: "16A",
          individualBreakers: "5A, 250V AC. IR not less than 2 megaohms at 500V DC",
          operatingTemp: "-40°C to +85°C",
          standards: "BS5733, BS1363, BS6396. CE Marked. DEKRA Cert 3152147.01",
          moduleType: "E-Link Power",
          connectorType: "GST18/3 3-pole",
          earthBond: "Wire with M4 ring terminal",
          fixing: "3.5mm countersunk fixing holes",
          spacing: "60mm x 25mm connector spacing"
        },
        technicalDrawing: "/images/webp/4gangpowermoduletechnicaldrawing.webp"
      },
      {
        id: "power-module-usb",
        name: "2 Gang Power Module & USB",
        description: "2 Gang Power and 2 Power USB E-Link Module with 3-pole connector input and USB charging capability",
        specs: {
          inputVoltage: "AC230-250V AC 60Hz",
          inputConnection: "GST18/3 3 pole connector",
          output: "2 BS1363 UK sockets",
          usbOutput: "5V DC 2.4A",
          ratedCurrent: "16A",
          individualBreakers: "5A, 250V AC. IR not less than 2 megaohms at 500V DC",
          operatingTemp: "-40°C to +85°C",
          standards: "BS5733, BS1363, BS6396. CE Marked. DEKRA Cert 3152147.01",
          moduleType: "E-Link Power + USB",
          connectorType: "GST18/3 3-pole",
          socketCount: "2 Gang + 2 USB"
        },
        image: "/images/webp/2gangpowerusb.webp",
        technicalDrawing: "/images/webp/2gangpowerusb.webp"
      }
    ]
  },
  {
    id: "access-solutions",
    name: "Access Solutions",
    icon: Settings,
    products: [
      {
        id: "standard-grommets",
        name: "Standard Access Grommets",
        description: "High-quality rubber grommets for cable management and protection, available in multiple colours",
        hasVariants: true,
        variants: [
          {
            id: "dark-grey",
            name: "Dark Grey",
            image: "/images/products/darkgreyregulargrommet.png",
            specs: {
              colour: "Dark Grey"
            }
          },
          {
            id: "black",
            name: "Black", 
            image: "/images/webp/blackregulargrommet.webp",
            specs: {
              colour: "Black"
            }
          }
        ],
        commonSpecs: {
          floorOpening: "Fits 128mm diameter hole in floor tile",
          lidDesign: "Robust 2-piece rotating lid with elongated slot",
          aperture: "Single 28.5mm diameter elongated slot",
          conduitCapacity: "2×16mm and 2×28mm diameter conduits, or 3×28mm diameter conduits",
          installation: "2 fixing clamps with adjustment between 5-50mm floor tile depths",
          material: "Flame retardant ABS/Polycarbonate blend",
          fireRating: "V0 rated to UL94",
          loadCapacity: "Withstands normal pedestrian traffic in commercial offices",
          locking: "Locking lid facility available",
          flexibility: "Adjustable to suit services exiting the floor void"
        },
        technicalDrawing: "/images/webp/standardgrommettechnicaldrawing_1.webp"
      },
      {
        id: "large-grommet",
        name: "Large Access Grommet",
        description: "Multi-port access grommet with large capacity for high-density cable installations",
        specs: {
          floorOpening: "Fits 209mm diameter hole in floor tile",
          lidDesign: "Robust 2-piece rotating lid with 3 apertures",
          apertures: "Two 32mm diameter slots and one 32mm x 90mm slot",
          conduitCapacity: "2×34mm and 2×28mm diameter conduits, or 5×28mm diameter conduits",
          installation: "2 fixing clamps with adjustment between 5-50mm floor tile depths",
          material: "Flame retardant ABS",
          fireRating: "V0 rated to UL94",
          loadCapacity: "Withstands normal pedestrian traffic",
          flexibility: "Multiple apertures for greater installation flexibility",
          application: "High-density cable installations"
        },
        image: "/images/webp/largegrommet.webp",
        technicalDrawing: "/images/webp/largegrommettechnicaldrawing.webp"
      }
    ]
  }
]

// Helper function to get the first variant of a product
const getFirstVariantId = (productId: string): string | null => {
  const product = productCategories
    .flatMap(cat => cat.products as any[])
    .find(p => p.id === productId)
  return product?.hasVariants && product.variants?.length > 0 ? product.variants[0].id : null
}

// Wrapper component for variant selection to ensure clean state
function ProductVariantSelector({ product, onVariantSelect, selectedVariant }: {
  product: any
  onVariantSelect: (variantId: string) => void
  selectedVariant: string | null
}) {
  const [localSelectedVariant, setLocalSelectedVariant] = useState<string>(
    selectedVariant || (product.hasVariants && product.variants?.length > 0 ? product.variants[0].id : "")
  )

  // Update parent state when local variant changes
  const handleVariantChange = (variantId: string) => {
    setLocalSelectedVariant(variantId)
    onVariantSelect(variantId)
  }

  const currentVariant = product.hasVariants 
    ? product.variants?.find((v: any) => v.id === localSelectedVariant)
    : null

  if (!product.hasVariants || !product.variants?.length) {
    return null
  }

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
        {product.variants.map((variant: any) => (
          <Button
            key={variant.id}
            variant={localSelectedVariant === variant.id ? "default" : "outline"}
            size="sm"
            className={`text-xs sm:text-sm px-2 sm:px-3 ${localSelectedVariant === variant.id 
              ? "bg-brand-navy text-white hover:bg-brand-navy/90" 
              : "border-brand-navy/20 text-brand-navy hover:bg-brand-navy/10"
            }`}
            onClick={() => handleVariantChange(variant.id)}
          >
            {variant.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

export function ProductSidebar() {
  const [selectedCategory, setSelectedCategory] = useState<string>("distribution")
  const [selectedProduct, setSelectedProduct] = useState<string>("master-distribution") 
  const [selectedVariantByProduct, setSelectedVariantByProduct] = useState<Record<string, string>>({})
  const [imageView, setImageView] = useState<"product" | "technical">("product")
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["distribution"])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId)
  }

  const currentProduct = productCategories
    .flatMap(cat => cat.products as any[])
    .find(product => product.id === selectedProduct)
    
  // Get the selected variant for current product
  const getSelectedVariant = () => {
    if (!currentProduct?.hasVariants || !currentProduct.variants?.length) return null
    
    const storedVariant = selectedVariantByProduct[selectedProduct]
    const variantExists = currentProduct.variants.find((v: any) => v.id === storedVariant)
    
    return variantExists ? storedVariant : currentProduct.variants[0].id
  }
  
  const selectedVariant = getSelectedVariant()
  const currentVariant = currentProduct?.hasVariants 
    ? currentProduct.variants?.find((v: any) => v.id === selectedVariant)
    : null

  const handleVariantSelect = (variantId: string) => {
    setSelectedVariantByProduct(prev => ({
      ...prev,
      [selectedProduct]: variantId
    }))
  }

  const currentSpecs = currentProduct && 'hasVariants' in currentProduct && currentProduct.hasVariants && 'commonSpecs' in currentProduct
    ? { ...currentProduct.commonSpecs, ...(currentVariant?.specs || {}) }
    : currentProduct && 'commonSpecs' in currentProduct 
      ? currentProduct.commonSpecs 
      : currentProduct && 'specs' in currentProduct 
        ? currentProduct.specs 
        : {}

  const currentImage = currentProduct && 'hasVariants' in currentProduct && currentProduct.hasVariants
    ? (imageView === "product" 
        ? currentVariant?.image 
        : 'technicalDrawing' in currentProduct ? currentProduct.technicalDrawing : undefined)
    : currentProduct 
      ? (imageView === "product" 
          ? ('image' in currentProduct ? currentProduct.image : undefined)
          : ('technicalDrawing' in currentProduct ? currentProduct.technicalDrawing : undefined))
      : undefined

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bebas font-extrabold text-brand-navy mb-6">
            <PowerFlexBrand theme="navy" className="mr-3" /> Products
          </h2>
          <p className="text-xl text-brand-navy max-w-4xl mx-auto leading-relaxed">
            Explore our comprehensive range of underfloor power distribution solutions, from master distribution boxes to access grommets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-0 shadow-xl sticky top-8 rounded-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bebas font-extrabold text-brand-navy">
                  Product Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2">
                  {productCategories.map((category) => (
                    <div key={category.id}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-between h-auto p-4 ${
                          selectedCategory === category.id 
                            ? 'bg-brand-yellow/10 text-brand-navy font-semibold' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => {
                          setSelectedCategory(category.id)
                          toggleCategory(category.id)
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <category.icon className="h-5 w-5" />
                          <span className="text-left font-medium">{category.name}</span>
                        </div>
                        {expandedCategories.includes(category.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                      
                      {expandedCategories.includes(category.id) && (
                        <div className="ml-8 space-y-1 pb-2">
                          {category.products.map((product) => (
                            <Button
                              key={product.id}
                              variant="ghost"
                              size="sm"
                              className={`w-full justify-start text-sm ${
                                selectedProduct === product.id 
                                  ? 'bg-brand-navy/10 text-brand-navy font-medium' 
                                  : 'text-brand-navy hover:text-brand-navy hover:bg-gray-50'
                              }`}
                              onClick={() => handleProductSelect(product.id)}
                            >
                              {product.name}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-3">
            {currentProduct && (
              <div className="space-y-8">
                <Card className="bg-white border-0 shadow-xl rounded-2xl">
                  <CardHeader className="pb-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      <div className="flex-1">
                        <CardTitle className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">
                          {'name' in currentProduct ? currentProduct.name : 'Unknown Product'}
                        </CardTitle>
                        <p className="text-lg text-brand-navy leading-relaxed mb-6">
                          {'description' in currentProduct ? currentProduct.description : ''}
                        </p>
                        
                        {/* Variant Tabs - Using key prop to force remount when product changes */}
                        {currentProduct && 'hasVariants' in currentProduct && currentProduct.hasVariants && 'variants' in currentProduct && currentProduct.variants && (
                          <ProductVariantSelector
                            key={selectedProduct}
                            product={currentProduct}
                            selectedVariant={selectedVariant}
                            onVariantSelect={handleVariantSelect}
                          />
                        )}
                        
                        {/* Image View Toggle */}
                        <div className="flex gap-1 sm:gap-2 mb-4 w-full">
                          <Button
                            variant={imageView === "product" ? "default" : "outline"}
                            size="sm"
                            className={`flex-1 text-xs sm:text-sm px-2 sm:px-3 ${imageView === "product" 
                              ? "bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90" 
                              : "border-brand-yellow/40 text-brand-navy hover:bg-brand-yellow/10"
                            }`}
                            onClick={() => setImageView("product")}
                          >
                            <Image className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="hidden xs:inline">Product </span>Image
                          </Button>
                          <Button
                            variant={imageView === "technical" ? "default" : "outline"}  
                            size="sm"
                            className={`flex-1 text-xs sm:text-sm px-2 sm:px-3 ${imageView === "technical" 
                              ? "bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90" 
                              : "border-brand-yellow/40 text-brand-navy hover:bg-brand-yellow/10"
                            }`}
                            onClick={() => setImageView("technical")}
                          >
                            <FileImage className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="hidden xs:inline">Technical </span>Drawing
                          </Button>
                        </div>
                      </div>
                      <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border">
                          <div className="w-full h-48 bg-white rounded-xl shadow-sm overflow-hidden">
                            {currentImage ? (
                              <img 
                                src={currentImage} 
                                alt={`${currentProduct && 'name' in currentProduct ? currentProduct.name : 'Product'} ${imageView === "technical" ? "technical drawing" : currentVariant?.name || ""}`}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Box className="h-16 w-16 text-brand-navy/20" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentSpecs && Object.entries(currentSpecs).map(([key, value]) => (
                        <div key={key} className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border">
                          <div className="text-sm font-semibold text-brand-navy mb-1 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </div>
                          <div className="text-sm text-gray-900 font-medium">
                            {value as string}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}