const express = require("express");
const {getOrders, postOrder} = require("../controllers/order.controller");
const {checkAuth} = require("../middleware/auth.middleware");

const orderRouter = express.Router();

orderRouter.get("/",checkAuth, getOrders);
orderRouter.post("/",checkAuth, postOrder);

module.exports = {orderRouter};