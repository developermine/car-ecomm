const mongoose = require('mongoose')

const Schema = mongoose.Schema

const OrderSchema = new Schema({
  products: {
    type: Object
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phone: {
    type: Number,
    required: true,
    
  },
  status: {
    type: String,
    default: 'processing'
  },
  paymentInfo:{
    status: {
        type: String,
    },
    type:{
        type: String,
    },
},
  total : {
    type: Number,
    default: 0
  },
  count: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    default: new Date().toISOString().split('T')[0]
  },
  address: {
    type: String,
    required: true,
  },
  delevery: {
    type: String,
  },
  vat: {
    type: String,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
  },
  state: {
    type: String,
    required: true,
  },
  lga: {
    type: String,
    required: true,
  }
}, {timestamps: true }, {minimize: false});


const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;