function addoption(txt, valu){
	$("#dropselect")[0].options.add( new Option(txt,valu) );
}

function removeoption(valu){
	$("#dropselect").children().filter(function(index, option) {
	    return option.value===valu;
	}).remove();
}

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
  this.parentNode.appendChild(this);
  });
};

function getIndicatorDef(res){
	var definiton = [
					  "<span style='font-size:9px;'>Gross Domestic Product (GDP)</span></br><span style='font-size:8px;'>(current US$, per capita)</span>",
					  "<span style='font-size:9px;'>Agricultural irrigated land</span></br><span style='font-size:8px;'>(% of total agricultural land)</span>",
					  "<span style='font-size:9px;'>Primary completion rate</span></br><span style='font-size:8px;'>(% of relevant age group)</span>",
					  "<span style='font-size:9px;'>Maternal mortality ratio</span></br><span style='font-size:8px;'>(per 100,000 live births)</span>",
					  "<span style='font-size:9px;'>Informal payments to public officials</span></br><span style='font-size:8px;'>(% of firms)</span>",
					  "<span style='font-size:9px;'>Improved water source</span></br><span style='font-size:8px;'>(% of population with access)</span>"
					  ]
	if(res == "Total" || res == "All" || res == "") {
		return definiton[0];
	}
	else if(res == "Law & Justice" ) {
		return definiton[4];
	}
	else if(res == "Agriculture" ) {
		return definiton[1];
	}
	else if(res == "Water" ) {
		return definiton[5];
	}			
	else if(res == "Health" ) {
		return definiton[3];
	}
	else if(res == "Education" ) {
		return definiton[2];
	}
	return "unknown"

}


function getIndicatorDefShort(res) {
	var definiton = [
					  "GDP (per cap.)",
					  "Agricultural irrigated land",
					  "Primary completion rate",
					  "Maternal mortality ratio",
					  "Informal payments",
					  "Improved water sources"
					  ]
	if(res == "Total" || res == "All" || res == "") {
		return definiton[0];
	}
	else if(res == "Law & Justice" ) {
		return definiton[4];
	}
	else if(res == "Agriculture" ) {
		return definiton[1];
	}
	else if(res == "Water" ) {
		return definiton[5];
	}			
	else if(res == "Health" ) {
		return definiton[3];
	}
	else if(res == "Education" ) {
		return definiton[2];
	}
	return "unknown"

	
}

function parseDateCustom(str) {
	str = "01.01." + str;
    var dateParts = str.split(".");
    if (dateParts.length != 3)
        return null;
    var year = dateParts[2];
    var month = dateParts[1];
    var day = dateParts[0];

    if (isNaN(day) || isNaN(month) || isNaN(year))
        return null;

    var result = new Date(year, (month - 1), day);
    if (result == null)
        return null;
    if (result.getDate() != day)
        return null;
    if (result.getMonth() != (month - 1))
        return null;
    if (result.getFullYear() != year)
        return null;

    return result;
}

function dynamicSort(property) {
    var sortOrder = 1;
	var isnumber = true;
	
	//console.log(property + " : property msg from util")
	
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
			
			
			if(b[property] === undefined)  {
				b[property] ="-1";
			}
			if(a[property] === undefined)  {
				a[property] ="-1";
			}
			
	        var result = Number(a[property]) - Number(b[property]);
	        return result * sortOrder;
	    }
	} else {
		

	    return function (a,b) {
			a[property] = a[property].toLowerCase().trim(); 
			b[property] = b[property].toLowerCase().trim();
	        var result = 0;
			if(a[property]< b[property]) result =  -1;
			if(a[property]> b[property]) result =  1;
	        a[property] = toTitleCase(a[property]); 
			b[property] = toTitleCase(b[property]);
			return result;
	    }
	}

}

