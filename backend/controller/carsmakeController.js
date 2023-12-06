const fs = require('fs').promises;
const path = require('path');

const carmake = path.join(__dirname, "car.json");



const make = async (req, res) => {
    let data = JSON.parse(await fs.readFile(carmake, "utf-8")); //passing votes array as data
    try {
        const cars = await data.find({}, 'make models')
        res.json(cars)
        console.log(cars)
} catch (err) {
    res.status(500).json({err: 'Internal Server Error'});
}
    
};

module.exports = {
    make
}