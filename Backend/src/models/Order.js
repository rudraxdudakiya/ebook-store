const  mongoose  = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderDescription: {
        type: String,
    },
    amount: {
        type: Number,
    },
    address: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['PENDING', 'PLACED', 'DELEVERED']
    },
    tracking: {
        type: String,
        default: () => require('uuid').v4()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartItem: [{
        type: Schema.Types.ObjectId,
        ref: 'CartItem',
    }]
} ,{timestamps: true});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
