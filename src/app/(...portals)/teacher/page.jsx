"use client"
import { useState } from "react"
import NoticeDownloadsDairy from "@/components/portal-components/teacher/NoticeDownloadsDairy"
// import TeacherSidebar from "@/components/portal-components/TeacherSidebar"

const Page = () => {
  const [tab, setTab] = useState("notice-downloads-dairy")
{/* teacher sidebar */}
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* <TeacherSidebar setTab={setTab} /> */}
        <main className="flex-1 md:ml-0 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {tab === "notice-downloads-dairy" && <NoticeDownloadsDairy />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Page