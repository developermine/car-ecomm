const cloudinary = require('cloudinary');
const router = require('../routes/imagesRoutes');
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.NAME,
    api_key: process.env.KEY,
    api_secret: process.env.SECT
})

const deleteImage = async(req, res) => {
    const {public_id} = req.params;
  try {
      await cloudinary.uploader.destroy(public_id);
      res.status(200).send();
  } catch (e) {
      res.status(400).send(e.message)
  }
}

module.exports ={
    deleteImage
}