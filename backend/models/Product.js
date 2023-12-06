const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    makes: [
      {
        make: String,
        models: [String],
      },
    ],

    trim: {
      type: String,
      required: [true, "can't be blank"],
    },

    drivetrain: {
      type: String,
      required: [true, "can't be blank"],
    },

    cylinder: {
      type: Number,
      required: [true, "can't be blank"],
    },

    color: {
      type: String,
      required: [true, "can't be blank"],
    },

    transmission: {
      type: String,
      required: [true, "can't be blank"],
    },

    style: {
      type: String,
     
    },

    fuel: { 
      type: String,
      
    },

    body: {
      type: String,
      required: [true, "can't be blank"],
    },

    description: {
      type: String,
      required: [true, "can't be blank"],
    },

    year: {
      type: Number,
      required: [true, "can't be blank"],
    },
    price: {
      type: Number,
      required: [true, "can't be blank"],
    },

    locations: [
      {
        State: String,
        lga: [String],
      },
    ],
    mileage: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: [true, "Please enter your product stock!"],
    },
    pictures: {
      type: Array,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { minimize: false }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
