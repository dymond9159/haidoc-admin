"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import { UserFormDialog } from "@/components/admin/users/user-form-dialog"
import { DeleteUserDialog } from "@/components/admin/users/delete-user-dialog"
import type { User } from "@/types/user"
import { Pagination } from "@/components/ui/pagination"
import { useToast } from "@/hooks/use-toast"

export function UserTable() {
  const { toast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Nome do usuário SuperAdmin (Você)",
      email: "admin@haidoc.com",
      profile: "Perfil X",
      isCurrentUser: true,
    },
    {
      id: "2",
      name: "Ana Maria Santos Silva",
      email: "ana.maria.santos.silva1255@haidoc.com",
      profile: "Perfil X",
    },
    {
      id: "3",
      name: "João Carlos Oliveira",
      email: "joao.carlos@haidoc.com",
      profile: "Perfil X",
    },
    {
      id: "4",
      name: "Mariana Alves Costa",
      email: "mariana.alves@haidoc.com",
      profile: "Perfil X",
    },
    {
      id: "5",
      name: "Pedro Henrique Santos",
      email: "pedro.santos@haidoc.com",
      profile: "Perfil X",
    },
    {
      id: "6",
      name: "Camila Ferreira Lima",
      email: "camila.lima@haidoc.com",
      profile: "Perfil X",
    },
    {
      id: "7",
      name: "Rafael Souza Martins",
      email: "rafael.martins@haidoc.com",
      profile: "Perfil X",
    },
  ])

  // State for edit dialog
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // State for delete dialog
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Handle edit user
  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setIsEditDialogOpen(true)
  }

  // Handle delete user
  const handleDeleteUser = (user: User) => {
    setUserToDelete(user)
    setIsDeleteDialogOpen(true)
  }

  // Update user
  const handleUpdateUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    )
  }

  // Delete user
  const handleConfirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete.id))
      toast({
        title: "Usuário excluído com sucesso",
        description: "O usuário foi removido do sistema.",
      })
    }
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // In a real app, you would fetch the data for the new page here
  }

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%] text-primary-9">
                NOME DO USUÁRIO
              </TableHead>
              <TableHead className="w-[35%] text-primary-9">E-MAIL</TableHead>
              <TableHead className="w-[15%] text-primary-9">PERFIL</TableHead>
              <TableHead className="w-[10%] text-primary-9">AÇÕES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="truncate max-w-[200px]">
                  {user.email}
                </TableCell>
                <TableCell>
                  <Badge className="bg-secondary-2 text-secondary-9">
                    {user.profile}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditUser(user)}
                      aria-label={`Editar usuário ${user.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteUser(user)}
                      aria-label={`Excluir usuário ${user.name}`}
                      disabled={user.isCurrentUser}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 flex items-center justify-center">
        {/* <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={handlePageChange}
        /> */}
      </div>

      {/* Edit User Dialog */}
      {editingUser && (
        <UserFormDialog
          mode="edit"
          user={editingUser}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleUpdateUser}
        />
      )}

      {/* Delete User Dialog */}
      {userToDelete && (
        <DeleteUserDialog
          user={userToDelete}
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}
