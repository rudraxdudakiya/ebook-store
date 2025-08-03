const  {
    fetchAllBooks,
    fetchBookById,
    searchBookByGenre
} = require('../../services/customer/bookService');

const getAllBooks = async (req, res) => {
    try {
        const availableBooks = await fetchAllBooks();
        if(!availableBooks) req.status(404).json({ message: 'as of now no books are there in store' });

        res.status(200).json({ availableBooks });
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const getBookByid = async (req, res) => {
    try {
        const book = await fetchBookById(req.params.id);
        if(!book) res.status(404).json({ message: 'book not found' });

        res.status(200).json({ book });
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const getBookByGenre = async (req, res) => {
    try {
        const books = await searchBookByGenre(req.params.genre);
        if(!books) res.status(404).json({ message: 'book not found' });

        res.status(200).json({ books });
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllBooks,
    getBookByid,
    getBookByGenre
}