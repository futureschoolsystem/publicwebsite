import mongoose from "mongoose";

const dateSheetSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true
  },
  testType: {
    type: String,
    required: true
  },
  dateSheetType: {
    type: String,
    required: true
  },
  schedule: [
    {
      date: {
        type: Date,
        required: true
      },
      day: {
        type: String,
        required: true
      },
      papers: [
        {
          className: {
            type: String,
            required: true
          },
          subjectName: {
            type: String,
            required: true
          }
        }
      ]
    }
  ]
}, { timestamps: true });

export default mongoose.models.DateSheet || mongoose.model("DateSheet", dateSheetSchema);
