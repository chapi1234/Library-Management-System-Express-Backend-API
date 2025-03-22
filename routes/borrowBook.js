const router = require('express').Router();
const borrowBookController = require('../controllers/borrowBookController');
const { verifyToken, verifyRole } = require('../auth/verifyToken');

router.post('/borrow', verifyToken, verifyRole(['admin', 'librarian', 'member']), borrowBookController.borrowBook);
router.post('/return', verifyToken, verifyRole(['librarian', 'admin', 'member']), borrowBookController.returnBook);

module.exports = router;