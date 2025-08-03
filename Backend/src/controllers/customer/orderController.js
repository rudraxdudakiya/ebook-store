const { placeOrder, getOrdersByUser } = require('../../services/customer/orderServices');

const makeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const {orderDescription, address} = res.body;
        
        const response = await placeOrder(userId, orderDescription, address);

        res.status(response.status).json({ order: response.data });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const fetchOrderByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const response = await getOrdersByUser(userId);

        res.status(response.status).json(response.data);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { makeOrder, fetchOrderByUser }