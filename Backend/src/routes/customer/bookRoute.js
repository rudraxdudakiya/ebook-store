const express = require('express');

const router = express.Router();

const { 
    authenticateJWT, 
    authorizeRole 
} = require('../../middleware/authMiddleware.js');

const {
    getAllBooks,
    getBookByid,
    getBookByGenre
} = require('../../controllers/customer/bookController.js');

router.get('/',authenticateJWT, authorizeRole('CUSTOMER'), getAllBooks);
router.get('/:id',authenticateJWT, authorizeRole('CUSTOMER'), getBookByid);
router.get('/search/:genre',authenticateJWT, authorizeRole('CUSTOMER'), getBookByGenre);

module.exports = router;