"use client"

import { useId, type ReactNode } from "react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface SimpleSelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SimpleSelectProps {
  options: SimpleSelectOption[]
  label: ReactNode
  placeholder?: string
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  id?: string
  name?: string
  disabled?: boolean
  required?: boolean
  className?: string
}

export function SimpleSelect({
  options,
  label,
  placeholder = "Select an option",
  value,
  defaultValue,
  onValueChange,
  id,
  name,
  disabled,
  required,
  className,
}: SimpleSelectProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId

  return (
    <div data-slot="simple-select" className="grid gap-2">
      <Label id={`${selectId}-label`} htmlFor={selectId}>
        {label}
        {required && (
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
        )}
      </Label>
      <Select
        items={options}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        name={name}
        disabled={disabled}
        required={required}
      >
        <SelectTrigger
          id={selectId}
          aria-labelledby={`${selectId}-label`}
          className={cn("w-full", className)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
