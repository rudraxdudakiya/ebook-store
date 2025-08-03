const express = require('express');

const router = express.Router();

const { 
    authenticateJWT, 
    authorizeRole 
} = require('../../middleware/authMiddleware.js');

const {
    createbook,
    getAllBooks,
    getBookByid,
    deleteBook,
    updateBook,
    getBookByGenre
} = require('../../controllers/admin/bookController.js');

router.post('/',authenticateJWT, authorizeRole('ADMIN'), createbook);
router.get('/',authenticateJWT, authorizeRole('ADMIN'), getAllBooks);
router.get('/:id',authenticateJWT, authorizeRole('ADMIN'), getBookByid);
router.delete('/:id',authenticateJWT, authorizeRole('ADMIN'), deleteBook);
router.put('/:id',authenticateJWT, authorizeRole('ADMIN'), updateBook);
router.get('/search/:genre',authenticateJWT, authorizeRole('ADMIN'), getBookByGenre);

module.exports = router;