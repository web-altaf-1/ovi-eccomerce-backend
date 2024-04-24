const Product = require("../model/Product");

exports.createNewProduct = async (req, res) => {
    try {
        const data = req.body;
        const newProduct = await Product.create(data);

        return res.status(200).json({
            status: 1,
            message: "Successfully create new product",
            data: newProduct
        });
    } catch (error) {
        res.status(400).json({
            status: 0,
            error: error.message,
        });
    }
}
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        return res.status(200).json({
            status: 1,
            message: "Successfully get all products",
            data: products
        });
    } catch (error) {
        res.status(400).json({
            status: 0,
            error: error.message,
        });
    }
}