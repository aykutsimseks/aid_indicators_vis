$(function() {
	
var timer = setTimeout(function() {
	
	
	
	var width = 1078;
	var height = 604;
	var centered;
	var elem_id = "#map_canvas"
	
	//var max_aid = 97398679982;
	//var max_aid = 3000000;
	//var max_pop = 1224615000;
	//var max_pop = 239870000;
	
	//var max_pop = 35000000;
	var max_pop = 50000000;
	//var max_per_cap = 2182;
	var max_per_cap = 1103;

	//create the blue canvas
	var svg = d3.select(elem_id).append("div")
	    			.style("width", width+"px")
	    			.style("height", height+"px")
	    			//.style("background-color","#E0F8F7")
	    			//.style("border-radius","10px")
	    			//.style("stroke","#666");
	
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
	d3.csv("data/aidcountrytotal.csv", function(err, cnt) {
	  c = cnt;
	  var count = 0; 
	  var h =0;
	  var selected = null;
	  
	  cnt.forEach(function(i){
		 
		var left = (0) + "px"//((80 * count) + 4) + "px"; 
		var top = (0) + "px"//((75 * h) + 4) + "px";
	
		var divname = "circle_hover"+ "_"+ i.code;
		
		//var totalaid = parseFloat(i.agriculture) + parseFloat(i.Education) + parseFloat(i.Law) + parseFloat(i.water) + parseFloat(i.Health);
		 // var rec= svg.append("svg:rect")
		 var aid_per_capita = (i.totalaid/i.population).toFixed(0);
		 
		 var tip = i.country + " Population " + i.population + " Aid Per Capita: $"	 + aid_per_capita;
		 var rec= svg.append("div")
			.attr("data-country",i.country)
			.attr("data-code", i.code)
			.attr("data-population" , i.population)
			.attr("data-totalaid" , i.totalaid)
			.attr("data-totalaidpercap" , i.totalaid_percap)
			.attr("class", "ttip")
			//.attr("title", tip)
			.style("width","75px")
			.style("height","44px")
			.style("float","left")
			.style("cursor","pointer")
		  	.style("position" , "relative")
			.style("border" , "1px solid")
			//.style("border-radius","12px")
			.style("border-color","rgba(200,200,200,.3)")
			//.style("left" , left)
			//.style("top" , top)
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
				.text("Aid Per Capita:  " + "$" + numberWithCommas(aid_per_capita));
			
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
      							.text(i.country)	

			var values = [{"value":aid_per_capita,"norm_value": aid_per_capita/max_per_cap},{"value":parseFloat(i.population),"norm_value":parseFloat(i.population)/max_pop}];
			half_circle("#"+divname,values);
			if(count == 8) 
			{
				count = 0;
				h ++;
			}
		
	
	  });

	});				
//	var t = setTimeout(function(){
//		$(".ttip").tooltip({
//		   // tweak the position
//		   offset: [10, 2],
// 
//		   // use the "slide" effect
//		   effect: 'slide'
// 
//		// add dynamic plugin with optional configuration for bottom edge
//		}).dynamic({ bottom: { direction: 'down', bounce: true } });
//		
//	} , 2000);
 	
}, 700);
	});