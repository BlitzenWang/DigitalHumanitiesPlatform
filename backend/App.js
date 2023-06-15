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
const cors = require('cors');
const PORT = 5000;


app.use(cors('http://localhost:3000'));
app.use("/fetch_file", express.static('test_data'));



//reroutes search requests to database
const dbRouter = require("./Database");
app.use("/database", dbRouter);


//const fileServer = require("./FileServer");
//app.use("/files", fileServer);


app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });



// read in database
const data = require('./database/result.json');

app.use(bodyParser.json());






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