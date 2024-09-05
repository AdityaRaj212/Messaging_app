import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    groupDescription: {
        type: String,
        default: "Group description"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    memberIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    groupIcon: {
        type: String
    }
});

GroupSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export const GroupModel = mongoose.model('Group', GroupSchema);