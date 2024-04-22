const jwt = require("jsonwebtoken");
const User = require("../model/User");

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1];
        if (!token) {
            return res.status(403).json({
                status: 0,
                error: "Token not found",
            });
        }

        try {
            let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            if (!decoded?.email) {
                return res.status(400).json({
                    status: 0,
                    error: "Token is invalid",
                });
            }
            const user = await User.findOne({ email: decoded?.email });
            if (user) {
                req.user = user;
            } else if (!user) {
                return res.status(400).json({
                    status: 0,
                    error: "Something went wrong",
                });
            }
            next();
        } catch (err) {
            return res.status(400).json({
                status: 0,
                error: "Token is invalid",
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: 0,
            error: "Something went wrong!",
        });
    }
};