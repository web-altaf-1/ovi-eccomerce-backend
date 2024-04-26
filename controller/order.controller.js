const Order = require("../model/Order");
const generateInvoiceId = async () => {
    const min = 100000;
    const max = 999999;

    let invoiceId = Math.floor(Math.random() * (max - min + 1)) + min;

    const existingOrder = await Order.findOne({ invoiceId });
    if (existingOrder) {
        return generateInvoiceId();
    }
    return invoiceId;
};

exports.createNewOrder = async (req, res) => {
    try {
        const orderId = await generateInvoiceId()
        const orderData = { ...req.body, orderId };
        const cartItem = orderData?.cartItems;


        const order = await Order.create(orderData);

        return res.status(200).json({
            status: 1,
            message: "অভিনন্দন ! আপনার অর্ডারটি সফলভাবে গ্রহন করা হয়েছে !!",
            orderId: order?.orderId
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            error: "দুঃখিত ! কোনো একটি সমস্যার কারনে অর্ডারটি নেওয়া যায়নি, কিছুক্ষন পর আবার চেষ্টা করুন ! ধন্যবাদ" // Generic error message
        });
    }
}