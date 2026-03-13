import mongoose from 'mongoose';

const dateSheetPublishPermissionSchema = new mongoose.Schema({
    year: { type: String, required: true },
    testType: { type: String, required: true },
    dateSheetType: { type: String, required: true },
})

const DateSheetPublishPermission = mongoose.models.DateSheetPublishPermission || mongoose.model('DateSheetPublishPermission',dateSheetPublishPermissionSchema);
export default DateSheetPublishPermission;