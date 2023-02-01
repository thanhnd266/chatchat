const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI;

const connectToDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch(err) {
        console.log('Connect failure!!');
    }
}

module.exports = connectToDB;