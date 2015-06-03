// var width = 960, height = 1160;
var width = 400, height = 700;
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
console.log(sd);

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

// give each country its own path element so they can each have different properties (i.e. color)
svg.selectAll(".subunit")
    .data(topojson.feature(sd, sd.objects.zillowneighborhoodsca).features)
    .enter().append("path")
<<<<<<< HEAD
    .attr("class", function(d) {return "subunit " + d.properties.id; })
    .attr("d", path);
=======
    .attr("class", function(d) {return "subunit " + d.id; })
    .attr("d", path)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);
>>>>>>> 3cb9a4f775afa4c1e030622dcd71390c94c0ce6b

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


////////// Display places //////////////

// Draws a dot/circle for each place
// svg.append("path")
//     .datum(topojson.feature(sd, sd.objects.mysdplaces))
//     .attr("d", path)
//     .attr("class", "place");

// Place labels
// svg.selectAll(".place-label")
//     .data(topojson.feature(sd, sd.objects.mysdplaces).features)
//   .enter().append("text")
//     .attr("class", function(d) {return "place-label id" + d.properties.id; })
//     .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
//     .attr("dy", ".35em")
//     .text(function(d) { return d.properties.name; });

// right-aligned labels on the left side of the map, and left-aligned labels on the right side of the map,
// here using 1°W as the threshold
// svg.selectAll(".place-label")
//     .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
//     .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; });

// Fix North San Diego (refer to mysdplaces.json to find id)
// svg.selectAll(".place-label.id5")
//     .attr("y", 4);

// // Fix University
// svg.selectAll(".place-label.id7")
//     .attr("x", 65)
//     .attr("y", 8);

// // Fix Central San Diego
// svg.selectAll(".place-label.id1")
//     .attr("y", -3);

// Country labels
svg.selectAll(".subunit-label")
    .data(topojson.feature(sd, sd.objects.zillowneighborhoodsca).features)
  .enter().append("text")
    .attr("class", function(d) { return "subunit-label " + d.properties.id; })
    .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .text(function(d) { return d.properties.name; });
///////// End display places /////////////

});