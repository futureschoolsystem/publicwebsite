import mongoose from "mongoose";
const noticeDownloadsDairySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "Notices",
        "DailyDairy",
        "Downloads",
      ],
      required: true,
    },
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
    },
    resourceType: {
      type: String,
    },
    format: {
      type: String,
    },
    originalFilename: {
      type: String,
    },
    date: {
      type: String, 
      required: true,
    },
    campusName: {
      type: String,
      required: true,
      trim: true,
    },
    className: {
      type: String,
      required: true,
      trim: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.NoticeDownloadDairy ||
  mongoose.model("NoticeDownloadDairy", noticeDownloadsDairySchema);