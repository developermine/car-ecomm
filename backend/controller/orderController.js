const Order = require('../models/Order');
const User = require('../models/User');


//creating an order

const createOrder = async(req, res) => {
  const {userId, cart, state, lga, address, phone, totalPrice, make, model, image, delevery, vat, paymentInfo} = req.body;
  try {
    const user = await User.findById(userId);
    const order = await Order.create({owner: user._id, products: cart, state, lga, make, model, image, phone, delevery, vat, totalPrice, address, paymentInfo});
     order.count = cart.count;
     order.total = cart.total;
    await order.save();
    user.cart =  {total: 0, count: 0};
    user.orders.push(order);
    user.markModified('orders');
    await user.save();
    res.status(200).json(user)

  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(400).json({ error: 'validation error', details: e.error})
    } else {
      res.status(400).json({ error: 'Order failed', details: e.error})
    }
  }
}


// getting all orders;
const getAllOrder = async(req, res) => {
  try {
    const orders = await Order.find().populate('owner', ['email', 'firstname', 'lastname']);
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message)
  }
}

//shipping order

 const shipOrder = async(req, res)=> {
   const io = req.app.get('socketio');
   const {ownerId} = req.body;
   const {id} = req.params;
   try {
     const user = await User.findById(ownerId);
     await Order.findByIdAndUpdate(id, {status: 'shipped'});
     const orders = await Order.find().populate('owner', ['email', 'name']);
     const notification = {status: 'unread', message: `Order ${id} shipped with success`, time: new Date()};
     io.sockets.emit("notification", notification, ownerId);
     user.notifications.push(notification);
     await user.save();
     res.status(200).json(orders)
   } catch (e) {
     res.status(400).json(e.message);
   }
 }
module.exports = {
    createOrder,
    getAllOrder,
    shipOrder
}
