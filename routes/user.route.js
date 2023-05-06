const express = require("express");
const { userLogin, userRegister } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);

module.exports = {userRouter};