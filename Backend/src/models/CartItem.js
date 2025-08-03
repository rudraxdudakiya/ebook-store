const  mongoose  = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema({
    price: {
        type: Number,
    },
    quentity: {
        type: Number,
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        default: null
    }
} ,{timestamps: true});


const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
