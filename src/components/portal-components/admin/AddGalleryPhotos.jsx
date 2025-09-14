"use client";
import { useState } from "react";
import { Upload } from "lucide-react";
import FilePreview from "@/components/portal-components/admin/file-preview";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function AddGalleryPhotos() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    Heading: "",
    caption: "",
  });

  const [files, setFiles] = useState({
    galleryPhotos: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles({ ...files, [name]: [...selectedFiles] });
  };

  const removeFile = (category, index) => {
    const updatedFiles = files[category].filter((_, i) => i !== index);
    setFiles({ ...files, [category]: updatedFiles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    files.galleryPhotos.forEach((file) => data.append("galleryPhotos", file));

    try {
      const res = await fetch("/api/admin/gallery-photos", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      setFormData({
        Heading: "",
        caption: "",
      });
      setFiles({
        galleryPhotos: [],
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-8">
        <h1 className={`${poppins.className} text-3xl font-bold text-foreground mb-2`}>
          Add Gallery Photos
        </h1>
        <p className={`${poppins.className} text-muted-foreground`}>
          Upload images to your school gallery
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label>Gallery Photos</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors">
            <input
              type="file"
              name="galleryPhotos"
              multiple
              accept=".jpg,.jpeg,.png,.webp,.gif"
              onChange={handleFileChange}
              className="hidden"
              id="galleryPhotos"
            />
            <label htmlFor="galleryPhotos" className="cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click to upload gallery photos
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                You can select multiple images
              </p>
            </label>
          </div>
          {files.galleryPhotos.length > 0 && (
            <div className="space-y-2">
              {files.galleryPhotos.map((file, index) => (
                <FilePreview
                  key={index}
                  file={file}
                  onRemove={() => removeFile("galleryPhotos", index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label>Heading</Label>
          <input
            type="text"
            name="Heading"
            value={formData.Heading}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="space-y-3">
          <Label>Caption</Label>
          <input
            type="text"
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div className="flex justify-center">
          <Button type="submit" size="lg" className="w-full md:w-auto px-8">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
                Uploading...
              </div>
            ) : (
              "Upload Gallery Photos"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}