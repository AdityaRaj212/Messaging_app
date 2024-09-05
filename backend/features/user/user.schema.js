import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: Date.now
    },
    updatedAt: {
        type: String,
        default: Date.now
    },
    profile_img: {
        type: String
    },
    status: {
        type: String,
        default: 'Online'
    },
    bio: {
        type: String
    },
    lastSeen: {
        type: Date,
        default: Date.now
    }
});

export const UserModel = mongoose.model('User', UserSchema);