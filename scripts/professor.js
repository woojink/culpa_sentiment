color_scale = d3.scale.linear().domain([-0.3, 0, 0.3]).range(['red','#f7f7f7','#67a9cf']);

d3.json('data/professor_review_list.json', function(data){
  var nested_data = d3.nest()
    .key(function(d) { return d['course_name']; })
    .entries(data['reviews']);

  var courses = [];
  $.each(nested_data, function(key, val) {
    values = val.values[0]
    course_title = 'course-' + values['course_id']

    courses.push('<div id="' + course_title + ' course"><h3 class="course-name"><a href="course.html">' + val.key + '</a></h3>\n<div id="' + course_title + '-reviews" class="review-row"></div></div>')
  });
  $('.courses').append(courses.join(''));

  width = 50;
  height = 50;
  $.each(nested_data, function(key, val) {
    values = val.values[0]
    course_title = 'course-' + values['course_id']
    var svg = d3.select('#'+ course_title + "-reviews")
      .selectAll('svg')
      .data(val.values)
      .enter()
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('svg:a')
      .attr("xlink:href", function(d){
        return ("http://culpa.info/reviews/" + d['id']);
      });

    var circles = svg.append('circle')
      .attr('cx', width/2)
      .attr('cy', width/2)
      .attr('r', width*.45)
      .attr('fill', function(d) {
        return color_scale(d['score']);
      })
      .style('opacity', 0.8)
      .on('mouseover', function(d){
        var parentOffset = $(".courses").offset();
        d3.select('#dc-tooltip')
          .style('visibility','visible')
          .style('top', d3.event.pageY+2-parentOffset.top + 'px')
          .style('left', d3.event.pageX+2-parentOffset.left + 'px')
          .html(function(){
            if (d['keywords']) {
              keyword_str = 
              "<br><strong>Notable Comments</strong>:<br><ul><li>"+ d['keywords'][0]+ "</li><li>"+ d['keywords'][1] + "</li><li>"+ d['keywords'][2] + "</li></ul>";
            }
            else {
              keyword_str = "";
            }
            return ("<h4>"+d['sentiment']+"</h4><br><strong>Date</strong>: " + d['date'] + "<br><strong>Score</strong>: " + d['score']+keyword_str);
          })
          .transition().style('opacity', .9);
      })
      .on('mouseout', function(d){
        d3.select('#dc-tooltip')
          .transition().style('opacity', 0);
      });
  });
});

$(document).ready(function(){
  $("#search-bar").keyup(function(){
    // Retrieve the input field text
    var filter = $(this).val();
    
    // Loop through the list
    $(".course-name").each(function(){
        // If the list item does not contain the text phrase fade it out
        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
            $(this).parent().fadeOut();
        } else {
            $(this).parent().show();
        }
    });
  });
});