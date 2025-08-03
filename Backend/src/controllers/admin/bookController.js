const  {
    postBook,
    fetchAllBooks,
    fetchBookById,
    removeBook,
    modifyBook,
    searchBookByGenre
} = require('../../services/admin/bookService');

const createbook = async (req, res) => {
    try {
        const newBook = await postBook(req.body);
        res.status(201).json({ message: 'New Book Posted', body: newBook });
    }
    catch(error) {
        res.status(400).json({ error: error.message });
    }
};

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

const deleteBook = async (req, res) => {
    try {
        const deleteBook = await fetchBookById(req.params.id);
        const deletedBook = await removeBook(req.params.id);
        if(!deletedBook) res.status(404).json({ message: 'book not found' });

        res.status(200).json({ deleteBook, message: 'Book is now removed successfully' });
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const oldBook = await fetchBookById(req.params.id);
        const modifiedBook = await modifyBook(req.params.id, req.body);
        if(!modifiedBook) res.status(404).json({ message: 'book not found' });

        res.status(200).json({ oldBook, message: 'Book is now Modified successfully', modifiedBook });
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const getBookByGenre = async (req, res) => {
    try {
        const books = await searchBookByGenre(req.params.genre);
        res.status(200).json( books );
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createbook,
    getAllBooks,
    getBookByid,
    deleteBook,
    updateBook,
    getBookByGenre
}