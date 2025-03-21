const router = require('express').Router();
const bookController = require('../controllers/bookController');
const { verifyToken, verifyRole } = require('../auth/verifyToken');

router.get('/', verifyToken, bookController.getAllBooks);
router.get('/:id', verifyToken, verifyRole(['admin', 'librarian', 'member']), bookController.getBookById);
router.post('/', verifyToken, verifyRole(['admin', 'librarian']), bookController.createBook);
router.put('/:id', verifyToken, verifyRole(['admin', 'librarian']), bookController.updateBook);
router.delete('/:id', verifyToken, verifyRole(['admin']), bookController.deleteBook);

module.exports = router;