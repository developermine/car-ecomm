const Product = require("../models/Product");
const User = require("../models/User");

//get products

const getProducts = async (req, res) => {
  try {
    const sort = { _id: -1 };
    const products = await Product.find().sort(sort);
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// create a products
const createProduct = async (req, res) => {
  try {
    const {
      trim,
      drivetrain,
      cylinder,
      color,
      transmission,
      style,
      fuel,
      body,
      models,
      description,
      year,
      condition,
      locations,
      locals,
      mileage,
      price,
      makes,
      stock,
      images: pictures,
    } = req.body;
    const product = await Product.create({
      trim,
      drivetrain,
      cylinder,
      color,
      transmission,
      style,
      fuel,
      body,
      models,
      description,
      year,
      condition,
      locations,
      locals,
      mileage,
      price,
      makes,
      stock,
      pictures,
    });
    const products = await Product.find();
    res.status(201).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

//update products

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      trim,
      drivetrain,
      cylinder,
      color,
      transmission,
      style,
      fuel,
      body,
      models,
      description,
      year,
      condition,
      locations,
      locals,
      mileage,
      price,
      makes,
      stock,
      images: pictures,
    } = req.body;
    const product = await Product.findByIdAndUpdate(id, {
      trim,
      drivetrain,
      cylinder,
      color,
      transmission,
      style,
      fuel,
      body,
      models,
      description,
      year,
      condition,
      locations,
      locals,
      mileage,
      price,
      makes,
      stock,
      pictures,
    });
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// delete a product

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  try {
    const user = await User.findById(user_id);
    if (!user.isAdmin) return res.status(401).json("You don't have permission");
    await Product.findByIdAndDelete(id);
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// get a product by id
const getProductbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Product.findById(id);
    const similar = await Product.find({make: car.makes, _id: { $ne: car._id}}).limit(5).lean();
    res.status(200).json({ car, similar });
    // res.status(200).json(product)
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// get product by make

const getProductCat = async (req, res) => {
  const { make } = req.params;
  try {
    let products;
    const sort = { _id: -1 };
    if (make === "all") {
      products = await Product.find().sort(sort);
    } else {
      products = await Product.aggregate([
        {
          $unwind: "$makes",
        },
        {
          $match: {
            "makes.make": { $regex: new RegExp(make, "i") },
          },
        },
      ]).sort(sort);
    }
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// add product to cart

const createCartProduct = async (req, res) => {
  const { userId, productId, price } = req.body;

  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    if (user.cart[productId]) {
      userCart[productId] += 1;
      return res
        .status(403)
        .json({ error: "Item already in cart you must checkout" });
    } else {
      userCart[productId] = 1;
    }
    userCart.count += 1;
    userCart.total = Number(userCart.total) + Number(price);
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// addin product to cart

const addProductToCart = async (req, res) => {
  // const { userId, productId, price } = req.body;
  // try {
  //   const user = await User.findById(userId);
  //   const userCart = user.cart;
  //   userCart.total += Number(price);
  //   userCart.count += 1;
  //   userCart[productId] += 1;
  //   user.cart = userCart;
  //   user.markModified("cart");
  //   await user.save();
  //   res.status(200).json(user);
  // } catch (e) {
  //   res.status(400).send(e.message);
  // }
};

// reduce product in cart
const reduceProductCart = async (req, res) => {
  // const { userId, productId, price } = req.body;
  // try {
  //   const user = await User.findById(userId);
  //   const userCart = user.cart;
  //   userCart.total -= Number(price);
  //   userCart.count -= 1;
  //   userCart[productId] -= 1;
  //   user.cart = userCart;
  //   user.markModified("cart");
  //   await user.save();
  //   res.status(200).json(user);
  // } catch (e) {
  //   res.status(400).send(e.message);
  // }
};

// Remove product from Cart

const removeProdctCart = async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(userCart[productId]) * Number(price);
    userCart.count -= userCart[productId];
    delete userCart[productId];
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// Add item to wishlist
const addProductToWishlist = async (req, res) => {
  const { userId, productId } = req.body; // You'll need to extract productId and userId from the request body

  try {
    const user = await User.findById(userId);
    const userWishlist = user.wishlist;

    if (user.wishlist[productId]) {
      userWishlist[productId] += 1;
      return res.status(403).json({ error: "Item already in wishlist" });
    } else {
      userWishlist[productId] = 1;
    }
    userWishlist.count += 1;
    user.wishlist = userWishlist;
    user.markModified("wishlist");
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Remove item from wishlist
const removeProductFromWishlist = async (req, res) => {
  const { productId, userId } = req.body;

  try {
    const user = await User.findById(userId);
    const userWishlist = user.wishlist;
    userWishlist.count -= userWishlist[productId];
    delete userWishlist[productId];
    user.wishlist = userWishlist;
    user.markModified("wishlist");
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getProducts,
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
  removeProductFromWishlist,
};
