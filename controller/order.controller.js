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
exports.updateOrderDownloadStatus = async (req, res) => {
    try {
        const orderId = req.params.id;

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId },
            { $set: { invoiceDownloaded: true } },
            { new: true }
        );
        if (!updatedOrder) {
            res.status(500).json({
                status: 0,
                error: "Could not found any order with this orderId"
            });
        }

        return res.status(200).json({
            status: 1,
            message: "অভিনন্দন ! আপনার অর্ডারটি সফলভাবে গ্রহন করা হয়েছে !!",
            data: updatedOrder
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            error: "দুঃখিত ! কোনো একটি সমস্যার কারনে অর্ডারটি নেওয়া যায়নি, কিছুক্ষন পর আবার চেষ্টা করুন ! ধন্যবাদ" // Generic error message
        });
    }
}
exports.getSingleOrderByOrderId = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findOne({ orderId: id });

        return res.status(200).json({
            status: 1,
            message: "অভিনন্দন ! আপনার অর্ডারটি সফলভাবে গ্রহন করা হয়েছে !!",
            order
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            error: "দুঃখিত ! কোনো একটি সমস্যার কারনে অর্ডারটি নেওয়া যায়নি, কিছুক্ষন পর আবার চেষ্টা করুন ! ধন্যবাদ" // Generic error message
        });
    }
}
exports.getOrderTrack = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findOne({ orderId: id });

        return res.status(200).json({
            status: 1,
            message: "successfully found order",
            order
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            error: "দুঃখিত ! কোনো একটি সমস্যার কারনে অর্ডারটি নেওয়া যায়নি, কিছুক্ষন পর আবার চেষ্টা করুন ! ধন্যবাদ"
        });
    }
}
exports.updateOrderStatus = async (req, res) => {
    try {
        const { currentStep, nextStep, orderId } = req.body;

        // Validate input data
        if (
            !orderId ||
            typeof currentStep !== 'number' ||
            typeof nextStep !== 'number'
        ) {
            return res.status(400).json({
                status: 0,
                error: 'Invalid input data. Ensure all required fields are provided and of correct type.',
            });
        }
        const stepMapping = {
            1: 'Pending',
            2: 'Confirmed',
            3: 'Processing',
            4: 'Shipped',
            5: 'Successful',
            6: 'Cancelled',
            7: 'Refunded',
            8: 'Returned',
            9: 'Failed',
        };
        if (!stepMapping[nextStep]) {
            return res.status(400).json({
                status: 0,
                error: 'Invalid next step value.',
            });
        }
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: orderId, currentStep: currentStep },
            {
                status: stepMapping[nextStep],
                currentStep: nextStep,
                [`statusHistory.${stepMapping[nextStep]}`]: { value: true, time: new Date() },
            },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({
                status: 0,
                error: 'Order not found or the current step does not match.',
            });
        }
        res.status(200).json({
            status: 1,
            message: 'Order status updated successfully.',
            order: updatedOrder,
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            error: "failed to update order status"
        });
    }
}

