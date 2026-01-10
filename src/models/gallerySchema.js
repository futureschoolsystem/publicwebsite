import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  Heading: {
    type: String,
    required: true,
    },
    caption: {
    type: String,
    required: true,
    },
    category: {
    type: String,
    required: true,
    },
    date: {
    type: Date,
    required: true,
    },
    photos: [
    {
      type: String, // Assuming you store the file path or URL as a string
      required: true,
    }
    ],
}, { timestamps: true });  

export const GalleryPhoto=mongoose.models.GalleryPhoto || mongoose.model("GalleryPhoto", gallerySchema);