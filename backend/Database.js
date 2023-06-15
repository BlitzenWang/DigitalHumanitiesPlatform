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
                                      SELECT id, file_path, issue_time, issue_name, content, page_num
                                      FROM ExtractedText
                                      WHERE content LIKE ${"\'%".concat(key, "%\'")}
                                      ORDER BY id;
                                      `);

        for (let entry of rows[0]){
            ans[entry.issue_name] = entry;
        }
		
    }
	console.log(ans);
    return ans;
}

async function getBook(bookname){
	let ans = {};
	const rows = await pool.query(`
									SELECT id, file_path
									FROM ExtractedText
									WHERE issue_name LIKE ${"\'%".concat(bookname, "%\'")}
									ORDER BY id;
									`);
	for (let entry of rows[0]){
		ans[entry.id] = entry;
	}
	return ans;
}

router.get("/search", async (req, res) =>  {
	let keywords = req.query.keywords;			// keywords is a string separated by '-'
	list_keywords = keywords.split(' ');
	// if invalid keywords, return error
	if (Object.keys(keywords).length === 0) {
		res.send('no keywords')
	} else {
		let ans = await getData(list_keywords).then(console.log("finished fetching from database!"));
		
		res.json(ans);
		console.log('search code ran! keywords are' + keywords);
	}
	
});

router.get("/getBook", async (req, res) =>{
	let bookName = req.query.bookName;
	let ans = await getBook(bookName).then(console.log(`fetched book ${bookName}`));
	res.json(ans);
});
module.exports = router