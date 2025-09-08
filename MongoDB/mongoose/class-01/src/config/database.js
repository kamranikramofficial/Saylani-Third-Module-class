const mongoose = require('mongoose')

const uri = 'mongodb+srv://kamranikramofficial_db_user:kamranikramofficial@cluster0.zilfr2l.mongodb.net/'


async function connectDB() {
    await mongoose.connect(uri)
}


module.exports = {
    connectDB
}