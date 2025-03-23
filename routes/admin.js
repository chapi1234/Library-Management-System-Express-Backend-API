const router = require('express').Router();
const adminController = require('../controllers/adminController')
const { verifyToken, verifyRole } = require('../auth/verifyToken');

router.get('/profile', verifyToken, verifyRole(['admin']), adminController.getUserProfile);
router.get('/', verifyToken, verifyRole(['admin']), adminController.getAllAdmins);
router.get('/:id', verifyToken,verifyRole(['admin']), adminController.getAdminById);
router.delete('/:id', verifyToken,verifyRole(['admin']), adminController.deleteAdmin);
router.put('/:id', verifyToken,verifyRole(['admin']), adminController.updateAdmin);
router.put('/approve-librarian/:id',verifyRole(['admin']), verifyToken, adminController.approveLibrarian);

module.exports = router;