const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String,
    category:String,
    price:Number,
    brand : String,
    userID : String
})

module.exports= mongoose.model('products',productSchema);