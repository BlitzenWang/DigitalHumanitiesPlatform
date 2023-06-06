/**
 * Database handler
 * Blitzen Wang @ Colby College East Asian Studies
 * May 31, 2023
 */

const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createPool({
    host: "localhost",
    user: "admin",
    password: "ColbyEASAdmin",
	database: 'test'
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

sql = "";

con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });

router.get("/", (req, res) =>  {
	let keywords = req.query.keywords;			// keywords is a string separated by '-'
	list_keywords = keywords.split(' ');
	// if invalid keywords, return error
	if (Object.keys(keywords).length === 0) {
		res.send('no keywords')
	} else {
		let ans = {};
		// iterate through entries
		for (let key of Object.keys(data)) {
      		sql = "SELECT"
			let entry = data[key];
			// search for key word
			for (let word of list_keywords) {
				if (entry["keyword"].indexOf(word) > -1) {
					// if one key word exists, mark and return the item
					ans[key] = data[key];
					break;
				}
			}
		}
		console.log('search code ran! keywords are' + keywords);
		res.json(ans);
	}
	
});
module.exports = router