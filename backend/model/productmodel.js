const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pls Enter product name'],
        trim: true

    },
    Description: {
        type: String,
        required: [true, 'Pls Enter product Description'],

    },
    price: {
        type: Number,
        required: [true, 'Pls Enter product price']
    },
    ratings: {
        type: Number,
        default: 0
    },
    Images: [
        {
            Public_id: {
                type: String,
                required: true
            },
            Url: {
                type: String,
                required: true
            }
        }
    ],
    Category: {
        type: String,
        required: [true, 'plase enter product category'],

    },
    stock: {
        type: Number,
        required: [true, 'pls enter stock'],
        maxlength: [10, 'stock cannot exceed 10 charactres'],
    },

    NoofReview: {
        type: Number,
        default: 0

    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,

            },

            name: {
                type: String
                // required:true

            },
            rating: {
                type: Number
                // required:true
            },
            comment: {
                type: String
                // required:true
            }
        }
    ],
    createAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema)