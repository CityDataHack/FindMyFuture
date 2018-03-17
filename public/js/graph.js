$(document).ready(function() {

	//Sliders
	var slider1 = document.getElementById("slider1");
	var slider2 = document.getElementById("slider2");
	var slider3 = document.getElementById("slider3");
	var slider4 = document.getElementById("slider4");
	var slider5 = document.getElementById("slider5");

	var outputSpan1 = document.getElementById("spiderSpan1");
	var outputSpan2 = document.getElementById("spiderSpan2");
	var outputSpan3 = document.getElementById("spiderSpan3");
	var outputSpan4 = document.getElementById("spiderSpan4");
	var outputSpan5 = document.getElementById("spiderSpan5");

	updateSliderValue(slider1, outputSpan1);
	updateSliderValue(slider2, outputSpan2);
	updateSliderValue(slider3, outputSpan3);
	updateSliderValue(slider4, outputSpan4);
	updateSliderValue(slider5, outputSpan5);

	// Update the current slider value (each time you drag the slider handle)
	slider1.oninput = function() {updateSliderValue(this, outputSpan1);	};
	slider2.oninput = function() {updateSliderValue(this, outputSpan2);	};
	slider3.oninput = function() {updateSliderValue(this, outputSpan3);	};
	slider4.oninput = function() {updateSliderValue(this, outputSpan4);	};
	slider5.oninput = function() {updateSliderValue(this, outputSpan5);	};

	function updateSliderValue(sourceSlider, targetSpan){
		targetSpan.innerHTML = ' ('+sourceSlider.value+')';
	}


	function getColorByScore(val) {
		var r, g, b;
		if (val <= 50)
		{
			r = Math.floor((255 * (val / 50))),
			g = 255,
			b = 0
		}
		else
		{
			r = 255,
			g = Math.floor((100 - val) / 50 * 255),
			b = 0
		}
		return rgbToHex(r,g,b);
	}
	function rgbToHex(r, g, b) {
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}
	function componentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	//
	var w = 800;
	var h = 800;
	// var linkDistance=010;

	//slider props
	var sizePriority = 1;
	var colorPriority = 1;
	var distancePriority = 1;

	//defaults
	var sizeDefault = 20;
	var distanceDefault = 200;
	var colorDefault = '#000';

	var colors = d3.scale.category10();

	var dataset = {
		nodes:[
			{
				name:"Nurse",
				sizeWeight:1.5,
				colorWeight:1,
				distanceWeight:0.8
			},
			{
				name:"Doctor",
				sizeWeight:0.8,
				colorWeight:1,
				distanceWeight:1.2
			},
			{
				name:"GP",
				sizeWeight:2.8,
				colorWeight:0.8,
				distanceWeight:1.3
			},
			{
				name:"Surgeon",
				sizeWeight:1.8,
				colorWeight:0.8,
				distanceWeight:1.4
			},
			{
				name:"Radiologist",
				sizeWeight:0.4,
				colorWeight:0.9,
				distanceWeight:1.4
			},
			{
				name:"Dentist",
				sizeWeight:0.5,
				colorWeight:0.5,
				distanceWeight:1.1
			},
			{
				name:"Anesthesiologist",
				sizeWeight:2.6,
				colorWeight:0.4,
				distanceWeight:1
			},
			{
				name:"Hospital Porter",
				sizeWeight:3.8,
				colorWeight:0.2,
				distanceWeight:1
			},
			{
				name:"Hospital Cleaner",
				sizeWeight:0.1,
				colorWeight:1.1,
				distanceWeight:0.6
			},
			{
				name:"Medical Receptionist",
				sizeWeight:1.1,
				colorWeight:1.4,
				distanceWeight:0.65
			},
			{
				name:"Medical Writer",
				sizeWeight:0.7,
				colorWeight:1.7,
				distanceWeight:1.3
			},
			{
				name:"Medical Researcher",
				sizeWeight:2.0,
				colorWeight:1.3,
				distanceWeight:1.1
			},
			{
				name:"Medical Data Analyst",
				sizeWeight:0.2,
				colorWeight:0.1,
				distanceWeight:1.4
			},
			{
				name:"Nutritionist",
				sizeWeight:0.5,
				colorWeight:0.1,
				distanceWeight:0.9
			},
			{
				name:"Audiologist",
				sizeWeight:0.8,
				colorWeight:0.8,
				distanceWeight:1.2
			},
			{
				name:"Phlebotomist",
				sizeWeight:1.2,
				colorWeight:0.6,
				distanceWeight:0.9
			},

		],
		edges:[
			{
				source:11,
				target:0
			},
			{
				source:5,
				target:1
			},
			{
				source:5,
				target:2
			},
			{
				source:11,
				target:7
			},
			{
				source:11,
				target:6
			},
			{
				source:11,
				target:5
			},
			{
				source:11,
				target:4
			},
			{
				source:11,
				target:3
			},
			{
				source:11,
				target:8
			},
			{
				source:11,
				target:10
			},
			{
				source:11,
				target:9
			},
			{
				source:11,
				target:11
			},
			{
				source:11,
				target:13
			},
			{
				source:11,
				target:12
			},
			{
				source:11,
				target:14
			},
			{
				source:11,
				target:15
			},

		]
	};

	var svg = d3.select(".graphvisuals").append("svg").attr({"width":w,"height":h});

	var linkDistanceFunc = function(d, i) {
		if ("distanceWeight" in d.source) {
			return [d.source["distanceWeight"] * distancePriority * distanceDefault * (1/100)*slider4.value]
		}
		return [distanceDefault]
	};

	var force = d3.layout.force()
		.nodes(dataset.nodes)
		.links(dataset.edges)
		.size([w,h])
		.linkDistance(linkDistanceFunc)
		.charge([-500])
		.theta(0.1)
		.gravity(0.05)
		.start();


	var edges = svg.selectAll("line")
		.data(dataset.edges)
		.enter()
		.append("line")
		.attr("id",function(d,i) {return 'edge'+i})
		.attr('marker-end','url(#arrowhead)')
		.style("stroke","#BBB")
		.style("pointer-events", "none");

	var nodes = svg.selectAll("circle")
		.data(dataset.nodes)
		.enter()
		.append("circle")
		.attr({"r":function(d,i) {
			if ("sizeWeight" in d) {
				return d["sizeWeight"] * sizePriority * sizeDefault * (1/100)*slider1.value;
			}
			return sizeDefault;
		}})
		.style("fill",function(d,i){
			if ("colorWeight" in d) {
				return getColorByScore(d["colorWeight"] * colorPriority * slider3.value);
			}
			return colors(i);
		})
		.call(force.drag)

	var nodelabels = svg.selectAll(".nodelabel")
		.data(dataset.nodes)
		.enter()
		.append("text")
		.attr({"x":function(d){return d.x;},
			"y":function(d){return d.y;},
			"class":"nodelabel smallfont"})
		.text(function(d){return d.name;});

	var edgepaths = svg.selectAll(".edgepath")
		.data(dataset.edges)
		.enter()
		.append('path')
		.attr({'d': function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y},
			'class':'edgepath',
			'fill-opacity':0,
			'stroke-opacity':0,
			'fill':'blue',
			'stroke':'red',
			'id':function(d,i) {return 'edgepath'+i}})
		.style("pointer-events", "none");


	svg.append('defs').append('marker')
		.attr({'id':'arrowhead',
			'viewBox':'-0 -5 10 10',
			'refX':25,
			'refY':0,
			//'markerUnits':'strokeWidth',
			'orient':'auto',
			'markerWidth':10,
			'markerHeight':10,
			'xoverflow':'visible'})
		.append('svg:path')
		.attr('d', 'M 0,-5 L 10 ,0 L 0,5')
		.attr('fill', '#ccc')
		.attr('stroke','#ccc');


	force.on("tick", function(){
		edges.attr({
			"x1": function(d){return d.source.x;},
			"y1": function(d){return d.source.y;},
			"x2": function(d){return d.target.x;},
			"y2": function(d){return d.target.y;},
		});

		nodes.attr({
			"cx":function(d){return d.x;},
			"cy":function(d){return d.y;},
			"r":function(d,i) {
				if ("sizeWeight" in d) {
					return d["sizeWeight"] * sizePriority * sizeDefault * (1/100)*slider1.value;
				}
				return sizeDefault;
			}
		})
		.style("fill",function(d,i){
			if ("colorWeight" in d) {
				return getColorByScore(d["colorWeight"] * colorPriority * slider3.value);
			}
			return colors(i);
		});

		nodelabels.attr("x", function(d) { return d.x; })
			.attr("y", function(d) { return d.y; });

		edgepaths.attr('d', function(d) { var path='M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
			//console.log(d)
			return path});

	});

	setInterval(function(){

		edges.attr({
			"x1": function(d){return d.source.x;},
			"y1": function(d){return d.source.y;},
			"x2": function(d){return d.target.x;},
			"y2": function(d){return d.target.y;},
		});

		nodes.attr({
			"cx":function(d){return d.x;},
			"cy":function(d){return d.y;},
			"r":function(d,i) {
				if ("sizeWeight" in d) {
					return d["sizeWeight"] * sizePriority * sizeDefault * (1/100)*slider1.value;
				}
				return sizeDefault;
			}
		})
			.style("fill",function(d,i){
				if ("colorWeight" in d) {
					return getColorByScore(d["colorWeight"] * colorPriority * slider3.value);
				}
				return colors(i);
			});

		nodelabels.attr("x", function(d) { return d.x; })
			.attr("y", function(d) { return d.y; });

		edgepaths.attr('d', function(d) { var path='M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
			//console.log(d)
			return path});
	}, 25)
});