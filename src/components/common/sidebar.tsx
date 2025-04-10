"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronLeft, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { LogoNoText } from "../logo_no_text"
import { Logo } from "../logo"
import {
  ArrowLeftIcon,
  ClockIcon,
  DashboardIcon,
  DollarIcon,
  Edit1Icon,
  HomeIcon,
  TaxIcon,
  TruckIcon,
  UserCheckIcon,
  UserSettingsIcon,
} from "../icons"

interface NavItem {
  icon: React.ElementType
  label: string
  href: string
}

const navItems: NavItem[] = [
  {
    icon: HomeIcon,
    label: "Home",
    href: "/admin",
  },
  {
    icon: DashboardIcon,
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icon: UserSettingsIcon,
    label: "Gerenciamento de usuários",
    href: "/admin/users",
  },
  {
    icon: UserCheckIcon,
    label: "Aplicações Business",
    href: "/admin/applications",
  },
  {
    icon: TruckIcon,
    label: "Entregas",
    href: "/admin/deliveries",
  },
  {
    icon: Edit1Icon,
    label: "Pré-avaliações",
    href: "/admin/pre-assessments",
  },
  {
    icon: DollarIcon,
    label: "Finanças",
    href: "/admin/finances",
  },
  {
    icon: ClockIcon,
    label: "Log de Atividades",
    href: "/admin/activity-log",
  },
  {
    icon: TaxIcon,
    label: "Taxas",
    href: "/admin/taxes",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Check screen size when mounting and resizing
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    // Initial verification
    checkScreenSize()

    // Add event listener
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    setIsOpen(!isMobile)
  }, [isMobile])

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  const MobileMenuButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className="fixed left-4 top-[23px] z-50 md:hidden"
      onClick={toggleDrawer}
      aria-label="Menu"
    >
      <Menu className="h-6 w-6" />
    </Button>
  )

  if (isMobile) {
    return (
      <>
        <MobileMenuButton />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="left" className="p-0 w-[240px] border-r-0">
            <div className="flex h-16 items-center border-b px-4">
              <Logo className="h-8" />
              {/* <Button
                variant="ghost"
                size="icon"
                className="absolute right-2"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button> */}
            </div>
            <div className="py-4">
              <nav className="space-y-1 px-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-primary-2 text-primary-9 font-medium"
                          : "text-system-11 hover:bg-system-3",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
            <div className="absolute bottom-4 left-0 right-0 px-4">
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-3 px-3 py-2 text-sm text-system-11 hover:bg-system-3"
                onClick={() => setIsOpen(false)}
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Recolher</span>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </>
    )
  }

  // desktop/tablet
  return (
    <div
      className={cn(
        "h-screen border-r border-system-5 bg-white transition-all duration-300",
        isTablet ? "w-[70px]" : "w-[240px]",
      )}
    >
      <div className="fixed">
        <div
          className={cn(
            "flex flex-col px-3",
            isTablet ? "w-[70px]" : "w-[240px]",
          )}
        >
          <div className="flex items-center border-b py-6">
            {isTablet ? (
              <div className="flex w-full">
                <LogoNoText size="sm" />
              </div>
            ) : (
              <Logo size="sm" />
            )}
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-4">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md transition-colors",
                      isTablet ? "justify-center p-3" : "gap-3 px-3 py-2",
                      isActive
                        ? "bg-primary-2 text-primary-9 font-medium"
                        : "text-system-11 hover:bg-system-3",
                    )}
                    title={isTablet ? item.label : undefined}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!isTablet && (
                      <span className="text-sm break-words">{item.label}</span>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="border-t px-2 py-2">
            <Button
              variant="ghost"
              className={cn(
                "w-full flex items-center rounded-md text-system-11 hover:bg-system-3",
                isTablet
                  ? "justify-center p-3"
                  : "gap-3 px-3 py-2 justify-start",
              )}
              title={isTablet ? "Recolher" : undefined}
            >
              <ArrowLeftIcon className="h-5 w-5 flex-shrink-0" />
              {!isTablet && <span className="text-sm">Recolher</span>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
