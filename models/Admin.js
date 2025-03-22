const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
        value: 'admin'
    },
    gender: {
        type: String,
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
adminSchema.pre('save', async function(next) {
    const admin = this;
    if (!admin.isNew) return next();

    const lastAdmin = await Admin.findOne().sort({ createdAt: -1 });
    const lastMembershipID = lastAdmin ? lastAdmin.membershipID : null;

    let newMembershipNumber = '00001';
    if (lastMembershipID) {
        const lastNumber = parseInt(lastMembershipID.split('/')[1], 10);
        newMembershipNumber = (lastNumber + 1).toString().padStart(5, '0');
    }

    admin.membershipID = `UGR/${newMembershipNumber}/14`;
    next();
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;