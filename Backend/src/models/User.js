const  mongoose  = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    
    email: {
        type: String, 
        required: true, 
        unique: true 
    },

    password: { 
        type: String, 
        required: true 
    },

    firstname: {
        type: String, 
        required: true 
    },

    lastname: { 
        type: String, 
        required: true 
    },

    role: { 
        type: String, 
        enum: [
            'CUSTOMER', 
            'ADMIN'
        ], default: 'CUSTOMER' 
    },
    
} ,{timesptamps: true});


const User = mongoose.model('User', userSchema);

module.exports = User;
