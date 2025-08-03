const  mongoose  = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    
    title: {
        type: String, 
        required: [true, "Title is Required"]
    },
    author: {
        type: String,
        required: [true, "Author is Required"]
    },
    description: {
        type: String,
        required: [true, "Description is Required"],
        maxlength: 100
    },
    price: {
        type: Number,
        required: [true, "Price is Required"],
        min: 0
    },
    genre: {
        type: String,
        required: [true, "Genre is Required"]
    },
    condition: {
        type: String,
        enum: ['New', 'Like New', 'Used - Good', 'used - Acceptable'],
        required: [true, "Condition is Required"]
    },
    edition: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: [true, "Image is Required"] 
    },    
    status: {
        type: String, 
        enum: ['Available', 'Sold Out'],
        default: 'Available',
    },
    
} ,{timestamps: true});


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
