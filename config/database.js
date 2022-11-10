
const mysql = require("mysql");
require('dotenv').config()

//Getting conected to the database:
//Using createPool method to store the connection so it can't be shoot down after 5s.
const conection = mysql.createPool({
    host: process.env.HOSTDABASE,
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

module.exports = conection;