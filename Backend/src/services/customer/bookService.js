const Book = require('../../models/Book');

const fetchAllBooks = async () => {
    return await Book.find();
};

const fetchBookById = async (id) => {
    return await Book.find({ _id: id });
};

const searchBookByGenre = async (genre) => {
    return await Book.find({ genre: genre });
};

module.exports = {
    fetchAllBooks,
    fetchBookById,
    searchBookByGenre
}