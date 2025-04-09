"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { User } from "@/types/user"

interface DeleteUserDialogProps {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteUserDialog({
  user,
  open,
  onOpenChange,
  onConfirm,
}: DeleteUserDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir usuário</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o usuário{" "}
            <strong>{user.name}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="text-destructive font-medium text-sm mb-4">
          Esta ação não pode ser desfeita e todos os dados associados a este
          usuário serão permanentemente removidos.
        </div>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Excluir usuário
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
