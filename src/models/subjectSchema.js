import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  year:{
    type:String,
  },
  testType:{
    type:String
  }, 
  subjects: [
    {
      subjectName: {
        type: String,
        required: true,
      },
      totalMarks: {
        type: Number,
        required: true,
      },
    }
  ]
}, {
  timestamps: true
});

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
