const BorrowRecord = require('../models/BorrowRecord');
const Book = require('../models/Book');

exports.borrowBook = async (req, res) => {
    try {
        const { bookId, dueDate } = req.body;
        const userId = req.user._id;

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        if (book.copiesAvailable <= 0) {
            return res.status(400).json({ message: 'All the copies are borrowed' });
        }

        book.copiesAvailable -= 1;
        await book.save();

        // Create a new borrow record
        const newBorrowBook = new BorrowRecord({
            userId,
            bookId,
            dueDate
        });
        await newBorrowBook.save();

        res.status(201).json({
            status: 'success',
            message: 'Borrow book record created',
            data: newBorrowBook
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
};


exports.returnBook = async (req, res) => {
    try {
        const { borrowRecordId } = req.body;

        const borrowRecord = await BorrowRecord.findById(borrowRecordId);
        
        if (!borrowRecord) {
            return res.status(404).json({ message: 'Borrow record not found' });
        };

        const book = await Book.findById(borrowRecord.bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.copiesAvailable += 1;
        await book.save();

        borrowRecord.status = 'returned';
        borrowRecord.returnDate = Date.now();
        await borrowRecord.save();

        res.status(200).json({
            status: 'success',
            message: 'Book returned successfully',
            data: borrowRecord
        });
} catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}