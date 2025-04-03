"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/phone-input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function VerificationStep1() {
  const router = useRouter()
  const [method, setMethod] = useState<"email" | "sms" | null>(null)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!method) return

    setIsLoading(true)

    // In a real app, you would send a verification code here
    // For now, we'll just simulate sending a code
    setTimeout(() => {
      setIsLoading(false)
      // Store the selected method in sessionStorage to use in the next steps
      sessionStorage.setItem("verificationMethod", method)
      router.push("/auth/verification/step2")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-system-12">
          Para completar seu Login com sucesso, por favor efetue a autenticação
          de seus dados. Escolha por qual meio deseja receber o código.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            E-mail<span className="text-error-6">*</span>
          </label>
          <Input
            id="email"
            type="email"
            placeholder="mail.example@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setMethod("email")
            }}
            required={method === "email"}
            className={method === "email" ? "border-primary-9" : ""}
            onClick={() => setMethod("email")}
          />
        </div>

        <div className="flex items-center">
          <Separator className="flex-grow" />
          <span className="mx-2 text-xs text-system-10">ou</span>
          <Separator className="flex-grow" />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium">
            SMS<span className="text-error-6">*</span>
          </label>
          <PhoneInput
            id="phone"
            placeholder="Ex: +55 (71) 99999-9999"
            value={phone}
            onChange={(value) => {
              setPhone(value)
              setMethod("sms")
            }}
            required={method === "sms"}
            className={method === "sms" ? "border-primary-9" : ""}
            onClick={() => setMethod("sms")}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary-9 hover:bg-primary-10"
          disabled={
            isLoading ||
            !method ||
            (method === "email" && !email) ||
            (method === "sms" && !phone)
          }
        >
          {isLoading ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </div>
  )
}
