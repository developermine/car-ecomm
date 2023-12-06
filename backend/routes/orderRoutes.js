const router = require('express').Router();

const {
    createOrder,
    getAllOrder,
    shipOrder
} = require('../controller/orderController')

//creating an order

router.post('/', createOrder)
  
  
  // getting all orders;
  router.get('/', getAllOrder)
  
  
  //shipping order
  
 router.patch('/:id/mark-shipped', shipOrder)
  module.exports = router;