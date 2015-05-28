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

    // define the sql query
    var query = 'SELECT \"Area\", SUM(\"Population\") FROM hhsa_san_diego_demographics_education_2012_norm WHERE \"Education\"=\'Bachelor\'\'s degree (age 25 and older)\' OR \"Education\"=\'Master\'\'s degree (age 25 and older)\' GROUP BY \"Area\"';

    // get the data from the database with the sql query
    client.query(query, function(err, result) {
      // return the client to the connection pool for other requests to reuse
      done();
      console.log(result.rows);
      res.json(result.rows);
    });
  });
});

module.exports = router;
