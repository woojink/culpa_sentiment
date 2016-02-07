color_scale = d3.scale.linear().domain([-0.3, 0, 0.3]).range(['red','#f7f7f7','#67a9cf']);

d3.json('data/course_review_list.json', function(data){
  var nested_data = d3.nest()
    .key(function(d) { return d['professor_name']; })
    .entries(data['reviews']);

  var professors = [];
  $.each(nested_data, function(key, val) {
    course_title = val.key.split(' ').join('-');
    professors.push('<div id="' + course_title + ' professor"><h3 class="professor-name"><a href="professor.html">' + val.key + '</a></h3>\n<div id="' + course_title + '-reviews" class="review-row"></div></div>')
  });
  $('.professors').append(professors.join(''));

  width = 50;
  height = 50;
  $.each(nested_data, function(key, val) {
    course_title = val.key.split(' ').join('-');
    var svg = d3.select('#'+ course_title+'-reviews')
      .selectAll('svg')
      .data(val.values)
      .enter()
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('svg:a')
      .attr("xlink:href", function(d){
        return ("http://culpa.info/reviews/25578");
      });

    var circles = svg.append('circle')
      .attr('cx', width/2)
      .attr('cy', width/2)
      .attr('r', width*.45)
      .attr('fill', function(d) {
        score = (Math.random()*0.83)-0.2
        return color_scale(score);
      })
      .style('opacity', 0.8)
      .on('mouseover', function(d){
        var parentOffset = $(".professors").offset();
        d3.select('#dc-tooltip')
          .style('visibility','visible')
          .style('top', d3.event.pageY+2-parentOffset.top + 'px')
          .style('left', d3.event.pageX+2-parentOffset.left + 'px')
          .html(function(){
            score = Math.random()
            if (score > 0.3){
              sentiment = "Positive"
            }
            else {
              sentiment = "Negative"
            }
            return ("<h4>"+sentiment+"</h4><br><strong>Date</strong>: " + d['date'] + "<br><strong>Score</strong>: " + ((score*0.83)-0.3).toFixed(2).toString());
          })
          .transition().style('opacity', .9);
      })
      .on('mouseout', function(d){
        d3.select('#dc-tooltip')
          .transition().style('opacity', 0);
      });
  });
})

$(document).ready(function(){
  $("#search-bar").keyup(function(){
    // Retrieve the input field text
    var filter = $(this).val();
    
    // Loop through the list
    $(".professor-name").each(function(){
        // If the list item does not contain the text phrase fade it out
        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
            $(this).parent().fadeOut();
        } else {
            $(this).parent().show();
        }
      });
  });
});