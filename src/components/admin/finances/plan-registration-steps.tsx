"use client"

import { cn } from "@/lib/utils"

interface Step {
  id: string
  number: number
  title: string
}

interface PlanRegistrationStepsProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function PlanRegistrationSteps({
  steps,
  currentStep,
  className,
}: PlanRegistrationStepsProps) {
  return (
    <div className={cn("flex items-center mb-8", className)}>
      {steps.map((step, index) => {
        const isActive = step.number === currentStep
        const isCompleted = step.number < currentStep

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2",
                  isActive && "border-primary-5 text-primary-5",
                  isCompleted && "border-primary-5 bg-primary-5 text-white",
                  !isActive && !isCompleted && "border-gray-300 text-gray-500",
                )}
              >
                {step.number}
              </div>
              <span
                className={cn(
                  "text-xs mt-1 text-center",
                  isActive && "text-primary-5",
                  isCompleted && "text-primary-5",
                  !isActive && !isCompleted && "text-gray-500",
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-16 mx-2",
                  isCompleted ? "bg-primary-5" : "bg-gray-300",
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
