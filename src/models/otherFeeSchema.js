import mongoose from 'mongoose';

const otherFeeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  feeType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  amount:{
    type: Number,
  },
  amountPaid: { 
    type: Number,
    required: true,
  },
  discountAmount:{
    type:Number,
    default:0,
  },
  paymentDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Paid', 'Unpaid'],
    default: 'Unpaid',
  }
}, { timestamps: true });

const OtherFeePayment = mongoose.models.OtherFeePayment || mongoose.model('OtherFeePayment',otherFeeSchema);
export default OtherFeePayment;