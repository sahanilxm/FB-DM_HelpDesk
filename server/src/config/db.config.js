const mongoose = require('mongoose');

const { DB_URI } = require('./server.config.js');

mongoose.connect(DB_URI).then(() => {
    console.log('DB connection successfull.');
}).catch((err) => {
    console.log("DB Connection failed.", err);
})