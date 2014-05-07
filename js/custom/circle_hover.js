$(function(){ 
	var elem_id = "#circle_hover"
	var radius  = 85;
	var margin = 2;
	//Make an SVG Container
 	var svg = d3.select("#circle_hover").append("svg")
                            .attr("width", (radius+margin)*2)
                            .attr("height", (150)*2);
                                     
 	var g = svg.append("g").attr("transform","translate("+(radius+margin)+","+(radius+margin-26)+")")
 	//Draw the Circle
					  
	var circle_country = g.append('text').attr('id','hover_country')
					.attr('class', 'circle_hover')
					.style('font-size',14)
					.style('font-weight',600)
					.style("fill","#666")
					.text("Country Name")
					.attr("visibility","hidden")
					.attr('transform','translate(0,-40)')
                    .style("text-anchor","middle")
	    					 
 	var circle_population = g.append('text')
 						.attr('id','hover_population')
      					.attr('class', 'circle_hover')
      					.style("fill","#666")
      					.text("Country Name")
      					.attr("visibility","hidden")
						.attr('transform','translate(-'+ (radius-margin) + ',-20)')
						
	var circle_totalaid = g.append('text')
					 	.attr('id','hover_totalaid')
					    .attr('class', 'circle_hover')
					    .style("fill","#666")
					    .text("Country Name")
					    .attr("visibility","hidden")
						.attr('transform','translate(-'+ (radius-margin) + ',-8)')
	
	var circle_aidpercapita = g.append('text')
					 	.attr('id','hover_aidpercapita')
					    .attr('class', 'circle_hover')
					    .style("fill","#666")
					    .text("Country Name")
					    .attr("visibility","hidden")
						.attr('transform','translate(-'+ (radius-margin) + ',6)');
	
	var circle_totalaidreason = g.append('text')
					 	.attr('id','hover_totalaidreason')
					    .attr('class', 'circle_hover')
					    .style("fill","#666")
					    .text("Country Name")
					    .attr("visibility","hidden")
						.attr('transform','translate(-'+ (radius-margin) + ',18)')
	
	
	var circle_clicktosee = g.append('text')
					 	.attr('id','hover_clicktoseemore')
					    .attr('class', 'circle_hover')
					    .style("fill","#666")
					    .text("click to see more")
					    .style("font-size",9)
					    .attr("visibility","hidden")
					    .attr("text-anchor","begin")
						.attr('transform','translate('+ (15) + ',35)')
	
	g.append("g").attr('id','hover_bar')
				 .attr('transform','translate(-85,5)')
				
	
	  
      						
});