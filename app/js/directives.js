'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
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

         var circles = d3.select(".circles").selectAll("circles")
            .data(scope.shapes1).enter()
            .append("circle")
             .attr({     
               "class":"bluecircle",
               "cx": -80,
               "cy": function(d) {return yScale(Math.random()},
               "r": 12,
               "fill": "#blue"
             })

         var squares = d3.select(".squares").selectAll("rect")
            .data(scope.shapes1).enter()
            .append("rect")
             .attr({     
               "class":"rectangle",
               "x": -80,
               "y": function(d) {return yScale(Math.random()},
               "height": 24,
               "width": 24,
               "fill": "#blue"
             })

        d3.select(".circle").append("circle")
             .attr({     
               "class":"redcircle",
               "cx": -80,
               "cy": function(d) {return yScale(Math.random()},
               "r": 12,
               "fill": "#red"
             }).on("click", function(){

                d3.select(".redcircle")
                  .transition().duration(700)
                  .attr("fill", "yellow")

             })

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
