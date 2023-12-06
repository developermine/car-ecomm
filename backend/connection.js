require('dotenv').config();

const mongoose = require('mongoose');

//connect to db
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('connected to db'))
.catch(error => console.log(error))