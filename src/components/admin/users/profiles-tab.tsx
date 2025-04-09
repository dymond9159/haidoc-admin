"use client"

import { useState } from "react"
import { Pencil, Trash, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ProfileFormDialog } from "@/components/admin/users/profile-form-dialog"
import { DeleteProfileDialog } from "@/components/admin/users/delete-profile-dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Pagination } from "@/components/ui/pagination"
import { useToast } from "@/hooks/use-toast"

// Profile type definition
interface Permission {
  id: string
  name: string
  description: string
  enabled: boolean
}

interface Profile {
  id: string
  name: string
  permissions: Permission[]
}

export function ProfilesTab() {
  const { toast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: "1",
      name: "Perfil X",
      permissions: [
        {
          id: "1",
          name: "Aplicações de usuários business",
          description:
            "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
          enabled: true,
        },
        {
          id: "2",
          name: "Finanças",
          description:
            "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
          enabled: true,
        },
        {
          id: "3",
          name: "Entregas",
          description:
            "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
          enabled: false,
        },
        {
          id: "4",
          name: "Pré-avaliações",
          description:
            "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
          enabled: false,
        },
        {
          id: "5",
          name: "Log de atividades",
          description:
            "O usuário pode visualizar as informações de usuários pacientes e usuários business.",
          enabled: true,
        },
      ],
    },
    {
      id: "2",
      name: "Perfil A",
      permissions: [
        {
          id: "1",
          name: "Aplicações de usuários business",
          description:
            "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
          enabled: false,
        },
        {
          id: "2",
          name: "Finanças",
          description:
            "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
          enabled: true,
        },
      ],
    },
    {
      id: "3",
      name: "Perfil B",
      permissions: [
        {
          id: "1",
          name: "Aplicações de usuários business",
          description:
            "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
          enabled: true,
        },
        {
          id: "3",
          name: "Entregas",
          description:
            "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
          enabled: true,
        },
      ],
    },
    {
      id: "4",
      name: "Perfil C",
      permissions: [
        {
          id: "4",
          name: "Pré-avaliações",
          description:
            "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
          enabled: true,
        },
        {
          id: "5",
          name: "Log de atividades",
          description:
            "O usuário pode visualizar as informações de usuários pacientes e usuários business.",
          enabled: true,
        },
      ],
    },
    {
      id: "5",
      name: "Perfil D",
      permissions: [
        {
          id: "2",
          name: "Finanças",
          description:
            "O usuário pode visualizar, aprovar, reprovar e cancelar as solicitações dos usuários.",
          enabled: true,
        },
        {
          id: "5",
          name: "Log de atividades",
          description:
            "O usuário pode visualizar as informações de usuários pacientes e usuários business.",
          enabled: false,
        },
      ],
    },
  ])

  // State for create/edit dialog
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null)

  // State for delete dialog
  const [profileToDelete, setProfileToDelete] = useState<Profile | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Handle create new profile
  const handleCreateProfile = () => {
    setEditingProfile(null)
    setIsProfileDialogOpen(true)
  }

  // Handle edit profile
  const handleEditProfile = (profile: Profile) => {
    setEditingProfile(profile)
    setIsProfileDialogOpen(true)
  }

  // Handle delete profile
  const handleDeleteProfile = (profile: Profile) => {
    setProfileToDelete(profile)
    setIsDeleteDialogOpen(true)
  }

  // Save profile (create or update)
  const handleSaveProfile = (profile: Profile) => {
    if (editingProfile) {
      // Update existing profile
      setProfiles(profiles.map((p) => (p.id === profile.id ? profile : p)))
      toast({
        title: "Perfil atualizado",
        description: "As alterações foram salvas com sucesso.",
      })
    } else {
      // Create new profile
      const newProfile = {
        ...profile,
        id: (profiles.length + 1).toString(),
      }
      setProfiles([...profiles, newProfile])
      toast({
        title: "Perfil criado",
        description: "O novo perfil foi criado com sucesso.",
      })
    }
  }

  // Delete profile
  const handleConfirmDelete = () => {
    if (profileToDelete) {
      setProfiles(
        profiles.filter((profile) => profile.id !== profileToDelete.id),
      )
      toast({
        title: "Perfil excluído",
        description: "O perfil foi excluído com sucesso.",
      })
    }
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // In a real app, you would fetch the data for the new page here
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleCreateProfile}>
          <Plus className="mr-2 h-4 w-4" />
          Novo perfil
        </Button>
      </div>

      <div className="rounded-md border">
        <Accordion type="multiple" className="w-full">
          {profiles.map((profile) => (
            <AccordionItem
              key={profile.id}
              value={profile.id}
              className="border-b"
            >
              <div className="flex items-center justify-between px-4">
                <AccordionTrigger className="flex-1 py-4 hover:no-underline">
                  <span className="font-medium">{profile.name}</span>
                </AccordionTrigger>
                <div className="flex gap-2 pr-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditProfile(profile)
                    }}
                    aria-label={`Editar perfil ${profile.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteProfile(profile)
                    }}
                    aria-label={`Excluir perfil ${profile.name}`}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  {profile.permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-start gap-3 rounded-md border p-3"
                    >
                      <Switch
                        id={`permission-${profile.id}-${permission.id}`}
                        checked={permission.enabled}
                        className="mt-0.5"
                        disabled
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={`permission-${profile.id}-${permission.id}`}
                          className="block font-medium"
                        >
                          {permission.name}
                        </label>
                        <p className="text-sm text-muted-foreground">
                          {permission.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="flex items-center justify-center py-4">
        <Pagination />
      </div>

      {/* Profile Form Dialog */}
      <ProfileFormDialog
        profile={editingProfile}
        open={isProfileDialogOpen}
        onOpenChange={setIsProfileDialogOpen}
        onSave={handleSaveProfile}
      />

      {/* Delete Profile Dialog */}
      {profileToDelete && (
        <DeleteProfileDialog
          profile={profileToDelete}
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}
