const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require("validator")
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
// Here we will encrpyt the password before sending it into database(Mongodb)
const jwt = require("jsonwebtoken")
const OrderSchema = new Schema({
    shippinginfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pinCode: {
            type: String,
            required: true
        },
        PhoneNo: {
            type: String,
            required: true
        }
    },
    OrderItems: [
        {


            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: Number,
                required: true
            },
            product: {
                type: moongoes.Schema.ObjectId,
                ref: "Product",
                required: true
            }

        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    paymentInfo: {
        id: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        
    },
    paidAt: {
        type: Date,
        required: true
    },
    ItemsPrice: {
        type: Number,
        default: 0
    },
    TaxPrice: {
        type: Number,
        default: 0
    },
    ShippingPrice: {
        type: Number,
        default: 0
    },
    TotalPrice: {
        type: Number,
        default: 0
    },
    OrderStatus: {
        type: String,
        required: true,
        default: "Processing"
    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("Order", OrderSchema);
