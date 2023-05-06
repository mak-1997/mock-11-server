const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema.Types;

const orderSchema = mongoose.Schema({
    // _id: ObjectId,
    user : { type: ObjectId, ref: 'User' },
    books : [{ type: ObjectId, ref: 'Book' }],
    totalAmount: Number
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = {OrderModel};