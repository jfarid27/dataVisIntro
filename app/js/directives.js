'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('conclusion', [ function() {
    return {
      restrict: 'E',
      link: function(scope,elems, attrs){

var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
var svg = d3.select("conclusion").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });

d3.tsv("data/data.tsv", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  data.forEach(function(d) {
    d.date = parseDate(d.date);
  });

  var cities = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, temperature: +d[name]};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Temperature (ºF)");

  var city = svg.selectAll(".city")
      .data(cities)
    .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  city.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
});

      }
    };
  }]).
  directive('eyes3', [ function() {
    return {
      restrict: 'E',
      link: function(scope,elems, attrs){
         
         var window = d3.select("eyes3")

         var width = 960,
         height = 450;
         var clicked = false; 
         var svg = window.append("svg")
           .attr("width", width)
           .attr("height", height);
         var button = svg.append("text")
            .attr({ 
                   "x": width-50,
                   "y": height -40
            })
            .style({
               "font-family":"inherit",
               "font-size": 24,
               "fill":"grey"
            })
            .text("Next")
              .on("click", function(){
                 if (!clicked){
                   clicked = true;
                     
                   d3.select("rect.left")
                     .transition().duration(1200)
                     .attr("x", 450-60)

                   d3.select("rect.right")
                     .transition().duration(1200)
                     .attr("x", 450)
                 

                 } else {
                   clicked = false;
                   d3.select("rect.left")
                     .transition().duration(1200)
                     .attr("x", 270)

                   d3.select("rect.right")
                     .transition().duration(1200)
                     .attr("x", 570)
                 }
              });

        d3.select("svg").append("g").attr("class", "squares");

        var squares = d3.select("g.squares");

        squares.append("rect")
            .attr({"x":150, 
                   "y":45, 
                   "height":250, 
                   "width":300, 
                   "fill":"#FFFF00"})
        squares.append("rect")
            .attr({"x":450, 
                   "y":45, 
                   "height":250, 
                   "width":300, 
                   "fill":"grey"})
        squares.append("rect")
            .attr({"x":270, 
                   "y":95, 
                   "height":150, 
                   "width":60,
                   "class":"left",
                   "fill":"#CCCC00"})

        squares.append("rect")
            .attr({"x":570, 
                   "y":95, 
                   "height":150, 
                   "width":60, 
                   "class":"right",
                   "fill":"#CCCC00"})

 
      }
    };
  }]).
  directive('eyes2', [ function() {
    return {
      restrict: 'E',
      link: function(scope,elems, attrs){
         
         var window = d3.select("eyes2")

         var width = 960,
         height = 450;
         var colors = ["red", "blue", "green", "orange", "purple"]
         var clicked = false; 
         var svg = window.append("svg")
           .attr("width", width)
           .attr("height", height);

         var xScale = d3.scale.linear().domain([0, 1])
              .range([40, width-40]);
         var yScale = d3.scale.linear().domain([0, 1])
              .range([40, height-40]);

         svg.append("g").attr("class", "squares")
         svg.append("g").attr("class", "circles")
         svg.append("g").attr("class", "circle")

         var circles = d3.select(".circles").selectAll("circle")
            .data(scope.shapes2).enter()
            .append("circle")
             .attr({     
               "class":"bluecircle",
               "cx": -80,
               "cy": function(d) {return yScale(Math.random())},
               "r": 12,
               "fill": "blue"
             })
        

        setInterval(function(){
          d3.select(".circles").selectAll("circle.bluecircle")
            .transition().duration(1000)
            .attr("fill", function(d) {
                  return (Math.random() >= .5) ? "blue" : "#ff9900"
            })
        }, 2000)

        var squares = d3.select(".squares").selectAll("rect")
            .data(scope.shapes2).enter()
            .append("rect")
             .attr({     
               "class":"rectangle",
               "x": -80,
               "y": function(d) {return yScale(Math.random())},
               "height": 24,
               "width": 24,
               "fill": "red"
             })

        d3.select(".circle").append("circle")
             .attr({     
               "class":"redcircle",
               "cx": -80,
               "cy": function(d) {return yScale(Math.random())},
               "r": 12,
               "fill": "red"
             }).on("click", function(){

                d3.select(".redcircle")
                  .transition().duration(700)
                  .attr("fill", "#88ff00")

             })

        d3.selectAll("rect")
            .transition().duration(1000)
            .attr("x", function(d){ return xScale(Math.random())})

        d3.selectAll("circle")
            .transition().duration(1000)
            .attr("cx", function(d){ return xScale(Math.random())})
       }

    };
  }]).
  directive('eyes1', [ function() {
    return {
      restrict: 'E',
      link: function(scope,elems, attrs){
         
         var window = d3.select("eyes1")

         var width = 960,
         height = 450;
         var clicked = false; 
         var svg = window.append("svg")
           .attr("width", width)
           .attr("height", height);
 
         var xScale = d3.scale.linear()
            .domain([0,1])
            .range([40, width-40])
         var yScale = d3.scale.linear()
            .domain([0,1])
            .range([40, height-40])

         var button = svg.append("text")
            .attr({ 
                   "x": width-50,
                   "y": height -40
            })
            .style({
               "font-family":"inherit",
               "font-size": 24,
               "fill":"grey"
            })
            .text("Next")
              .on("click", function(){
                 if (!clicked){
                   clicked = true
                   phase1();
                 }
              });
         

         svg.append("g").attr("class", "circles")
         svg.append("g").attr("class", "single")

         var circlesGroup = d3.select("g.circles")

         var circles = circlesGroup.selectAll("circle")
             .data(scope.shapes1).enter()
             .append("circle")
             .attr({     
               "class":"old",
               "cx": -80,
               "cy": function(d) {return yScale(d.y)},
               "r": 12,
               "fill": "#3399FF"
             })
         
         svg.append("g")
             .append("rect")
             .attr({     
               "x": function(d) {return -80 },
               "y": function(d) {return yScale(Math.random())},
               "height": 24,
               "width": 24,
               "style": "fill: #3399FF"
             })

         circlesGroup.selectAll("circle")
            .transition()
               .delay("1000")
               .duration("2000")
            .attr({     
              "cx": function(d) {return xScale(d.x) }
            })

         svg.selectAll("rect")
            .transition()
               .delay("1000")
               .duration("2000")
            .attr({     
               "x": function(d) {return xScale(Math.random()) },
            })

         function phase2() {

              d3.select("g.single")
                .selectAll("circle").data([1]).enter().append("circle")
                   .attr({     
                     "cx": function() {return -80 },
                     "cy": function() {return yScale(Math.random()) },
                     "r": 12,
                     "style": "fill: #FF0000"
                    });
                 
              svg.selectAll("circle").transition()
                   .delay("1000")
                   .duration("2000")
                 .attr({     
                   "cx": function() {return xScale(Math.random() ) }
                 });

         };

         function phase1(){

           svg.selectAll("circle")
            .transition()
               .delay("1000")
               .duration("2000")
            .attr({     
              "cx": function(d) {return -80 }
            }).each("end", function(){

               phase2() 

            })


           svg.selectAll("rect")
            .transition()
               .delay("1000")
               .duration("2000")
            .attr({     
               "x": function(d) {return -80 },
            }).each("end", function(){ d3.select(this).remove() })

         };
            
      }
    }
  }]).
  directive('coloring', [function() {
    return {
      restrict: 'E',
      link: function(scope,elems, attrs){

         var window = d3.select("coloring")

         var width = 960,
         height = 450;
         var colors = ["red", "blue", "green", "orange", "purple"]
         
         var svg = window.append("svg")
           .attr("width", width)
           .attr("height", height);

         var cScale = d3.scale.linear()
           .domain([0, 4])
           .range([0, 255]);

         var text1 = svg.append("g")
                .attr("class", "info")
              .append("text")
                .style({"font-family":"inherit",
                    "font-size":"24",
                    "fill":"black"
                })
                .attr("y", function(d, i){
                  return 100;
                })
                .attr("x", function(d, i){
                  return 40;
                })
                .text(function(d){
                  return "Encode nominal data with different colors";
                });

         var text2 = svg.append("g")
                .attr("class", "info")
              .append("text")
                .style({"font-family":"inherit",
                    "font-size":"24",
                    "fill":"black"
                })
                .attr("y", function(d, i){
                  return 200;
                })
                .attr("x", function(d, i){
                  return 40;
                })
                .text(function(d){
                  return "Encode ordinal data with different hues";
                });


         var text3 = svg.append("g")
                .attr("class", "info")
              .append("text")
                .style({"font-family":"inherit",
                    "font-size":"24",
                    "fill":"black"
                })
                .attr("y", function(d, i){
                  return 350;
                })
                .attr("x", function(d, i){
                  return 40;
                })
                .text(function(d){
                  return "Avoid encoding quantitative data with colors, hues, volume, and area";
                });
              

         var nominal = svg.append("g").selectAll("rects")
             .data(d3.range(5)).enter()
             .append("rect")
               .attr({
                 "class": "nominal",
                 "width": 40,
                 "height": 40,
                 "x": function(d, i){return ((d) * 50) + 80 },
                 "y": 125,
                 "fill": "white"
               })

         var data = d3.range(5);

         var ordinal = svg.append("g").selectAll("rect")
             .data(data).enter()
               .append("rect")
               .attr({
                 "class":"ordinal",
                 "width": 40,
                 "height": 40,
                 "x": function(d, i){return ((d) * 50) + 80 },
                 "y": 225,
                 "fill": "white"
               })

            svg.selectAll("rect.ordinal")
              .transition().duration(1000)
                .attr("fill", function(d){
                   
                   return "rgb(" + Math.floor(cScale(d)) +","+ Math.floor(cScale(d) ) + ",0)" 
                });

            svg.selectAll("rect.nominal")
              .transition().duration(1000)
                .attr("fill", function(d){
                   return colors[d]
                });
               
      }
    };
  }]).
  directive('chapter1', [ function() {
    return {
      restrict: 'E',
      link: function(scope,elems, attrs){
         var window = d3.select("chapter1")

         var width = 960,
         height = 450,
         padding = 100,
         tableYGutter = 100,
         tableRange = 500;

         var svg = window.append("svg")
           .attr("width", width)
           .attr("height", height);

         var titles = svg.append("g").selectAll("g")
            .data(scope.datatypes)
            .enter()
            .append("g");

         var attributes = svg.append("g").selectAll("g")
            .data(scope.visAttrs)
            .enter()
            .append("g")

         var clicked = false;

         var xScale = d3.scale.ordinal();

         var yScale = d3.scale.ordinal()
           .domain(scope.datatypes.map(function(d){
             return d.name;
           }))
           .rangePoints([padding, height-50]);

         var button = svg.append("text")
            .attr({ 
                   "x": width-60,
                   "y": height -40
            })
            .style({
               "font-family":"inherit",
               "font-size": 24,
               "fill":"grey"
            })
            .text("Next")
              .on("click", function(){
                 if (!clicked){
                   clicked = true
                   removeEncodings();
                   flipDataTypeAxis();
                   updateDatatypes(xScale, function(foo){return 30});
                   drawAttributes(function(foo){return padding}, yScale);
                 }
              });

         function drawEncodings() {
            
            titles
              .append("text")
                .attr("class", "info")
                .style({"font-family":"inherit",
                    "font-size":"18",
                    "fill":"grey"
                })
                .attr("y", function(d, i){
                  return yScale(d.name) + 24;
                })
                .attr("x", function(d, i){
                  return 40;
                })
                .text(function(d){
                  return d.encodes + " " + d.operations;
                });
              
         }

         function removeEncodings(){

           titles.selectAll("text.info")
             .transition()
               .delay(function(d, i){ return i * 1000 })
               .duration(1000)
               .attr("x", -width)
               .each("end", function(){

                 d3.select(this).remove();

               });

         }

         function drawLine() {
         
           var axis = svg.append("g").attr("class", "axis")

           var bottomtext = axis.append("text")
               .attr({ "x": 5,
                       "y": 430})
               .text("Less Accurate")
               .style("fill", "white")

           var lineData = [{'x': padding/2, 'y': 400}, 
                           {'x': padding/2, 'y':80}] 
          
           var triangle = axis.append("path")
                .attr("transform", function(){
                  return "translate(" + padding/2 + "," + 400 + ")"
                })
                .attr("d", d3.svg.symbol().type("triangle-down"))
                .attr("stroke", "white")
                .attr("stroke-width", 2)
                .attr("fill", "none");
                 
           var lineFunction = d3.svg.line()
               .x(function(d){return d.x})
               .y(function(d){return d.y})

           var lineGraph = axis.append("path")
               .attr("d", lineFunction(lineData))
               .attr("stroke", "white")
               .attr("stroke-width", 2)
               .attr("fill", "none");

           lineGraph
                .transition(1000)
                .delay(500)
                .attr("stroke", "blue")
           
           triangle
                .transition(1000)
                .delay(500)
                .attr("stroke", "blue")
                .attr("fill", "blue")

           bottomtext
                .transition(1000)
                .delay(500)
                .style("fill", "blue")
                .each("end", function(){ drawRelations() })

         }

         function drawAttributes(xs, ys) {
            
            attributes.append("text")
              .attr("class", "attributes")
              .style({"font-family":"inherit",
                    "font-size":"24",
                    "fill":"black"
              })
              .attr("x", function(d, i){
                return -100;
              })
              .attr("y", function(d, i){
                return ys(d.name);
              })
              .text(function(d){
                return d.name;
              });

            d3.selectAll("text.attributes")
              .transition()
              .duration(1000)
              .delay(1000)
              .attr("x", function(d, i){
                return xs(d.name);
              })
              .each("end", function(){
                drawLine()
              })
           
         };

         function drawRelations(){

           var relations = svg.append("g").attr("class", "relations")
           
           var circles = relations.selectAll("circle").data(scope.relations).enter().append("circle")
             .attr({"cx": function(d){ return xScale(d.type)+ 35},
                   "cy": function(d){ return yScale(d.attribute) - 5},
                   "r" : 0,
                   "fill": function(d){ return d.color} 
             });

           relations.selectAll("circle")
              .transition()
                .duration(1000).attr("r", 10)
 
         };

         function drawDatatypes(xs, ys) {
            
            titles.append("text")
              .attr("class", "types")
              .style({"font-family":"inherit",
                    "font-size":"24",
                    "fill":"black"
              })
              .attr("x", function(d, i){
                return xs(d.name);
              })
              .attr("y", function(d, i){
                return ys(d.name);
              })
              .text(function(d){
                return d.name;
              });

            
         };

         function updateDatatypes(xs, ys){
           
            d3.selectAll("text.types")
              .transition()
                .delay(1000)
                .duration(1000)
              .attr("x", function(d, i){
                return xs(d.name);
              })
              .attr("y", function(d, i){
                return ys(d.name);
              })
              .text(function(d){
                var output = d.name;
                if (d.name.indexOf("Interval") != -1){
                  output = "Quantitative";
                } else if(d.name.indexOf("Ratio") != -1) {
                  output = "";
                }; 
                return output;
              });

         }

         function flipDataTypeAxis() {

           xScale
             .domain(scope.datatypes.map(function(d){
               return d.name;
             }))
             .rangePoints([
                  padding + tableYGutter , 
                  padding + tableYGutter + tableRange]);

           yScale
             .domain(scope.visAttrs.map(function(d){return d.name}))
             .rangePoints([80, 400]) 
         };

         //Initial Load

         drawDatatypes(function(foo){return 30}, yScale);   
         drawEncodings()
      }
    };
  }]).
  directive('network', [function() {
    return {
       restrict : 'E',
       link: function(scope, elems, attrs){
         var window = d3.select("network")

         var width = 960,
         height = 400;

         var color = d3.scale.category20();

         var force = d3.layout.force()
           .charge(-80)
           .linkDistance(100)
           .size([width, height]);

         var svg = window.append("svg")
           .attr("width", width)
           .attr("height", height);

         d3.json("data/miserables.json", function(error, graph) {
         
           force
             .nodes(graph.nodes)
             .links(graph.links)
             .start();

           var link = svg.selectAll(".link")
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) { return Math.sqrt(d.value); });

           var node = svg.selectAll(".node")
            .data(graph.nodes)
             .enter().append("circle")
            .attr("class", "node")
            .attr("r", 5)
            .style("fill", function(d) { return color(d.group); })
              .call(force.drag);

           node.append("title")
             .text(function(d) { return d.name; });

           force.on("tick", function() {
             link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

             node.attr("cx", function(d) { return d.x; })
               .attr("cy", function(d) { return d.y; });
           });
         });


       }
    };

  }]);
