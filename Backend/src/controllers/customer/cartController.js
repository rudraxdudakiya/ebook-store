const { addBookToCart, fetchCartOfUser } = require('../../services/customer/cartServices');

const keepBookToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookId = req.params.bookId;
        
        const response = await addBookToCart(userId, bookId);
        res.status(response.status).json({message: response.data});
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const getBooksFromCart = async(req, res) => {
    try {
        const userId = req.user.id;
        
        const response = await fetchCartOfUser(userId);
        res.status(response.status).json(response.data);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = { keepBookToCart, getBooksFromCart }