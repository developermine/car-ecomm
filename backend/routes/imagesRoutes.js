const router = require('express').Router();
const {deleteImage} = require('../controller/imageController')



router.delete('/:public_id', deleteImage) 


module.exports = router;