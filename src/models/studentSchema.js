import mongoose from "mongoose";
const studentSchema = new mongoose.Schema(
  {
    registrationNo: {
      type: String,
      unique:true,
    },
    name: {
      type: String,
    },
    fatherName: {
      type: String,
    },
    fatherCnic: {
      type: String,
    },
    studentCnic: {
      type: String, 
    },
    contact1: {
      type: String,
    },
    contact2: {
      type: String,
    },
    whatsapp:{
      type:String,
    },
    className: {
      type: String,
    },
    campusName: {
      type: String,
    },
    dateOfAdmission: {
      type: Date,
    },
    status:{
      type:String,
      default:"Active",
    },
    schoolLeavingDate:{
      type:Date,
    },
    admissionFee: {
      type: Number,
      default:0,
    },
    concessionType:{
      type:String,
      default:"",
    },
    monthlyFee: {
      type: Number,
    },
    paidFee: {
      type: Number,
      default:0,
    },
    previousSchoolAttended:{
      type:String,
    },
    medicalHistory:{
      type:String,
    },
    reference:{
      type:String,
    },
    monthlyRemainingPayableCharges: {
      type: Number,
      default: 0,
    },
    fullyPaid: {
      type: String,
      default:"Unpaid",
    },
    section:{
      type:String,
    },
    photo:{
    type:String,
    },
    dateOfBirth: {
      type: Date,
    },
    bloodGroup:{
      type:String,
    },
    gender: {
      type: String,
    },
    occupation:{
      type:String,
    },
    religion:{
      type:String,
    },
    address:{
      type:String,
    },
    familyNumber:{
      type:Number,
    },
    rollno:{
      type:Number,
    },
    remarks:{
      type:String,
    },
    feeRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fee" }],
    otherFeeChargesRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: "OtherFeePayment" }],
  },
  { timestamps: true }
);


const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
export default Student; 