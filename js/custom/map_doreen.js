	var glyph_colors = ["#ff9900","#CC6633"];
	//var max_per_capita_aids = [14721,4497,10145,1615,3517,1153]
	var max_per_capita_aids = [1000,200,200,200,200,200]
	//var max_indicator_values = [46075,70.2,142.3,1330,310.3,100]
	var max_indicator_values = [5000,10,65,200,15,60]
	function drawDoreen(sortorder , reason) 
	{
		//"#8A0808", "#B45F04", "#5FB404", "#AEB404", "#0489B1"]
		switch(reason)
		{
			case "Agriculture":
  				glyph_colors = ["#ff9900","#5FB404"];
  				break;
  			case "Education":
  				glyph_colors = ["#ff9900","#B45F04"];
  				break;
  			case "Health":
  				glyph_colors = ["#ff9900","#8A0808"];
  				break;
  			case "Law \& Justice":
  				glyph_colors = ["#ff9900","#AEB404"];
  				break;
  			case "Water":
  				glyph_colors = ["#ff9900","#0489B1"];
  				break;
			default:
  				 glyph_colors = ["#ff9900","#CC6633"];
		}
		d3.select("#countrycontainer").remove();
		d3.select("#glyph_sample").remove();
		$("#reasondiv").html(reason);

		var timer = setTimeout(function() {
			var width = 1078;
			var height = 616;
			var centered;
			var elem_id = "#map_canvas"
	

			var max_pop = 50000000;
			var max_per_cap = 1000;
			
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
			half_circle("#glyph_sample",values,glyph_colors);
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
			//var file = "data/aiddata_final_education_health_water.csv";
			var file = "data/aid_vis_master_table.csv";
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
				
				
				var upper = i.all_per_capita_aid;
				var upperfactor = (upper/max_per_capita_aids[0]).toFixed(0);
				
				var lower = i.gdp_indicator_average/i.population;
				var lowerfactor = (lower  / max_indicator_values[0]).toFixed(0);
				
				if(reason == "Law & Justice" ) {
					upper = i.law_and_justice_per_capita_aid;
					upperfactor = (upper/max_per_capita_aids[4]).toFixed(0);
				    	
					lower = i.law_and_justice_indicator_average;
					lowerfactor = (lower  / max_indicator_values[4]).toFixed(0);
				}
				
				if(reason == "Agriculture" ) {
					upper = i.agriculture_per_capita_aid;
					upperfactor = (upper /max_per_capita_aids[1]).toFixed(0);
				
					lower = i.agriculture_indicator_average;
					lowerfactor = (lower  / max_indicator_values[1]).toFixed(0);
				}
				
				if(reason == "Water" ) {
					upper = i.water_per_capita_aid;
					upperfactor = (upper /max_per_capita_aids[5]).toFixed(0);
				
					lower = i.water_indicator_average;
					lowerfactor = (lower  / max_indicator_values[5]).toFixed(0);
				}
				
				if(reason == "Health" ) {
					upper = i.health_per_capita_aid;
					upperfactor = (upper/max_per_capita_aids[3]).toFixed(0);
				
					lower = i.health_indicator_average;
					lowerfactor = (lower  / max_indicator_values[3]).toFixed(0);
				}
				
				if(reason == "Education" ) {
					upper = i.education_per_capita_aid;
					upperfactor = (upper/max_per_capita_aids[2]).toFixed(0);
				
					lower = i.education_indicator_average;
					lowerfactor = (lower/max_indicator_values[2]).toFixed(0);
				}
				

				 var rec= svg.append("div")
					.attr("data-country",i.country)
					.attr("data-code", i.country_code)
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
						.text("Population:         " +
						 numberWithCommas(i.population));
				
						
						d3.select("#hover_totalaid")
						.attr("visibility","visible")
						.text("Total Aid:            " + 
						"$" + numberWithCommas(upper * i.population));
			
						
						d3.select("#hover_aidpercapita")
						.attr("visibility","visible")
						.text("Aid Per Capita:  " + "$" 
						+ numberWithCommas(upper));
			
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
								
								
						d3.select("#hover_totalaidhealth")
								.attr("visibility","hidden");
						d3.select("#hover_totalaidlaw")
								.attr("visibility","hidden");
						
						d3.select("#hover_totalaideducation")
								.attr("visibility","hidden");
						
						d3.select("#hover_totalaidwater")
								.attr("visibility","hidden");
						
						d3.select("#hover_totalaidagriculture")
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
					
					
					//working on this right now
					var values = [
						{"value":upper,"norm_value": upperfactor},
						{"value":lower,"norm_value":lowerfactor}
						];
					half_circle("#"+divname,values,glyph_colors);
					
	
			  });

			});				
		
 	
		}, 1300);
	}
	
