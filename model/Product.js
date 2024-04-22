const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: true, 
  },
  category: {
    type: String,
    required: true, 
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  tags: {
    type: [String],
    default: [], 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

// Create a model using the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
