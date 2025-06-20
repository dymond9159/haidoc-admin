"use client"

import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as React from "react"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      orientation={orientation}
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-row gap-4" : "flex-col gap-2",
        className,
      )}
      {...props}
    />
  )
}

function TabsList({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & {
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "flex items-center justify-center w-fit h-9 bg-muted text-muted-foreground rounded-lg p-[3px]",
        orientation === "vertical" && "h-fit flex-col items-start",
        className,
      )}
      {...props}
    />
  )
}

interface TabTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  variant?: "default" | "button"
  size?: "default" | "sm" | "lg"
}

const tabTriggerVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:text-secondary-11",
  {
    variants: {
      variant: {
        default: "",
        button:
          "border border-system-5 justify-start bg-background hover:bg-secondary-2 hover:text-secondary-11 hover:border-secondary-11 data-[state=active]:bg-secondary-2 data-[state=active]:text-secondary-11 data-[state=active]:border-secondary-11",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-md px-6 has-[>svg]:px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function TabsTrigger({
  className,
  variant = "default",
  size = "default",
  ...props
}: TabTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-secondary-3 data-[state=active]:text-secondary-11 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
        tabTriggerVariants({ variant, size }),
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger, tabTriggerVariants }
