const Review = require('../models/Review');
const Book = require('../models/Book');
const user = require('../models/User');

exports.createReview = async (req, res) => {
    try {
        const { bookId, rating, comment } = req.body;
        const userId = req.user._id;

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const review = await Review.findOne({ bookId, userId });
        if (review) {
            return res.status(400).json({ message: 'You have already reviewed this book' });
        }

        const newReview = new Review({
            userId,
            bookId,
            rating,
            comment
        });

        await newReview.save();

        const reviews = await Review.find({ bookId });
        let totalRating = 0;
        reviews.forEach((review) => {
            totalRating += review.rating;
        });

        const averageRating = totalRating / reviews.length;
        book.averageRating = averageRating;
        await book.save();

        res.status(201).json({
            status: 'success',
            message: 'Review created',
            data: newReview
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}


exports.updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const userId = req.user._id;
        const reviewId = req.params.id;

        // Find the review by ID
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if the review belongs to the authenticated user
        if (review.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this review' });
        }

        // Update the review fields
        review.rating = rating !== undefined ? rating : review.rating;
        review.comment = comment !== undefined ? comment : review.comment;
        await review.save();

        // Recalculate the average rating for the book
        const reviews = await Review.find({ bookId: review.bookId });
        let totalRating = 0;
        reviews.forEach((review) => {
            totalRating += review.rating;
        });

        const averageRating = totalRating / reviews.length;
        const book = await Book.findById(review.bookId);
        book.averageRating = averageRating;
        await book.save();

        res.status(200).json({
            status: 'success',
            message: 'Review updated',
            data: review
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
};