"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Attendance = () => {
  const { data: session, status } = useSession();
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Format: YYYY-MM (default to current month)
  const getCurrentMonthString = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthString());

  useEffect(() => {
    fetchAttendance();
  }, [status, session, selectedMonth]);

  async function fetchAttendance() {
    if (status !== "authenticated" || !session?.user?.id) return;

    setLoading(true);
    try {
      const res = await fetch(
        `/api/student/attendance?studentId=${session.user.id}&month=${selectedMonth}`,
      );
      const data = await res.json();

      if (data.success) {
        setAttendanceData(data.attendance);
      } else {
        setAttendanceData(null);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setAttendanceData(null);
    } finally {
      setLoading(false);
    }
  }

  // Parse the attendance string and calculate stats
const getAttendanceStats = () => {
  if (!attendanceData?.days) {
    return {
      totalWorkingDays: 0,
      totalPresent: 0,
      totalAbsent: 0,
      totalLeave: 0,
      totalHoliday: 0,   // added
      percentage: 0,
      dailyRecords: []
    };
  }

  const days = attendanceData.days;
  const [year, month] = selectedMonth.split('-').map(Number);

  let totalPresent = 0;
  let totalAbsent = 0;
  let totalLeave = 0;
  let totalHoliday = 0;  // new
  const dailyRecords = [];

  for (let i = 0; i < days.length; i++) {
    const status = days[i];
    const date = new Date(year, month - 1, i + 1);

    if (status === 'P') totalPresent++;
    else if (status === 'A') totalAbsent++;
    else if (status === 'L') totalLeave++;
    else if (status === 'H') totalHoliday++;   // new

    dailyRecords.push({
      date,
      day: i + 1,
      status:
        status === 'P' ? 'present' :
        status === 'A' ? 'absent' :
        status === 'L' ? 'leave' :
        status === 'H' ? 'holiday' : 'unknown'  // handle H
    });
  }

  const totalWorkingDays = days.length - totalHoliday;
  const percentage = totalWorkingDays > 0
    ? ((totalPresent / totalWorkingDays) * 100).toFixed(1)
    : 0;

  return {
    totalWorkingDays,
    totalPresent,
    totalAbsent,
    totalLeave,
    totalHoliday,   // new
    percentage,
    dailyRecords
  };
};

  const stats = getAttendanceStats();
  const isLowAttendance = stats.percentage < 75;

  // Format month display
  const getMonthDisplay = () => {
    const [year, month] = selectedMonth.split("-");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {/* Header with Month Picker */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Attendance Report</h2>

        {/* Month/Year Picker */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="month-picker"
            className="text-sm font-medium text-gray-600"
          >
            Select Month:
          </label>
          <input
            id="month-picker"
            type="month"
            value={selectedMonth}
            max={getCurrentMonthString()}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      {/* Current Period Display */}
      <div className="mb-6 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          📅 Showing data for:{" "}
          <span className="font-semibold text-blue-700">
            {getMonthDisplay()}
          </span>
        </p>
      </div>

      {!attendanceData ? (
        <div className="text-center py-12 text-gray-500">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-lg font-medium">No attendance data found</p>
          <p className="text-sm text-gray-400 mt-1">
            No records available for this period
          </p>
        </div>
      ) : (
        <>
          {/* Attendance Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Total Working Days */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 border border-blue-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium mb-1">
                    Working Days
                  </p>
                  <p className="text-3xl font-bold text-blue-700">
                    {stats.totalWorkingDays}
                  </p>
                </div>
                <div className="bg-blue-200 p-3 rounded-full">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Present */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 border border-green-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium mb-1">
                    Present
                  </p>
                  <p className="text-3xl font-bold text-green-700">
                    {stats.totalPresent}
                  </p>
                </div>
                <div className="bg-green-200 p-3 rounded-full">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Absent */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-5 border border-red-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium mb-1">
                    Absent
                  </p>
                  <p className="text-3xl font-bold text-red-700">
                    {stats.totalAbsent}
                  </p>
                </div>
                <div className="bg-red-200 p-3 rounded-full">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Leave */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-5 border border-yellow-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium mb-1">
                    Leave
                  </p>
                  <p className="text-3xl font-bold text-yellow-700">
                    {stats.totalLeave}
                  </p>
                </div>
                <div className="bg-yellow-200 p-3 rounded-full">
                  <svg
                    className="w-8 h-8 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Holiday */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Holidays
                  </p>
                  <p className="text-3xl font-bold text-gray-700">
                    {stats.totalHoliday}
                  </p>
                </div>
                <div className="bg-gray-200 p-3 rounded-full">
                  <svg
                    className="w-8 h-8 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Percentage */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Attendance Percentage
                </h3>
                <p className="text-sm text-gray-600">
                  Your overall attendance rate
                </p>
              </div>
              <div
                className={`text-4xl font-bold ${isLowAttendance ? "text-red-600" : "text-green-600"}`}
              >
                {stats.percentage}%
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isLowAttendance
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : "bg-gradient-to-r from-green-500 to-green-600"
                }`}
                style={{ width: `${stats.percentage}%` }}
              />
            </div>

            {/* Warning/Success Messages */}
            {isLowAttendance && (
              <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-red-800">
                  ⚠️ Your attendance is below 75%. Please improve your
                  attendance to meet the minimum requirement.
                </p>
              </div>
            )}

            {!isLowAttendance && stats.percentage >= 90 && (
              <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-green-800">
                  🎉 Excellent attendance! Keep up the great work!
                </p>
              </div>
            )}
          </div>

          {/* Calendar View */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Daily Attendance Calendar
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {/* Day Headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-semibold text-gray-600 py-2"
                >
                  {day}
                </div>
              ))}

              {/* Empty cells for days before month starts */}
              {Array.from({
                length: new Date(stats.dailyRecords[0]?.date).getDay() || 0,
              }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Attendance Days */}
              {stats.dailyRecords.map((record) => {
                const statusColors = {
                  present: "bg-green-100 border-green-300 text-green-800",
                  absent: "bg-red-100 border-red-300 text-red-800",
                  leave: "bg-yellow-100 border-yellow-300 text-yellow-800",
                  holiday: "bg-gray-100 border-gray-300 text-gray-800", // new
                };

                const statusIcons = {
                  present: "✓",
                  absent: "✗",
                  leave: "L",
                  holiday: "H", // new
                };

                return (
                  <div
                    key={record.day}
                    className={`aspect-square border-2 rounded-lg flex flex-col items-center justify-center text-sm font-medium transition-transform hover:scale-105 ${statusColors[record.status]}`}
                    title={`${record.day} - ${record.status}`}
                  >
                    <span className="text-xs">{record.day}</span>
                    <span className="text-lg">
                      {statusIcons[record.status]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-500 rounded"></span>
                <span className="text-sm text-gray-700">Present (P)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-red-500 rounded"></span>
                <span className="text-sm text-gray-700">Absent (A)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-yellow-500 rounded"></span>
                <span className="text-sm text-gray-700">Leave (L)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-gray-500 rounded"></span>
                <span className="text-sm text-gray-700">Holiday (H)</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Attendance;
