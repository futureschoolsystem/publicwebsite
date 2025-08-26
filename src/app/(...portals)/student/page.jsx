"use client"
import Sidebar from "@/components/portal-components/Sidebar"
import { useState } from "react"
import PersonalInformation from "@/components/portal-components/student/PersonalInformation"
import FeeRecords from "@/components/portal-components/student/FeeRecords"
import Attendance from "@/components/portal-components/student/Attendance"
import Academics from "@/components/portal-components/student/Academics"
import DailyDiary from "@/components/portal-components/student/DailyDiary"
import NoticesAndAnnouncements from "@/components/portal-components/student/Notices&Announcements"
import Downloads from "@/components/portal-components/student/Downloads"

const Page = () => {
  const [tab, setTab] = useState("PersonalInformation")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar setTab={setTab} />

        <main className="flex-1 md:ml-0 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {tab === "PersonalInformation" && <PersonalInformation />}
            {tab === "FeeRecords" && <FeeRecords />}
            {tab === "AttendanceInfo" && <Attendance />}
            {tab === "AcademicRecords" && <Academics />}
            {tab === "DailyDiary" && <DailyDiary />}
            {tab === "Notices&Announcements" && <NoticesAndAnnouncements />}
            {tab === "Downloads" && <Downloads />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Page