function half_circle (elem_id,values,range1, range2){
	yearly_values = []
	/*
	values.forEach(function(d) {
		d["yearly_values"].forEach(function(y) {
    		yearly_values.push(y);
    	})
 	});
 	*/
 	var start_year = 1960;
 	var averages = [];
 	var arc_lock = false;
 	for(j=0; j < 2; j++)
 	{
 		var found = 0;
 		var total = 0;
 		for(i=0; i < values[j]["yearly_values"].length; i++)
 		{
 			if(values[j]["yearly_values"][i] == null)
 			{
 				values[j]["yearly_values"][i] = 0;
 			}
 			else
 			{
 				found++;
 				total += values[j]["yearly_values"][i];
 			}
 		}
 		averages[j] = total/found;
 	}
 	
 	var number_of_years = values[0]["yearly_values"].length/2;
 	var max0 = Math.max.apply(Math, values[0]["yearly_values"])
 	var max1 = Math.max.apply(Math, values[1]["yearly_values"])
 	
	
	var radius  = 100;
	var margin = 22;
	var colors = ["#ff9900","#CC6633"]//,"#ae3a3a"];

    var outerRadius = radius;
    var arcWidth = radius-1;
	var innerRadius = radius - arcWidth;
				
	//Make an SVG Container
 	var svg = d3.select(elem_id).append("svg")
    			.attr("width", (radius+margin)*2)
    			.attr("height", (radius+margin)*2)
  				.append("g")
    			.attr("transform", "translate(" + (radius+margin) + "," + (radius+margin - 15) + ")");
   				
	var arc0 = d3.svg.arc()
    			//.outerRadius(function(d,i){val = d.data["norm_value"];return (val > 0)?outerRadius*d.data["norm_value"]:innerRadius})
    			.outerRadius(function(d,i){return (outerRadius*d.data)/max0})
    			.innerRadius(innerRadius);
    			
    var arc1 = d3.svg.arc()
    			//.outerRadius(function(d,i){val = d.data["norm_value"];return (val > 0)?outerRadius*d.data["norm_value"]:innerRadius})
    			.outerRadius(function(d,i){return (outerRadius*d.data)/max1})
    			.innerRadius(innerRadius);

	var pie1 = d3.layout.pie()
    			.sort(null)
    			.value(function(d) { return 1; })
    			.startAngle(1.5*Math.PI)
    			.endAngle(2.5*Math.PI);
    
    var pie2 = d3.layout.pie()
    			.sort(null)
    			.value(function(d) { return 1; })
    			.startAngle(2.5*Math.PI)
    			.endAngle(3.5*Math.PI);
	
	var year_text = svg.append('text')
      				  .attr("transform","translate(" + ( - (radius + margin)) + " , " + (- (radius + margin - 36)) + ")")
      				  .style("fill","#666")
      				  .style('visibility','hidden')
      				  .attr('font-size',28)
      				  .attr('font-family','Amatic SC')
      				  .style("cursor","default")
      				  
    var value_text = svg.append('text')
      				  .attr("transform","translate(" + ( - (radius + margin - 10)) + " , " + (- (radius + margin - 50)) + ")")
      				  .style("fill","#666")
      				  .style('visibility','hidden')
      				  .style("cursor","default")
	
	var myLine = svg.append("line")
    				.attr("x1", -(radius + margin))
    				.attr("y1", 0)
    				.attr("x2", (radius+margin))
    				.attr("y2", 0)
    				.style("stroke", "#aaa");
    				
    svg.append('text')
      	.attr("transform","translate(" + -(radius + margin) + " , " + (-4) + ")")
      	.style('font-size',10)
      	.style("fill",colors[0])
      	.text("1960")
      	
    svg.append('text')
      	.attr("transform","translate(" + (radius + margin - 20) + " , " + (-4) + ")")
      	.style('font-size',10)
      	.style("fill",colors[0])
      	.text("2012")
	
	svg.append('text')
      	.attr("transform","translate(" + -(radius + margin) + " , " + 12 + ")")
      	.style('font-size',10)
      	.style("fill",colors[1])
      	.text("2012")
      	
    var vis = d3.select("body").append("svg")
	var pi = Math.PI;

      	
    svg.append('text')
      	.attr("transform","translate(" + (radius + margin - 20) + " , " + 12 + ")")
      	.style('font-size',10)
      	.style("fill",colors[1])
      	.text("1960")
      	
  	var g1 = svg.selectAll(".arc0")
      			.data(pie1(values[0]["yearly_values"]))
    			.enter().append("g")
      			.attr("class", "arc0")
      			.attr("id", function(d,i){return "sah0_"+i;});

  	g1.append("path")
      .style("fill", function(d,i) {return colors[0]})
      .on("mouseover", function(d,i) {
      		if(!arc_lock)
       		{
      			//svg.select("#sah1_" + i).style("opacity",.7);
				d3.select("body").selectAll("#sah1_" + i).style("opacity",1);
				d3.select("body").selectAll("#sah0_" + i).style("opacity",1);
				year_text
					.text(start_year+i)
					.style('visibility','visible')
				value_text
					.text(d.data.toFixed(1))
					.style('visibility','visible')
			}
       })
       .on("mouseout",function(d,i) {
       		if(!arc_lock)
       		{
       			d3.select("body").selectAll("#sah1_" + i).style("opacity",.7);
       			d3.select("body").selectAll("#sah0_" + i).style("opacity",.7);
       			year_text.style('visibility','hidden')
       			value_text.style('visibility','hidden')
       		}
       })
       .on("click",function(d,i) {
       		svg.selectAll(".arc0").style("opacity",.7);
       		svg.selectAll(".arc1").style("opacity",.7);
       		year_text.style('visibility','hidden')
       		value_text.style('visibility','hidden')
       		if(!arc_lock)
       		{
       			arc_lock = true;
       			d3.select("body").selectAll("#sah1_" + i).style("opacity",1);
				d3.select("body").selectAll("#sah0_" + i).style("opacity",1);
				year_text
					.text(start_year+i)
					.style('visibility','visible')
				value_text
					.text(d.data.toFixed(1))
					.style('visibility','visible')
       		}
       		else
       		{
       			arc_lock = false;
       		}
       })
       
      .transition().delay(function(d, i) { return i * 10; }).duration(10)
  	  .attrTween('d', function(d) {
       		var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
       		return function(t) {
           		d.endAngle = i(t);
         		return arc0(d);
       		}
  		})					

       
    var g2 = svg.selectAll(".arc1")
      			.data(pie2(values[1]["yearly_values"]))
    			.enter().append("g")
      			.attr("class", "arc1")
      			.attr("id", function(d,i){return "sah1_"+i;});

	g2.append("path")
      .style("fill", function(d,i) {return colors[1]})
      .on("mouseover", function(d,i) {
      		if(!arc_lock)
       		{
      			//svg.select("#sah1_" + i).style("opacity",.7);
				d3.select("body").selectAll("#sah1_" + i).style("opacity",1);
				d3.select("body").selectAll("#sah0_" + i).style("opacity",1);
				year_text
					.text(start_year+i)
					.style('visibility','visible')
				value_text
					.text(d.data.toFixed(1))
					.style('visibility','visible')
			}
       })
       .on("mouseout",function(d,i) {
       		if(!arc_lock)
       		{
       			d3.select("body").selectAll("#sah1_" + i).style("opacity",.7);
       			d3.select("body").selectAll("#sah0_" + i).style("opacity",.7);
       			year_text.style('visibility','hidden')
       			value_text.style('visibility','hidden')
       		}
       })
       .on("click",function(d,i) {
       		svg.selectAll(".arc0").style("opacity",.7);
       		svg.selectAll(".arc1").style("opacity",.7);
       		year_text.style('visibility','hidden')
       		value_text.style('visibility','hidden')
       		if(!arc_lock)
       		{
       			arc_lock = true;
       			d3.select("body").selectAll("#sah1_" + i).style("opacity",1);
				d3.select("body").selectAll("#sah0_" + i).style("opacity",1);
				year_text
					.text(start_year+i)
					.style('visibility','visible')
				value_text
					.text(d.data.toFixed(1))
					.style('visibility','visible')
       		}
       		else
       		{
       			arc_lock = false;
       		}
       })
      .transition().delay(function(d, i) { return i * 10; }).duration(10)
  	  .attrTween('d', function(d) {
       		var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
       		return function(t) {
           		d.endAngle = i(t);
         		return arc1(d);
       		}
  		})					

	    
    arc_rad0 = (outerRadius*averages[0])/max0;
	var avg_arc0 = d3.svg.arc()
    		.innerRadius(arc_rad0-0.4)
    		.outerRadius(arc_rad0+0.4)
    		.startAngle(1.5*Math.PI)
    		.endAngle(2.5*Math.PI)
    
	svg.append("path")
    	.attr("d", avg_arc0)
    	.style("fill",colors[0])
    	
    arc_rad1 = (outerRadius*averages[1])/max1;
	var avg_arc1 = d3.svg.arc()
    		.innerRadius(arc_rad1-0.4)
    		.outerRadius(arc_rad1+0.4)
    		.startAngle(2.5*Math.PI)
    		.endAngle(3.5*Math.PI)
    
	svg.append("path")
    	.attr("d", avg_arc1)
    	.style("fill",colors[1])
};