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

interface Profile {
  id: string
  name: string
  permissions: Array<{
    id: string
    name: string
    description: string
    enabled: boolean
  }>
}

interface DeleteProfileDialogProps {
  profile: Profile
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteProfileDialog({
  open,
  onOpenChange,
  onConfirm,
}: DeleteProfileDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir perfil</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir este perfil de usuário?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="text-destructive font-medium text-sm mb-4">
          Esta ação não pode ser desfeita. Existem 10 usuários associados a este
          perfil que serão afetados.
        </div>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Sim, excluir perfil
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
