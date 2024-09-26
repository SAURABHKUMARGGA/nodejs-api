const mongoose = require("mongoose")

async function connectDB(){
    await mongoose.connect("mongodb://localhost:27017/iifa-test");
}

module.exports = connectDB;