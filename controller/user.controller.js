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
                error: "দুঃখিত স্যার! এই ইমেইলে কোনো একাউন্ট খুজে পাওয়া যায় নি, সঠিক ইমেইল দিয়ে পুনরায় লগিন করুন !",
            });
        }
        if (user?.providerId === "firebase") {
            return res.status(401).json({
                status: 0,
                error: "এই ইমেইলটি গুগুল দিয়ে রেজিস্টার করা !", 
            });
        }
        const isValidPassword = user.comparePassword(password, user?.password);
        if (!isValidPassword) {
            return res.status(401).json({
                status: 0,
                error: "আপনার দেওয়া পাসওয়ার্ডটি সঠিক নয়, মনে করে পুনরায় চেষ্টা করুন !!",
            });
        }
        const token = generateToken(user);
        return res.status(200).json({
            status: 1,
            message: "অভিনন্দন ! সফলভাবে লগিন সম্পন্ন হয়েছে...!!",
            token,
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