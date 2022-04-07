
const mysql = require("mysql");
require('dotenv').config()

//Getting conected to the database:
const conection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

  
module.exports = conection;