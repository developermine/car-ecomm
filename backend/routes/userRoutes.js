const router = require('express').Router();
const {loginUser, signupUser, getUser, userOrder} =require('../controller/userController')

// creating user
router.post('/signup', signupUser);

// login user

router.post('/login', loginUser);


router.get('/', getUser);

// get user orders

router.get('/:id/orders', userOrder)


module.exports = router