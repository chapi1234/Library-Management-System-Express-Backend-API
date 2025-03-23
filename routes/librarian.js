const router = require('express').Router();
const librarianController = require('../controllers/librarianController');
const { verifyToken, verifyRole } = require('../auth/verifyToken');

router.get('/profile', verifyToken, verifyRole(['librarian']), librarianController.getLibrarianProfile);
router.get('/', verifyToken, librarianController.getAllLibrarians);
router.get('/:id', verifyToken, librarianController.getLibrarianById);
router.put('/:id', verifyToken, verifyRole(['librarian', 'admin']), librarianController.updateLibrarian);
router.delete('/:id', verifyToken, verifyRole(['librarian', 'admin']), librarianController.deleteLibrarian);
router.get('/active', verifyToken, verifyRole(['librarian', 'admin']), librarianController.getActiveLibrarians);
router.get('/inactive', verifyToken,  verifyRole(['admin']), librarianController.getInactiveLibrarians);

module.exports = router;