import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  marks_obtained: {
    type: String,
    default:""
  },
  totalMarks:{
    type:Number,
  }
});

const studentMarksSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
    index: true
  },
  testType:{
    type:String,
    required:true,
  },
  testResults: {
    type: [testSchema],
    default: []
  },
  year:{
    type:Number,
    required:true,
    default:new Date().getFullYear()
  },
  daysAttended:{
    type:String,
    default:"0"
  }
}, {
  timestamps: true
});

const StudentMarks = mongoose.models.StudentMarks || mongoose.model('StudentMarks', studentMarksSchema) ;
export default StudentMarks;