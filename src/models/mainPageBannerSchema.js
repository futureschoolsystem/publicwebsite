import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    photoUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const BannerPhoto =
  mongoose.models.BannerPhoto ||
  mongoose.model("BannerPhoto", bannerSchema);
