const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { Console } = require("console");
const conection = require("./config/database");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3600;
const HOST = process.env.HOST || "0.0.0.0";

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(PORT, HOST, () => console.log(`Server running on port ${PORT}`));

/**
 * Add products
 * @constructor
 * @param {string} url - The title of the book.
 * @param {object} response - The author of the book.
 */
const getProducts = () => {};
app.get("/bsale/products", (req, res) => {
  const sql = "SELECT * FROM product";
  conection.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No se encontraron resultados");
    }
  });
});

//Getting categories
app.get("/bsale/category/", (req, res) => {
  const sql = `SELECT * FROM category`;
  conection.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No se encontraron resultados");
    }
  });
});
//Filter by categories
app.get("/bsale/products/category/:id", (req, res) => {
  console.log("req: ", req.params);
  const sql = `SELECT * FROM product WHERE category = ${req.params.id}`;
  conection.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No se encontraron resultados");
    }
  });
});

//Filter by name
app.get("/bsale/products/name/:name", (req, res) => {
  console.log("req: ", req.params);
  const sql = `SELECT * FROM product WHERE name LIKE '%${req.params.name}%'`;
  conection.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No se encontraron resultados");
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
