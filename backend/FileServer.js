const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const url = require('url');
const DATA_FOLDER = "test_data"

const cors = require('cors');


router.use(cors('http://localhost:3000'));
router.get('/:folder1/:folder2', (req, res) => {
  const directoryPath = path.join(__dirname, DATA_FOLDER, req.params.folder1, req.params.folder2);
  console.log(req.params.folder1);
  console.log(req.params.folder2);

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(files);
  });
});



module.exports = router