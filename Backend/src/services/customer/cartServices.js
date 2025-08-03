const Order = require('../../models/Order');
const User = require('../../models/User');
const Book = require('../../models/Book');
const Cart = require('../../models/CartItem');

const addBookToCart = async (userId, bookId) => {
    const { ObjectId } = require('mongoose').Types;

    const userObjectId = ObjectId.createFromHexString(userId);
    const bookObjectId = ObjectId.createFromHexString(bookId);

    const activeOrder = await Order.findOne({ user: userObjectId, orderStatus: 'PENDING'}).populate('cartItem');

    if(!activeOrder) {
        console.log(userObjectId);
        return {status: 404, data: activeOrder}
    }

    if(activeOrder.cartItem.some(item => item.book.toString() == bookId)) {
        return {status: 409, data: 'Order already exist in your cart'}
    }

    const [book, user] = await Promise.all([
        Book.findById(bookId),
        User.findById(userObjectId)
    ])

    if(!book || !user) {
        console.log(bookObjectId);
        
        return {status:404, data: 'user or book not found'};
    }

    const savedCartItem = await new Cart({
        order: activeOrder,
        user,
        book,
        price: book.price,
        quentity: 1
    }).save();

    activeOrder.amount += book.price;
    activeOrder.cartItem.push(savedCartItem);

    await activeOrder.save();

    return {status: 201, data: "Book is added to cart !"};
};


const fetchCartOfUser = async (userId) => {
    const { ObjectId } = require('mongoose').Types;
    const userObjectId = ObjectId.createFromHexString(userId);
    
    const activeOrder = await Order.findOne({ user: userObjectId, orderStatus: 'PENDING'})
    .populate({
        path:'cartItem',
        populate: { path:'book' }
    });

    if(!activeOrder) {
        console.log(userObjectId);
        return {status: 404, data: "activeOrder not found"}
    }

    return {status: 200, data: activeOrder};
};

module.exports= { addBookToCart, fetchCartOfUser };