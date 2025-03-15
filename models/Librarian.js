const mongoose = require('mongoose');

const librarianSchema = new mongoose.Schema({
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
        value: 'librarian',
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
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    membershipStartDate: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save middleware to generate membershipID
librarianSchema.pre('save', async function(next) {
    const librarian = this;
    if (!librarian.isNew) return next();

    const lastLibrarian = await Librarian.findOne().sort({ createdAt: -1 });
    const lastMembershipID = lastLibrarian ? lastLibrarian.membershipID : null;

    let newMembershipNumber = '00001';
    if (lastMembershipID) {
        const lastNumber = parseInt(lastMembershipID.split('/')[1], 10);
        newMembershipNumber = (lastNumber + 1).toString().padStart(5, '0');
    }

    librarian.membershipID = `UGR/${newMembershipNumber}/16`;
    next();
});

const Librarian = mongoose.model('Librarian', librarianSchema);

module.exports = Librarian;