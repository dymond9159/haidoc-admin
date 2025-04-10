"use client"

import Link from "next/link"
import { Bell, ShoppingBag, ChevronDown } from "lucide-react"
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
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function Header() {
  const pathname = usePathname()
  const [pageTitle, setPageTitle] = useState("Home")

  useEffect(() => {
    // Set default page title based on pathname
    const pageTitles: Record<string, string> = {
      "/admin": "Home",
      "/admin/dashboard": "Dashboard",
      "/admin/users": "Gerenciamento de Usuários",
      "/admin/applications": "Aplicações de usuários business",
      "/admin/deliveries": "Entregas",
      "/admin/pre-assessments": "Pré-avaliações",
      "/admin/finances": "Finanças",
      "/admin/activity-log": "Log de Atividades",
      "/admin/taxes": "Taxas",
    }

    setPageTitle(pageTitles[pathname] || "")
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

        <Button
          variant="outline"
          size="icon"
          className="text-system-11 relative rounded-full"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-9 text-[10px] font-medium text-white">
            3
          </span>
        </Button>

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
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
