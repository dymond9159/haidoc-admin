"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { UserTable } from "@/components/admin/users/user-table"
import { ProfilesTab } from "@/components/admin/users/profiles-tab"
import { UserFormDialog } from "@/components/admin/users/user-form-dialog"
import { Toaster } from "sonner"

export default function UsersPageClient() {
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)

  document.title = "HaiDoc Admin | Gerenciamento de Usuários"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="users" className="w-full">
          <TabsList>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="profiles">Perfis</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="mt-6">
            <div className="flex justify-end mb-4">
              <Button onClick={() => setIsAddUserDialogOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Novo usuário
              </Button>
            </div>
            <UserTable />
          </TabsContent>
          <TabsContent value="profiles" className="mt-6">
            <ProfilesTab />
          </TabsContent>
        </Tabs>
      </div>

      <UserFormDialog
        mode="create"
        open={isAddUserDialogOpen}
        onOpenChange={setIsAddUserDialogOpen}
      />

      <Toaster />
    </div>
  )
}
