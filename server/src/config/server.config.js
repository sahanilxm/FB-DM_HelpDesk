const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    SECRET_KEY : process.env.SECRET_KEY,
    DB_URI : process.env.DB_URI
}