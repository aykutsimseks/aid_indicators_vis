
	function dynamicSort(property) {
	    var sortOrder = 1;
		var isnumber = true;
		
		if(property === "country") 
		{
			isnumber = false;
		}
	  
	    if(property[0] === "-") {
	        sortOrder = -1;
	        property = property.substr(1);
	    }
		
		if(isnumber) {
		    return function (a,b) {
		        var result = (parseFloat(a[property]) < parseFloat(b[property])) ? -1 : 1;
		        return result * sortOrder;
		    }
		} else {
		    return function (a,b) {
		        var result = (a[property] < b[property]) ? -1 : 1;
		        return result * sortOrder;
		    }
		}

	}
	
	
	function drawDoreen(sortorder , reason) 
	{
		d3.select("#countrycontainer").remove();
		d3.select("#glyph_sample").remove();
		$("#reasondiv").html(reason);
		var timer = setTimeout(function() {
			var width = 1078;
			var height = 616;
			var centered;
			var elem_id = "#map_canvas"
	

			var max_pop = 50000000;
			var max_per_cap = 1103;
			
			//Create country container
			var svg = d3.select(elem_id).append("div")
							.attr("id" , "countrycontainer")
			    			.style("width", width+"px")
			    			.style("height", height+"px")

			
			//create sample rect
			var rect_sample = d3.select("#sample_glyph").append("div")
					.style("width","125px")
					.style("height","44px")
					.style("float","left")
				  	.style("position" , "relative")
					.attr("id", "glyph_sample" )
			var values = [{"value":max_per_cap,"norm_value": 1.2},{"value":max_pop,"norm_value":1.2}];
			half_circle("#glyph_sample",values);
			rect_sample.append('div')
						.attr('id','legendtext1')
		      			.style('top','12px')
		      			.style('left','55px')
				  		.style("position" , "absolute")
				  		.style('font-weight',300)
				  		.style('color','#333')
		      			.text("Aid per capita")
		    rect_sample.append('div')
		    			.attr('id','legendtext2')
		      			.style('top','26px')
		      			.style('left','55px')
				  		.style("position" , "absolute")
				  		.style('font-weight',300)
				  		.style('color','#333')
		      			.text("Population")
			rect_sample.selectAll("path").style("cursor","default");
	
	
			//read the file and get country + code
			var file = "data/aiddata_final_education_health_water.csv";
			d3.csv(file, function(err, cnt) {
				c = cnt;
			 	cnt.sort(dynamicSort(sortorder));
			 	var count = 0; 
			 	var h =0;
			 	var selected = null;
			 	cnt.forEach(function(i){
		 
				var left = (0) + "px"//((80 * count) + 4) + "px"; 
				var top = (0) + "px"//((75 * h) + 4) + "px";
	
				var divname = "circle_hover"+ "_"+ i.country_code;		
				
		 
				 var tip = i.country + " Population " + i.population + " Aid Per Capita: $"	 + i.all_aid_per_capita;
				 var rec= svg.append("div")
					.attr("data-country",i.country)
					.attr("data-code", i.country_code)
					.attr("data-population" , i.population)
					.attr("data-totalaid" , i.all_aid_total)
					.attr("data-totalaidpercap" , i.all_aid_per_capita)
					.attr("class", "ttip")
					.style("width","75px")
					.style("height","44px")
					.style("float","left")
					.style("cursor","pointer")
				  	.style("position" , "relative")
					.style("border" , "1px solid")
					.style("border-color","rgba(200,200,200,.3)")
					.on("mouseover", function(){ 
						d3.select("#"+divname).selectAll("path").style("opacity",1);
						d3.select("#hover_country")
						.attr("visibility","visible")
						.text($(this).attr("data-country"));
		
						d3.select("#hover_population")
						.attr("visibility","visible")
						.text("Population:         " + numberWithCommas($(this).attr("data-population")));
				
						d3.select("#hover_totalaid")
						.attr("visibility","visible")
						.text("Total Aid:            " + "$" + numberWithCommas((parseFloat($(this).attr("data-totalaid"))).toFixed(0)));
			
						d3.select("#hover_aidpercapita")
						.attr("visibility","visible")
						.text("Aid Per Capita:  " + "$" + numberWithCommas(i.all_aid_per_capita));
			
						d3.select("#hover_clicktoseemore")
								.attr("visibility","visible");

					})
					.on("mouseout",  function(d,i) {
						d3.select("#"+divname).selectAll("path").style("opacity",.8);
						d3.select("#hover_country")
								.attr("visibility","hidden");
						d3.select("#hover_population")
								.attr("visibility","hidden");
						d3.select("#hover_totalaid")
								.attr("visibility","hidden");
						d3.select("#hover_aidpercapita")
								.attr("visibility","hidden");
						d3.select("#hover_clicktoseemore")
								.attr("visibility","hidden");
					})
					.on("click",  function(d,i) {
						if(!selected)
						{
							selected = d3.select(this)
											.transition()
											.duration(300)
											.style("width","306px")
											.style("height","182px");
									
							d3.select(this)
										.select("svg")
										.transition()
										.duration(300)
										.style("width","306px")
										.style("height","182px")
										.selectAll("path")
										.attr("transform", "translate(" + 116 + "," + 70 + ")")
						}
						else
						{
							d3.select(this)
								.transition()
								.duration(300)
								.style("width","75px")
								.style("height","44px")
						
							d3.select(this)
								.select("svg")
								.transition()
								.duration(300)
								.style("width","75px")
								.style("height","44px")
								.selectAll("path")
								.attr("transform", "translate(" + 0 + "," +  0 + ")")
						
							selected = null;
						}
					})
					.attr("id", divname ); 
					
					count ++;
					var country_text = rec.append('div')
		      							.attr('class', 'country_text')
		      							.style('top','11px')
				  						.style("position" , "absolute")
		      							.text(i.country);
					var upper = i.all_aid_per_capita;
					var upperfactor = (i.all_aid_per_capita/max_per_cap).toFixed(0);
					
					var lower = i.population;
					var lowerfactor = (i.population  / max_pop).toFixed(0);
					
					if(reason == "Law & Justice" ) {
						upper = i.law_and_justice_aid_per_capita;
						upperfactor = (i.law_and_justice_aid_per_capita/max_per_cap).toFixed(0);
					    	
						lower = i.population;
						lowerfactor = (i.population  / max_pop).toFixed(0);
					}
					
					if(reason == "Agriculture" ) {
						upper = i.agriculture_aid_per_capita;
						upperfactor = (i.agriculture_aid_per_capita/max_per_cap).toFixed(0);
					
						lower = i.population;
						lowerfactor = (i.population  / max_pop).toFixed(0);
					}
					
					if(reason == "Water" ) {
						upper = i.water_aid_per_capita;
						upperfactor = (i.water_aid_per_capita/max_per_cap).toFixed(0);
					
						lower = i.population;
						lowerfactor = (i.population  / max_pop).toFixed(0);
					}
					
					if(reason == "Health" ) {
						upper = i.health_aid_per_capita;
						upperfactor = (i.health_aid_per_capita/max_per_cap).toFixed(0);
					
						lower = i.population;
						lowerfactor = (i.population  / max_pop).toFixed(0);
					}
					
					if(reason == "Education" ) {
						upper = i.education_aid_per_capita;
						upperfactor = (i.education_aid_per_capita/max_per_cap).toFixed(0);
					
						lower = i.population;
						lowerfactor = (i.population  / max_pop).toFixed(0);
					}
					
					
					//working on this right now
					var values = [
						{"value":upper,"norm_value": upperfactor},
						{"value":lower,"norm_value":lowerfactor}
						];
					half_circle("#"+divname,values);
					
					if(count == 8) 
					{
						count = 0;
						h ++;
					}
		
	
			  });

			});				
		
 	
		}, 700);
	}
	
