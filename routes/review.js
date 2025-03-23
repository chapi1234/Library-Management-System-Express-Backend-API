const router = require('express').Router();
const reviewController = require('../controllers/reviewController');
const { verifyToken, verifyRole } = require('../auth/verifyToken');

router.post('/create',verifyToken, verifyRole(['member', 'librarian', 'admin']), reviewController.createReview);
router.put('/:id',verifyToken, verifyRole(['member', 'librarian', 'admin']), reviewController.updateReview);

module.exports = router;