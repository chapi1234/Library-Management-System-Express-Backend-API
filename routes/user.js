const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifyToken, verifyRole } = require('../auth/verifyToken');

router.get('/profile', verifyToken, verifyRole(['member', 'admin']), userController.getUserProfile);
router.get('/', verifyToken, verifyRole(['admin']), userController.getAllUsers);
router.get('/:id', verifyToken, verifyRole(['member','librarian', 'admin']), userController.getUserById);
router.put('/delete', verifyToken, verifyRole(['member']), userController.updateUser);
router.delete('/:id', verifyToken, verifyRole(['member']), userController.deleteUser);

module.exports = router;