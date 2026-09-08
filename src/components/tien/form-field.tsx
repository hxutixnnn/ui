"use client"

import { useId, type ComponentProps, type ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface FormFieldProps extends ComponentProps<typeof Input> {
  label: ReactNode
  description?: ReactNode
  error?: ReactNode
  containerClassName?: string
}

export function FormField({
  label,
  description,
  error,
  id,
  containerClassName,
  ...props
}: FormFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hasDescription = description != null && description !== false
  const hasError = error != null && error !== false && error !== ""
  const describedBy =
    [
      props["aria-describedby"],
      hasDescription && `${inputId}-description`,
      hasError && `${inputId}-error`,
    ]
      .filter(Boolean)
      .join(" ") || undefined

  return (
    <div
      data-slot="form-field"
      className={cn("grid gap-2", containerClassName)}
    >
      <Label htmlFor={inputId}>
        {label}
        {props.required && (
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
        )}
      </Label>
      <Input
        {...props}
        id={inputId}
        aria-describedby={describedBy}
        aria-invalid={hasError || props["aria-invalid"]}
      />
      {hasDescription && (
        <p
          id={`${inputId}-description`}
          className="text-sm text-muted-foreground"
        >
          {description}
        </p>
      )}
      {hasError && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="text-sm text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  )
}
