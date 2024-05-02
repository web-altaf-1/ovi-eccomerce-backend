const Order = require("../model/Order");

exports.getAdminAllOrdersServices = async (page, perPage) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalPages = Math.ceil(totalOrders / perPage);

        const orders = await Order.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage);

        return {
            orders,
            pageInfo: {
                currentPage: page,
                totalPages,
                perPage,
                totalItems: totalOrders,
            },
        };
    } catch (error) {
        res.status(400).json({ error: "Failed to load orders" });
    }
};