/**
 * Database handler
 * Blitzen Wang @ Colby College East Asian Studies
 * May 31, 2023
 */

const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const dotenv = require("dotenv")

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ColbyEAS',
	database: 'test'
}).promise();


async function getData(keywords){
    let ans = {};
    for(let key of keywords){
        const rows = await pool.query(`
                                      SELECT issue_name, issue_time, content
                                      FROM ExtractedText
                                      WHERE content LIKE ?
                                      ORDER BY issue_time
                                      LIMIT 20;
                                      `, [key]);
        for (let entry of rows[0]){
            ans[entry.issue_name] = entry
        }
    }
    return ans;
}


router.get("/", (req, res) =>  {
	let keywords = req.query.keywords;			// keywords is a string separated by '-'
	list_keywords = keywords.split(' ');
	// if invalid keywords, return error
	if (Object.keys(keywords).length === 0) {
		res.send('no keywords')
	} else {
		let ans = getData(list_keywords);
		/*

		// iterate through entries
		for (let key of Object.keys(data)) {
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
		*/
		res.json(ans);
		console.log(ans)
		console.log('search code ran! keywords are' + keywords);
	}
	
});
module.exports = router