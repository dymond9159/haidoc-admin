"use client"

import Link from "next/link"
import {
  ShoppingBag,
  ChevronDown,
  LogOutIcon,
  CircleUserRoundIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { NotificationsDropdown } from "./notifications-dropdown"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [pageTitle, setPageTitle] = useState("Home")

  useEffect(() => {
    // Set default page title based on pathname
    const pageTitles: Record<string, string> = {
      "/admin/dashboard": "Dashboard",
      "/admin/users": "Gerenciamento de Usuários",
      "/admin/applications": "Aplicações de usuários business",
      "/admin/deliveries": "Entregas",
      "/admin/pre-assessments": "Pré-avaliações",
      "/admin/finances": "Finanças",
      "/admin/activity-log": "Log de Atividades",
      "/admin/taxes": "Taxas",
      "/admin/notifications": "Notificações",
      "/admin": "Home",
    }

    // Sort paths by length DESC so more specific ones match first
    Object.keys(pageTitles).sort((a, b) => b.length - a.length)

    // Find the most relevant prefix match
    const match = Object.keys(pageTitles).find((key) =>
      pathname.startsWith(key),
    )

    if (match) {
      setPageTitle(pageTitles[match])
    } else {
      setPageTitle("") // fallback
    }
  }, [pathname])

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between bg-system-2 px-4 md:px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold ml-10 md:ml-0">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="hidden md:flex items-center text-primary-9 gap-2"
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="text-sm">Visitar loja</span>
        </Link>

        <NotificationsDropdown />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2 rounded-full !pl-1 !pr-2 py-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-system-3 text-system-11">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-xs md:block text-left">
                <span className="block font-medium">Nome do usuário</span>
                <span className="block text-[8px] text-system-10">ADM</span>
              </div>
              <ChevronDown className="h-4 w-4 text-system-10 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => router.push("/admin/profile")}>
              <CircleUserRoundIcon size="14" />
              Informações Pessoais
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/admin/login")}>
              <LogOutIcon size="14" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
