"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DailyDiary() {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    async function fetchDiaries() {
      if (status !== "authenticated") return;
      try {
        const res = await fetch(
          `/api/student/daily-diary/${session.user.registrationNo}`
        );
        const data = await res.json();
        if (data.success) setDiaries(data.diaries);
      } catch (error) {
        console.error("Error fetching diaries:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDiaries();
  }, [status, session]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-gray-500">
        ⏳ Loading diary entries...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📘 Daily Diary</h2>
      {diaries.length === 0 ? (
        <p className="text-gray-500">No diary entries found.</p>
      ) : (
        <div className="space-y-4">
          {diaries.map((diary) => (
            <div
              key={diary._id}
              className="p-4 border rounded-lg shadow bg-white"
            >
              <div className="flex justify-between text-sm text-gray-600">
                <span>{new Date(diary.date).toLocaleDateString()}</span>
              </div>

              <h3 className="text-lg font-semibold mt-2">{diary.heading}</h3>

              {/* Attachments */}
              {diary.link && (
                <div className="mt-3 space-y-2">
                  {(() => {
                    const url = diary.link;
                    const isImage = url.match(/\.(jpeg|jpg|png|gif)$/i);
                    const isPDF = url.match(/\.pdf$/i);
                    const isDrive = url.includes("drive.google.com");

                    if (isImage) {
                      return (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            📌 Click on the arrow in the top-right to download
                          </p>
                          <a
                            href={url}
                            target="_self"
                          >
                            <img
                              src={url}
                              alt="Attachment"
                              className="max-h-60 rounded shadow cursor-pointer hover:opacity-80"
                            />
                          </a>
                        </div>
                      );
                    } else if (isPDF) {
                      return (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            📌 Click on the arrow in the top-right to download
                          </p>
                          <a href={url} target="_self">
                            <iframe
                              src={url}
                              className="w-full h-60 rounded cursor-pointer"
                            ></iframe>
                          </a>
                        </div>
                      );
                    } else if (isDrive) {
                      return (
                        <div>
                          <p className="text-xs text-black animate-bounce mb-1" >
                            📌 Click on the arrow in the top-right to download
                          </p>
                          <a href={url} target="_self">
                            <iframe
                              src={url.replace(
                                "/view?usp=drive_link",
                                "/preview"
                              )}
                              className="w-full h-60 rounded cursor-pointer"
                            ></iframe>
                          </a>
                        </div>
                      );
                    } else {
                      return (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-600 hover:underline text-sm"
                        >
                          📎 Attachment
                        </a>
                      );
                    }
                  })()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
