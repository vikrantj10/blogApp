const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async function(req, res, next) {
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (e) {
            return res.status(401).json({
                success: false,
                message: "Session expired, Please log in again!",
            });
        }
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "Please login to perform this action!",
        });
    }
};
