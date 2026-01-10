import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import { GalleryPhoto } from "@/models/gallerySchema";
import cloudinary from "@/config/cloudinary";
await connect();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const heading = formData.get("Heading");
    const caption = formData.get("caption");
    const category = formData.get("category");
    const date = formData.get("date");
    const photos = formData.getAll("galleryPhotos");
    const photoUrls = [];

    for (const photo of photos) {
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "gallery_photos",
              resource_type: "image",
              use_filename: true,
              unique_filename: true,
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });
      photoUrls.push(uploadResult.secure_url);
    }
    const newGalleryPhoto = new GalleryPhoto({
      Heading: heading,
      caption: caption,
      category: category,
      date: date,
      photos: photoUrls,
    });
    await newGalleryPhoto.save();
    return NextResponse.json(newGalleryPhoto, { status: 201 });
  } catch (error) {
    console.error("Error uploading gallery photos:", error);
    return NextResponse.json(
      { error: "Failed to upload gallery photos" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const galleryPhotos = await GalleryPhoto.find().sort({ createdAt: -1 });
    return NextResponse.json(galleryPhotos, { status: 200 });
  } catch (error) {
    console.error("Error fetching gallery photos:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery photos" },
      { status: 500 }
    );
  }
}
