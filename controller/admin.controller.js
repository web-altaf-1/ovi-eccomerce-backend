const Order = require("../model/Order");
const Product = require("../model/Product");
const User = require("../model/User");
const { getAdminAllOrdersServices } = require("../services/order.service");
const { getAllProductsService } = require("../services/product.service");
const { generateToken } = require("../utils/generateToken");

exports.makeLoginAdmin = async (req, res) => {
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
        if (user?.role === 'admin' || user?.role === 'super-admin') {
            const token = generateToken(user);
            return res.status(200).json({
                status: 1,
                message: "Successfully logged in",
                token,
                data: user,
            });
        } else {
            return res.status(401).json({
                status: 0,
                error: "You are not authorized!!!",
            });
        }
    } catch (error) {

    }
}

exports.getMe = async (req, res) => {
    try {
        const { email } = req.user;
        const result = await User.findOne({ email });
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
};
exports.getAllProductsForAdmin = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const data = await getAllProductsService(page, perPage);
        return res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            status: 0,
            error: error.message,
        });
    }
};
exports.getAdminProductDetails = async (req, res) => {
    try {
        const slug = req.params?.slug;
        const details = await Product.findOne({ slug });

        return res.status(200).json({
            status: 1,
            message: "Successfully get product details",
            data: details,
        });
    } catch (error) {
        res.status(400).json({
            status: 0,
            error: error.message,
        });
    }
};
exports.getAdminAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const orderId = req.query.orderId;
        const contact = req.query.contact;

        const orders = await getAdminAllOrdersServices(page, perPage, orderId,contact);
        return res.status(200).json({
            status: 1,
            message: "Successfully get product details",
            orders,
        });
    } catch (error) {
        res.status(400).json({
            status: 0,
            error: error.message,
        });
    }
};



exports.deleteOrderByOrderId = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findOneAndDelete({ orderId: id });
        if (!order) {
            return res.status(404).json({
                status: 0,
                message: "এই আইডি দিয়ে কোনো অর্ডার খুজে পাওয়া যায়নি",
            });
        }


        return res.status(200).json({
            status: 1,
            message: "successfully deleted order",
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            error: "দুঃখিত ! কোনো একটি সমস্যার কারনে অর্ডারটি নেওয়া যায়নি, কিছুক্ষন পর আবার চেষ্টা করুন ! ধন্যবাদ"
        });
    }
}
exports.getAdminOrderDetailsByOrderId = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const order = await Order.findOne({ orderId: id });
        if (!order) {
            return res.status(404).json({
                status: 0,
                message: "এই আইডি দিয়ে কোনো অর্ডার খুজে পাওয়া যায়নি",
            });
        }
        return res.status(200).json({
            status: 1,
            message: "successfully get order details",
            order
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            error: "দুঃখিত ! কোনো একটি সমস্যার কারনে অর্ডারটি নেওয়া যায়নি, কিছুক্ষন পর আবার চেষ্টা করুন ! ধন্যবাদ"
        });
    }
}