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
            image: "https://via.placeholder.com/300x200/f2eb42/1e293b?text=6+Port+MDB",
            specs: {
              powerOutputs: "6 Port (3 Pin)",
              ports: "6"
            }
          },
          {
            id: "9-port", 
            name: "9 Port",
            image: "https://via.placeholder.com/300x200/f2eb42/1e293b?text=9+Port+MDB",
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
        technicalDrawing: "https://via.placeholder.com/300x200/ffffff/1e293b?text=MDB+Dimensions"
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
            image: "https://via.placeholder.com/300x200/f2eb42/1e293b?text=4+Port+SDB",
            specs: {
              powerOutputs: "4 Port (3 Pin)",
              ports: "4"
            }
          },
          {
            id: "6-port",
            name: "6 Port", 
            image: "https://via.placeholder.com/300x200/f2eb42/1e293b?text=6+Port+SDB",
            specs: {
              powerOutputs: "6 Port (3 Pin)",
              ports: "6"
            }
          },
          {
            id: "10-port",
            name: "10 Port",
            image: "https://via.placeholder.com/300x200/f2eb42/1e293b?text=10+Port+SDB",
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
        technicalDrawing: "https://via.placeholder.com/300x200/ffffff/1e293b?text=SDB+Dimensions"
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
        image: "https://via.placeholder.com/300x200/ffffff/1e293b?text=Distribution+Tee",
        technicalDrawing: "https://via.placeholder.com/300x200/ffffff/1e293b?text=Tee+Dimensions"
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
        image: "https://via.placeholder.com/300x200/808080/ffffff?text=Armoured+Connection",
        technicalDrawing: "https://via.placeholder.com/300x200/ffffff/1e293b?text=Armoured+Dimensions"
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
        image: "https://via.placeholder.com/300x200/e5e7eb/1e293b?text=Unarmoured+Connection",
        technicalDrawing: "https://via.placeholder.com/300x200/ffffff/1e293b?text=Unarmoured+Dimensions"
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
        image: "https://via.placeholder.com/300x200/808080/ffffff?text=Armoured+Extender",
        technicalDrawing: "https://via.placeholder.com/300x200/ffffff/1e293b?text=Extender+Dimensions"
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
        image: "https://via.placeholder.com/300x200/e5e7eb/1e293b?text=Unarmoured+Extender",
        technicalDrawing: "https://via.placeholder.com/300x200/ffffff/1e293b?text=Unarmoured+Ext+Dimensions"
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
        image: "https://via.placeholder.com/300x200/1e293b/ffffff?text=RCD+Module",
        technicalDrawing: "https://via.placeholder.com/300x200/ffffff/1e293b?text=RCD+Dimensions"
      },
      {
        id: "fused-connection-unit",
        name: "Fused Connection Unit",
        description: "13 Amp Fused Connection Unit available in Switched/Un-Switched variants with metal clad construction",
        specs: {
          material: "Enclosure: Metal Clad",
          colour: "Silver/Grey",
          minOperatingTemp: "-20°C",
          maxOperatingTemp: "+70°C",
          enclosureClass: "IP40 when connected or ports capped off using 293257-1",
          ratedCurrent: "25A",
          powerOutputs: "3 Pole",
          ratedVoltage: "240V",
          frequency: "50Hz",
          wireSize: "4mm²",
          standard: "IEC 61535:2009+A1:2013",
          qms: "ISO 9001:2016",
          wiringStandard: "BS 8488:2009+A1:2010"
        },
        image: "https://via.placeholder.com/300x200/c0c0c0/1e293b?text=Fused+Connection+Unit",
        technicalDrawing: "https://via.placeholder.com/300x200/ffffff/1e293b?text=FCU+Dimensions"
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
            image: "https://via.placeholder.com/300x200/1e293b/ffffff?text=2+Gang+Module",
            specs: {
              output: "2 BS1363 UK sockets",
              socketCount: "2 Gang"
            }
          },
          {
            id: "3-gang",
            name: "3 Gang",
            image: "https://via.placeholder.com/300x200/1e293b/ffffff?text=3+Gang+Module",
            specs: {
              output: "3 BS1363 UK sockets",
              socketCount: "3 Gang"
            }
          },
          {
            id: "4-gang",
            name: "4 Gang",
            image: "https://via.placeholder.com/300x200/1e293b/ffffff?text=4+Gang+Module",
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
        technicalDrawing: "https://via.placeholder.com/300x200/ffffff/1e293b?text=Power+Module+Dimensions"
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
        image: "https://via.placeholder.com/300x200/1e293b/ffffff?text=2G+Power+USB",
        technicalDrawing: "https://via.placeholder.com/300x200/ffffff/1e293b?text=2G+USB+Dimensions"
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
            image: "https://via.placeholder.com/300x200/6b7280/ffffff?text=Dark+Grey+Grommet",
            specs: {
              colour: "Dark Grey"
            }
          },
          {
            id: "black",
            name: "Black", 
            image: "https://via.placeholder.com/300x200/000000/ffffff?text=Black+Grommet",
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
        technicalDrawing: "https://via.placeholder.com/300x200/ffffff/1e293b?text=Standard+Grommet+Dimensions"
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
        image: "https://via.placeholder.com/300x200/6b7280/ffffff?text=Large+Access+Grommet",
        technicalDrawing: "https://via.placeholder.com/300x200/ffffff/1e293b?text=Large+Grommet+Dimensions"
      }
    ]
  }
]

