import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface EmptyStateProps extends Omit<
  ComponentProps<"div">,
  "title" | "children"
> {
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  action?: ReactNode
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center rounded-3xl border border-dashed px-6 py-12 text-center",
        className
      )}
      {...props}
    >
      {icon != null && (
        <div
          aria-hidden="true"
          className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground [&_svg]:size-6"
        >
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      {description != null && (
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      )}
      {action != null && (
        <div className="mt-5 flex flex-wrap justify-center gap-2">{action}</div>
      )}
    </div>
  )
}
