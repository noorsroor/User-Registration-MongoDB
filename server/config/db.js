const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        // Remove useNewUrlParser and useUnifiedTopology options
        await mongoose.connect(url);
        console.log('✅ Database connected successfully');
    } catch (err) {
        console.error('❌ Error connecting to the database:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
