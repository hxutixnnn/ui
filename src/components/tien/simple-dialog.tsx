"use client"

import type { ComponentProps, ReactElement, ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export interface SimpleDialogProps {
  trigger: ReactElement
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  footer?: ReactNode
  open?: boolean
  onOpenChange?: ComponentProps<typeof Dialog>["onOpenChange"]
  className?: string
}

export function SimpleDialog({
  trigger,
  title,
  description,
  children,
  footer,
  open,
  onOpenChange,
  className,
}: SimpleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent className={className}>
        <DialogHeader className="pr-8">
          <DialogTitle>{title}</DialogTitle>
          {description != null && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        <div className="grid gap-4">{children}</div>
        {footer != null && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}
