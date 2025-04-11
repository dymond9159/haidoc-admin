"use client"

import type React from "react"

import { useState } from "react"
import { DeliveryStats } from "@/components/admin/deliveries/delivery-stats"
import { OrderTable } from "@/components/admin/deliveries/order-table"
import { DeliveryHistoryTable } from "@/components/admin/deliveries/delivery-history-table"
import { Input } from "@/components/ui/input"
import { Search, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HistoryStatusList, OrderStatusList } from "@/lib/constants"

enum DeliverTabOption {
  Order = "order",
  History = "history",
}

export default function DeliveriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [activeTab, setActiveTab] = useState<DeliverTabOption>(
    DeliverTabOption.Order,
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value)
  }

  const handleTabChange = (tab: DeliverTabOption) => {
    setActiveTab(tab)
    setSearchQuery("")
    setSelectedDate(undefined)
    setSelectedStatus("all")
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedDate(undefined)
    setSelectedStatus("all")
  }

  const hasActiveFilters =
    searchQuery !== "" || selectedDate !== undefined || selectedStatus !== "all"

  return (
    <div className="space-y-6">
      <DeliveryStats />

      <div className="space-y-4">
        <div className="flex flex-wrap gap-5">
          <div className="w-full flex-1">
            <label className="mb-2 block text-sm font-medium">Pesquisar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-system-10" />
              <Input
                placeholder="Pesquisar por ID do paciente"
                className="pl-10"
                type="number"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <label className="mb-2 block text-sm font-medium">Data</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full border justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "dd/MM/yyyy", { locale: ptBR })
                  ) : (
                    <span>Selecione uma Data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-full md:w-1/6">
            <label className="mb-2 block text-sm font-medium">Status</label>
            <Select value={selectedStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {activeTab === DeliverTabOption.Order ? (
                  <>
                    {OrderStatusList?.map((item, index) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </>
                ) : (
                  <>
                    {HistoryStatusList?.map((item, index) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          {hasActiveFilters && (
            <div className="flex justify-end mt-7">
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </div>

      <Tabs
        defaultValue={DeliverTabOption.Order}
        value={activeTab}
        onValueChange={(current) =>
          handleTabChange(current as DeliverTabOption)
        }
      >
        <TabsList>
          <TabsTrigger value={DeliverTabOption.Order}>
            Pedidos atuais
          </TabsTrigger>
          <TabsTrigger value={DeliverTabOption.History}>Histórico</TabsTrigger>
        </TabsList>
        <TabsContent value={DeliverTabOption.Order} className="mt-4">
          <OrderTable
            searchQuery={searchQuery}
            selectedDate={selectedDate}
            selectedStatus={selectedStatus}
          />
        </TabsContent>
        <TabsContent value={DeliverTabOption.History} className="mt-4">
          <DeliveryHistoryTable
            searchQuery={searchQuery}
            selectedDate={selectedDate}
            selectedStatus={selectedStatus}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
