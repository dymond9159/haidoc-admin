"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link" // Import LinkProps
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"

// --- PaginationContent (No Changes Needed) ---
const PaginationContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex w-full items-center justify-center gap-2", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

// --- PaginationItem (No Changes Needed - Uses Button) ---
const PaginationItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    size="icon"
    className={cn("h-8 w-8", className)}
    {...props}
  />
))
PaginationItem.displayName = "PaginationItem"

// --- PaginationLink (Corrected Props) ---
type PaginationLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & { active?: boolean }

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, active, ...props }, ref) => (
    <Link
      ref={ref}
      aria-current={active ? "page" : undefined} // Use aria-current for active state
      data-active={active ? "" : undefined} // Optional: Add data attribute if needed for styling
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[active]:border-primary data-[active]:bg-primary data-[active]:text-primary-foreground", // Adjusted active styles
        className,
      )}
      {...props} // Spread the rest of the LinkProps (including required href)
    />
  ),
)
PaginationLink.displayName = "PaginationLink"

// --- PaginationEllipsis (No Changes Needed) ---
const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden // Indicate it's decorative
    className={cn(
      "flex h-8 w-8 select-none items-center justify-center text-sm font-medium",
      className,
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
))
PaginationEllipsis.displayName = "PaginationEllipsis"

// --- PaginationPrevious (Corrected Props) ---
type PaginationPreviousProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps

const PaginationPrevious = React.forwardRef<
  HTMLAnchorElement,
  PaginationPreviousProps
>(({ className, ...props }, ref) => (
  <Link
    ref={ref}
    aria-label="Go to previous page" // Use aria-label
    className={cn(
      "flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", // Adjusted padding/flex
      className,
    )}
    {...props} // Spread LinkProps (including required href)
  >
    <ChevronLeft className="h-4 w-4" />
    {/* Screen reader text removed, handled by aria-label */}
  </Link>
))
PaginationPrevious.displayName = "PaginationPrevious"

// --- PaginationNext (Corrected Props) ---
type PaginationNextProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps

const PaginationNext = React.forwardRef<HTMLAnchorElement, PaginationNextProps>(
  ({ className, ...props }, ref) => (
    <Link
      ref={ref}
      aria-label="Go to next page" // Use aria-label
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", // Adjusted padding/flex
        className,
      )}
      {...props} // Spread LinkProps (including required href)
    >
      <ChevronRight className="h-4 w-4" />
      {/* Screen reader text removed, handled by aria-label */}
    </Link>
  ),
)
PaginationNext.displayName = "PaginationNext"

// --- Main Pagination Component (Using Buttons/Callbacks - No Change Needed Here) ---
// NOTE: This component currently uses PaginationItem (Buttons), NOT the Link components above.
// If you wanted URL-based pagination, you would refactor this component
// to use PaginationLink, PaginationPrevious, PaginationNext and pass appropriate href props.
interface PaginationProps {
  currentPage?: number
  totalPages: number
  onPageChange?: (page: number) => void // Used for button-based pagination
  className?: string
  // If using Link components, you'd need props to construct hrefs, e.g.:
  // buildHref?: (page: number) => string | UrlObject;
}

function Pagination({
  currentPage = 1,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5 // Define how many page numbers max (excluding ellipsis, first, last)

    if (totalPages <= maxPagesToShow + 2) {
      // Show all if total is small enough
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      const showEllipsisStart = currentPage > maxPagesToShow - 1
      const showEllipsisEnd = currentPage < totalPages - (maxPagesToShow - 2)

      pageNumbers.push(1) // Always show first page

      if (showEllipsisStart) {
        pageNumbers.push(-1) // Ellipsis
      }

      // Determine the range of middle pages to show
      let startPage: number, endPage: number
      const pagesInMiddle = maxPagesToShow - 2 // Pages between first/last and potential ellipsis

      if (!showEllipsisStart) {
        // Near the start
        startPage = 2
        endPage = pagesInMiddle + 1
      } else if (!showEllipsisEnd) {
        // Near the end
        startPage = totalPages - pagesInMiddle
        endPage = totalPages - 1
      } else {
        // In the middle
        const sidePages = Math.floor((pagesInMiddle - 1) / 2) // -1 for current page
        startPage = currentPage - sidePages
        endPage = currentPage + (pagesInMiddle - 1 - sidePages)
      }

      for (let i = startPage; i <= endPage; i++) {
        // Don't add page 1 or totalPages again if they fall into this range
        if (i > 1 && i < totalPages) {
          pageNumbers.push(i)
        }
      }

      if (showEllipsisEnd) {
        pageNumbers.push(-1) // Ellipsis
      }

      if (totalPages > 1) {
        // Avoid adding last page if it's the same as the first
        pageNumbers.push(totalPages) // Always show last page
      }
    }

    return pageNumbers
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      // Prevent redundant calls
      onPageChange?.(page) // Use optional chaining for onPageChange
    }
  }

  // Guard against invalid states
  if (totalPages <= 0) {
    return null
  }

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={cn("mx-auto flex w-full justify-center", className)}
    >
      <PaginationContent className="flex flex-row gap-2 justify-between">
        {/* Using PaginationItem (Button) for Previous */}
        <PaginationItem
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className="cursor-pointer w-fit h-8 text-secondary px-3" // Consistent size
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {"Anterior"}
        </PaginationItem>

        <div className="flex flex-row gap-2">
          {getPageNumbers().map((pageNumber, index) =>
            pageNumber === -1 ? (
              <PaginationEllipsis
                key={`ellipsis-${index}`}
                className="h-8 w-8"
              /> // Consistent size
            ) : (
              // Using PaginationItem (Button) for Page Numbers
              <PaginationItem
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                // Use aria-current for accessibility on the current page
                aria-current={pageNumber === currentPage ? "page" : undefined}
                // Use data attribute for styling the active page
                data-active={pageNumber === currentPage ? "" : undefined}
                aria-label={`Page ${pageNumber}`}
                className={cn(
                  "h-8 w-8", // Consistent size
                  // Example active styling using data attribute selector in CSS/global styles
                  // Or apply classes directly (though data attribute is often cleaner)
                  pageNumber === currentPage &&
                    "border-secondary bg-secondary text-primary-foreground hover:bg-secondary/90",
                )}
              >
                {pageNumber}
              </PaginationItem>
            ),
          )}
        </div>

        {/* Using PaginationItem (Button) for Next */}
        <PaginationItem
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          className="cursor-pointer w-fit h-8 text-secondary px-3"
        >
          {"Proximo"}
          <ArrowRightIcon className="h-4 w-4" />
        </PaginationItem>
      </PaginationContent>
    </nav>
  )
}

// Export all components
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink, // Correctly typed now, but unused by main Pagination
  PaginationEllipsis,
  PaginationPrevious, // Correctly typed now, but unused by main Pagination
  PaginationNext, // Correctly typed now, but unused by main Pagination
}
