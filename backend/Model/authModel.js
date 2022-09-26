const mongoose = require("mongoose");


const Auth = new mongoose.Schema(
    {

        firstName: {
            type: String,
            required: true,
            trim: true
        },
        LastName: {
            type: String,
            required: true,
            trim: true
        },
        age: {
            type: Number,
            required: true,
            trim: true,
        },
        gender: {
            type: String,
            required: true,
            trim: true
        },
        address:{
            type: String,
            required: true,
            trim: true
        },
        country:{
            type: String,
            required: true,
            trim: true
        },
        state:{
            type: String,
            required: true,
            trim: true
        },
        district:{
            type: String,
            required: true,
            trim: true
        },
        city:{
            type: String,
            required: true,
            trim: true
        },email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        }, mobile: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            default: "user"
        },
        orders: {
            type: Array,
            default: []
        },
        cart: {
            type: Array,
            default: []
        },
        image: {
            type: Object,
            default: {
                url: "https://image.shutterstock.com/image-illustration/thin-line-black-camera-logo-600w-1418371295.jpg"
            }
        }
    },
    {
        collection: "users",
        timestamps: true
    }
)

module.exports = mongoose.model('Auth', Auth)