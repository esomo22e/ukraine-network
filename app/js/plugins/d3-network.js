function networkTemplate(data, targetElement){
    console.log(data);
    // console.log(targetElement);

    var width = d3.select(targetElement).node().getBoundingClientRect().width;
      var height = width * 0.6;

     var margin = {top: 20, right: 20, bottom: 30, left: 80};

     var x_center = width/2,
     y_center = height/2,
     radius = (height - 2 * margin)/2;

     var n_elements;

     function index_to_rad(index){
         return 2 * Math.PI * index/ n_elements;
     }

     var color = d3.scaleOrdinal(d3.schemeCategory10);

     var x_scale = d3.scaleLinear()
                     .domain([0,1])
                     .range([x_center, x_center + radius]);

     var y_scale = d3.scaleLinear()
                     .domain([0,1])
                     .range([y_center, y_center + radius]);


     var force = d3.forceSimulation()
     .force("link", d3.forceLink().id(function(d) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

     var svg = d3.select(targetElement).append("svg")
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
         .append("g")
         .attr("transform",
           "translate(" + margin.left + "," + margin.top + ")");


         data.nodes = data.nodes.sort(function(a, b){
           return d3.ascending(a.group, b.group);
         });
         n_elements = data.nodes.length;

         var max_value = d3.max(data.links, function(d){
             return d.value;
         });

         var link = svg.selectAll(".link")
                        .data(data.links)
                        .enter().append("line")
                        .attr("class", "link")
                        .attr("opacity", function(d){
                            return 0.2 + 0.8 * d.value/max_value;
                        });
         console.log(max_value);
         var node = svg.selectAll(".node")
                       .data(data.nodes)
                       .enter().append("circle")
                       .attr("class", "node")
                       .attr("r", 5)
                       .attr("fill", function(d){
                          return color(d.group);
                      });

        node.append("title")
            .text(function(d){
                return d.id;
            })


            force
             .nodes(data.nodes)
             .on("tick", function() {
       // link.attr("x1", function(d) { return d.source.x; })
       //          .attr("y1", function(d) { return d.source.y; })
       //          .attr("x2", function(d) { return d.target.x; })
       //          .attr("y2", function(d) { return d.target.y; });
       link.attr('x1', function(d){ return x_scale(Math.sin(index_to_rad(d.source.x))); })
          .attr('x2', function(d){ return x_scale(Math.sin(index_to_rad(d.target.x))); })
          .attr('y1', function(d){ return y_scale(Math.cos(index_to_rad(d.source.index))); })
          .attr('y2', function(d){ return y_scale(Math.cos(index_to_rad(d.target.index))); });

       node.attr("cx", function(d) { return d.x; })
           .attr("cy", function(d) { return d.y; });
     });

          force.force("link")
               .links(data.links);
//     var width = d3.select(targetElement).node().getBoundingClientRect().width;
//     var height = width * 0.6;
//
//         var margin = {top: 20, right: 20, bottom: 30, left: 80};
//
//         var x_center = width/2,
//         y_center = height/2,
//         radius = (height - 2 * margin)/2;
//
//         var n_elements;
//
//         function index_to_rad(index){
//             return 2 * Math.PI * index/ n_elements;
//         }
//
//         var color = d3.scaleOrdinal(d3.schemeCategory10);
//
//         var x_scale = d3.scaleLinear()
//                         .domain([0,1])
//                         .range([x_center, x_center + radius]);
//
//         var y_scale = d3.scaleLinear()
//                         .domain([0,1])
//                         .range([y_center, y_center + radius]);
//
//         // var force = d3.forceSimulation()
//         // .force("collide", d3.forceCollide(12))
//         // .force("center", d3.forceCenter(width / 2, height / 2))
//         // .nodes(data)
//         // .on("tick", tick);
//         var force = d3.forceSimulation()
//         .force("link", d3.forceLink().id(function(d) { return d.id; }))
//          .force("charge", d3.forceManyBody())
//          .force("center", d3.forceCenter(width / 2, height / 2));
//
//     var svg = d3.select(targetElement).append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");
//
//
//           data.nodes = data.nodes.sort(function(a, b){
//             return d3.ascending(a.group, b.group);
//           });
//           n_elements = data.nodes.length;
//           console.log(n_elements);
//
//
//
//
//   var link = svg.append("g")
//       .attr("class", "links")
//     .selectAll("line")
//     .data(data.links)
//     .enter().append("line")
//       .attr("stroke-width", function(d) { return Math.sqrt(d.value); });
//
//
//
//   var node = svg.append("g")
//       .attr("class", "nodes")
//     .selectAll("g")
//     .data(data.nodes)
//     .enter().append("g");
//
//     var circles = node.append("circle")
//      .attr("r", 5)
//      .attr("fill", function(d) { return color(d.group); })
//      .call(d3.drag()
//          .on("start", dragstarted)
//          .on("drag", dragged)
//          .on("end", dragended));
//
//      var lables = node.append("text")
//     .text(function(d) {
//       return d.id;
//     })
//     .attr('x', 6)
//     .attr('y', 3);
//
//
//
// node.append("title")
//     .text(function(d) { return d.id; });
//
//     //
//     force
//           .nodes(data.nodes)
//           .on("tick", ticked);
//
//      force.force("link")
//           .links(data.links);
//
//
//
//     //
//       function ticked() {
//         link
//             .attr("x1", function(d) { return d.source.x; })
//             .attr("y1", function(d) { return d.source.y; })
//             .attr("x2", function(d) { return d.target.x; })
//             .attr("y2", function(d) { return d.target.y; });
//
//         node
//             .attr("transform", function(d) {
//               return "translate(" + d.x + "," + d.y + ")";
//
//             });
//
//           //   svg.selectAll('circle')
//           //   .attr('cx', function(d,i){ return x_scale(Math.sin(index_to_rad(i))); })
//           // .attr('cy', function(d,i){ return y_scale(Math.cos(index_to_rad(i))); });
//
//
//       }
//
//
//           console.log(force);
//
//
//           function dragstarted(d) {
//             if (!d3.event.active) force.alphaTarget(0.3).restart();
//             d.fx = d.x;
//             d.fy = d.y;
//           }
//
//           function dragged(d) {
//             d.fx = d3.event.x;
//             d.fy = d3.event.y;
//           }
//
//           function dragended(d) {
//             if (!d3.event.active) force.alphaTarget(0);
//             d.fx = null;
//             d.fy = null;
//           }
//
//


    // console.log(dataNodes);
}
