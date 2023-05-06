const { OrderModel } = require("../models/order.model");
const { BookModel } = require("../models/book.model");
const { UserModel } = require("../models/user.model");

const getOrders = async (req, res) => {
    const { isAdmin } = req.body;
    if (isAdmin) {
        try {
            let orders = await OrderModel.find();
            let finalArr = orders.map(async (elem) => {
                elem.user = await UserModel.findById({ _id: elem.type });
                elem.books = elem.books.map(async (e) => {
                    await BookModel.findOne({ _id: e.type });
                })
            })
            res.status(200).send(finalArr);
        } catch (error) {
            res.status(400).send({ "msg": error.message });
        }
    }
}

const postOrder = async (req, res) => {
    const { userID, _id, totalAmount, isAdmin } = req.body;

    try {
        let newOrder = new OrderModel({ user: userID, books: _id, totalAmount });
        await newOrder.save();
        // newOrder.books.push(bookID);
        // await newOrder.save();
        res.status(201).send({ "msg": "Your order has been placed" });
    } catch (error) {
        res.status(201).send({ "msg": error.message });
    }
}



module.exports = { getOrders, postOrder }