function half_circle_spatial (elem_id,values,colors,large_height){
	yearly_values = []
	/*
	values.forEach(function(d) {
		d["yearly_values"].forEach(function(y) {
    		yearly_values.push(y);
    	})
 	});
 	*/
 	var start_year = 1960;
 	var averages = [0,0];
 	var arc_lock = false;
 	for(j=0; j < 2; j++)
 	{
 		var found = 0;
 		var total = 0;
 		
		
 		for(i=0; i < values[j]["yearly_values"].length; i++)
 		{
 			if(Number(values[j]["yearly_values"][i]) > 0)
 			{
 				found++;
 				values[j]["yearly_values"][i] = Number(values[j]["yearly_values"][i])
 				total += values[j]["yearly_values"][i]; 				
 			}
 			else
 			{
				 values[j]["yearly_values"][i] = 0;
 			}
 		}
 		while(values[j]["yearly_values"].length < 54)
 		{
 			 values[j]["yearly_values"].push(0);
 		}
		 while(values[j]["yearly_values"].length > 54)
 		{
 		 	values[j]["yearly_values"].pop();
 		}
 
 		if(found > 0)
 		{
 			averages[j] = total/found;
 		}
 		//alert(JSON.stringify(values[j]))
 		 //alert(values[j]["yearly_values"].length + " " + values[j]["yearly_values"])
 	}	
 	var number_of_years = values[0]["yearly_values"].length/2;
 	var max0 = Number.MAX_VALUE;
 	max0 = Math.max.apply(Math, values[0]["yearly_values"])
 	var max1= Number.MAX_VALUE;
 	max1 = Math.max.apply(Math, values[1]["yearly_values"])
 	
 	var margin = 28;
	large_height = large_height - margin;
	var radius  = large_height/2;
	//var colors = ["#ff9900","#CC6633"]//,"#ae3a3a"];

    var outerRadius = radius;
    var arcWidth = radius-1;
	var innerRadius = radius - arcWidth;
				
	//Make an SVG Container
 	var svg = d3.select(elem_id)
 				.append("svg")
 				.moveToFront()
    			.attr("width", (radius+margin+85)*2 + "px")
    			.attr("height", (radius+margin+6)*2 + "px")
    			.style("margin-top", -large_height-margin*2)
    			.style("z-index",5)
  				.append("g")
  				.attr("transform", "translate(" + (radius+margin+58) + "," + (radius+16) + ")");
   				
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
      				  .attr("transform","translate(" + ( - (radius + margin + 50)) + " , " + (- (radius + margin - 46)) + ")")
      				  .style("fill","#666")
      				  .style('visibility','hidden')
      				  .attr('font-size',28)
      				  .attr('font-family','Amatic SC')
      				  .style("cursor","default")
      				  
    var value_text1 = svg.append('text')
      				  .attr("transform","translate(" + ( - (radius + margin + 50)) + " , " + (- (radius + margin - 66)) + ")")
      				  .style("fill","#666")
      				  .style("font-size","10px")
      				  .style('visibility','hidden')
      				  .style("cursor","default")
      				  
     var value_text2 = svg.append('text')
      				  .attr("transform","translate(" + ( - (radius + margin + 50)) + " , " + (- (radius + margin - 270)) + ")")
      				  .style("fill","#666")
      				  .style("font-size","10px")
      				  .style('visibility','hidden')
      				  .style("cursor","default")
	
	var myLine = svg.append("line")
    				.attr("x1", -(radius + 28))
    				.attr("y1", 0)
    				.attr("x2", (radius + 28))
    				.attr("y2", 0)
    				.style("stroke", "rgba(200,200,200,.8)");
    				
    svg.append('text')
      	.attr("transform","translate(" + -(radius+28) + " , " + (-4) + ")")
      	.style('font-size',10)
      	.style("fill",colors[0])
      	.text("1960")
      	
    svg.append('text')
      	.attr("transform","translate(" + (radius + 4) + " , " + (-4) + ")")
      	.style('font-size',10)
      	.style("fill",colors[0])
      	.text("2013")
	
	svg.append('text')
      	.attr("transform","translate(" + -(radius + 28) + " , " + 12 + ")")
      	.style('font-size',10)
      	.style("fill",colors[1])
      	.text("2013")
      	
    svg.append('text')
      	.attr("transform","translate(" + (radius+4) + " , " + 12 + ")")
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
				value_text1
					.text("Aid per capita : $" + numberWithCommas(d.data.toFixed(0)))
					.style('visibility','visible')
				if(colors[1] == "#FFAD33"){
					val_text =  getIndicatorDefShort("Total")  + " : " + "$" + numberWithCommas(values[1]["yearly_values"][i].toFixed(0))
				}else if(colors[1] == "#A03737"){
					val_text =  getIndicatorDefShort("Health")  + " : " + values[1]["yearly_values"][i].toFixed(0)
				} 
				else if(colors[1] == "#6FBC1D"){
					val_text =  getIndicatorDefShort("Agriculture")  + " : " + values[1]["yearly_values"][i].toFixed(0) + "%"
				}
				else if(colors[1] == "#BC6F1D"){
					val_text =  getIndicatorDefShort("Education")  + " : " + values[1]["yearly_values"][i].toFixed(0) + "%"
				}
				else if(colors[1] == "#B6BC1D"){
					val_text =  getIndicatorDefShort("Law \& Justice")  + " : " + values[1]["yearly_values"][i].toFixed(0) + "%"
				}
				else if(colors[1] == "#1D95B9"){
					val_text = getIndicatorDefShort("Water")  + " : " +  values[1]["yearly_values"][i].toFixed(0) + "%"
				}
				value_text2
					.text(val_text)
					.style('visibility','visible')
			}
       })
       .on("mouseout",function(d,i) {
       		if(!arc_lock)
       		{
       			d3.select("body").selectAll("#sah1_" + i).style("opacity",.7);
       			d3.select("body").selectAll("#sah0_" + i).style("opacity",.7);
       			year_text.style('visibility','hidden')
       			value_text1.style('visibility','hidden')
       			value_text2.style('visibility','hidden')
       		}
       })
       .on("click",function(d,i) {
       		/*
       		svg.selectAll(".arc0").style("opacity",.7);
       		svg.selectAll(".arc1").style("opacity",.7);
       		year_text.style('visibility','hidden')
       		value_text1.style('visibility','hidden')
       		value_text2.style('visibility','hidden')
       		if(!arc_lock)
       		{
       			arc_lock = true;
       			d3.select("body").selectAll("#sah1_" + i).style("opacity",1);
				d3.select("body").selectAll("#sah0_" + i).style("opacity",1);
				year_text
					.text(start_year+i)
					.style('visibility','visible')
				value_text1
					.text(d.data.toFixed(1))
					.style('visibility','visible')
				value_text2
					.text(d.data.toFixed(1))
					.style('visibility','visible')
       		}
       		else
       		{
       			arc_lock = false;
       		}
       		*/
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
				if(colors[1] == "#FFAD33"){
					val_text =  getIndicatorDefShort("Total")  + " : " + "$" + numberWithCommas(d.data.toFixed(0))
				}else if(colors[1] == "#A03737"){
					val_text =  getIndicatorDefShort("Health")  + " : " + d.data.toFixed(0)
				} 
				else if(colors[1] == "#6FBC1D"){
					val_text =  getIndicatorDefShort("Agriculture")  + " : " + d.data.toFixed(0) + "%"
				}
				else if(colors[1] == "#BC6F1D"){
					val_text =  getIndicatorDefShort("Education")  + " : " + d.data.toFixed(0) + "%"
				}
				else if(colors[1] == "#B6BC1D"){
					val_text =  getIndicatorDefShort("Law \& Justice")  + " : " + d.data.toFixed(0) + "%"
				}
				else if(colors[1] == "#1D95B9"){
					val_text = getIndicatorDefShort("Water")  + " : " +  d.data.toFixed(0) + "%"
				}
				value_text1
					.text("Aid per capita : $" + numberWithCommas(values[0]["yearly_values"][i].toFixed(0)))
					.style('visibility','visible')
				value_text2
					.text(val_text)
					.style('visibility','visible')
			}
       })
       .on("mouseout",function(d,i) {
       		if(!arc_lock)
       		{
       			d3.select("body").selectAll("#sah1_" + i).style("opacity",.7);
       			d3.select("body").selectAll("#sah0_" + i).style("opacity",.7);
       			year_text.style('visibility','hidden')
       			value_text1.style('visibility','hidden')
       			value_text2.style('visibility','hidden')
       		}
       })
       .on("click",function(d,i) {
       		/*
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
       		*/
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