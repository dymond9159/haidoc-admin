"use client"

import { BackButton } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/ui/pagination"
import { activities as mockActivities } from "@/lib/mock-data/activity-log"
import type { ActivityLogColumns } from "@/types/admin"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { ActivityDetailDialog } from "@/components/admin/activity-log/activity-detail-dialog"

interface DetailedActivitiesClientProps {
  activityId: string
}

export default function DetailedActivitiesClient({
  activityId,
}: DetailedActivitiesClientProps) {
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityLogColumns | null>(null)

  // TODO: Fetch or filter activities based on the `activityId` prop
  // Example: const activities = await fetchActivitiesForUser(activityId);
  // For now, using the full mock list
  const activities = mockActivities

  const handleViewActivity = (activity: ActivityLogColumns) => {
    setSelectedActivity(activity)
  }

  const handleCloseDialog = () => {
    setSelectedActivity(null)
  }

  const handleViewDocument = (
    documentName: string,
    type: "before" | "after",
  ) => {
    console.log(
      `Request to view ${type} document: ${documentName} for user ${activityId}`,
    )
    // Implement actual document viewing logic here
    // Maybe open a new tab, or trigger another modal/view
    alert(`Simulating view for ${type} document: ${documentName}`)
    // Decide if the dialog should close after viewing
    // handleCloseDialog();
  }

  // --- Pagination Logic ---
  const ITEMS_PER_PAGE = 10
  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE)
  const paginatedActivities = activities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  return (
    <div className="space-y-6">
      <div>
        <BackButton text="Atividade do Usuário" onClick={() => router.back()} />
      </div>

      <div className="space-y-4">
        {paginatedActivities.length > 0 ? (
          paginatedActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex flex-wrap justify-between items-center gap-2 border-b pb-4 dark:border-gray-700"
            >
              <div>
                <h3 className="font-medium">{activity.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.date} · {activity.time}
                </p>
              </div>
              <Button
                variant="link"
                className="text-primary h-auto p-0"
                onClick={() => handleViewActivity(activity)}
              >
                Visualizar
              </Button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            Nenhuma atividade registrada para este usuário.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      <ActivityDetailDialog
        key={selectedActivity?.id ? `desc-${selectedActivity.id}` : "desc-null"}
        open={!!selectedActivity}
        onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}
        activity={selectedActivity}
        onViewDocument={handleViewDocument}
      />
    </div>
  )
}
