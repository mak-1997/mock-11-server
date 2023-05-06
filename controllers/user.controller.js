const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userLogin = async (req, res) => {
    const { email, password, isAdmin } = req.body;
    try {
        let user = await UserModel.findOne({ email, isAdmin });
        if (!user) {
            res.status(400).send({ "msg": "No user found ! Please check your credentials" });
        }
        else {
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    res.status(201).send({ "token": jwt.sign({ "userID": user._id , isAdmin }, "signature") });
                }
                else {
                    res.status(400).send({ "msg": "Wrong Password !!" });
                }
            })
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }

}

const userRegister = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    try {
        let user = await UserModel.findOne({ email });
        if (!user) {
            bcrypt.hash(password, 3, async (error, hash) => {
                if (error) {
                    res.status(500).send({ "msg": error.message });
                }
                else {
                    let newUser = new UserModel({ name, email, password: hash, isAdmin });
                    await newUser.save();
                    res.status(201).send({ "msg": "User Registered Successfully" });
                }
            })
        }
        else {
            res.status(400).send({ "msg": "Email already exists" });
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
}

module.exports = { userLogin, userRegister }