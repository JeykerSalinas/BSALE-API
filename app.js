const path = require("path");
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3600;
app.use(bodyParser.json());

// Conecting Data:
const conection = mysql.createPool({
  host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
  user: "bsale_test",
  password: "bsale_test",
  database: "bsale_test",
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Getting products:
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
