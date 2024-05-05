const Order = require("../model/Order");

exports.getAdminAllOrdersServices = async (page, perPage, orderId, contact) => {
    const query = {};

    const availableOrder = await Order.findOne({ orderId });
    if (availableOrder) {
        query.orderId = orderId;
    }
    if (contact) {
        query.contact = { $regex: ".*" + contact + ".*", $options: "i" };
    }

    const totalOrders = await Order.countDocuments(query); // Total count of filtered orders
    const totalPages = Math.ceil(totalOrders / perPage);

    const orders = await Order.find(query)
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
};