const Order = require('../../models/Order');
const User = require('../../models/User');

const placeOrder = async (userId, description, userAddress) => {
    const { ObjectId } = require('mongoose').Types;

    const userObjectId = ObjectId.createFromHexString(userId);

    const activeOrder = await Order.findOne({ user: userObjectId, orderStatus: 'PENDING'}).populate('cartItem');
    const user = await User.findById(userId);

    if(!activeOrder || !user) {        
        return {status:404, data: 'user or order not found'};
    }

    activeOrder.orderStatus = "PLACED";
    activeOrder.orderDescription = description;
    activeOrder.address = userAddress;

    await activeOrder.save();

    const order = new Order({
        amount: 0,
        address: 'default address',
        orderStatus: 'PENDING',
        user: user
    });

    await order.save();


    console.log('Order Pending:', order);    
    return {status: 200, data: activeOrder};
};

const getOrdersByUser = async (userId) => {
    const { ObjectId } = require('mongoose').Types;

    const userObjectId = ObjectId.createFromHexString(userId);

    const orders = await Order.find({ user: userObjectId });

    if(orders.length < 0) {        
        return {status:404, data: 'Orders not found'};
    }

    return {status: 200, data: orders};
};


module.exports= { placeOrder, getOrdersByUser };