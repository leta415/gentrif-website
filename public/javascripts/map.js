// We are only using a subset of Zillow neighborhoods that match with the Delphi areas in this array
var delphiAreas = [
        "Spring Valley",
        "Escondido",
        "Poway",
        "Oceanside",
        "Carlsbad",
        "Fallbrook",
        "Kearny Mesa",
        "Peninsula",
        "Lakeside",
        "La Mesa",
        "Pendleton",
        "South Bay",
        "El Cajon",
        "Chula Vista",
        "Ramona",
        "Elliott-Navajo",
        "Laguna-Pine Valley",
        "San Dieguito",
        "Alpine",
        "Lemon Grove",
        "Mountain Empire",
        "San Marcos",
        "Sweetwater",
        "Del Mar-Mira Mesa",
        "Coastal",
        "Santee",
        "Jamul",
        "Palomar-Julian",
        "National City",
        "Valley Center",
        "Pauma",
        "University",
        "Vista"
    ];

// var width = 960, height = 1160;
var width = 350, height = 600;
var margin = 100;

var tip = d3.tip()
  .attr('class', 'tooltip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span style='color:red'>" + d.properties.name + "</span>";
  });

var svg = d3.select("#map").append("svg")
          .attr("width", width + margin)
          .attr("height", height + margin);

svg.call(tip);

d3.json("/json/mysd.json", function(error, sd) {
if (error) return console.error(error);
// console.log(sd);

////////////// Display boundaries /////////////
var sdgeo = topojson.feature(sd, sd.objects.zillowneighborhoodsca);

var center = d3.geo.centroid(sdgeo);
var scale  = 150;
var offset = [width/2, height/2];
var projection = d3.geo.mercator().scale(scale).center(center)
    .translate(offset);
// var projection = d3.geo.albers()
//       // .center([0, 55.4])
//       // .rotate([4.4, 0])
//       // .parallels([50, 60])
//       .scale(1600)
//       .translate([width / 2, height / 2]);
var path = d3.geo.path()
      .projection(projection);

var bounds  = path.bounds(sdgeo);
var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
var vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
var scale   = (hscale < vscale) ? hscale : vscale;
var offset  = [width + margin - (bounds[0][0] + bounds[1][0])/2,
                  height - (bounds[0][1] + bounds[1][1])/2];

projection = d3.geo.mercator().center(center)
        .scale(scale).translate(offset);
path = path.projection(projection);

svg.append("path")
    .datum(sdgeo)
    .attr("d", path);
    // .attr("d", d3.geo.path().projection(d3.geo.mercator()));



// give each area its own path element so they can each have different properties (i.e. color)
svg.selectAll(".subunit")
    .data(topojson.feature(sd, sd.objects.zillowneighborhoodsca).features)
    .enter().append("path")
    .attr("class", function(d) {return "subunit " + d.properties.id; })
    .attr("d", path)
    .on('mouseover', function(d) {
      if ($.inArray(d.properties.name, delphiAreas) != -1) {
        // console.log("hover found " + d.properties.name);
        tip.show(d);
      } else {
        // console.log("hover NOT found " + d.properties.name);
      }
    }) 
    .on('mouseout', function(d) {
      if ($.inArray(d.properties.name, delphiAreas) != -1) {
        tip.hide(d);
      }
    })
    .on('click', function(d) {
      if ($.inArray(d.properties.name, delphiAreas) == -1) return;
      // console.log("found " + d.properties.name);
      // Age data
      renderDemoAge('#age-div', 250, d.properties.name);
      $('#age-div').attr('font-family', 'inherit');
      // $('#age-div').addClass("pull-right");

      // Gender data
      renderDemoGender("#gender-div", 300, d.properties.name);
      // $('#gender-div').addClass("pull-right");

      // Race data
      renderDemoRace("#race-div", 300, d.properties.name);
      // $('#race-div').addClass("pull-left");

      // Home value data
      var homedata = renderHome("#homevalue-div",d.properties.name);//"$XXXXX is the median household income in " + d.properties.name + ".";
      $("homevalue-div").html(homedata);
      $("homevalue-div").attr('font-family', "'Dosis', sans-serif");

      // Income data
      var incomedata = renderIncome("#income-div",d.properties.name);//"$XXXXX is the median household income in " + d.properties.name + ".";
      $("#income-div").html(incomedata);

      // Education data
      var educationHtmlStr = renderEducation("#education-div", d.properties.name);//"XXXXXX people in " + d.properties.name + " have a Bachelor's Degree or higher.";
      $("#education-div").html(educationHtmlStr);  
    });

// The England-Scotland and England-Wales borders are interior boundaries. We can exclude Ireland’s
// border with Northern Ireland by also filtering on id
// svg.append("path")
//     .datum(topojson.mesh(sd, sd.objects.subunits, function(a, b) { return a !== b && a.id !== "IRL"; }))
//     .attr("d", path)
//     .attr("class", "subunit-boundary");

// Irish coastline, an exterior boundary
// svg.append("path")
//     .datum(topojson.mesh(sd, sd.objects.subunits, function(a, b) { return a === b && a.id === "IRL"; }))
//     .attr("d", path)
//     .attr("class", "subunit-boundary IRL");
///////////// End display boundaries //////////////



// Country labels
// svg.selectAll(".subunit-label")
//     .data(topojson.feature(sd, sd.objects.zillowneighborhoodsca).features)
//   .enter().append("text")
//     .attr("class", function(d) { return "subunit-label " + d.properties.id; })
//     .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
//     .attr("dy", ".35em")
//     .text(function(d) { return d.properties.name; });
///////// End display places /////////////

});