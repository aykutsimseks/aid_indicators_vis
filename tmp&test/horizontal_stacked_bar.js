function horizontal_stacked_bar (){
/*modified from Mike Bostock at http://bl.ocks.org/3943967 */

var data = [
{"key":"FL", "pop1":3000, "pop2":4000, "pop3":5000},
];
 
var n = 3, // number of layers
    m = data.length, // number of samples per layer
    stack = d3.layout.stack(),
    labels = data.map(function(d) {return d.key;}),
    
    //go through each layer (pop1, pop2 etc, that's the range(n) part)
    //then go through each object in data and pull out that objects's population data
    //and put it into an array where x is the index and y is the number
    layers = stack(d3.range(n).map(function(d) { 
                var a = [];
      			for (var i = 0; i < m; ++i) {
        			a[i] = {x: i, y: data[i]['pop' + (d+1)]};  
      			}
  				return a;
             })),
    
	//the largest single layer
    yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
    //the largest stack
    yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });
 
var margin = {top: 40, right: 10, bottom: 20, left: 50},
    width = 677 - margin.left - margin.right,
    height = 533 - margin.top - margin.bottom;
 
var y = d3.scale.ordinal()
    .domain(d3.range(m))
    .rangeRoundBands([2, height], .08);
 
var x = d3.scale.linear()
    .domain([0, yStackMax])
    .range([0, width]);
 
var color = d3.scale.linear()
    .domain([0, n - 1])
    .range(["#aad", "#556"]);
 
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
var layer = svg.selectAll(".layer")
    .data(layers)
  .enter().append("g")
    .attr("class", "layer")
    .style("fill", function(d, i) { return color(i); });
 
layer.selectAll("rect")
    .data(function(d) { return d; })
  	.enter().append("rect")
    .attr("y", function(d) { return y(d.x); })
	.attr("x", function(d) { return x(d.y0); })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x(d.y); });
 
};