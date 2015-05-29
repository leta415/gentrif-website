var express = require('express');
var router = express.Router();
var pg = require('pg');
var _ = require('underscore');

/*
  GET demographics data (percentages of age, gender, race for each region).
  Use the 'filter' option in your URL to choose to separate date by
  'age', 'gender', or 'race' for each Area
  Example URLs:
    localhost:3000/data/demographics?filter=age
    localhost:3000/data/demographics?filter=gender
    localhost:3000/data/demographics?filter=race
*/
router.get('/demographics', function (req, res) {
  //options for filter
  var queryKey = 'filter';
  var queryValues = ['gender', 'age', 'race'];

  // error check return empty data since user did not specify if they wanted ages, genders, or races for each region
  if(Object.keys(req.query).length === 0 || !req.query.filter) {
    res.writeHead("200", {'content-type': 'application/json'});
    return res.end(JSON.stringify({
      'error': 'please use the filter query option in your GET request and choose one of the values [age, gender, race]'
    }));
  }

  // error check if filter value is one of the available ones
  var count = 0;
  for(var i = 0; i < queryValues.length; ++i) {
    if(req.query.filter === queryValues[i]) {
      count++;
    }
  }
  if(count == 0) {
    res.writeHead("200", {'content-type': 'application/json'});
    return res.end(JSON.stringify({
      'error': 'filter value should be one of [age, gender, race]'
    }));
  }

  // connect to database
  var conString = process.env.DATABASE_CONNECTION_URL;
  // initialize connection pool
  pg.connect(conString, function(err, client, done) {
    if(err) return console.log(err);

    var query = '';
    // if filtering by gender
    if(req.query.filter === queryValues[0]) {
      query = 'SELECT \"Area\", \"Gender\", \"Population\" FROM hhsa_san_diego_demographics_county_popul_by_gender_2012_norm WHERE \"Gender\"=\'Male\' OR \"Gender\"=\'Female\'';
    // if filtering by age
    } else if(req.query.filter === queryValues[1]) {
      query = 'SELECT \"Area\", \"Age\", \"Population\" FROM hhsa_san_diego_demographics_county_popul_by_age_2012_norm WHERE \"Age\" NOT LIKE \'%Any%\'';
    // if filtering by race
    } else if(req.query.filter === queryValues[2]) {
      query = 'SELECT \"Area\", \"Race\", \"Population\" FROM hhsa_san_diego_demographics_county_popul_by_race_2012_norm WHERE \"Race\" NOT LIKE \'%Any%\'';
    }

    client.query(query, function(err, result) {
      // return the client to the connection pool for other requests to reuse
      done();
      if(err) console.log(err);

      // merge the data for gender
      if(req.query.filter === queryValues[0]) {
        var resultData = [];
        var areaDataTemplate = {
          'Area': '',
          'Gender': {}
        };

        // clone the template
        var areaData = JSON.parse(JSON.stringify(areaDataTemplate));

        // loop through each result and merge similar Areas
        for(var i = 0; i < result.rows.length; ++i) {
          if(areaData.Area !== result.rows[i].Area) {
            if(areaData.Area !== '') {
              resultData.push(areaData);
            }
            // clone the template
            areaData = JSON.parse(JSON.stringify(areaDataTemplate));
            areaData.Area = result.rows[i].Area;
          }
          areaData.Gender[result.rows[i].Gender] = result.rows[i].Population;
        }
        result = {
          'rowCount': resultData.length,
          'rows': resultData
        };
      // merge the data for age
      } else if(req.query.filter === queryValues[1]) {
        var resultData = [];
        var areaDataTemplate = {
          'Area': '',
          'Age': {}
        };

        // clone the template
        var areaData = JSON.parse(JSON.stringify(areaDataTemplate));

        // loop through each result and merge similar Areas
        for(var i = 0; i < result.rows.length; ++i) {
          if(areaData.Area !== result.rows[i].Area) {
            if(areaData.Area !== '') {
              resultData.push(areaData);
            }
            // clone the template
            areaData = JSON.parse(JSON.stringify(areaDataTemplate));
            areaData.Area = result.rows[i].Area;
          }
          areaData.Age[result.rows[i].Age] = result.rows[i].Population;
        }
        result = {
          'rowCount': resultData.length,
          'rows': resultData
        };
      // merge the data for race
      } else if(req.query.filter === queryValues[2]) {
        var resultData = [];
        var areaDataTemplate = {
          'Area': '',
          'Race': {}
        };

        // clone the template
        var areaData = JSON.parse(JSON.stringify(areaDataTemplate));

        // loop through each result and merge similar Areas
        for(var i = 0; i < result.rows.length; ++i) {
          if(areaData.Area !== result.rows[i].Area) {
            if(areaData.Area !== '') {
              resultData.push(areaData);
            }
            // clone the template
            areaData = JSON.parse(JSON.stringify(areaDataTemplate));
            areaData.Area = result.rows[i].Area;
          }
          areaData.Race[result.rows[i].Race] = result.rows[i].Population;
        }
        result = {
          'rowCount': resultData.length,
          'rows': resultData
        };
      }

      res.writeHead("200", {'content-type': 'application/json'});
      res.end(JSON.stringify(result));
    });
  });
});


/* GET median income data. */
router.get('/income', function (req, res) {
  //connect to database
  var conString = process.env.DATABASE_CONNECTION_URL;
  // initialize connection pool
  pg.connect(conString, function(err, client, done) {
    if(err) return console.log(err);

    var query = 'SELECT \"Area\", \"Median Household Income\" FROM hhsa_san_diego_demographics_median_income_2012_norm';
    client.query(query, function(err, result) {
      // return the client to the connection pool for other requests to reuse
      done();

      res.writeHead("200", {'content-type': 'application/json'});
      res.end(JSON.stringify(result));
    });
  });
});

/* GET median home value data. */
router.get('/homevalue', function (req, res) {
  //connect to database
  var conString = process.env.DATABASE_CONNECTION_URL;
  // initialize connection pool
  pg.connect(conString, function(err, client, done) {
    if(err) return console.log(err);

    var query = 'SELECT \"Area\", \"Median house value\" AS \"Median Home Value\" FROM hhsa_san_diego_demographics_home_value_med_2012_norm';
    client.query(query, function(err, result) {
      // return the client to the connection pool for other requests to reuse
      done();

      res.writeHead("200", {'content-type': 'application/json'});
      res.end(JSON.stringify(result));
    });
  });
});

/* GET higher education data. */
router.get('/education', function (req, res) {
  //connect to database
  var conString = process.env.DATABASE_CONNECTION_URL;
  // initialize connection pool
  pg.connect(conString, function(err, client, done) {
    if(err) return console.log(err);

    var query = 'SELECT \"Area\", SUM(\"Population\") AS \"sum\" FROM hhsa_san_diego_demographics_education_2012_norm WHERE \"Education\"=\'Bachelor\'\'s degree (age 25 and older)\' OR \"Education\"=\'Master\'\'s degree (age 25 and older)\' GROUP BY \"Area\"';
    client.query(query, function(err, result) {
      // return the client to the connection pool for other requests to reuse
      done();
      var passBackArray = _.sortBy(result.rows, 'Area');
      console.log(passBackArray);
      res.json(passBackArray);
    });
  });
});

/*
  --DEPRECATED-- USE /education instead
  NOTE TO DEV: this route should be deleted, I just didn't delete this yet because
  the frontend hasn't integrated the new routes above ^: the /education route replaces this one.
*/
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
