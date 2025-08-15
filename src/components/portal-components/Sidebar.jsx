"use client"
import { useState } from "react"
import { FaUser, FaMoneyBill, FaBook, FaCalendarCheck, FaBars, FaTimes } from "react-icons/fa"
import { cn } from "@/lib/utils"
import SignoutButton from "./SignoutButton"

const tabs = [
  { key: "PersonalInformation", label: "Personal Information", icon: <FaUser /> },
  { key: "FeeRecords", label: "Fee Records", icon: <FaMoneyBill /> },
  { key: "AcademicRecords", label: "Academic Records", icon: <FaBook /> },
  { key: "AttendanceInfo", label: "Attendance Info", icon: <FaCalendarCheck /> },
]

const Sidebar = ({ setTab }) => {
  const [selected, setSelected] = useState("PersonalInformation")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSelect = (tab) => {
    setSelected(tab)
    setTab(tab)
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-blue-200 text-blue-700 hover:bg-blue-50 transition-all duration-200"
        >
          {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <aside
        className={cn(
          "fixed md:relative top-0 left-0 z-40 w-80 md:w-72 lg:w-80 h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 border-r border-blue-100 shadow-xl transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-blue-900 text-center mb-2">Student Portal</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <nav className="flex-1 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleSelect(tab.key)}
                className={cn(
                  "group w-full flex items-center gap-4 px-4 py-4 rounded-xl font-medium transition-all duration-200 text-left",
                  selected === tab.key
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-[1.02]"
                    : "text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:shadow-md hover:transform hover:scale-[1.01]",
                )}
              >
                <span
                  className={cn(
                    "text-xl transition-transform duration-200",
                    selected === tab.key ? "text-white" : "text-blue-500 group-hover:text-blue-600",
                  )}
                >
                  {tab.icon}
                </span>
                <span className="font-semibold text-sm lg:text-base leading-tight">{tab.label}</span>
                {selected === tab.key && <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-blue-100">
            <SignoutButton />
            <div className="text-center text-xs text-blue-600">
              <p className="font-medium">Future School System Okara</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar