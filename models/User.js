const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'librarian', 'member'],
        default: 'member',
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male',
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    membershipID: {
        type: String,
        unique: true
    },
    membershipType: {
        type: String,
        enum: ['free plan', 'premium'],
        default: 'free plan',
    },
    membershipStartDate: {
        type: Date,
        default: Date.now,
    },
    otp: { type: String },
    otpExpires: { type: Date },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save middleware to generate membershipID
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isNew) return next();

    const lastUser = await User.findOne().sort({ createdAt: -1 });
    const lastMembershipID = lastUser ? lastUser.membershipID : null;

    let newMembershipNumber = '00001';
    if (lastMembershipID) {
        const lastNumber = parseInt(lastMembershipID.split('/')[1], 10);
        newMembershipNumber = (lastNumber + 1).toString().padStart(5, '0');
    }

    user.membershipID = `UGR/${newMembershipNumber}/15`;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;