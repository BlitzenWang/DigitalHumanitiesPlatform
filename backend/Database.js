/**
 * Database handler
 * Blitzen Wang @ Colby College East Asian Studies
 * May 31, 2023
 */

const express = require("express")
const router = express.Router()
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:"localhost",
    user:"admin"
    password:"ColbyEASAdmin"
})
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

router.get("/", (req, res) => {
    console.log("Intercepted")
})
module.exports = router