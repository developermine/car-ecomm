require('dotenv').config();

const express = require('express')
const http = require('http')
const cors = require('cors')
const morgan = require('morgan')
require('./connection')
const stripe = require('stripe')(process.env.STRIPE_SECT);
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const imagesRoutes = require('./routes/imagesRoutes')

const fs = require('fs').promises;
const path = require('path');

const carmake = path.join(__dirname, "car.json");
const location = path.join(__dirname, "location.json");


const app = express()

const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
    cors: 'http://localhost:3000/',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
})


app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use('/user', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/images', imagesRoutes);


app.post('/create-payment', async(req, res)=> {
  const {amount} = req.body;
  console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'ngn',
      payment_method_types: ['card']
    });
    res.status(200).json(paymentIntent)
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
   }
})

  

app.get('/api/cars/', async (req, res) => {
    try {
        let data = await fs.readFile(carmake, "utf-8"); 
        const cars = JSON.parse(data);
        res.json(cars);
    } catch (err) {
        res.status(500).json({err: 'Internal Server Error'});
    }
});

app.get('/api/location/', async (req, res) => {
  try {
      let data = await fs.readFile(location, "utf-8"); 
      const selectedLocation = JSON.parse(data);
      res.json(selectedLocation);
  } catch (err) {
      res.status(500).json({err: 'Internal Server Error'});
  }
});


server.listen(process.env.PORT, () => {
    console.log('server running on port', 8181)
})

app.set('socketIo'. io);










