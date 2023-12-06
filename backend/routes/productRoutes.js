const router = require('express').Router();
const {getProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct,
    getProductbyId,
    getProductCat,
    createCartProduct,
    addProductToCart,
    reduceProductCart,
    removeProdctCart,
   addProductToWishlist,
   removeProductFromWishlist

} = require('../controller/productController')

//get products;
router.get('/', getProducts)


//create product
router.post('/', createProduct)


// update product

router.patch('/:id', updateProduct)


// delete product

router.delete('/:id', deleteProduct)

// get product by id
router.get('/:id', getProductbyId)


//get product category
router.get('/makes/:make', getProductCat)


// cart routes

router.post('/add-to-cart', createCartProduct)


// adding more to cart
router.post('/increase-cart', addProductToCart);
// reducing cart
router.post('/decrease-cart', reduceProductCart);
// removing product from cart
router.post('/remove-from-cart', removeProdctCart);


router.post('/add-to-whishlist', addProductToWishlist);

router.post('/remove-from-whishlist', removeProductFromWishlist);




module.exports = router;