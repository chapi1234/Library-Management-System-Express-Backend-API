const mongoose = require('mongoose');

const BorrowRecordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date },
    status: { type: String, enum: ['borrowed', 'returned', 'overdue'], default: 'borrowed' },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Librarian', ref: 'Admin' }
});

module.exports = mongoose.model('BorrowRecord', BorrowRecordSchema);


