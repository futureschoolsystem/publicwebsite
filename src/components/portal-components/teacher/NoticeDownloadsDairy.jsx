"use client";
import { useEffect, useState } from "react";

export default function UploadNotice() {
  const [form, setForm] = useState({
    type: "Notice",
    heading: "",
    link: "",
    date: "",
    campusName: "",
    className: "",
    section: "",
  });

  const [message, setMessage] = useState("");
  const [notices, setNotices] = useState([]);
  const [filters, setFilters] = useState({
    campusName: "",
    className: "",
    section: "",
  });

  // ✅ Fetch notices
  const fetchNotices = async () => {
    try {
      const res = await fetch("/api/teacher/notice-downloads-dairy");
      const data = await res.json();
      if (data.success) setNotices(data.notices);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Saving...");

    try {
      const res = await fetch("/api/teacher/notice-downloads-dairy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("✅ Notice saved successfully!");
        setForm({
          type: "Notice",
          heading: "",
          link: "",
          date: "",
          campusName: "",
          className: "",
          section: "",
        });
        fetchNotices();
      } else {
        const errorData = await res.json();
        setMessage("❌ Error: " + (errorData.message || "Unable to save"));
      }
    } catch (err) {
      setMessage("❌ Error saving notice: " + err.message);
    }
  };

  // ✅ Delete notice
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;

    try {
      const res = await fetch(`/api/teacher/notice-downloads-dairy/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage("🗑️ Notice deleted");
        fetchNotices();
      } else {
        setMessage("❌ Error deleting notice");
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  // ✅ Filtered notices
  const filteredNotices = notices.filter(
    (n) =>
      (!filters.campusName || n.campusName === filters.campusName) &&
      (!filters.className || n.className === filters.className) &&
      (!filters.section || n.section === filters.section) &&
      (!filters.type || n.type === filters.type)
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* ---------- FORM ---------- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 space-y-4 border"
      >
        <h2 className="text-xl font-bold mb-2">📌 Upload Notice</h2>

        {/* Type */}
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border p-2 w-full rounded"
        >
          <option value="DailyDairy">Daily Dairy</option>
          <option value="Notices">Notices</option>
          <option value="Downloads">Downloads</option>
        </select>

        {/* Heading */}
        <input
          type="text"
          placeholder="Heading"
          value={form.heading}
          onChange={(e) => setForm({ ...form, heading: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />

        {/* Link */}
        <input
          type="url"
          placeholder="Paste Google Drive Link"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />

        {/* Date */}
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />

        {/* Campus */}
        <select
          value={form.campusName}
          onChange={(e) => setForm({ ...form, campusName: e.target.value })}
          className="border p-2 w-full rounded"
          required
        >
          <option value="">Select Campus</option>
          <option value="All">All</option>
          <option value="Zaheer">Zaheer Campus</option>
          <option value="Shabbir">Shabbir Campus</option>
          <option value="High">High Campus</option>
        </select>

        {/* Class */}
        <select
          value={form.className}
          onChange={(e) => setForm({ ...form, className: e.target.value })}
          className="border p-2 w-full rounded"
          required
        >
          <option value="">Select Class</option>
          <option value="All">All</option>
          <option value="Play Group">Play Group</option>
          <option value="Nursery">Nursery</option>
          <option value="Prep">Prep</option>
          <option value="One">Class 1</option>
          <option value="Two">Class 2</option>
          <option value="Three">Class 3</option>
          <option value="Four">Class 4</option>
          <option value="Five">Class 5</option>
          <option value="Six">Class 6</option>
          <option value="Seven">Class 7</option>
          <option value="Pre-9th">Pre-9th</option>
          <option value="9th">Class 9</option>
          <option value="10th">Class 10</option>
        </select>

        {/* Section */}
        <select
          value={form.section}
          onChange={(e) => setForm({ ...form, section: e.target.value })}
          className="border p-2 w-full rounded"
          required
        >
          <option value="">Select Section</option>
          <option value="All">All</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="Pink">Pink</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Save Notice
        </button>

        {message && (
          <p className="text-center text-sm text-gray-600">{message}</p>
        )}
      </form>

      {/* ---------- FILTERS ---------- */}
      <div className="bg-gray-50 p-4 rounded-xl shadow flex space-x-4">
        {/* Campus filter */}
        <select
          value={filters.campusName}
          onChange={(e) => setFilters({ ...filters, campusName: e.target.value })}
          className="border p-2 rounded flex-1"
        >
          <option value="">All Campuses</option>
          <option value="Zaheer">Zaheer</option>
          <option value="Shabbir">Shabbir</option>
          <option value="High">High</option>
        </select>

        {/* Class filter */}
        <select
          value={filters.className}
          onChange={(e) => setFilters({ ...filters, className: e.target.value })}
          className="border p-2 rounded flex-1"
        >
          <option value="">All Classes</option>
          <option value="Play Group">Play Group</option>
          <option value="Nursery">Nursery</option>
          <option value="Prep">Prep</option>
          <option value="One">Class 1</option>
          <option value="Two">Class 2</option>
          <option value="Three">Class 3</option>
          <option value="Four">Class 4</option>
          <option value="Five">Class 5</option>
          <option value="Six">Class 6</option>
          <option value="Seven">Class 7</option>
          <option value="Pre-9th">Pre-9th</option>
          <option value="9th">Class 9</option>
          <option value="10th">Class 10</option>
        </select>

        {/* Section filter */}
        <select
          value={filters.section}
          onChange={(e) => setFilters({ ...filters, section: e.target.value })}
          className="border p-2 rounded flex-1"
        >
          <option value="">All Sections</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="Pink">Pink</option>
        </select>
          {/* Type filter */}
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="border p-2 flex-1 rounded"
        >
          <option value="">All</option>
          <option value="DailyDairy">Daily Dairy</option>
          <option value="Notice">Notice</option>
          <option value="Downloads">Downloads</option>
        </select>
      </div>

      {/* ---------- TABLE ---------- */}
      <div className="bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">📖 Saved Notices,Downloads & Dairy Links</h2>
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Heading</th>
              <th className="p-2 border">Campus</th>
              <th className="p-2 border">Class</th>
              <th className="p-2 border">Section</th>
              <th className="p-2 border">Link</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotices.length > 0 ? (
              filteredNotices.map((n) => (
                <tr key={n._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{n.date}</td>
                  <td className="p-2 border">{n.heading}</td>
                  <td className="p-2 border">{n.campusName}</td>
                  <td className="p-2 border">{n.className}</td>
                  <td className="p-2 border">{n.section}</td>
                  <td className="p-2 border">
                    <a
                      href={n.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      Open
                    </a>
                  </td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => handleDelete(n._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No notices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
