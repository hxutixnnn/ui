"use client"

import type { ComponentProps, ReactNode } from "react"
import { Button } from "@/components/ui/button"

export interface ActionButtonProps extends ComponentProps<typeof Button> {
  loading?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

export function ActionButton({
  loading = false,
  leadingIcon,
  trailingIcon,
  disabled,
  children,
  ...props
}: ActionButtonProps) {
  return (
    <Button
      {...props}
      disabled={disabled || loading}
      aria-busy={loading || props["aria-busy"]}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="size-4 rounded-full border-2 border-current border-r-transparent motion-safe:animate-spin"
        />
      ) : leadingIcon ? (
        <span
          aria-hidden="true"
          data-icon="inline-start"
          className="inline-flex"
        >
          {leadingIcon}
        </span>
      ) : null}
      {children}
      {!loading && trailingIcon ? (
        <span aria-hidden="true" data-icon="inline-end" className="inline-flex">
          {trailingIcon}
        </span>
      ) : null}
    </Button>
  )
}
