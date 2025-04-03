"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { PhoneInput } from "@/components/ui/phone-input"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    setIsLoading(true)

    // In a real app, you would register the user here
    setTimeout(() => {
      setIsLoading(false)
      router.push("/login")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-system-2 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-system-1 p-8 shadow-md">
        <div className="flex justify-center">
          <Logo size="md" />
        </div>

        <h1 className="text-center text-2xl font-bold">Crie sua conta</h1>
        <p className="text-center text-sm text-system-10">
          Preencha os campos abaixo para criar sua conta no HaiDoc
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Nome completo<span className="text-error-6">*</span>
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              E-mail<span className="text-error-6">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="mail.example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium">
              Telefone<span className="text-error-6">*</span>
            </label>
            <PhoneInput
              id="phone"
              placeholder="Ex: +55 (71) 99999-9999"
              value={phone}
              onChangeNumber={setPhone}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Senha<span className="text-error-6">*</span>
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-system-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-system-10">
              A senha deve ter pelo menos 8 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Confirmar senha<span className="text-error-6">*</span>
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-system-10"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-error-2 p-3 text-sm text-error-6">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-primary-9 hover:bg-primary-10"
            disabled={isLoading}
          >
            {isLoading ? "Criando conta..." : "Criar conta"}
          </Button>

          <div className="text-center text-sm">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-primary-9 hover:text-primary-10"
            >
              Faça login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
