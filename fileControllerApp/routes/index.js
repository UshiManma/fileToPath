var express = require('express');
const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'imgManager'
});

var router = express.Router();
const fs = require("fs");
const isFile = path => {
  const stat = fs.statSync(path);
  return stat.isFile();
}
//requestから中身を取り出す
var bodyParser = require('body-parser')
var app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/fileRator', function(req, res, next) {
  let request_timestamp = new Date().getTime();
  let req_body = req.body;
  const fileNames = req_body.f_name;
  result = {};
  try {
    result = {
      "success": true,
      "message": "success", 
      "estimated_data": {
        "class": 3,
        "confidence": 0.8683 
      }
    }
  } catch (error) {
    console.log(`error: ${error}`);
    result = {
      "success": false, 
      "message": "Error:E50012", 
      "estimated_data": {}
      }
  }

  let class_no = result.estimated_data.class ? result.estimated_data.class : 0;
  let confidence = result.estimated_data.confidence ? result.estimated_data.confidence : 0;
  let response_timestamp = new Date().getTime();
  let data = {
    "image_path": fileNames,
    "success": result.success,
    "message": result.message,
    "class":  class_no,
    "confidence": confidence,
    "request_timestamp": request_timestamp,
    "response_timestamp": response_timestamp
  }
  con.connect();
  con.query('INSERT INTO ai_analysis_log SET ?', data, (err, res)  => {
    if (err) throw err;
    console.log(data.value);
  });

  con.end();
  res.redirect('/');
});

module.exports = router;
