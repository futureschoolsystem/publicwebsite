import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import { BannerPhoto } from "@/models/mainPageBannerSchema";
import cloudinary from "@/config/cloudinary";
await connect();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const banner = formData.get("banner");

    if (!banner) {
      return NextResponse.json(
        { error: "Banner image is required" },
        { status: 400 }
      );
    }

    // 1. Find existing banner
    const existingBanner = await BannerPhoto.findOne({});

    // 2. Delete old image from Cloudinary
    if (existingBanner?.publicId) {
      await cloudinary.uploader.destroy(existingBanner.publicId);
    }

    //  3. Upload new image
    const bytes = await banner.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "main_banner",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    //  4. Save new banner
    const newBanner = await BannerPhoto.findOneAndUpdate(
      {},
      {
        photoUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      },
      { new: true, upsert: true }
    );

    return NextResponse.json(newBanner, { status: 201 });
  } catch (error) {
    console.error("Error uploading banner:", error);
    return NextResponse.json(
      { error: "Failed to upload banner" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bannerPhoto = await BannerPhoto.findOne();
    return NextResponse.json(bannerPhoto, { status: 200 });
  } catch (error) {
    console.error("Error fetching banner photo:", error);
    return NextResponse.json(
      { error: "Failed to fetch banner photo" },
      { status: 500 }
    );
  }
}
