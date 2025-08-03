const express = require('express');
const router = express.Router();

const { authenticateJWT, authorizeRole } = require('../../middleware/authMiddleware.js');
const { makeOrder, fetchOrderByUser } = require('../../controllers/customer/orderController.js');

router.post('/',authenticateJWT, authorizeRole('CUSTOMER'), makeOrder);
router.get('/',authenticateJWT, authorizeRole('CUSTOMER'), fetchOrderByUser);

module.exports = router;