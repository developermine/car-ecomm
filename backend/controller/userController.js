const User = require('../models/User');
const Order = require('../models/Order')

// creating user
const signupUser = async(req, res)=> {
  try {
    const {firstname, lastname, phone, email, password, picture} = req.body;
    console.log(req.body);
    const user = await User.create({firstname, lastname, phone, email, password, picture});
    res.status(200).json(user);
  } catch (e) {
    let msg;
    if(e.code == 11000){
      msg = "User already exists"
    } else {
      msg = e.message;
    }
    console.log(e);
    res.status(400).json(msg)
  }
}

// login user

const loginUser = async(req, res)=> {
  try {
    const {email, password} = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = 'online';
    await user.save();
    res.status(200).json(user);
  } catch (e) {
      res.status(400).json(e.message)
  }
}


//get all user
const getUser = async (req, res) => {
    try {
        const users = await User.find({ isdmin: false}).populate('orders')
        res.json(users)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get user orders

const userOrder = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await User.findById(id).populate('orders');
    res.json(user.orders);
  } catch (e) {
    res.status(400).send(e.message);
  }
}




module.exports = {
    loginUser,
    signupUser,
    getUser,
    userOrder
}