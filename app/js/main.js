var margin = {top:25, right:0, bottom:25, left:25};

// var colors = {
//     bold: ["#d51e2d", "#52CFE5", "#385775", "#FFBF3D", "#6f2b6e", "#00CFB5"],
//     pastel: ["#e59097", "#c0adcc", "#b3cadd", "#a3ceaf", "lavender", "aquamarine", "gold"],
//     procon: ["#ce0201", "#a5d65a"],
//     political: ["#D41B2C", "#006EB5"]
// }

var colors = {
    bold: ["#d51e2d", "#52CFE5", "#385775", "#FFBF3D", "#6f2b6e", "#00CFB5"],
    pastel: ["#e59097", "#c0adcc", "#b3cadd", "#a3ceaf", "lavender", "aquamarine", "gold"],
    procon: ["#cc0000", "#808080", "#000"],
    political: ["#D41B2C", "#006EB5"]
}


d3.json('/interactive/2018/10/bubble/data/example_data.json')
  .then(function(data) {

      networkTemplate(data, "#network");
  // columnTemplate(data, "#column");
  //
  // groupedColumnTemplate(data, "#groupedcolumn");
  //
  // lineTemplate(data, "#line");
  //
  // multiLineTemplate(data, "#multiline");
  //
  //   barTemplate(data, "#bar");
  //
  //  groupedbarTemplate(data, "#groupedbar");

}).catch(function(error){
   // handle error
});

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

var $ = jQuery;

( function( $ ) {
  var Neu = Neu || {};

  $.fn.scrollmagicControls = function(options) {
      return this.each(function() {
          var scrollmagicControls = Object.create(Neu.scrollmagicControls);
          scrollmagicControls.init(this, options);
      });
  };

  $.fn.scrollmagicControls.options = {
      pinned: ".pinned-content"
  };

  Neu.scrollmagicControls = {
      init: function(elem, options) {
          var self = this;
          self.$container = $(elem);
          self.options = $.extend({}, $.fn.scrollmagicControls.options, options);
          self.bindElements();
          self.bindEvents();

          $(document).ready( function() {
              self.triggerScrollMagic();
          });
      },
      bindElements: function() {
        var self = this;

        self.$pinned = self.$container.find(self.options.pinned);
        self.controller = new ScrollMagic.Controller({addIndicators: true});
    },
    bindEvents: function() {
      var self = this;
    },
    triggerScrollMagic: function() {
      var self = this;
      
      //if you want the same function to run for multiple slides you can use the function below. The for function goes through all slides with the class name "pinned-content" and adds a pinned scrollmagic slide for each.
      for (var i=0; i<self.$pinned.length; i++) {
  			var slide = self.$pinned[i];
        var duration;
      
        duration = $(slide).height();
      
  			new ScrollMagic.Scene({
					triggerElement: slide,
					duration: duration,
					triggerHook: 0,
					reverse: true
				})
				.setPin(slide)
        .on("enter leave", function(e) {
          //if you want something to happen on enter and/or leave, you can add it below. If it should only happen on enter then remove "leave" above.
      
          //the trigger is ".pinned-content"
          var trigger = this.triggerElement();
          var triggerClass = $(trigger).attr("class");
      
          if (e.type === "leave") {
            console.log("left slide: " + triggerClass);
          } else {
            console.log("entered slide: " + triggerClass);
          }
        })
				.addTo(self.controller);
  		}
      
      //if you want a function to only run for a specific slide, you can use the function below.
      var customScene = new ScrollMagic.Scene({
        triggerElement: "#customScene",
        duration: 1000,
        reverse: true
      })
      .setClassToggle("#customScene", "custom-active")
      .on("enter", function() {
        $(".box").animate({
          height: "300px",
          width: "400"
        });
      })
      .on("leave", function() {
        $(".box").animate({
          height: "150px",
          width: "200"
        });
      })
      .addTo(self.controller);
    }
  };

}( $ ) );

(function init () {
  $(document).ready(function() {
    $(".wrapper").scrollmagicControls();
  });
})();

d3.json("/interactive/2019/06/suffrage-100/data/data.json")
  .then(function(processedData) {
  var tikTok = new TikTok({
    dateFormat: ['MMM DD, YYYY', 'YYYY'],
    dateDisplay: 'MMMM DD, YYYY',
    groupByDisplay: 'YYYY[s]',
    el: 'tik-tok',
    title: 'Title',
    entries: processedData
  });
});

// create AP Style 
moment.updateLocale('en', {
    months : [
        'Jan.', 'Feb.', 'March', 'April', 'May', 'June',
        'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.',
    ]
});

var width = document.getElementById('vis').parentElement.offsetWidth;
var linear = vega.scale('linear');
var fontscale = linear().domain([300, 1000]).range([16, 22]);
var heightscale = linear().domain([300, 1000]).range([60, 120]);

var chartSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v3.0.json',
    width: width / 2,
    height: 400,
    title: 'Chart Title Goes Here',
    description: 'A simple bar chart with embedded data.',
    data: {url: '/interactive/2018/10/bubble/data/aggregated.json'},
    mark: 'bar',
    encoding: {
        x: {
            field: 'candidate',
            type: 'ordinal'
        },
        y: {
            field: 'polarity',
            type: 'quantitative'
        },
        color: {
            field: 'candidate',
            type: 'ordinal',
            legend: false,
            scale: {
              range: colors.bold
            }
        }
    },
    config: {
        axis: {
            labelFont: 'Akkurat',
            labelFontSize: 14,
            titleFont: 'Akkurat',
            titleFontSize: 18,
            titlePadding: 20
        },
        title: {
            font: 'Akkurat',
            fontSize: fontscale(width),
            fontWeight: 700,
            anchor: 'middle'
        },
        view: {stroke: 'transparent'}

    }
};
vegaEmbed('#vis', chartSpec, {actions:false, renderer:'svg'});
