const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://mohitsingh22410:MohitSingh25@cluster0.z0zeq.mongodb.net/DevTinder');
};



module.exports = connectDB;