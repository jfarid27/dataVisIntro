'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('pagebar', [ function() {
    return {
      restrict: 'E',

      link: function(scope,elems, attrs){
      }
    }
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
               "fill":"green"
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
