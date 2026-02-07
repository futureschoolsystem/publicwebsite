"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Downloads() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);
  const { data: session, status } = useSession();

  // Download file - uses proxy for raw resources, direct URL for images/videos
  async function downloadFile(item, filename) {
    try {
      setDownloading(item._id);

      let url;
      if (item.resourceType === "raw") {
        // Raw resources need proxy (Cloudinary blocks unsigned raw access)
        url = `/api/file-proxy/${item._id}?action=download`;
      } else {
        // Images/videos - use direct Cloudinary URL
        url = item.link;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch file");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
      window.open(item.link, "_blank");
    } finally {
      setDownloading(null);
    }
  }

  // Detect file type from stored data
  function getFileInfo(item) {
    const url = item.link || "";
    const format = (item.format || "").toLowerCase();
    const originalFilename = item.originalFilename || "";

    // Get extension: format field > originalFilename > URL
    let ext = format;
    if (!ext && originalFilename) {
      const parts = originalFilename.split(".");
      if (parts.length > 1) ext = parts.pop().toLowerCase();
    }
    if (!ext && url) {
      const match = url.split("?")[0].match(/\.([a-z0-9]+)$/i);
      if (match) ext = match[1].toLowerCase();
    }

    let fileType = "unknown";
    let icon = "📄";

    // PDF first (before image check)
    if (ext === "pdf") {
      fileType = "pdf";
      icon = "📕";
    } else if (/^(jpe?g|png|gif|webp|svg|bmp|tiff?)$/i.test(ext)) {
      fileType = "image";
      icon = "🖼️";
    } else if (/^(mp4|webm|mov|avi|mkv|flv|wmv)$/i.test(ext)) {
      fileType = "video";
      icon = "🎥";
    } else if (/^(docx?|odt|rtf)$/i.test(ext)) {
      fileType = "document";
      icon = "📝";
    } else if (/^(xlsx?|csv|ods)$/i.test(ext)) {
      fileType = "spreadsheet";
      icon = "📊";
    } else if (/^(pptx?|odp)$/i.test(ext)) {
      fileType = "presentation";
      icon = "📊";
    }

    return { fileType, icon, ext };
  }

  useEffect(() => {
    async function fetchDownloads() {
      if (status !== "authenticated") return;

      try {
        const res = await fetch(
          `/api/student/downloads/${session.user.registrationNo}`
        );
        const data = await res.json();
        if (data.success && Array.isArray(data.downloads)) {
          setDownloads(data.downloads);
        } else {
          setDownloads([]);
        }
      } catch (error) {
        console.error("Error fetching downloads:", error);
        setDownloads([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDownloads();
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
      <h2 className="text-2xl font-bold mb-4">📘 Available Downloads</h2>

      {!downloads.length ? (
        <p className="text-gray-500">No Data found.</p>
      ) : (
        <div className="space-y-4">
          {downloads.map((item) => {
            const { fileType, icon, ext } = getFileInfo(item);
            const filename =
              item.originalFilename ||
              `${(item.heading || "file").replace(/[^a-z0-9]/gi, "_")}.${ext || "file"}`;

            return (
              <div
                key={item._id}
                className="p-4 border rounded-lg shadow bg-white"
              >
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {icon} {ext ? ext.toUpperCase() : fileType.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mt-2">{item.heading}</h3>

                {item.originalFilename && (
                  <p className="text-xs text-gray-500 mt-1">
                    📎 {item.originalFilename}
                  </p>
                )}

                {item.link && (
                  <div className="mt-3 space-y-2">
                    {/* IMAGE preview - direct Cloudinary URL */}
                    {fileType === "image" && (
                      <img
                        src={item.link}
                        alt={item.heading}
                        className="max-h-60 rounded shadow cursor-pointer hover:opacity-90"
                        onClick={() => window.open(item.link, "_blank")}
                      />
                    )}

                    {/* VIDEO preview - direct Cloudinary URL */}
                    {fileType === "video" && (
                      <video
                        src={item.link}
                        controls
                        className="max-h-60 rounded shadow w-full"
                      />
                    )}

                    {/* PDF - View via proxy (bypasses Cloudinary raw auth) */}
                    {fileType === "pdf" && (
                      <button
                        onClick={() =>
                          window.open(
                            `/api/file-proxy/${item._id}?action=view`,
                            "_blank"
                          )
                        }
                        className="inline-flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded shadow text-sm hover:bg-blue-600"
                      >
                        👁️ View PDF
                      </button>
                    )}

                    {/* Other file types */}
                    {fileType !== "image" &&
                      fileType !== "video" &&
                      fileType !== "pdf" && (
                        <div className="p-3 bg-gray-50 rounded border border-gray-200 text-sm text-gray-600">
                          {icon}{" "}
                          {fileType === "unknown"
                            ? "File"
                            : fileType.charAt(0).toUpperCase() +
                              fileType.slice(1)}{" "}
                          attachment available
                        </div>
                      )}

                    {/* Download button */}
                    <button
                      onClick={() => downloadFile(item, filename)}
                      disabled={downloading === item._id}
                      className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded shadow text-sm hover:bg-gray-50 transition disabled:opacity-50"
                    >
                      {downloading === item._id
                        ? "⏳ Downloading..."
                        : `⬇️ Download ${ext ? ext.toUpperCase() : "File"}`}
                    </button>
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
