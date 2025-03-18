const Book = require('../models/Book');
const Admin = require('../models/Admin');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        if (books.length === 0) return res.status(400).send("No Books found");

        res.status(201).json({
            status: "success",
            message: "All the books fetched successfully",
            data: books
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(400).send("Book not found");

        res.status(200).json({
            status: "success",
            message: "Book fetched successfully",
            data: book
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        });
    }
};

exports.createBook = async (req, res) => {
    try {
        const { title, author, isbn, category, copiesAvailable, totalCopies, publishedYear, status } = req.body;

        // Determine the role and set the appropriate field
        let bookData = {
            title,
            author,
            isbn,
            category,
            copiesAvailable,
            totalCopies,
            publishedYear,
            status
        };

        if (req.user.role === 'admin') {
            bookData.admin = req.user._id;
        } else if (req.user.role === 'librarian') {
            bookData.librarian = req.user._id;
        } else {
            return res.status(403).json({ message: 'Access denied' });
        }

        const newBook = new Book(bookData);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            status: "success",
            message: "Book updated successfully",
            data: updatedBook
        });
    } catch (err) {
        res.status(500).send("Failed to update the book info");
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(400).send("Book not found");

        res.status(200).json({
            status: "success",
            message: "Book deleted successfully",
            data: deletedBook
        });
    } catch (err) {
        res.status(500).send("Failed to delete the book");
    }
};