"use client"

import { useId, type ComponentProps, type ReactNode } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface LabeledSwitchProps extends ComponentProps<typeof Switch> {
  label: ReactNode
  description?: ReactNode
  containerClassName?: string
}

export function LabeledSwitch({
  label,
  description,
  id,
  containerClassName,
  ...props
}: LabeledSwitchProps) {
  const generatedId = useId()
  const switchId = id ?? generatedId
  const hasDescription = description != null && description !== false
  const describedBy =
    [props["aria-describedby"], hasDescription && `${switchId}-description`]
      .filter(Boolean)
      .join(" ") || undefined

  return (
    <div
      data-slot="labeled-switch"
      className={cn(
        "flex items-center justify-between gap-6",
        containerClassName
      )}
    >
      <div className="grid gap-1.5">
        <Label
          htmlFor={switchId}
          className={cn("leading-5", props.disabled && "opacity-50")}
        >
          {label}
        </Label>
        {hasDescription && (
          <p
            id={`${switchId}-description`}
            className="text-sm text-muted-foreground"
          >
            {description}
          </p>
        )}
      </div>
      <Switch {...props} id={switchId} aria-describedby={describedBy} />
    </div>
  )
}
