import { ChartDataType } from "@/components/admin/dashboard/chart-section"

// Sample data for the graphs
export const newUsersData = [
  { day: "Seg", value: 290 },
  { day: "Ter", value: 260 },
  { day: "Qua", value: 210 },
  { day: "Qui", value: 190 },
  { day: "Sex", value: 140 },
  { day: "Sáb", value: 90 },
  { day: "Dom", value: 75 },
]

export const activeUsersData = [
  { day: "Seg", value: 240 },
  { day: "Ter", value: 250 },
  { day: "Qua", value: 260 },
  { day: "Qui", value: 255 },
  { day: "Sex", value: 140 },
  { day: "Sáb", value: 90 },
  { day: "Dom", value: 300 },
]

export const monthlyData: ChartDataType[] = [
  { month: "Jan", optimistic: 300, expected: 250, pessimistic: 200 },
  { month: "Feb", optimistic: 320, expected: 260, pessimistic: 210 },
  { month: "Mar", optimistic: 350, expected: 280, pessimistic: 220 },
  { month: "Apr", optimistic: 380, expected: 300, pessimistic: 230 },
  { month: "May", optimistic: 410, expected: 330, pessimistic: 250 },
  { month: "Jun", optimistic: 450, expected: 350, pessimistic: 270 },
  { month: "Jul", optimistic: 480, expected: 370, pessimistic: 290 },
  { month: "Aug", optimistic: 510, expected: 400, pessimistic: 310 },
  { month: "Sep", optimistic: 540, expected: 420, pessimistic: 330 },
  { month: "Oct", optimistic: 570, expected: 440, pessimistic: 350 },
  { month: "Nov", optimistic: 600, expected: 470, pessimistic: 370 },
  { month: "Dec", optimistic: 650, expected: 500, pessimistic: 400 },
]

export const mockUsers = [
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
  {
    id: "8",
    name: "Rafael Souza Martins",
    email: "rafael.martins@haidoc.com",
    profile: "Perfil X",
  },
  {
    id: "9",
    name: "Rafael Souza Martins",
    email: "rafael.martins@haidoc.com",
    profile: "Perfil X",
  },
  {
    id: "10",
    name: "Rafael Souza Martins",
    email: "rafael.martins@haidoc.com",
    profile: "Perfil X",
  },
  {
    id: "11",
    name: "Rafael Souza Martins",
    email: "rafael.martins@haidoc.com",
    profile: "Perfil X",
  },
]