function readsparklinedata() {
	
	
	
	var file = "data/reasonyear.csv";
	d3.csv(file, function(err, filedata) {
		filedata.forEach(function(line){
			if (line.reason == "Agriculture") {
				agriculture.push({
					"date" : parseDateCustom(line.date) ,
					"Date" : "Jan 1, " + line.date ,
					"Close" : ((parseInt(line.amt) / 1000000).toFixed(0)).toString(),
					"close" : parseFloat((parseInt(line.amt) / 1000000).toFixed(2))
				});
			}
			 else if (line.reason == "Water") {
				water.push({
					"date" : parseDateCustom(line.date) ,
					"Date" :  "Jan 1, " + line.date ,
					"Close" : line.amt,
					"close" : parseInt(line.amt)
				});
			} else if (line.reason == "Education") {
				
				education.push({
					"date" : parseDateCustom(line.date) ,
					"Date" :  "Jan 1, " + line.date ,
					"Close" : line.amt,
					"close" : parseInt(line.amt)
				});
			} else if (line.reason == "Law&Justice") {
			
				law.push({
					"date" : parseDateCustom(line.date) ,
					"Date" :  "Jan 1, " + line.date ,
					"Close" : line.amt,
					"close" : parseInt(line.amt)
				});
			} else if (line.reason == "Health") {
			
				health.push({
					"date" : parseDateCustom(line.date) ,
					"Date" :  "Jan 1, " + line.date ,
					"Close" : line.amt,
					"close" : parseInt(line.amt) / 100
				});
			}
				
		
		});
		
	});
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function numberWithCommas(x) {
	if(x == null)
		return "0"
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function fillHoverContent(d,map_id)
{
	var content = "";
	if(map_id == 0)
	{
		content = "Precinct " + d["policeprecinct"];
	}
	else if(map_id == 1)
	{
		content = d["neighborhood"] + "<br/>" + d["borough"];
	}
	else if(map_id == 2)
	{
		content = "District " + d["citycouncildistrict"];
	}
	else if(map_id == 3)
	{
		content = d["postalCode"] + "<br/>" + d["borough"];
	}
	else if(map_id == 4)
	{
		dist  = new String(d["communitydistrict"]).replace(/^[\d][0]*/g,"");
		content = d["borough"] + "<br/>" + "District " + dist;
	}   	
	else if(map_id == 5)
	{
		content = d["borough"];
	}   		
	return content;
}

// Color Generator
//theColorBegin = "#D6EBFD";
//theColorEnd = "#3399FF";
//theNumSteps = number_of_keys;
function generateColorRamp(begin,end,theNumSteps)
{
	var colors = [];
	theColorBegin = resolve_color(begin);
	theColorEnd = resolve_color(end);

  	theR0 = theColorBegin[0];
  	theG0 = theColorBegin[1];
  	theB0 = theColorBegin[2];
  	
  	theR1 = theColorEnd[0];
  	theG1 = theColorEnd[1];
  	theB1 = theColorEnd[2];
  	// return the interpolated value between pBegin and pEnd
  	function interpolate(pBegin, pEnd, pStep, pMax) {
    	if (pBegin <= pEnd) {
			return ((pEnd - pBegin) * (pStep / pMax)) + pBegin;
  		} 
  		else 
  		{
			return ((pBegin - pEnd) * (1 - (pStep / pMax))) + pEnd;
		}
 	}

  	function generateColor(){
    	for (i = 0; i < theNumSteps; i++) {
			theR = interpolate(theR0, theR1, i, theNumSteps);
 			theG = interpolate(theG0, theG1, i, theNumSteps);
 			theB = interpolate(theB0, theB1, i, theNumSteps);
  			theVal = ((( theR << 8 ) |  theG ) << 8 ) | theB;
      		colors[i] = parseColor(theVal);
      	}
  	}				
	generateColor();
	
	return colors;
}

function resolve_color(color){
    // return an array containing R, G and B values
    if(color === 'transparent')// IE (6 and ?)
        color = '#FFF';
    
    var r,g,b;
    var hex_color_pcre = new RegExp("^#[0-9a-f]{3}([0-9a-f]{3})?$",'gi');
    var rgb_color_pcre = new RegExp("rgb\\(\\s*((?:[0-2]?[0-9])?[0-9])\\s*,\\s*((?:[0-2]?[0-9])?[0-9])\\s*,\\s*((?:[0-2]?[0-9])?[0-9])\\s*\\)$",'gi');
    var rgb_percent_color_pcre = new RegExp("rgb\\(\\s*((?:[0-1]?[0-9])?[0-9])%\\s*,\\s*((?:[0-1]?[0-9])?[0-9])%\\s*,\\s*((?:[0-1]?[0-9])?[0-9])%\\s*\\)$",'gi');
    if(color.match(hex_color_pcre)){
        if(color.length == 4){
            r  = color.charAt(1)+""+color.charAt(1);
            g  = color.charAt(2)+""+color.charAt(2);
            b  = color.charAt(3)+""+color.charAt(3);
        }
        else{
            r  = color.charAt(1)+""+color.charAt(2);
            g  = color.charAt(3)+""+color.charAt(4);
            b  = color.charAt(5)+""+color.charAt(6);
        }
        r = h2d(r);
        g = h2d(g);
        b = h2d(b);
    }
    else if(color.match(rgb_color_pcre)){
        r = RegExp.$1;
        g = RegExp.$2;
        b = RegExp.$3;
    }
    else if(color.match(rgb_percent_color_pcre)){
        r = parseInt((RegExp.$1)*2.55);
        g = parseInt((RegExp.$2)*2.55);
        b = parseInt((RegExp.$3)*2.55);
    }
    else
        return false;
    var returned =[r,g,b]
    return returned;
}

function h2d(h) {
    // hex to decimal
    return parseInt(h,16);
} 

function parseColor(color) {

	if (typeof color === 'number') {
		//make sure our hexadecimal number is padded out
		color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
	}

	return color;

};

function closestPoint(pathNode, point) {
  var pathLength = pathNode.getTotalLength(),
      precision = pathLength / pathNode.pathSegList.numberOfItems * .125,
      best,
      bestLength,
      bestDistance = Infinity;
 
  // linear scan for coarse approximation
  for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
    if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
      best = scan, bestLength = scanLength, bestDistance = scanDistance;
    }
  }
 
  // binary search for precise estimate
  precision *= .5;
  while (precision > .5) {
    var before,
        after,
        beforeLength,
        afterLength,
        beforeDistance,
        afterDistance;
    if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
      best = before, bestLength = beforeLength, bestDistance = beforeDistance;
    } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
      best = after, bestLength = afterLength, bestDistance = afterDistance;
    } else {
      precision *= .5;
    }
  }
 
  best = [best.x, best.y];
  best.distance = Math.sqrt(bestDistance);
  return best;
 
  function distance2(p) {
    var dx = p.x - point[0],
        dy = p.y - point[1];
    return dx * dx + dy * dy;
  }
}