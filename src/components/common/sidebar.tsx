"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronLeft, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
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
import { Separator } from "../ui/separator"

interface NavItem {
  icon: React.ElementType
  label: string
  href: string
}

const navItems: NavItem[] = [
  { icon: HomeIcon, label: "Home", href: "/admin" },
  { icon: DashboardIcon, label: "Dashboard", href: "/admin/dashboard" },
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
  { icon: TruckIcon, label: "Entregas", href: "/admin/deliveries" },
  { icon: Edit1Icon, label: "Pré-avaliações", href: "/admin/pre-assessments" },
  { icon: DollarIcon, label: "Finanças", href: "/admin/finances" },
  { icon: ClockIcon, label: "Log de Atividades", href: "/admin/activity-log" },
  { icon: TaxIcon, label: "Taxas", href: "/admin/taxes" },
]

const homeLink = "/admin"

const backgroundStyle = {
  backgroundImage: "url('/images/side-bottom-canvas.svg')",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "bottom left",
  backgroundSize: "100% auto",
}
const backgroundHeightClass = "h-[120px]"

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    // Keep sidebar open on non-mobile unless manually closed (logic could be added for this)
    // For now, default to open on desktop/tablet, closed on mobile initial load
    if (typeof window !== "undefined") {
      setIsOpen(window.innerWidth >= 768)
    }
  }, []) // Run only once on mount

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  const MobileMenuButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className="bg-system-1 fixed left-4 top-[23px] z-50 md:hidden" // Ensure button is visible
      onClick={toggleDrawer}
      aria-label="Menu"
    >
      <Menu className="h-6 w-6" />
    </Button>
  )

  // Shared Nav Link Component
  const NavLink = ({
    item,
    isTabletView,
    closeSheet,
  }: {
    item: NavItem
    isTabletView: boolean
    closeSheet?: () => void
  }) => {
    const isActive =
      item.href === "/admin"
        ? pathname === item.href
        : pathname.startsWith(item.href)
    const Icon = item.icon
    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "flex items-center rounded-md transition-colors",
          isTabletView ? "justify-center p-3" : "gap-3 px-3 py-2 text-sm",
          isActive
            ? "bg-secondary-4 text-secondary font-medium"
            : "text-system-11 hover:bg-system-3",
        )}
        title={isTabletView ? item.label : undefined}
        onClick={closeSheet}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        {!isTabletView && <span className="break-words">{item.label}</span>}
      </Link>
    )
  }

  // Shared "Recolher" (Collapse/Back) Button
  const BackButton = ({
    isTabletView,
    closeSheet,
  }: {
    isTabletView: boolean
    closeSheet?: () => void
  }) => (
    <Button
      variant="ghost"
      className={cn(
        "w-full flex items-center rounded-md text-system-11 hover:bg-system-3",
        isTabletView
          ? "justify-center p-3"
          : "gap-3 px-3 py-2 justify-start text-sm",
      )}
      title={isTabletView ? "Recolher" : undefined}
      onClick={() => {
        if (closeSheet) closeSheet()
        router.push("/admin/login") // Navigate to login or back
      }}
    >
      {/* Use ChevronLeft for mobile sheet 'close', ArrowLeft for desktop 'back' */}
      {isMobile ? (
        <ChevronLeft className="h-5 w-5 flex-shrink-0" />
      ) : (
        <ArrowLeftIcon className="h-5 w-5 flex-shrink-0" />
      )}
      {!isTabletView && <span>Recolher</span>}
    </Button>
  )

  if (isMobile) {
    return (
      <>
        <MobileMenuButton />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent
            side="left"
            className="flex flex-col h-full p-0 w-[240px] border-r-0 bg-white"
          >
            <SheetHeader className="px-3 pt-6 pb-3 border-b">
              <SheetTitle>
                <Logo size="sm" href={homeLink} className="-ml-1" />{" "}
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-2 py-4">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    isTabletView={false}
                    closeSheet={() => setIsOpen(false)}
                  />
                ))}
              </nav>
              <Separator className="my-3" />
              <BackButton
                isTabletView={false}
                closeSheet={() => setIsOpen(false)}
              />
            </div>

            <div
              className={cn("w-full flex-shrink-0", backgroundHeightClass)}
              style={backgroundStyle}
            />
          </SheetContent>
        </Sheet>
      </>
    )
  }

  // Desktop / Tablet View
  const sidebarWidth = isTablet ? "w-[65px]" : "w-[240px]"

  return (
    <div
      className={cn(
        "hidden md:block h-screen border-r border-system-5 bg-white transition-all duration-300",
        sidebarWidth,
      )}
    >
      <div
        className="fixed h-full flex flex-col bg-white border-r z-50"
        style={{ width: isTablet ? "65px" : "240px" }}
      >
        <div className={cn("px-2", isTablet ? "px-1" : "px-3")}>
          <div className="flex items-center border-b py-6 h-[89px]">
            {isTablet ? (
              <div className="flex w-full justify-center px-1">
                <LogoNoText size="sm" href={homeLink} />
              </div>
            ) : (
              <Logo size="sm" href={homeLink} />
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} isTabletView={isTablet} />
            ))}
          </nav>
          <Separator className="my-3" />
          <BackButton isTabletView={isTablet} />
        </div>

        <div
          className={cn("w-full flex-shrink-0", backgroundHeightClass)}
          style={backgroundStyle}
        />
      </div>
    </div>
  )
}
