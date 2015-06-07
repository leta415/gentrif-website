/* 
Function to get education data and render the data visualization on the panel.

Paramters:
  elementStr - the html element to append the data visualization to
  svgWidth - width of the svg
  svgHeight - height of the svg
*/
function renderEducation(element, cityName) {
    // $(element).html('');
    var population;
    $.getJSON('/data/education').done(function(data) {
        var i = data.length;
        //console.log(data);
        while( i--){

            if(data[i].Area == cityName){
                population = data[i].sum;
                break;
            }
        }
        // $(element).html("<div>Number of people in " + cityName + " with a Bachelor's Degree or higher</div><div>" + population + "</div>");
        document.getElementById("panel-title-ed").innerHTML = "Number of Bachelor's Degree or Higher in <span class=\"cityName\">" + cityName + "</span>";
        document.getElementById("panel-body-ed").innerHTML = population;
        $("#education-div").css("visibility", "visible");
    });
    // var opts = {
    //     size: 72,           // Width and height of the spinner
    //     factor: 0.35,       // Factor of thickness, density, etc.
    //     color: "#3B3738",      // Color #rgb or #rrggbb
    //     speed: 1.0,         // Number of turns per second
    //     clockwise: true     // Direction of rotation
    // };
    // var ajaxLoader = new AjaxLoader("spinner", opts);
    // ajaxLoader.show();
    /*
    var margin = {top: 20, right: 20, bottom: 120, left: 40};
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    //define scale of x to be from 0 to width of SVG, with .1 padding in between
    var scaleX = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

    //define scale of y to be from the height of SVG to 0
    var scaleY = d3.scale.linear()
      .range([height, 0]);

    //define axes
    var xAxis = d3.svg.axis()
      .scale(scaleX)
      .orient("bottom");
    var yAxis = d3.svg.axis()
      .scale(scaleY)
      .orient("left");

    //create svg
    var svg = d3.select(elementStr).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //create tooltip
    var div = d3.select("body").append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

    var tip = d3.tip()
      .attr('class', 'tooltip')
      .offset([-10, 0])
      .html(function(d) {
        return "<div><strong style='color: steelblue;'>" + d.sum + "</strong> people in <strong style='color: steelblue;'>" 
                  + d.Area + "</strong></div><div> with Bachelor's degree or higher</div>";
      });

    svg.call(tip);



    //get json object which contains areas corresponding with their total number of bach and master degrees
    d3.json('/data/education', function(error, data) {

      // console.log("type check: " + typeof data[0].sum);
      
      // a flag used to keep track of whether or not to sort or unsort the bars. right now there is no UI for sorting yet.
      var sorted = false;

      // save the original order of the area names
      var origDomain = data.slice().map(function(d) {
        return d.Area;
      });


      // set domain of x to be all the area names contained in the data
      scaleX.domain(data.map(function(d) { return d.Area; }));
      //set domain of y to be from 0 to the maximum number of bach/master degrees returned
      // make sure numbers coming in are ints, if not, parse
      scaleY.domain([0, d3.max(data, function(d) { return parseInt(d.sum); })]);


      //set up x axis
      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")") //move x-axis to the bottom
        .call(xAxis)
        .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
          return "rotate(-65)" 
        });

      //set up y axis
      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Population with Bachelor's Degree or Higher");

        // ajaxLoader.hide();

      //set up bars in bar graph
      svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return scaleX(d.Area); })
        .attr("width", scaleX.rangeBand())
        .attr("y", function(d) {
          // console.log(d.sum)
          // console.log(scaleY(d.sum)) 
          return scaleY(d.sum); 
        })
        .attr("height", function(d) { return height - scaleY(d.sum); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);


        // set up sorting on these div elements. sorting UI is not set up yet.
        d3.select("#sortClickImgDiv").on("click", sort);
        d3.select("#unsortClickImgDiv").on("click", unsort);


        function sort() {   
          if (sorted) return;
          sorted = true;

          $('#sortClickImgDiv').css('cursor', 'initial');
          $('#unsortClickImgDiv').css('cursor', 'pointer');

          document.getElementById('sortClickImgDiv').style.backgroundColor = "#3E5378";
          document.getElementById('unsortClickImgDiv').style.backgroundColor = "transparent";

          var x0 = scaleX.domain(data.sort( function(a, b) { 
              return b.sum - a.sum; 
            })          
            .map(function(d) { return d.Area; }))
            .copy();


          svg.selectAll(".bar")
              .sort(function(a, b) { return x0(a.Area) - x0(b.Area); });

          var transition = svg.transition().duration(750),
              delay = function(d, i) { return i * 50; };

          transition.selectAll(".bar")
              .delay(delay)
              .attr("x", function(d) { return x0(d.Area); });

          transition.select(".x.axis")
              .call(xAxis)
              .selectAll("text")  
              .style("text-anchor", "end")
              .selectAll("g")
              .delay(delay);
        }


        function unsort() {  
          if (!sorted) return;
          sorted = false;

          $('#sortClickImgDiv').css('cursor', 'pointer');
          $('#unsortClickImgDiv').css('cursor', 'initial');

          document.getElementById('sortClickImgDiv').style.backgroundColor = "transparent";
          document.getElementById('unsortClickImgDiv').style.backgroundColor = "#3E5378";

          var x0 = scaleX.domain(origDomain).copy();

          svg.selectAll(".bar")
              .sort(function(a, b) { return x0(a.Area) - x0(b.Area); });

          var transition = svg.transition().duration(750),
              delay = function(d, i) { return i * 50; };

          transition.selectAll(".bar")
              .delay(delay)
              .attr("x", function(d) { return x0(d.Area); });

          transition.select(".x.axis")
              .call(xAxis)
              .selectAll("text")  
              .style("text-anchor", "end")
              .selectAll("g")
              .delay(delay);
        }
    }); // end of d3.json call*/

}  //end of renderEducation()