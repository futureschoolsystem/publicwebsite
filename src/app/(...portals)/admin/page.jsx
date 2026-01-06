"use client"
import { useState } from "react"
import AdminSidebar from "@/components/portal-components/AdminSidebar"
import AddGalleryPhotos from "@/components/portal-components/admin/AddGalleryPhotos"
import AddEventsAndAnnouncements from "@/components/portal-components/admin/AddEventsAndAnnouncements"

const Page = () => {
  const [tab, setTab] = useState("gallery")
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar setTab={setTab} />
        <main className="flex-1 md:ml-0 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {tab === "gallery" && <AddGalleryPhotos />}
            {tab === "eventsandannouncements" && <AddEventsAndAnnouncements />}
          </div>
        </main>
      </div>
    </div>
  )
}
export default Page