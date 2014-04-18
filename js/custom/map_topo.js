(function() {
	var c = [];
	//function to add points and text to the map (used in plotting capitals)
	function addpoint(lat,lon,text) {
	
	  var gpoint = g.append("g").attr("class", "gpoint");
	  var x = projection([lat,lon])[0];
	  var y = projection([lat,lon])[1];

	  gpoint.append("svg:circle")
	        .attr("cx", x)
	        .attr("cy", y)
	        .attr("r", .1)
			.attr("data-code", text);

	}
	
	
var width = 800;
var height = 400;
var centered;
var elem_id = "#map_canvas"

var projection = d3.geo.kavrayskiy7()
	//.mercator()
	.center([60,3])
    .scale((width+200) / 2 / Math.PI)
    .translate([(width+200) / 2, (height + 60) / 2])
    .precision(.1);
	
var path = d3.geo.path()
			.projection(projection);
			
    
var svg = d3.select(elem_id).append("svg")
    			.attr("width", width)
    			.attr("height", height)
    			.style("background-color","#E0F8F7")
    			.style("border-radius","100px")
    			.style("stroke","#666")
  				.style("stroke-width","3px")
    			
 /*   	
var rect = svg.append("rect")
			.attr("width", width)
    		.attr("height", height)
	    	//.attr("rx","160px")
	    	//.attr("ry","160px")
    		.style("fill","#E0F8F7")
   */ 		
var g = svg.append("g")//.style("border-radius","160px");



//var zoom = d3.behavior.zoom()
//  			.on("zoom",function() {
//    			g.attr("transform","translate("+d3.event.translate.join(",")+")scale("+d3.event.scale+")")
// 			});

//svg.call(zoom)

//var projection = d3.geo.merc()
    //color = d3.scale.category20(),
    //graticule = d3.geo.graticule();


//d3.json("us-json-113.json", function(error, json) {
d3.json("data/world_map.topojson", function(error, world) {

  //var neighborhoods = json.objects.neighborhoods
  //	  ,neighbors = topojson.neighbors(neighborhoods.geometries);
  	  
  var countries = topojson.feature(world, world.objects.countries).features,
      neighbors = topojson.neighbors(world.objects.countries.geometries);
	  console.log(countries);
  var world_map = g.attr("id", "countries")
      .selectAll("path")
      .data(countries)
      .enter().append("path")
      .attr("d", path);


	  //EXAMPLE: adding some capitals from external CSV file
	  d3.csv("data/countrycode.csv", function(err, cnt) {
		  c = cnt;
	    cnt.forEach(function(i){
	      addpoint(i.longitude, i.latitude, i.country );
	    });

	  });
	  
   world_map
      //.each(function(d, i) { d.neighbors = d3.selectAll(neighbors[i].map(function(j) { return world_map[0][j]; })); })
      .on("mouseover", function(d) {/*d3.select("#circle_hover").select("circle").attr("visibility","visible");*/
	  									var center = projection.invert(path.centroid(d));
										d3.select("#circle_hover").select("text").attr("visibility","visible").text(center[0].toFixed(2) + " , " + center[1].toFixed(2));})
      .on("mouseout",  function(d) {/*d3.select("#circle_hover").select("circle").attr("visibility","hidden");*/d3.select("#circle_hover").select("text").attr("visibility","hidden")})
      .on("click",function(d) {clicked(d); })
   	 
	 
	
	 
	 
   function clicked(d) {

   		var x, y, k;
  		//g.selectAll("path").classed("neighbor", false);
  		if (d && centered !== d) {
    		var centroid = path.centroid(d);
    		//var bounds = path.bounds(d);
    		
    		var bounds = path.bounds(d),
      		dx = bounds[1][0] - bounds[0][0],
      		dy = bounds[1][1] - bounds[0][1],
      		x = (bounds[0][0] + bounds[1][0]) / 2,
      		y = (bounds[0][1] + bounds[1][1]) / 2,
      		x = centroid[0];
    		y = centroid[1];
      		k = .6 / Math.max(dx / width, dy / height);
      		if( k < 1) k = 1;
      		translate = [width / 2 - k * x, height / 2 - k * y]

    		//k = 9;
    		centered = d;
    	} else {
    		x = width / 2;
    		y = height / 2;
    		k = 1;
    		centered = null;
  		}

  		g.selectAll("path")
      		.classed("active", centered && function(d) { return d === centered; });
       
  		g.transition()
      		.duration(750)
      		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")");
	}
});



})()