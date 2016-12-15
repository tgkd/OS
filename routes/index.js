var express = require('express');
var router = express.Router();
var request = require('request');
var mysql = require('mysql');

var dbConnect = mysql.createConnection({
  host: '192.168.137.1',
  user: 'raspberry',
  password: '89655030993As',
  database: 'songs_db'
});

dbConnect.connect();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Test' });
});

router.get('/all', function(req, res, next) {
  dbConnect.query('SELECT * FROM `songs`', function(error, results, fields) {
    if(error){
      return res.sendStatus(400);
    } else {
      res.json(results);
    }
  });
});

router.get('/play_by_id', function(req, res, next) {
  checkPlayingSongs(function(checkErr, checkRes) {
    if(!checkErr && checkRes){
      updateDB({play: true, id: req.query.id}, function(err, result) {
        if(err) res.sendStatus(500);
        else res.sendStatus(200);
      })
    } else {
      res.sendStatus(400);
    }
  })
});

router.get('/stop_by_id', function(req, res, next) {
  updateDB({play: false, id: req.query.id}, function(err, result) {
    if(err) res.sendStatus(500);
    else res.sendStatus(200);
  })
});

function checkPlayingSongs(callback) {
  dbConnect.query('SELECT * FROM `songs` WHERE play = ?',[true], function(error, results, fields) {
    if(results[0]){
      updateDB({play: false, id: results[0].id}, function(err, result) {
        if(error) callback(error, null);
        else callback(null, true);
      });
    } else {
      callback(null, true);
    }
  });
}

function updateDB(params, callback) {
  dbConnect.query('UPDATE songs SET play = ? WHERE id = ?',[params.play, params.id], function(error, results, fields) {
    if(error) callback(error, null);
    else callback(null, true);
  });
}

module.exports = router;
