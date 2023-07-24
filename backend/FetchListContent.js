const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
	database: 'test'
}).promise();


const fetchContent = async (magazineList) => {
	let ans = {};
    for(let magazine of magazineList){
		const rows = await pool.query(`
			SELECT id, content, page_name
			FROM ExtractedText
			WHERE page_name = ${"\'".concat(magazine.page_name, "\'")}
			ORDER BY page_name;
			`);

		for (let entry of rows[0]){
			ans[entry.page_name] = entry;
		}
	}
	return Object.values(ans);
}

module.exports = {
  fetchContent,
};