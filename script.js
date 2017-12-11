var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("widget");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function widgetopen() {
	$('#popbox').dialog({
        autoOpen: true,
        height: 375,
        width: '50%',
        modal: true
        
    });
}

function widgetclose(){
	$("#popbox").modal("hide");
}
//document.getElementById("popbox").style.display ="none";
var saved =[];
function savethecharts(){
	d3.select("#savedchart")
		.append("p")
		.text("data is :["+data+"], saved charts:"+"["+saved+"]");
}
function nochange(){
	var sel = document.getElementById("chart"); 
	var showto = sel.options[sel.selectedIndex].value;
	document.getElementById("test").innerText = showto;
	
	if(showto == "pie"){
	saved.push("pie");
	piechart();
	}
	if(showto == "bar"){
	saved.push("bar");
	barchart();
	}
	if(showto == "line"){
	saved.push("line");
	linechart();
	}	
}
function selectchart() {
	var sel = document.getElementById("selectcharttype");
	var charttoshow  = sel.options[sel.selectedIndex].value;
	console.log(charttoshow);
	
	if(charttoshow == "pie"){
			piechart();
	}
	if(charttoshow == "bar"){
		barchart();
	}
	if(charttoshow == "line"){
		linechart();
	}
	widgetclose();
	
}
var data = [8, 10, 15,20];
var dataArray = data;
var linedata = data;
//document.getElementById("mydiv").innerText = data;
function addtodata() {
	val = document.getElementById("myinput").value;
	data.push(val);
	document.getElementById("mydiv").innerText = data;
}

// the following function is to add a tab 
function createtab() {
	var newdiv = document.createElement("div");
	newdiv.className="jumbotron";
	newdiv.style.width ="400px";
	newdiv.style.height ="100px";
	newdiv.style.border ="1px solid black";
	//newdiv.style.border-radius="2px";
	var cname = document.getElementById("chartname").value;
	newdiv.innerHTML ="The name of chart is "+cname;
	// adding p elements
	var newp = document.createElement("p");
	newp.innerHTML="to see the chart click on me";
	newdiv.appendChild(newp);
	document.getElementById("tab").appendChild(newdiv);
}
//createtab("hello");


// adding functionality to the save button
var savebutton = document.getElementById("modalsave");
savebutton.onclick = function() {
	createtab();
	var sel = document.getElementById("selectcharttype");
	var charttoshow  = sel.options[sel.selectedIndex].value;
	console.log(charttoshow);
	
	if(charttoshow == "pie"){
			piechart();
	}
	if(charttoshow == "bar"){
		barchart();
	}
	if(charttoshow == "line"){
		linechart();
	}
	modal.style.display = "none";
}


//piechart();barchart();linechart();
function piechart(){
	var svg = d3.select("#svg1"),
		width = svg.attr("width"),
		height = svg.attr("height"),
		radius = Math.min(width, height) / 2,
		g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

	// Generate the pie
	var pie = d3.pie();

	// Generate the arcs
	var arc = d3.arc()
				.innerRadius(0)
				.outerRadius(radius);

	//Generate groups
	var arcs = g.selectAll("arc")
				.data(pie(data))
				.enter()
				.append("g")
				.attr("class", "arc")

	//Draw arc paths
	arcs.append("path")
		.attr("fill", function(d, i) {
			return color(i);
		})
		.attr("d", arc);
}

function barchart(){

// Create variable for the SVG
var svg = d3.select("#svg2")
		  .attr("height","50%")
		  .attr("width","100%");

// Select, append to SVG, and add attributes to rectangles for bar chart
svg.selectAll("rect")
	.data(dataArray)
	.enter().append("rect")
		  .attr("class", "bar")
		  .attr("height", function(d, i) {return (d * 10)})
		  .attr("width","40")
		  .attr("x", function(d, i) {return (i * 60) + 25})
		  .attr("y", function(d, i) {return 400 - (d * 10)});

// Select, append to SVG, and add attributes to text
svg.selectAll("text")
	.data(dataArray)
	.enter().append("text")
	.text(function(d) {return d})
		   .attr("class", "text")
		   .attr("x", function(d, i) {return (i * 60) + 36})
		   .attr("y", function(d, i) {return 415 - (d * 10)});
	


}

// the following is the line chart
function linechart() {
	var points = [[50, 250]];

	for(var i=1; i<=linedata.length; i++){
		points.push([i*100,250- (10*linedata[i])]);
	}
	var m = [80, 80, 80, 80]; // margins
	var w = 1000 - m[1] - m[3]; // width
	var h = 400 - m[0] - m[2]; // height
	var xscale = d3.scaleLinear()
		.domain([0, 10])
		.range([0, 1000]);
	var x_axis = d3.axisBottom()
		.scale(xscale);
	var yscale = d3.scaleLinear()
			   .domain([0, 10])
			   .range([500, 0]);
	var y_axis = d3.axisLeft()
			   .scale(yscale);		   
			   
			   
			   
			   
	var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
	var y = d3.scale.linear().domain([0, 10]).range([h, 0]);
	var line = d3.svg.line()
	// assign the X function to plot our line as we wish
	.x(function(d,i) { 
		// verbose logging to show what's actually being done
		console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
		// return the X coordinate where we want to plot this datapoint
		return x(i); 
	})
	.y(function(d) { 
		// verbose logging to show what's actually being done
		console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
		// return the Y coordinate where we want to plot this datapoint
		return y(d); 
	})

	// Add an SVG element with the desired dimensions and margin.
	var graph = d3.select("#svg3")
		  .attr("width", w + m[1] + m[3])
		  .attr("height", h + m[0] + m[2])
		  .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

	var xAxisTranslate = 250;
	graph.append("g")
		.attr("transform", "translate(20, " + xAxisTranslate  +")")
		.call(x_axis)
	graph.append("g")
	   .attr("transform", "translate(20, -255)")
	   .call(y_axis);
	var lineGenerator = d3.line()
		.curve(d3.curveCardinal);
		
	var pathData = lineGenerator(points);
	graph.append("path")
		.attr("d",pathData)
		.attr("stroke","blue")
		.attr("stroke-width",3)
		.attr("fill","none");
	
}
