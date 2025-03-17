const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    librarian: { type: mongoose.Schema.Types.ObjectId, ref: 'Librarian' },
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, unique: true, required: true },
    category: { type: String },
    copiesAvailable: { type: Number, required: true },
    totalCopies: { type: Number, required: true },
    publishedYear: { type: Number },
    status: { type: String, enum: ['available', 'borrowed', 'reserved'], default: 'available' }
});

module.exports = mongoose.model('Book', BookSchema);
