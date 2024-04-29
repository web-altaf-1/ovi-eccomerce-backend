const Product = require("../model/Product");

exports.getAllProductsService = async (page, perPage) => {
    const products = await Product.find()
        .skip((page - 1) * perPage)
        .limit(perPage);


    const total = await Product.countDocuments();
    const totalPages = Math.ceil(total / perPage);


    return {
        products,
        pageInfo: {
            currentPage: page,
            totalPages,
            perPage,
            totalItems: total,
        },
    };
};