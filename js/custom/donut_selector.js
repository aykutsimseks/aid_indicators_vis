function drawDonut(sortorder , reason) {
			var elem_id = "#donut_selector"
			
			var timer = setTimeout(function() {

  			var complete = true;//flag to wait for ajax completion
  			var purposes = [{"purpose":"Health"},{"purpose":"Education"},{"purpose":"Agriculture"},{"purpose":"Law & Justice"},{"purpose":"Water"}];
      		var stockdata = [{"Date":"Dec 18, 2013","Close":"1084.75","close":1084.75},{"Date":"Dec 17, 2013","Close":"1069.86","close":1069.86},{"Date":"Dec 16, 2013","Close":"1072.98","close":1072.98},{"Date":"Dec 13, 2013","Close":"1060.79","close":1060.79},{"Date":"Dec 12, 2013","Close":"1069.96","close":1069.96},{"Date":"Dec 11, 2013","Close":"1077.29","close":1077.29},{"Date":"Dec 10, 2013","Close":"1084.66","close":1084.66},{"Date":"Dec 9, 2013","Close":"1078.14","close":1078.14},{"Date":"Dec 6, 2013","Close":"1069.87","close":1069.87},{"Date":"Dec 5, 2013","Close":"1057.34","close":1057.34},{"Date":"Dec 4, 2013","Close":"1058.18","close":1058.18},{"Date":"Dec 3, 2013","Close":"1053.26","close":1053.26},{"Date":"Dec 2, 2013","Close":"1054.48","close":1054.48},{"Date":"Nov 29, 2013","Close":"1059.59","close":1059.59},{"Date":"Nov 27, 2013","Close":"1063.11","close":1063.11},{"Date":"Nov 26, 2013","Close":"1058.41","close":1058.41},{"Date":"Nov 25, 2013","Close":"1045.93","close":1045.93},{"Date":"Nov 22, 2013","Close":"1031.89","close":1031.89},{"Date":"Nov 21, 2013","Close":"1034.07","close":1034.07},{"Date":"Nov 20, 2013","Close":"1022.31","close":1022.31},{"Date":"Nov 19, 2013","Close":"1025.20","close":1025.2},{"Date":"Nov 18, 2013","Close":"1031.55","close":1031.55},{"Date":"Nov 15, 2013","Close":"1033.56","close":1033.56},{"Date":"Nov 14, 2013","Close":"1035.23","close":1035.23},{"Date":"Nov 13, 2013","Close":"1032.47","close":1032.47},{"Date":"Nov 12, 2013","Close":"1011.78","close":1011.78},{"Date":"Nov 11, 2013","Close":"1010.59","close":1010.59},{"Date":"Nov 8, 2013","Close":"1016.03","close":1016.03},{"Date":"Nov 7, 2013","Close":"1007.95","close":1007.95},{"Date":"Nov 6, 2013","Close":"1022.75","close":1022.75},{"Date":"Nov 5, 2013","Close":"1021.52","close":1021.52},{"Date":"Nov 4, 2013","Close":"1026.11","close":1026.11},{"Date":"Nov 1, 2013","Close":"1027.04","close":1027.04},{"Date":"Oct 31, 2013","Close":"1030.58","close":1030.58},{"Date":"Oct 30, 2013","Close":"1030.42","close":1030.42},{"Date":"Oct 29, 2013","Close":"1036.24","close":1036.24},{"Date":"Oct 28, 2013","Close":"1015.00","close":1015},{"Date":"Oct 25, 2013","Close":"1015.20","close":1015.2},{"Date":"Oct 24, 2013","Close":"1025.55","close":1025.55},{"Date":"Oct 23, 2013","Close":"1031.41","close":1031.41},{"Date":"Oct 22, 2013","Close":"1007.00","close":1007},{"Date":"Oct 21, 2013","Close":"1003.30","close":1003.3},{"Date":"Oct 18, 2013","Close":"1011.41","close":1011.41},{"Date":"Oct 17, 2013","Close":"888.79","close":888.79},{"Date":"Oct 16, 2013","Close":"898.03","close":898.03},{"Date":"Oct 15, 2013","Close":"882.01","close":882.01},{"Date":"Oct 14, 2013","Close":"876.11","close":876.11},{"Date":"Oct 11, 2013","Close":"871.99","close":871.99},{"Date":"Oct 10, 2013","Close":"868.24","close":868.24},{"Date":"Oct 9, 2013","Close":"855.86","close":855.86},{"Date":"Oct 8, 2013","Close":"853.67","close":853.67},{"Date":"Oct 7, 2013","Close":"865.74","close":865.74},{"Date":"Oct 4, 2013","Close":"872.35","close":872.35},{"Date":"Oct 3, 2013","Close":"876.09","close":876.09},{"Date":"Oct 2, 2013","Close":"887.99","close":887.99},{"Date":"Oct 1, 2013","Close":"887.00","close":887},{"Date":"Sep 30, 2013","Close":"875.91","close":875.91},{"Date":"Sep 27, 2013","Close":"876.39","close":876.39},{"Date":"Sep 26, 2013","Close":"878.17","close":878.17},{"Date":"Sep 25, 2013","Close":"877.23","close":877.23},{"Date":"Sep 24, 2013","Close":"886.84","close":886.84},{"Date":"Sep 23, 2013","Close":"886.50","close":886.5},{"Date":"Sep 20, 2013","Close":"903.11","close":903.11},{"Date":"Sep 19, 2013","Close":"898.39","close":898.39},{"Date":"Sep 18, 2013","Close":"903.32","close":903.32},{"Date":"Sep 17, 2013","Close":"886.11","close":886.11},{"Date":"Sep 16, 2013","Close":"887.76","close":887.76},{"Date":"Sep 13, 2013","Close":"889.07","close":889.07},{"Date":"Sep 12, 2013","Close":"893.06","close":893.06},{"Date":"Sep 11, 2013","Close":"896.19","close":896.19},{"Date":"Sep 10, 2013","Close":"888.67","close":888.67},{"Date":"Sep 9, 2013","Close":"888.05","close":888.05},{"Date":"Sep 6, 2013","Close":"879.58","close":879.58},{"Date":"Sep 5, 2013","Close":"879.56","close":879.56},{"Date":"Sep 4, 2013","Close":"871.63","close":871.63},{"Date":"Sep 3, 2013","Close":"860.38","close":860.38},{"Date":"Aug 30, 2013","Close":"846.90","close":846.9},{"Date":"Aug 29, 2013","Close":"855.43","close":855.43},{"Date":"Aug 28, 2013","Close":"848.55","close":848.55},{"Date":"Aug 27, 2013","Close":"850.15","close":850.15},{"Date":"Aug 26, 2013","Close":"866.39","close":866.39},{"Date":"Aug 23, 2013","Close":"870.21","close":870.21},{"Date":"Aug 22, 2013","Close":"873.71","close":873.71},{"Date":"Aug 21, 2013","Close":"869.33","close":869.33},{"Date":"Aug 20, 2013","Close":"865.42","close":865.42},{"Date":"Aug 19, 2013","Close":"865.65","close":865.65},{"Date":"Aug 16, 2013","Close":"856.91","close":856.91},{"Date":"Aug 15, 2013","Close":"859.66","close":859.66},{"Date":"Aug 14, 2013","Close":"869.81","close":869.81},{"Date":"Aug 13, 2013","Close":"881.25","close":881.25},{"Date":"Aug 12, 2013","Close":"885.51","close":885.51},{"Date":"Aug 9, 2013","Close":"890.41","close":890.41},{"Date":"Aug 8, 2013","Close":"892.66","close":892.66},{"Date":"Aug 7, 2013","Close":"890.65","close":890.65},{"Date":"Aug 6, 2013","Close":"896.57","close":896.57},{"Date":"Aug 5, 2013","Close":"905.00","close":905},{"Date":"Aug 2, 2013","Close":"906.57","close":906.57},{"Date":"Aug 1, 2013","Close":"904.22","close":904.22},{"Date":"Jul 31, 2013","Close":"887.75","close":887.75},{"Date":"Jul 30, 2013","Close":"890.92","close":890.92},{"Date":"Jul 29, 2013","Close":"882.27","close":882.27},{"Date":"Jul 26, 2013","Close":"885.35","close":885.35},{"Date":"Jul 25, 2013","Close":"887.70","close":887.7},{"Date":"Jul 24, 2013","Close":"902.90","close":902.9},{"Date":"Jul 23, 2013","Close":"903.80","close":903.8},{"Date":"Jul 22, 2013","Close":"910.70","close":910.7},{"Date":"Jul 19, 2013","Close":"896.60","close":896.6},{"Date":"Jul 18, 2013","Close":"910.68","close":910.68},{"Date":"Jul 17, 2013","Close":"918.55","close":918.55},{"Date":"Jul 16, 2013","Close":"919.61","close":919.61},{"Date":"Jul 15, 2013","Close":"924.69","close":924.69},{"Date":"Jul 12, 2013","Close":"923.00","close":923},{"Date":"Jul 11, 2013","Close":"920.24","close":920.24},{"Date":"Jul 10, 2013","Close":"905.99","close":905.99},{"Date":"Jul 9, 2013","Close":"905.24","close":905.24},{"Date":"Jul 8, 2013","Close":"905.09","close":905.09},{"Date":"Jul 5, 2013","Close":"893.49","close":893.49},{"Date":"Jul 3, 2013","Close":"886.43","close":886.43},{"Date":"Jul 2, 2013","Close":"882.31","close":882.31},{"Date":"Jul 1, 2013","Close":"887.88","close":887.88},{"Date":"Jun 28, 2013","Close":"880.37","close":880.37},{"Date":"Jun 27, 2013","Close":"877.07","close":877.07},{"Date":"Jun 26, 2013","Close":"873.65","close":873.65},{"Date":"Jun 25, 2013","Close":"866.20","close":866.2},{"Date":"Jun 24, 2013","Close":"869.79","close":869.79},{"Date":"Jun 21, 2013","Close":"880.93","close":880.93},{"Date":"Jun 20, 2013","Close":"884.74","close":884.74},{"Date":"Jun 19, 2013","Close":"900.68","close":900.68},{"Date":"Jun 18, 2013","Close":"900.62","close":900.62},{"Date":"Jun 17, 2013","Close":"886.25","close":886.25},{"Date":"Jun 14, 2013","Close":"875.04","close":875.04},{"Date":"Jun 13, 2013","Close":"877.00","close":877},{"Date":"Jun 12, 2013","Close":"871.98","close":871.98},{"Date":"Jun 11, 2013","Close":"879.81","close":879.81},{"Date":"Jun 10, 2013","Close":"890.22","close":890.22},{"Date":"Jun 7, 2013","Close":"879.73","close":879.73},{"Date":"Jun 6, 2013","Close":"864.64","close":864.64},{"Date":"Jun 5, 2013","Close":"859.70","close":859.7},{"Date":"Jun 4, 2013","Close":"859.10","close":859.1},{"Date":"Jun 3, 2013","Close":"867.63","close":867.63},{"Date":"May 31, 2013","Close":"871.22","close":871.22},{"Date":"May 30, 2013","Close":"870.76","close":870.76},{"Date":"May 29, 2013","Close":"868.31","close":868.31},{"Date":"May 28, 2013","Close":"881.27","close":881.27},{"Date":"May 24, 2013","Close":"873.32","close":873.32},{"Date":"May 23, 2013","Close":"882.79","close":882.79},{"Date":"May 22, 2013","Close":"889.42","close":889.42},{"Date":"May 21, 2013","Close":"906.97","close":906.97},{"Date":"May 20, 2013","Close":"908.53","close":908.53},{"Date":"May 17, 2013","Close":"909.18","close":909.18},{"Date":"May 16, 2013","Close":"903.87","close":903.87},{"Date":"May 15, 2013","Close":"915.89","close":915.89},{"Date":"May 14, 2013","Close":"887.10","close":887.1},{"Date":"May 13, 2013","Close":"877.53","close":877.53},{"Date":"May 10, 2013","Close":"880.23","close":880.23},{"Date":"May 9, 2013","Close":"871.48","close":871.48},{"Date":"May 8, 2013","Close":"873.63","close":873.63},{"Date":"May 7, 2013","Close":"857.23","close":857.23},{"Date":"May 6, 2013","Close":"861.55","close":861.55},{"Date":"May 3, 2013","Close":"845.72","close":845.72},{"Date":"May 2, 2013","Close":"829.61","close":829.61},{"Date":"May 1, 2013","Close":"820.43","close":820.43},{"Date":"Apr 30, 2013","Close":"824.57","close":824.57},{"Date":"Apr 29, 2013","Close":"819.06","close":819.06},{"Date":"Apr 26, 2013","Close":"801.42","close":801.42},{"Date":"Apr 25, 2013","Close":"809.10","close":809.1},{"Date":"Apr 24, 2013","Close":"813.45","close":813.45},{"Date":"Apr 23, 2013","Close":"807.90","close":807.9},{"Date":"Apr 22, 2013","Close":"800.11","close":800.11},{"Date":"Apr 19, 2013","Close":"799.87","close":799.87},{"Date":"Apr 18, 2013","Close":"765.91","close":765.91},{"Date":"Apr 17, 2013","Close":"782.56","close":782.56},{"Date":"Apr 16, 2013","Close":"793.37","close":793.37},{"Date":"Apr 15, 2013","Close":"781.93","close":781.93},{"Date":"Apr 12, 2013","Close":"790.05","close":790.05},{"Date":"Apr 11, 2013","Close":"790.39","close":790.39},{"Date":"Apr 10, 2013","Close":"790.18","close":790.18},{"Date":"Apr 9, 2013","Close":"777.65","close":777.65},{"Date":"Apr 8, 2013","Close":"774.85","close":774.85},{"Date":"Apr 5, 2013","Close":"783.05","close":783.05},{"Date":"Apr 4, 2013","Close":"795.07","close":795.07},{"Date":"Apr 3, 2013","Close":"806.20","close":806.2},{"Date":"Apr 2, 2013","Close":"813.04","close":813.04},{"Date":"Apr 1, 2013","Close":"801.19","close":801.19},{"Date":"Mar 28, 2013","Close":"794.19","close":794.19},{"Date":"Mar 27, 2013","Close":"802.66","close":802.66},{"Date":"Mar 26, 2013","Close":"812.42","close":812.42},{"Date":"Mar 25, 2013","Close":"809.64","close":809.64},{"Date":"Mar 22, 2013","Close":"810.31","close":810.31},{"Date":"Mar 21, 2013","Close":"811.26","close":811.26},{"Date":"Mar 20, 2013","Close":"814.71","close":814.71},{"Date":"Mar 19, 2013","Close":"811.32","close":811.32},{"Date":"Mar 18, 2013","Close":"807.79","close":807.79},{"Date":"Mar 15, 2013","Close":"814.30","close":814.3},{"Date":"Mar 14, 2013","Close":"821.54","close":821.54},{"Date":"Mar 13, 2013","Close":"825.31","close":825.31},{"Date":"Mar 12, 2013","Close":"827.61","close":827.61},{"Date":"Mar 11, 2013","Close":"834.82","close":834.82},{"Date":"Mar 8, 2013","Close":"831.52","close":831.52},{"Date":"Mar 7, 2013","Close":"832.60","close":832.6},{"Date":"Mar 6, 2013","Close":"831.38","close":831.38},{"Date":"Mar 5, 2013","Close":"838.60","close":838.6},{"Date":"Mar 4, 2013","Close":"821.50","close":821.5},{"Date":"Mar 1, 2013","Close":"806.19","close":806.19},{"Date":"Feb 28, 2013","Close":"801.20","close":801.2},{"Date":"Feb 27, 2013","Close":"799.78","close":799.78},{"Date":"Feb 26, 2013","Close":"790.13","close":790.13},{"Date":"Feb 25, 2013","Close":"790.77","close":790.77},{"Date":"Feb 22, 2013","Close":"799.71","close":799.71},{"Date":"Feb 21, 2013","Close":"795.53","close":795.53},{"Date":"Feb 20, 2013","Close":"792.46","close":792.46},{"Date":"Feb 19, 2013","Close":"806.85","close":806.85},{"Date":"Feb 15, 2013","Close":"792.89","close":792.89},{"Date":"Feb 14, 2013","Close":"787.82","close":787.82},{"Date":"Feb 13, 2013","Close":"782.86","close":782.86},{"Date":"Feb 12, 2013","Close":"780.70","close":780.7},{"Date":"Feb 11, 2013","Close":"782.42","close":782.42},{"Date":"Feb 8, 2013","Close":"785.37","close":785.37},{"Date":"Feb 7, 2013","Close":"773.95","close":773.95},{"Date":"Feb 6, 2013","Close":"770.17","close":770.17},{"Date":"Feb 5, 2013","Close":"765.74","close":765.74},{"Date":"Feb 4, 2013","Close":"759.02","close":759.02},{"Date":"Feb 1, 2013","Close":"775.60","close":775.6},{"Date":"Jan 31, 2013","Close":"755.69","close":755.69},{"Date":"Jan 30, 2013","Close":"753.83","close":753.83},{"Date":"Jan 29, 2013","Close":"753.68","close":753.68},{"Date":"Jan 28, 2013","Close":"750.73","close":750.73},{"Date":"Jan 25, 2013","Close":"753.67","close":753.67},{"Date":"Jan 24, 2013","Close":"753.83","close":753.83},{"Date":"Jan 23, 2013","Close":"741.50","close":741.5},{"Date":"Jan 22, 2013","Close":"702.87","close":702.87},{"Date":"Jan 18, 2013","Close":"704.51","close":704.51},{"Date":"Jan 17, 2013","Close":"711.32","close":711.32},{"Date":"Jan 16, 2013","Close":"715.19","close":715.19},{"Date":"Jan 15, 2013","Close":"724.93","close":724.93},{"Date":"Jan 14, 2013","Close":"723.25","close":723.25},{"Date":"Jan 11, 2013","Close":"739.99","close":739.99},{"Date":"Jan 10, 2013","Close":"741.48","close":741.48},{"Date":"Jan 9, 2013","Close":"738.12","close":738.12},{"Date":"Jan 8, 2013","Close":"733.30","close":733.3},{"Date":"Jan 7, 2013","Close":"734.75","close":734.75},{"Date":"Jan 4, 2013","Close":"737.97","close":737.97},{"Date":"Jan 3, 2013","Close":"723.67","close":723.67},{"Date":"Jan 2, 2013","Close":"723.25","close":723.25}]
      		stockdata = agriculture;
			
			
      		var images = ["images/health.png","images/education.png","images/agriculture.png","images/law&justice.png","images/water.png"]
      		
      		// this is the main function after reading data
			var selected_year = "Avg: $1103";
			var margin = 0,
				width = 165 - margin*2,
				height = width,
    			radius = Math.min(width, height) / 2 -2,
    			outerRadius = radius,
    			arcWidth = 24,
				innerRadius = radius - arcWidth;
					
			var lock = [];
			var complaints = [];
					
			var svg = d3.select(elem_id).append("svg")
    					.attr("width", width)
    					.attr("height", height)
  						.append("g")
    					.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	
			//var colors = ["#8A0808", "#B45F04", "#5FB404", "#AEB404", "#0489B1"];
			var colors = ["#962121","#BC6F1D","#6FBC1D","#B6BC1D","#1D95B9"]	
			//var colors = ["#BC7171","#D4A36E","#AED980","#D0D46E","#A4D4E3"]				
			var arc = d3.svg.arc()
    					.outerRadius(outerRadius)
    					.innerRadius(innerRadius);

			var pie = d3.layout.pie()
    					.sort(null)
    					.value(function(d) { return 1; })
    					.startAngle(1*Math.PI)
    					.endAngle(3*Math.PI);

  			var g = svg.selectAll(".arc")
      					.data(pie(purposes))
    					.enter().append("g")
      					.attr("class", "arc")
      					.attr("id", function(d,i){return "sa"+i;});

  			g.append("path")
      			.style("fill", function(d,i) { return colors[i]; })
      			.transition().delay(function(d, i) { return 100; }).duration(400)
  				.attrTween('d', function(d) {
       				var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
       				return function(t) {
           				d.endAngle = i(t);
         				return arc(d);
       				}
  				})					
  				.attr("id", function(d,i){return "sa"+i;});
					
			 /*Create the circle for each block */
    		var circle = g.append("circle")
	    					 .attr("r", function(d){return innerRadius-2} )
	    					 .attr("fill","#eee")
	    					 //.attr("fill","#E0F8F7")
	    					 .attr("stroke-width",0)
	    					 .style("cursor","default")
	    						    						     		    		     
      		var circle_text = g.append('text')
      							 .attr("transform","translate(0, -8)")
      						     .attr('class', 'donut_hover')
      						     .style("fill","#666")
      							 .text("Select a Purpose")	
      							 .style("cursor","default")
	
      		var circle_image = g.append("svg:image")
   						.attr('width', 28)
   						.attr('height', 28)
   						.attr("transform","translate(-14, -48)")
   						.style("visibility", "hidden")
   						.style("cursor","default")
   			
   			var year_text = g.append('text')
      							 .attr("transform","translate(0, 38)")
      						     .attr('class', 'donut_hover')
      						     .style("fill","#fff")
      						     .style("font-size",11)
      						     .style("font-weight",300)
      							 .text(selected_year)
      							 .attr('visibility','hidden')	
      							 .style("cursor","default")		
      				
      		g.attr("id", "thing")
    			.append("text")
    			.attr("dy", ((arcWidth+10)/2))
    			.attr('fill', '#fff')
    			.attr('font-size',11)
    			.style("letter-spacing",2)
    			.attr("text-anchor", "middle")
    			.attr("pointer-events", "none")
    			.append("textPath")
    			.attr('startOffset', '23%')
  				.text(function(d){ return d.data["purpose"]})
  				.attr("xlink:href",function(d,i){return "#sa"+i;})
      				
	    	function mouseOver(d,i)
	 		{	
	 	 		circle.style("visibility", "visible")
      					.attr("fill",colors[i])
      					
      			circle_text.text(d.data["purpose"])
      						 .style("fill","#fff")
      						 
      			year_text.attr('visibility','visible')
      						    
      			circle_image.attr("xlink:href",images[i])
      						.style("visibility", "visible")	
      									 
      			sparkline.attr('visibility','visible')  					
	 	 	}
					
					
			function mouseOut(d,i) {
				if(lock.length == 0)
				{
      				circle.attr("fill","#eee")
      				
      				circle_text.style("fill","#666")
      							 .text("Select a Purpose")	
      				
      				year_text.attr('visibility','hidden')
      				 
      				circle_image.style("visibility", "hidden")	
      						
      				sparkline.attr('visibility','hidden')
				}
				else
				{
					circle.attr("fill",colors[lock[2]])
      				
      				circle_text.text(lock[1].data["purpose"])
      							 .style("fill","#fff") 
      							 
      				year_text.attr('visibility','visible')
      				
      				circle_image.attr("xlink:href",images[lock[2]])
      						
      				sparkline.attr('visibility','visible')
				}
			}
	    			
      		g.select("path")
      			.on("mouseover", function(d,i) {
    				mouseOver(d,i);
      		 	})
      			.on("mouseout",  function(d,i) {
      				mouseOut(d,i);
      			})
      			.on("click",  function(d,i) {
      				if(lock.length > 0)
      				{
      					lock[0].style("fill-opacity", 1)
      							.style("fill",colors[lock[2]])
      				}
      				lock = [d3.select(this),d,i];
      				pie.startAngle((1+i*0.4)*Math.PI)
    					.endAngle((3+i*0.4)*Math.PI);
      				
      				d3.select(this)
      					.style("fill-opacity", 0.3)
      					.style("fill", "#000")
						drawDoreen($('#dropselect').val() , d.data.purpose);
						
      			})
      		
      		// SPARK LINE
 	 		var x = d3.scale.linear().range([0, 2*radius]);
  			var y = d3.scale.linear().range([80, 0]);
  			var parseDate = d3.time.format("%b %d, %Y").parse,
  				bisectDate = d3.bisector(function(d) { return d.date; }).right;
  			var line = d3.svg.line()
            			 .interpolate("basis")
             			 .x(function(d) { return x(d.date); })
             			 .y(function(d) { return y(d.close); });
  
  		
			
  			x.domain(d3.extent(stockdata, function(d) { return d.date; }));
  			y.domain(d3.extent(stockdata, function(d) { return d.close; }));
  
  	 		var sparkline = svg.append("g")
              				  .attr('class', 'sparkline')
              				  .attr('visibility','hidden')
              				  .attr('transform',"translate(-32,-2)")
            
            var sparkline_cursor = sparkline.append('circle')
     							.attr('class', 'sparkcircle')								
     							.attr('r', 5)
     							.attr('cx', x(stockdata[0].date))
     							.attr('cy', y(stockdata[0].close)) ;
     		  		  
      							 	 		  
  			sparkline.append('path')
  			  	 		.data([stockdata])
						.attr("d", line)
     					.attr("transform", "scale(.4,.3)")	
						.on("mousemove", function() {
							node = d3.mouse(sparkline.node())
     						sparkline_cursor.attr("cx",node[0])
     										.attr("cy",node[1])
     									

     						var x0 = x.invert(node[0]);
        					i = bisectDate(stockdata, x0, 1),
       						d0 = stockdata[i - 1],
        					d1 = stockdata[i],
        					df = x0 - d0.date > d1.date - x0 ? d1 : d0;
							
        					//console.log(df);
        					selected_year = df.Date;
    	 })
	 }, 700);
}