export function ProductSidebar() {
  const [selectedCategory, setSelectedCategory] = useState<string>("distribution")
  const [selectedProduct, setSelectedProduct] = useState<string>("master-distribution")
  const [selectedVariant, setSelectedVariant] = useState<string>("6-port")
  const [imageView, setImageView] = useState<"product" | "technical">("product")
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["distribution"])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const currentProduct = productCategories
    .flatMap(cat => cat.products as any[])
    .find(product => product.id === selectedProduct)
    
  const currentVariant = currentProduct && 'hasVariants' in currentProduct && currentProduct.hasVariants && 'variants' in currentProduct
    ? currentProduct.variants?.find((v: any) => v.id === selectedVariant)
    : null

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
    <div className="bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bebas font-extrabold text-brand-navy mb-6">
            <PowerFlexBrand theme="navy" className="mr-3" /> Products
          </h2>
          <p className="text-xl text-brand-navy max-w-4xl mx-auto leading-relaxed">
            Explore our comprehensive range of underfloor power distribution solutions, from master distribution boxes to access grommets.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-0 shadow-xl sticky top-8">
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
                              onClick={() => setSelectedProduct(product.id)}
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
                <Card className="bg-white border-0 shadow-xl">
                  <CardHeader className="pb-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      <div className="flex-1">
                        <CardTitle className="text-3xl font-bebas font-extrabold text-brand-navy mb-4">
                          {'name' in currentProduct ? currentProduct.name : 'Unknown Product'}
                        </CardTitle>
                        <p className="text-lg text-brand-navy leading-relaxed mb-6">
                          {'description' in currentProduct ? currentProduct.description : ''}
                        </p>
                        
                        {/* Variant Tabs */}
                        {currentProduct && 'hasVariants' in currentProduct && currentProduct.hasVariants && 'variants' in currentProduct && currentProduct.variants && (
                          <div className="mb-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                              {currentProduct.variants.map((variant: any) => (
                                <Button
                                  key={variant.id}
                                  variant={selectedVariant === variant.id ? "default" : "outline"}
                                  size="sm"
                                  className={selectedVariant === variant.id 
                                    ? "bg-brand-navy text-white hover:bg-brand-navy/90" 
                                    : "border-brand-navy/20 text-brand-navy hover:bg-brand-navy/10"
                                  }
                                  onClick={() => setSelectedVariant(variant.id)}
                                >
                                  {variant.name}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Image View Toggle */}
                        <div className="flex gap-2 mb-4">
                          <Button
                            variant={imageView === "product" ? "default" : "outline"}
                            size="sm"
                            className={imageView === "product" 
                              ? "bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90" 
                              : "border-brand-yellow/40 text-brand-navy hover:bg-brand-yellow/10"
                            }
                            onClick={() => setImageView("product")}
                          >
                            <Image className="h-4 w-4 mr-1" />
                            Product Image
                          </Button>
                          <Button
                            variant={imageView === "technical" ? "default" : "outline"}  
                            size="sm"
                            className={imageView === "technical" 
                              ? "bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90" 
                              : "border-brand-yellow/40 text-brand-navy hover:bg-brand-yellow/10"
                            }
                            onClick={() => setImageView("technical")}
                          >
                            <FileImage className="h-4 w-4 mr-1" />
                            Technical Drawing
                          </Button>
                        </div>
                      </div>
                      <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border">
                          <div className="w-full h-48 bg-white rounded-lg shadow-sm overflow-hidden">
                            {currentImage ? (
                              <img 
                                src={currentImage} 
                                alt={`${currentProduct && 'name' in currentProduct ? currentProduct.name : 'Product'} ${imageView === "technical" ? "technical drawing" : currentVariant?.name || ""}`}
                                className="w-full h-full object-cover"
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
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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