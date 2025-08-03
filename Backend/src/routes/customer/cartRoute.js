const express = require('express');
const router = express.Router();

const { authenticateJWT, authorizeRole } = require('../../middleware/authMiddleware.js');
const { keepBookToCart, getBooksFromCart } = require('../../controllers/customer/cartController.js');

router.post('/:bookId',authenticateJWT, authorizeRole('CUSTOMER'), keepBookToCart);
router.get('/',authenticateJWT, authorizeRole('CUSTOMER'), getBooksFromCart);

module.exports = router;