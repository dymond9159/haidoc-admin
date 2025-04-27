import {
  HarvestsColumns,
  MedicalAppointmentColumns,
  OnlineConsultationColumns,
  PersonConsultationColumns,
  PharmacyDeliveriesColumns,
} from "@/types/admin"

// Helper function to generate a random ID (you can use a library like 'uuid' for more robust ID generation)
const generateId = () => Math.random().toString(36).substring(2, 15)

// Helper function to generate a random date string
const generateDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  )
    .toISOString()
    .split("T")[0]
}

// Helper function to generate a random time string
const generateTime = () => {
  const hour = Math.floor(Math.random() * 24)
  const minute = Math.floor(Math.random() * 60)
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
}

// Mock data for Consultation
const mockConsultations: MedicalAppointmentColumns[] = []
for (let i = 0; i < 30; i++) {
  mockConsultations.push({
    id: generateId(),
    patientId: generateId(),
    value: (Math.random() * 100 + 50).toFixed(2), // Random value between 50 and 150
    date: generateDate(new Date(2024, 0, 1), new Date()), // Random date from 2024-01-01 to today
    time: generateTime(),
  })
}

// Mock data for OnlineConsultation (inherits from Consultation)
const mockOnlineConsultations: OnlineConsultationColumns[] =
  mockConsultations.map((consultation) => ({
    ...consultation,
    professional: `Professional ${Math.floor(Math.random() * 5) + 1}`, // Random professional
    doctor: `Doctor ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`, // Random doctor (A, B, or C)
  }))

// Mock data for PersonConsultation (inherits from Consultation)
const mockPersonConsultations: PersonConsultationColumns[] =
  mockConsultations.map((consultation) => ({
    ...consultation,
    professional: `Professional ${Math.floor(Math.random() * 5) + 1}`, // Random professional
    doctor: `Doctor ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`, // Random doctor (A, B, or C)
    clinica: `Clinica ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`, // Random clinica (A, B, or C)
  }))

// Mock data for PharmacyDeliveries (inherits from Consultation)
const mockPharmacyDeliveries: PharmacyDeliveriesColumns[] =
  mockConsultations.map((consultation) => ({
    ...consultation,
    pharmacy: `Pharmacy ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`, // Random pharmacy (A, B, or C)
  }))

// Mock data for Harvests (inherits from Consultation)
const mockHarvests: HarvestsColumns[] = mockConsultations.map(
  (consultation) => ({
    ...consultation,
    harvestType: `Harvest Type ${String.fromCharCode(
      65 + Math.floor(Math.random() * 3),
    )}`, // Random harvest type (A, B, or C)
    laboratory: `Laboratory ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`, // Random laboratory (A, B, or C)
  }),
)

export {
  mockConsultations,
  mockHarvests,
  mockOnlineConsultations,
  mockPersonConsultations,
  mockPharmacyDeliveries,
}
