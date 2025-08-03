const Book = require('../../models/Book');

const postBook = async (bookData) => {
    const newBook = new Book(bookData);
    await newBook.save();
    return newBook;
};

const fetchAllBooks = async () => {
    return await Book.find();
};


const fetchBookById = async (id) => {
    return await Book.find({ _id: id });
};


const removeBook = async (id) => {
    return await Book.findByIdAndDelete({ _id: id });
};


const modifyBook = async (id, bookData) => {
    return await Book.findByIdAndUpdate(id , bookData, { new: true });
};


const searchBookByGenre = async (gnr) => {
    return await Book.find({ genre: gnr });
};

module.exports = {
    postBook,
    fetchAllBooks,
    fetchBookById,
    removeBook,
    modifyBook,
    searchBookByGenre
}