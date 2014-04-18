function half_circle (elem_id,values,range1, range2){ 

	var radius  = 100;
	var margin = 2;
	var colors = ["#8A0808","#AAAAAA"];

    var outerRadius = radius;
    var arcWidth = radius-3;
	var innerRadius = radius - arcWidth;
				
	//Make an SVG Container
 	var svg = d3.select(elem_id).append("svg")
    			.attr("width", (radius+margin)*2)
    			.attr("height", (radius+margin)*2)
  				.append("g")
    			.attr("transform", "translate(" + (radius+margin) + "," + (radius+margin) + ")");
                                     
 	var g = svg.append("g")
					
	var arc = d3.svg.arc()
    			.outerRadius(function(d,i){val = d.data["norm_value"];return (val > 0)?outerRadius*d.data["norm_value"]:innerRadius})
    			.innerRadius(innerRadius);

	var pie = d3.layout.pie()
    			.sort(null)
    			.value(function(d) { return 1; })
    			.startAngle(1.5*Math.PI)
    			.endAngle(3.5*Math.PI);

  	var g = svg.selectAll(".arc")
      			.data(pie(values))
    			.enter().append("g")
      			.attr("class", "arc")
      			.attr("id", function(d,i){return "sa"+i;});

  	g.append("path")
      .style("fill", function(d,i) {return colors[i]})
      .transition().delay(function(d, i) { return i * 600; }).duration(600)
  	  .attrTween('d', function(d) {
       		var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
       		return function(t) {
           		d.endAngle = i(t);
         		return arc(d);
       		}
  		})					
  	.attr("id", function(d,i){return "sa"+i;})
  	
  	g
	.append("text") 
    .attr("transform", function(d,i) {
				val = d.data["norm_value"]*outerRadius;
				if(i==0){
					val = (val + 2) * -1;
				}
				else{
					val = val + 14;
				}
                return "translate(" + 0 + "," + val + ")";
    })
    .attr("text-anchor", "middle")
    .style("fill", function(d,i) {return colors[i]})
    .text(function(d, i) { return values[i]["value"]; });

	
			  						
};