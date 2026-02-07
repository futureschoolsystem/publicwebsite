import mongoose from 'mongoose';

const resultPublishPermissionSchema = new mongoose.Schema({
    year: { type: String, required: true },
    testType: { type: String, required: true },
    stopFeeDefaultersResult: { type: Boolean, default: false },
})

const ResultPublishPermission = mongoose.models.ResultPublishPermission || mongoose.model('ResultPublishPermission',resultPublishPermissionSchema);
export default ResultPublishPermission;