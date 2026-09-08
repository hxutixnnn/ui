"use client"

import type { ComponentProps, ReactElement, ReactNode } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface SimpleTooltipProps {
  content: ReactNode
  children: ReactElement
  side?: ComponentProps<typeof TooltipContent>["side"]
  delay?: number
}

export function SimpleTooltip({
  content,
  children,
  side = "top",
  delay = 300,
}: SimpleTooltipProps) {
  return (
    <TooltipProvider delay={delay}>
      <Tooltip>
        <TooltipTrigger render={children} />
        <TooltipContent side={side}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
