import { cn } from "@/lib/utils"

interface PowerFlexBrandProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "hero" | "inherit"
  theme?: "default" | "navy" | "white" | "yellow"
}

export function PowerFlexBrand({ className, size = "inherit", theme = "navy" }: PowerFlexBrandProps) {
  const sizeClasses = {
    sm: "h-[0.6em]", // For small text (text-sm) - matches section title ratio
    md: "h-[0.65em]", // For medium text (text-lg, text-xl) 
    lg: "h-[0.6em]", // For headings - back to the good size
    xl: "h-[0.7em]", // For large headings - back to the good size  
    hero: "h-16 md:h-20", // Large size for hero sections to match big text
    inherit: "h-[0.7em]", // For text-2xl, text-3xl - matches section title ratio
  }

  // Direct fill colors for inline SVG
  const fillColors = {
    default: "#1e293b", // brand-navy
    navy: "#1e293b",    // brand-navy
    white: "#ffffff",   // white
    yellow: "#f0ea45",  // brand-yellow
  }

  return (
    <svg 
      viewBox="0 0 399.82 84.21" 
      className={cn(
        sizeClasses[size], 
        "w-auto inline align-baseline", // Baseline aligned with text
        className
      )}
    >
      <g>
        <path fill={fillColors[theme]} d="M0,0h19.21c13.05,0,19.45,7.23,19.45,20.52v8.18c0,13.28-6.4,20.52-19.45,20.52h-6.17v33.8H0V0ZM19.21,37.36c4.15,0,6.4-1.9,6.4-7.83v-9.84c0-5.93-2.25-7.83-6.4-7.83h-6.17v25.5h6.17Z"/>
        <path fill={fillColors[theme]} d="M44.12,64.52v-23.48c0-12.57,6.64-19.69,18.5-19.69s18.5,7.12,18.5,19.69v23.48c0,12.57-6.64,19.69-18.5,19.69s-18.5-7.12-18.5-19.69ZM68.55,65.71v-25.86c0-4.15-1.3-7.35-5.93-7.35s-5.93,3.2-5.93,7.35v25.86c0,4.27,1.42,7.35,5.93,7.35s5.93-3.08,5.93-7.35Z"/>
        <path fill={fillColors[theme]} d="M86.11,22.54h12.33l6.4,43.53,5.93-43.53h12.69l5.93,43.53,6.4-43.53h11.15l-9.13,60.49h-15.18l-5.69-37.24-5.69,37.24h-16.01l-9.13-60.49Z"/>
        <path fill={fillColors[theme]} d="M189.18,41.04v14.47h-24.67v10.2c0,5.34,2.13,7.35,6.29,7.35s6.29-2.02,6.29-7.35v-2.25h12.1v1.07c0,12.57-6.52,19.69-18.62,19.69s-18.62-7.12-18.62-19.69v-23.48c0-12.57,6.52-19.69,18.62-19.69s18.62,7.12,18.62,19.69ZM176.84,45.54v-5.69c0-5.34-2.25-7.35-6.17-7.35s-6.17,2.02-6.17,7.35v5.69h12.33Z"/>
        <path fill={fillColors[theme]} d="M223.57,22.06v12.22c-.95-.24-2.14-.36-3.2-.36-7,0-10.67,4.86-10.67,14.23v34.87h-12.57V22.54h10.91l.24,10.2c1.66-7.59,5.57-11.39,11.74-11.39,1.54,0,2.61.24,3.56.71Z"/>
        <path fill={fillColors[theme]} d="M232.82,0h39.26v4.98h-33.68v34.04h27.87v4.98h-27.87v39.02h-5.57V0Z"/>
        <path fill={fillColors[theme]} d="M283.58,0h5.46v83.02h-5.46V0Z"/>
        <path fill={fillColors[theme]} d="M345.14,44.48v9.25h-36.17v9.61c0,10.32,5.46,16.01,15.42,16.01s15.18-5.81,15.3-14.94h5.46c-.59,12.69-7.95,19.81-20.76,19.81s-20.88-7.71-20.88-21.35v-18.38c0-13.64,7.47-21.35,20.88-21.35s20.76,7.71,20.76,21.35ZM339.69,49.1v-5.1c0-10.44-5.22-16.01-15.3-16.01s-15.42,5.69-15.42,16.01v5.1h30.72Z"/>
        <path fill={fillColors[theme]} d="M374.08,53.02l-18.74-28.7h5.93l16.13,24.91,16.01-24.91h5.57l-18.62,28.7,19.45,30.01h-6.05l-16.72-26.33-16.84,26.33h-5.69l19.57-30.01Z"/>
      </g>
    </svg>
  )
}