const mongoose = require('mongoose');

const FineSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    borrowRecordId: { type: mongoose.Schema.Types.ObjectId, ref: 'BorrowRecord', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' }
});

module.exports = mongoose.model('Fine', FineSchema);
