"use client";

import { Poppins } from "next/font/google";
import axios from "axios";
import { useEffect, useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function ResultPublishPermission() {
  const [year, setYear] = useState("2026");
  const [testType, setTestType] = useState("");
  const [stopFeeDefaultersResult, setStopFeeDefaultersResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [permissions, setPermissions] = useState(null);

  useEffect(() => {
    async function fetchPermission() {
      try {
        const response = await axios.get(
          "/api/admin/result-publish-permission",
        );
        setPermissions(response.data.permissions);
      } catch (error) {
        console.error("Error fetching permission:", error);
      }
    }
    fetchPermission();
  }, [year, testType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/admin/result-publish-permission",
        {
          year,
          testType,
          stopFeeDefaultersResult,
        },
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error saving permission");
    }
    setLoading(false);
  };

  const deletePermission = async (id) => {
    try {
      await axios.delete(`/api/admin/result-publish-permission/${id}`);
      setPermissions(permissions.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting permission:", error);
      setMessage("Error deleting permission");
    }
  };

  return (
    <div className={`${poppins.className} p-6`}>
      <h2 className="text-2xl font-semibold mb-4">
        Set Result Publish Permission
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Test Type</label>
          <select
            value={testType}
            onChange={(e) => setTestType(e.target.value)}
            id="testType"
            name="testType"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            required
          >
            <option value="" disabled>
              Select Test Type
            </option>
            <option value="First Assessment">1st Assessment</option>
            <option value="Second Assessment">2nd Assessment</option>
            <option value="Third Assessment">3rd Assessment</option>
            <option value="Fourth Assessment">4th Assessment</option>
            <option value="Fifth Assessment">5th Assessment</option>
            <option value="First Term">1st Term</option>
            <option value="Second Term">2nd Term</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="stopFeeDefaultersResult"
            checked={stopFeeDefaultersResult}
            onChange={(e) => setStopFeeDefaultersResult(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="stopFeeDefaultersResult">
            Stop Result for Fee Defaulters
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Permission"}
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {permissions && permissions.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                  Year
                </th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                  Test Type
                </th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                  Stop Fee Defaulters Result
                </th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission) => (
                <tr key={permission.id} className="bg-white hover:bg-gray-50">
                  <td className="px-4 py-2 border-b text-sm text-gray-700">
                    {permission.year}
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">
                    {permission.testType}
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">
                    {permission.stopFeeDefaultersResult ? "Yes" : "No"}
                  </td>
                  <td
                    className="px-4 py-2 border-b text-sm text-blue-600 cursor-pointer hover:underline"
                    onClick={() => deletePermission(permission._id)}
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
