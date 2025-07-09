import { cn } from "@/lib/utils"

interface PowerFlexBrandProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "inherit"
}

export function PowerFlexBrand({ className, size = "inherit" }: PowerFlexBrandProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl",
    inherit: "", // Inherits parent font size
  }

  return (
    <span className={cn(sizeClasses[size], className)}>
      <span className="powerflex-power">Power</span>
      <span className="powerflex-flex">Flex</span>
    </span>
  )
}
