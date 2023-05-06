const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema.Types;

const bookSchema = mongoose.Schema({
    // _id: ObjectId,
    title: String,
    author: String,
    category: String,
    price: Number,
    quantity: Number
});

const BookModel = mongoose.model("book", bookSchema);

module.exports = {BookModel};