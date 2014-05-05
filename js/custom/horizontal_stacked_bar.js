function horizontal_stacked_bar (elem_id,totals){
/*modified from Mike Bostock at http://bl.ocks.org/3943967 */

var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 170 - margin.left - margin.right,
    height = 30 - margin.top - margin.bottom;

var aid_totals = [ totals ];
var n = aid_totals[0].length, // number of layers
    m = aid_totals.length, // number of samples per layer
    stack = d3.layout.stack(),
    //go through each layer (pop1, pop2 etc, that's the range(n) part)
    //then go through each object in data and pull out that objects's population data
    //and put it into an array where x is the index and y is the number
    layers = stack(d3.range(n).map(function(d) { 
                var a = [];
      			for (var i = 0; i < m; ++i) {
        			a[i] = {x: i, y: aid_totals[i][d]};  
      			}
  				return a;
             })),
	//the largest single layer
    yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
    //the largest stack
    yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });
 

var y = d3.scale.ordinal()
    .domain(d3.range(m))
    .rangeRoundBands([2, height], .08);
 
var x = d3.scale.linear()
    .domain([0, yStackMax])
    .range([0, width]);
 
var color = d3.scale.ordinal()
    .range(["#A03737","#BC6F1D","#6FBC1D","#B6BC1D","#1D95B9"]);
 
var svg = d3.select(elem_id).append("g")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
var layer = svg.selectAll(".layer")
    .data(layers)
  	.enter().append("g")
    .style("fill", function(d, i) { return color(i); })
    .style("stroke-width",".5px")
    .style("stroke","#eee")
    .style("border-radius","10px");
 
layer.selectAll("rect")
    .data(function(d) { return d; })
  	.enter().append("rect")
    .attr("y", function(d) { return y(d.x); })
	.attr("x", function(d) { return x(d.y0); })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x(d.y); })
    ;
 
};