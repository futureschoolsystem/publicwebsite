"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  // Helper to download any file from Cloudinary
  async function downloadFile(url, filename) {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename || url.split("/").pop();
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed", err);
    }
  }

  useEffect(() => {
    async function fetchNotices() {
      if (status !== "authenticated") return;
      try {
        const res = await fetch(
          `/api/student/notices/${session.user.registrationNo}`
        );
        const data = await res.json();
        if (data.success && Array.isArray(data.notices)) {
          setNotices(data.notices);
        } else {
          setNotices([]);
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    }
    fetchNotices();
  }, [status, session]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-gray-500">
        ⏳ Loading Please Wait...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📘 Notices & Announcements</h2>
      {(!notices || notices.length === 0) ? (
        <p className="text-gray-500">No Data found.</p>
      ) : (
        <div className="space-y-4">
          {notices.map((notice) => {
            const url = notice.link || "";
            const isImage = url.match(/\.(jpeg|jpg|png|gif|webp)$/i);
            const isPDF = url.match(/\.pdf$/i);

            return (
              <div
                key={notice._id}
                className="p-4 border rounded-lg shadow bg-white"
              >
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{new Date(notice.date).toLocaleDateString()}</span>
                </div>

                <h3 className="text-lg font-semibold mt-2">{notice.heading}</h3>

                {/* Attachments */}
                {url && (
                  <div className="mt-3 space-y-2">
                    {isImage ? (
                      <div className="relative">
                        <img
                          src={url}
                          alt="Attachment"
                          className="max-h-60 rounded shadow cursor-pointer hover:opacity-80"
                        />
                        <button
                          onClick={() => downloadFile(url)}
                          className="m-2 ml-3 bg-white p-2 rounded shadow text-xs text-gray-800 hover:bg-gray-100"
                        >
                          ⬇️ Download
                        </button>
                      </div>
                    ) : isPDF ? (
                      <div className="relative">
                        <iframe
                          src={url}
                          className="w-full h-60 rounded"
                          title="PDF Preview"
                        ></iframe>
                        <button
                          onClick={() => downloadFile(url)}
                          className="m-2 ml-3 bg-white p-2 rounded shadow text-xs text-gray-800 hover:bg-gray-100"
                        >
                          ⬇️ Download
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => downloadFile(url)}
                        className="block text-blue-600 hover:underline text-sm"
                      >
                        📎 Download Attachment
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
