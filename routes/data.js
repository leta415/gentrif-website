var express = require('express');
var router = express.Router();
var pg = require('pg');

/* GET data. */
router.get('/', function (req, res) {
  //connect to database
  var conString = process.env.DATABASE_CONNECTION_URL;
  // initialize connection pool
  pg.connect(conString, function(err, client, done) {
    if(err) return console.log(err);

    var query = 'SELECT * FROM cdph_smoking_prevalence_in_adults_1984_2013';
    client.query(query, function(err, result) {
      // return the client to the connection pool for other requests to reuse
      done();

      res.writeHead("200", {'content-type': 'application/json'});
      res.end(JSON.stringify(result.rows));
    });
  });
});

module.exports = router;
