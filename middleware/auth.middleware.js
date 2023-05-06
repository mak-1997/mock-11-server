const jwt = require("jsonwebtoken");


const checkAuth = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
        const decoded = jwt.verify(token, "signature");
        if (decoded) {
            if (decoded) {
                req.body.userID = decoded.userID;
                req.body.isAdmin = decoded.isAdmin;
                next();
            }
        }
        else {
            res.status(400).send({ "msg": "Please Login first" });
        }
    }
    else {
        res.status(400).send({ "msg": "Please Login first" });
    }
}

module.exports = {checkAuth}