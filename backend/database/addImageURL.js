/**
 * A helper function to add URL as an attribute to the database
 * Ruize Li, July 19 2021 @ Colby
 */

const fs = require('fs');


const imgDir = './images';
const db = require('./result.json');

// read the directory and process each file
const imgList = [];
fs.readdirSync(imgDir).forEach(file => {
    imgList.push(file);
});

const db_keys = Object.keys(db);
console.log(db_keys[0])

const res =  {};
res[db_keys[0]] = db[db_keys[0]];
res[db_keys[0]].image_path = 'https://raw.githubusercontent.com/ruize-li/colby_digital_studies_storage/master/images/rmhb_1950_cover.6e78lnljlfc0.jpeg';


fs.writeFile('res.json', JSON.stringify(res), 'utf8', (err) => {
    if(err) throw err;
    console.log(err);
});

// for (let key of db_keys) {
//     res[key] = db[key];
//     // if current entry does
//     if (!db[key].image_path) {
//         // search for the URL corresponds to the image name
//         
//     }
// }