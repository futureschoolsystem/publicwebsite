"use client";

import { useEffect, useState } from "react";

export default function LoginDetails() {
  const [logins, setLogins] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Get today's date (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchLogins(today);
    setDate(today);
  }, []);

  const fetchLogins = async (selectedDate) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/login-details?date=${selectedDate}`);
      const data = await res.json();

      if (data.success) {
        setLogins(data.loginStudents || []);
      } else {
        setLogins([]);
      }
    } catch (error) {
      console.error("Error fetching login details:", error);
    }
    setLoading(false);
  };

  const handleFilter = () => {
    if (!date) return;
    fetchLogins(date);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Student Login Details</h1>

      {/* Filter */}
      <div className="flex gap-3 mb-6">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded px-3 py-2"
        />

        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
      </div>

      {/* Total Logins */}
      <div className="mb-4 font-semibold text-lg">
        Total Students Logged In: {logins.length}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Registration No</th>
              <th className="border px-4 py-2">Login Time</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : logins.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No login records found
                </td>
              </tr>
            ) : (
              logins.map((student, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    {student.registrationNo}
                  </td>
                  
                  <td className="border px-4 py-2">
                    {new Date(student.loginTime).toLocaleTimeString("en-PK", {
  timeZone: "Asia/Karachi",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
})}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}