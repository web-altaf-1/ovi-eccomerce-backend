const User = require("../model/User");
const { generateToken } = require("../utils/generateToken");

exports.signUpNewUser = async (req, res) => {
    try {
        const data = req.body;
        const { email } = data;
        const isAvailableUser = await User.findOne({ email });
        console.log(isAvailableUser);
        if (isAvailableUser) {
            return res.status(404).json({
                status: 0,
                error: "User already existed",
            });
        }
        const result = await User.create(data);
        const token = generateToken(result);
        res.status(200).json({
            status: 1,
            message: "Signup successful",
            token,
        });
    } catch (error) {
        res.status(400).json({
            status: 0,
            error: error.message,
        });
    }
}

exports.signInExistingUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                status: 0,
                error: "Please give your credentials",
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: 0,
                error: "No account found with this email",
            });
        }
        if (user?.providerId === "firebase") {
            return res.status(401).json({
                status: 0,
                error: "This email is registered by google",
            });
        }
        const isValidPassword = user.comparePassword(password, user?.password);
        if (!isValidPassword) {
            return res.status(401).json({
                status: 0,
                error: "Password not matched perfectly",
            });
        }
        const token = generateToken(user);
        return res.status(200).json({
            status: 1,
            message: "Successfully logged in",
            token,
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            status: 0,
            error: error.message,
        });
    }
}

exports.getMe = async (req, res) => {
    try {
        const { email } = req.user;
        const result = await User.findOne({ email }).select('-password');
        if (!result) {
            return res.status(400).json({
                status: 0,
                error: "Token is not verified",
            });
        }
        res.status(200).json({
            status: 1,
            message: "successfully get data",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: 0,
            error: error.message,
        });
    }
}