const mongoose = require('mongoose')

const uri = 'mongodb+srv://kamranikramofficial_db_user:sg9uAuIYCjsnf24E@e-commerce.kpc96xi.mongodb.net/'

async function connectDB() {
    await mongoose.connect(uri)
}


module.exports = {
    connectDB
}