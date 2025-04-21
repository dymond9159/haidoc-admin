import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavigationCardProps {
  title: string
  description?: string
  icon: ReactNode
  illustration: ReactNode
  href: string
  className?: string
}

export function NavigationCard({
  title,
  description,
  icon,
  illustration,
  href,
  className,
}: NavigationCardProps) {
  return (
    <Link href={href} className="block w-full">
      <div
        className={cn(
          "bg-white h-30 overflow-hidden rounded-lg border border-system-5 p-4 pb-0 flex items-center justify-between transition-all",
          "hover:border-secondary hover:bg-secondary-2",
          className,
        )}
      >
        <div className="flex items-center">
          <div className="mr-4 text-secondary-11">{icon}</div>
          <div>
            <h3 className="text-base font-medium">{title}</h3>
            {description && (
              <p className="text-sm text-system-9">{description}</p>
            )}
          </div>
        </div>
        <div className="flex-shrink-0">{illustration}</div>
      </div>
    </Link>
  )
}
