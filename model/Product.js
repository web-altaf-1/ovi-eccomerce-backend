const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    require: true
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String
  },

  barCode: {
    type: String,
    // required: true,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  sku: {
    type: String,
    // require: true,
  },
  brand: {
    type: String,
    // required: true,
  },
  category: {
    type: String,
  },

  tags: {
    type: [String],
    default: [],
  },
  variants: [
    {
      image: String,
      hasColor: {
        type: Boolean,
      },
      weight: {
        type: Number
      },
      color: Object,
      size: {
        type: String,
      },

      price: {
        type: Number,
      },
      oldPrice: {
        type: Number,
      },
      stock: {
        type: Number,
      },
      status: {
        type: String,
        default: "selling",
        enum: {
          values: ["selling", "outOfStock", "discontinued"],
          message: "{VALUE} can't be a status",
        },
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model using the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
