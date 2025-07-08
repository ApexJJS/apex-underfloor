import { cn } from "@/lib/utils"

interface PowerFlexBrandProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function PowerFlexBrand({ className, size = "md" }: PowerFlexBrandProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl",
  }

  return <span className={cn("font-bebas", sizeClasses[size], className)}>PowerFlex</span>
}
