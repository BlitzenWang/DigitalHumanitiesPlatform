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

async function getMagazineByIssue(magazineName, year, issue){
	let ans = {};
	const rows = await pool.query(`
									SELECT id, file_path, issue_time, page_num
									FROM ExtractedText
									WHERE issue_name LIKE ${"\'%".concat(magazineName, "%\'")}
									AND issue_time = ${"\'".concat(year, "-", issue, "\'")}
									ORDER BY id;
									`);
	console.log("\'".concat(year, "-", issue, "\'"));
	for (let entry of rows[0]){
		ans[entry.id] = entry;
	}
	const trimmedAns = Object.values(ans).map(item => {
    return {
        ...item,
        issue_time: item.issue_time.split('-')[0]
    }
	});

	return trimmedAns;

}

async function getMagazineByYear(magazineName, year){
	let data = {};


	const rows = await pool.query(`
									SELECT id, file_path, issue_time
									FROM ExtractedText
									WHERE issue_name LIKE ${"\'%".concat(magazineName, "%\'")}
									AND issue_time LIKE ${"\'%".concat(year, "%\'")}
									ORDER BY id;
									`);

	for (let entry of rows[0]){
		data[entry.id] = entry;
	}
	let temp = {};

	Object.values(data).forEach(item => {
		let time = item.issue_time
		if (!temp[time] || item.id < temp[time].id) {
			temp[time] = item;
		}
	});


	// Convert result object to array
	let ans = Object.values(temp);
	
	return ans;

}

async function batchGetMagazine(magazineName){
	let years = {};


	const rows = await pool.query(`
									SELECT id, file_path, issue_time
									FROM ExtractedText
									WHERE issue_name LIKE ${"\'%".concat(magazineName, "%\'")}
									ORDER BY id;
									`);

	for (let entry of rows[0]){
		years[entry.id] = entry;
	}
	let temp = {};

	Object.values(years).forEach(item => {
  
	const year = item.issue_time.split('-')[0];
	
	const newItem = { ...item, issue_time: year };

	
	if (!temp[year] || item.id < temp[year].id) {
		temp[year] = newItem;
	}
	});


	// Convert result object to array
	let ans = Object.values(temp);
	
	return ans;

}

async function getBook(bookname){
	let ans = {};
	const rows = await pool.query(`
									SELECT id, page_num, file_path
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

router.get("/getMagazine", async (req, res) =>{
	let magazineName = req.query.magazineName;
	let year = req.query.year;
	let issue = req.query.issue;
	if (issue != 'null'){
		let ans = await getMagazineByIssue(magazineName, year, issue);
		res.json(ans);
	}
	else if (year != 'null'){
		let ans = await getMagazineByYear(magazineName, year);
		res.json(ans);
	}
	else{
		
		let ans = await batchGetMagazine(magazineName);
		res.json(ans);
	}
	
});

module.exports = router