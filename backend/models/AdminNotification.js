import mongoose from 'mongoose';

const adminNotificationSchema = new mongoose.Schema(
    {
        title: String,
        message: String,

        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },

        isRead: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

export default mongoose.model('AdminNotification', adminNotificationSchema);