const express = require("express");
const connection = require("./config/db");
const cors = require('cors');
require('dotenv').config();
const {orderRouter} = require("./routes/order.route");
const {userRouter} = require("./routes/user.route");
const {bookRouter} = require("./routes/book.route");

const app = express();

app.options("*", cors());
app.use(express.json());
app.use(cors({origin : "*"}));

app.use("/", userRouter);
app.use("/books", bookRouter);
app.use("/order", orderRouter);

app.listen(process.env.port, async()=>{
    console.log(`server is running on port ${process.env.port} `)
    try {
        await connection;
        console.log('connected to the database');
    } catch (error) {
        console.log(error);
    }
})

