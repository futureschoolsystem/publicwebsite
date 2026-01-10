import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import { GalleryPhoto } from "@/models/gallerySchema";
import cloudinary from "@/config/cloudinary";

await connect();

export async function DELETE(request, { params }) {
  try {
    const { id } =await params;
    const galleryPhoto = await GalleryPhoto.findById(id);
    if (!galleryPhoto) {
      return NextResponse.json(
        { error: "Gallery photo not found" },
        { status: 404 }
      );
    }
    // Delete from Cloudinary
    for (const photoUrl of galleryPhoto.photos) {
      const publicId = photoUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(
        `gallery_photos/${publicId}`,
        { resource_type: "image" }
      );
    }

    await GalleryPhoto.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Gallery photo deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error deleting gallery photo:", error);
    return NextResponse.json(
      { error: "Failed to delete gallery photo" },
      { status: 500 }
    );
  }
}
