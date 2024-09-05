import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        default: null
    },
    messageText: {
        type: String,
        required: true
    },
    messageType: {
        type: String,
        enum: ['group', 'direct'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['Not Seen', 'Seen'],
        default: 'Not Seen'
    },
    seen_at: {
        type: Date,
        default: null
    }
});

export const MessageModel = mongoose.model('Message', MessageSchema);