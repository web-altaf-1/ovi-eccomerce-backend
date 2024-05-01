const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

// Define a schema for product variants
const variantSchema = new Schema({
    image: { type: String, required: true },
    hasColor: { type: Boolean, default: false },
    color: {
        name: { type: String, required: false },
        hex: { type: String, required: false },
    },
    size: { type: String, default: '' },
    price: { type: Number, required: true },
    oldPrice: { type: Number, default: null },
    stock: { type: Number, required: true },
    status: { type: String, default: 'selling' },
});

// Define a schema for the product
const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    barCode: { type: String },
    averageRating: { type: Number, default: 0 },
    sku: { type: String },
    brand: { type: String },
    category: { type: String },
    tags: { type: [String] },
    slug: { type: String },
    createdAt: { type: Date, default: Date.now },
});

// Define a schema for the cart item
const cartItemSchema = new Schema({
    image: { type: String, required: true },
    hasColor: { type: Boolean, default: false },
    color: {
        name: { type: String, default: '' },
        hex: { type: String, default: '' },
    },
    size: { type: String, default: '' },
    price: { type: Number, required: true },
    oldPrice: { type: Number, default: null },
    stock: { type: Number, required: true },
    status: { type: String, default: 'selling' },
    product: productSchema, // Nested schema for product details
    quantity: { type: Number, required: true },
    weight: { type: Number }
});

const statusSchema = new Schema({
    value: { type: Boolean },
    time: { type: Date, default: Date.now },
});

// Define the schema for the order
const orderSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    bazar: { type: String, required: true },
    notes: { type: String, default: '' },
    orderId: {
        type: Number
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card', 'online'],
        required: true,
    },
    trackingSteps: {
        type: String,
        enum: ['Received', 'Processing', 'Shipped', 'Delivered'],
        default: 'Received'
    },

    currentStep: {
        type: Number,
        default: 1
    },
    statusHistory: {
        isReceived: statusSchema,
        isProcessing: statusSchema,
        isShipped: statusSchema,
        isDelivered: statusSchema,
        isCancel: statusSchema,
    },
    isCancel: {
        type: Boolean,
        default: false
    },
    invoiceDownloaded: {
        type: Boolean,
        default: false
    },
    cartItems: [cartItemSchema], // Array of cart items
}, { timestamps: true });

// Compile the model from the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
