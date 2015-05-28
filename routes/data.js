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

    // var query = 'SELECT * FROM cdph_smoking_prevalence_in_adults_1984_2013';
    var query = 'SELECT \"Area\", SUM(\"Population\") FROM hhsa_san_diego_demographics_education_2012_norm WHERE \"Education\"=\'Bachelor\'\'s degree (age 25 and older)\' OR \"Education\"=\'Master\'\'s degree (age 25 and older)\' GROUP BY \"Area\"';
    // var query = 'SELECT * FROM zillow_zip_median_listing_price_all_homes_norm WHERE CountyName=San Diego';
    client.query(query, function(err, result) {
      // return the client to the connection pool for other requests to reuse
      done();

      res.writeHead("200", {'content-type': 'application/json'});
      res.end(JSON.stringify(result));
    });
  });
});

module.exports = router;
