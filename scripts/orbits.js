var addRandomDebris, i, render, nodes, source;

var getRandomFromBetween = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var animateFrames, container, dimensions, svg, timeZero;
dimensions = {
  width: screen.width,
  height: 100
};

var crown = {
  width: dimensions.width/6,
  height: dimensions.height/6
};

d3.json("data/departments.json", function(graph) {
  //alert(data.length);
  render(graph);
});

var color = d3.scale.linear().domain([-0.3, 0, 0.3]).range(['red','#f7f7f7','#67a9cf'])

render = function(graph) {
  var animateFrames, container, dimensions, svg, timeZero;
  dimensions = {
    width: 750,
    height: 500
  };
  var crown = {
    width: dimensions.width/6,
    height: dimensions.height/6
  };

  timeZero = Date.now();

  svg = d3.select('#svg')
    .insert('svg')
    .attr("viewBox", "0 0 " + dimensions.width + " " + dimensions.height )
    .attr('class', 'game-planetarium');

  var force = d3.layout.force()
    .charge(function(node) {return -Math.pow(node.size, 2.0) / 7})
    .friction(0.95)
    .linkDistance(300)
    .size([dimensions.width, dimensions.height])
    .alpha(0.1);

  svg.append("image")
    .attr('class', 'source')
    .attr("xlink:href", "images/columbia.png")
    .attr("x", dimensions.width/2 - crown.width/2)
    .attr("y", dimensions.height/2 - crown.height/2)
    .attr("width", crown.width)
    .attr("height", crown.height);

  container = svg.append('g')
    .attr('transform', 'translate(' + dimensions.width * 0.5 + ',' + dimensions.height * 0.5 + ')');

    container.selectAll('g.node')
      .data(graph.nodes)
      .enter()
      .append('g')
      .append("svg:a")
      .attr("xlink:href", "department.html")
      .attr('class', 'node')
      .each(function(d) {
        console.log(d.name)
        x_pos = getRandomFromBetween(Math.max(crown.width, crown.height), 275);
        d3.select(this)
          .append('circle')
          .style("fill", function(d) { return color(d.avg); })
          .attr('r', d.courses*1.2)
          .attr('cx', x_pos)
          .attr('cy', 0)
          .attr('class', 'node')
          .attr('transform', 'rotate(' + d.angle + ')')
          .on('mouseover', function(d){
            var parentOffset = $('#svg').offset();
            console.log()
            d3.select('#dc-tooltip')
              .style('visibility','visible')
              .style('top', d3.event.pageY+2-parentOffset.top + 'px')
              .style('left', d3.event.pageX+2-parentOffset.left + 'px')
              .html(function(){
                return ("<h4>"+d['name']+"</h4><br><strong>Average Score</strong>: "+d['avg']);
              })
              .transition().style('opacity', .9);
          })
          .on('mouseout', function(d){
            d3.select('#dc-tooltip')
              .transition().style('opacity', 0);
          });
      });

    animateFrames = function() {
      var delta = Date.now() - timeZero;
      timeZero += delta;

      svg.selectAll('.node')
        .each(function (d) {
          var node = d3.select(this);
          var t = d3.transform(node.attr("transform"));
          t.rotate += delta * d.speed / 10000;
          node.attr("transform", "rotate(" + t.rotate + ")");
        });
    };

  d3.timer(animateFrames);
};