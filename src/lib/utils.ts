import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

export async function exportElementAsJpeg(
  elementId: string,
  fileName: string,
): Promise<void> {
  const element = document.getElementById(elementId)
  if (!element) {
    console.error(`Element with ID ${elementId} not found`)
    return
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    })

    const dataUrl = canvas.toDataURL("image/jpeg", 0.8)

    const link = document.createElement("a")
    link.href = dataUrl
    link.download = `${fileName}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error("Error exporting as JPEG:", error)
  }
}

export async function exportElementAsPdf(
  elementId: string,
  fileName: string,
): Promise<void> {
  const element = document.getElementById(elementId)
  if (!element) {
    console.error(`Element with ID ${elementId} not found`)
    return
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
    })

    const imgWidth = 210 // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
    pdf.save(`${fileName}.pdf`)
  } catch (error) {
    console.error("Error exporting as PDF:", error)
  }
}
