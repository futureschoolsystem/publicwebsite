"use client";
import { useState } from "react";
import { Upload } from "lucide-react";
import FilePreview from "@/components/portal-components/admin/file-preview";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Poppins } from "next/font/google";
import axios from "axios";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function MainPageBanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState({
    banner: [],
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFile((prev) => ({
      ...prev,
      [name]: Array.from(files),
    }));
  };

  const removeFile = (category, index) => {
    setFile((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      if (file.banner.length > 0) {
        formData.append("banner", file.banner[0]);
      }

      await axios.post("/api/admin/main-page-banner", formData);

      setFile({ banner: [] });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-8">
        <h1
          className={`${poppins.className} text-3xl font-bold text-foreground`}
        >
          Update Banner
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label>Upload Banner</Label>

          <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary transition">
            <input
              type="file"
              name="banner"
              accept=".jpg,.jpeg,.png,.webp,.gif"
              onChange={handleFileChange}
              className="hidden"
              id="banner"
            />
            <label htmlFor="banner" className="cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click to upload banner image
              </p>
            </label>
          </div>

          {file.banner.length > 0 && (
            <FilePreview
              file={file.banner[0]}
              onRemove={() => removeFile("banner", 0)}
            />
          )}
        </div>

        <Button type="submit" size="lg" className="w-full md:w-auto px-8">
          {isLoading ? "Uploading..." : "Update Banner"}
        </Button>
      </form>
    </div>
  );
}
