/**
 * Database handler
 * Blitzen Wang @ Colby College East Asian Studies
 * May 31, 2023
 */

const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
	database: 'test'
}).promise();


async function getSearchCount(keywords){
	
    for(let key of keywords){
		for(let magazine of selectedMagazines){
			const rows = await pool.query(`
				SELECT COUNT(id)
				FROM ExtractedText
				WHERE content LIKE ${"\'%".concat(key, "%\'")}
				AND issue_name LIKE ${"\'".concat(magazine, "%\'")}
				AND issue_time >= ${"\'".concat(startTime, "-01\'")}
				AND issue_time <= ${"\'".concat(endTime, "-12\'")}
				ORDER BY page_name
				`);


			count = Object.values(rows[0][0]);
		}
    }
	return count;
}

async function getSearchData(keywords, page_size, offset, magazine, startTime, endTime){
    let ans = {};
	let count = 0;
    for(let key of keywords){

		const rows = await pool.query(`
			SELECT id, page_name, file_path, issue_time, issue_name, content, page_num
			FROM ExtractedText
			WHERE content LIKE ${"\'%".concat(key, "%\'")}
			AND issue_name LIKE ${"\'".concat(magazine, "%\'")}
			AND issue_time >= ${"\'".concat(startTime, "-01\'")}
			AND issue_time <= ${"\'".concat(endTime, "-12\'")}
			ORDER BY page_name
			LIMIT ${page_size}
			OFFSET ${offset};
			`);

		for (let entry of rows[0]){
			ans[entry.page_name] = entry;
		}
		
        
		
    }

	for(let key of keywords){

		const rows = await pool.query(`
			SELECT COUNT(id)
			FROM ExtractedText
			WHERE content LIKE ${"\'%".concat(key, "%\'")}
			AND issue_name LIKE ${"\'".concat(magazine, "%\'")}
			AND issue_time >= ${"\'".concat(startTime, "-01\'")}
			AND issue_time <= ${"\'".concat(endTime, "-12\'")}
			ORDER BY page_name
			`);

		console.log(`individual count: ${Object.values(rows[0][0])}`)
		count += Number(Object.values(rows[0][0]));
	}
		
    
    return [ans, count];
}

async function getMagazineByIssue(magazineName, year, issue){
	let ans = {};
	const rows = await pool.query(`
		SELECT id, file_path, issue_time, page_num
		FROM ExtractedText
		WHERE issue_name LIKE ${"\'%".concat(magazineName, "%\'")}
		AND issue_time = ${"\'".concat(year, "-", issue, "\'")}
		ORDER BY page_num;
		`);
	for (let entry of rows[0]){
		ans[entry.page_num] = entry;
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
		SELECT id, file_path, issue_time, page_name
		FROM ExtractedText
		WHERE issue_name LIKE ${"\'%".concat(magazineName, "%\'")}
		AND issue_time LIKE ${"\'%".concat(year, "%\'")}
		AND page_num = 1
		ORDER BY issue_time;
		`);

	for (let i = 0; i < rows[0].length; i++) {
		const entry = rows[0][i];
		data[i + 1] = entry;
	}
	
	let temp = {};
	Object.values(data).forEach(item => {
		let time = item.issue_time
		if (!temp[time] || item.page_name < temp[time].page_name) {
			temp[time] = item;
		}
	});


	// Convert result object to array
	let ans = Object.values(data);

	return ans;

}

async function batchGetMagazine(magazineName){
	let years = {};


	const rows = await pool.query(`
		SELECT id, file_path, issue_time, page_name
		FROM ExtractedText
		WHERE issue_name LIKE ${"\'%".concat(magazineName, "%\'")}
		ORDER BY page_name;
		`);

	for (let entry of rows[0]){
		years[entry.id] = entry;
	}
	let temp = {};

	Object.values(years).forEach(item => {
  
	const year = item.issue_time.split('-')[0];
	
	const newItem = { ...item, issue_time: year };

	
	if (!temp[year] || item.page_name < temp[year].page_name) {
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
		ORDER BY page_name;
		`);
	for (let entry of rows[0]){
		ans[entry.id] = entry;
	}
	return ans;
}

async function getPage(issueName, pageNum){
	let ans = {};
	const rows = await pool.query(`
		SELECT id, file_path
		FROM ExtractedText
		WHERE issue_name = 
		${"\'".concat(issueName, "\'")}
		AND page_num = ${pageNum}
		LIMIT 1;
	`);
	for (let entry of rows[0]){
		ans[entry.id] = entry;
	}
	return Object.values(ans)[0].file_path;

}

router.get("/search", async (req, res) =>  {
	let keywords = req.query.keywords;
	let page = req.query.page;
	let pageSize = req.query.pageSize;
	let selectedMagazines = req.query.selectedMagazine === 'default' ? '' : req.query.selectedMagazine;
	let startTime = req.query.startTime;
	let endTime = req.query.endTime;

	list_keywords = keywords.split(' ');
	// if invalid keywords, return error
	if (Object.keys(keywords).length === 0) {
		res.send('no keywords')
	} else {
		let [ans, count] = await getSearchData(list_keywords, pageSize, (page-1)*pageSize, selectedMagazines, startTime, endTime).then(
		console.log("finished fetching from database!"));
		res.json({results: ans, total: count});
		console.log('search code ran! keywords are' + keywords);
		console.log(req.query);
	}
	
});

router.get("/getPage", async(req, res) =>{
	let pageName = req.query.pageName;
	const issueName = pageName.split('_').slice(0, -1).join('_');
	const pageNum = pageName.split('_').slice(-1);
	let ans = await getPage(issueName, pageNum).then(console.log(`fetched page ${pageName}`));
	console.log(ans);
	res.json(ans);
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