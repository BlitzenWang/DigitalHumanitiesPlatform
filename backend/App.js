/**
 * An simple Backend service
 * Ruize Li @ Colby College East Asian Studies
 * July 14, 2021
 */

const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const url = require('url');
const queryString = require('querystring');
const LOGIN_PASSWORD = 'lrc';
const PORT = 5000;



app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });



// read in database
const data = require('./database/result.json');

app.use(bodyParser.json());



/**
 * Handle search requests
 * Example: search?keywords=revolution-chairman-party
 */
app.get('/search', function(req, res) {
	let keywords = req.query.keywords;			// keywords is a string seperated by '-'
	list_keywords = keywords.split('-');
	// if invalid keywords, return error
	if (Object.keys(keywords).length === 0) {
		res.send('no keywords')
	} else {
		let ans = {};
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
		console.log('search code ran! keywords are' + keywords);
		res.json(ans);
	}
	
});


app.get('/adminlogin', (req, res) => {
		console.log('received admin login request!');
        let userInput = req.query.userInput;
		// console.log('userInput is ' + userInput);
		let check = userInput === LOGIN_PASSWORD ? true : false;
		if (!check) {
			res.send({verification : false});
		}
		res.send({verification : true});

	
	}
);

app.get('/get-data', (req,res) => {
	res.json(data);
})

app.post('/securedAdminAccess', (req, res) => {

	const newEntry = req.body;
		console.log(newEntry)
		if (!newEntry) {
			res.send({err : 'body is not defined'});
			console.log('failed to read req.body')
			
		} 
		else {
			// check if the entry exists, if yes, leave the id
			const ID = null;
			if (data[newEntry.file_name]) ID = data[newEntry.file_name][id];
			data[newEntry.file_name] = newEntry;
			console.log(data[newEntry.file_name]);
			if (ID) {
				data[newEntry.file_name][id] = ID;
			} else {
				// console.log(data);
				const lastID = data[Object.keys(data).pop()][id];
				obj[newEntry.file_name][id] = lastID + 1;
			}
			fs.writeFile('result.json', JSON.stringify(data), 'utf8', (err) => console.log(err)); // write it back 
			res.send('new Entry successfully added to database!');
		}

	// fs.readFile('result.json', 'utf8', function readFileCallback(err, data){
	// 	if (err){
	// 		console.log(err);
	// 	} else {
	// 	obj = JSON.parse(data); //now it an object
		
	// }});
	
})



// init backend service at PORT
app.listen(PORT, () => console.log(`Colby Digital Studies backend server listening on port ${PORT}!`))