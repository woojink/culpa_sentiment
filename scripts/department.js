color_scale = d3.scale.linear().domain([-0.3, 0, 0.3]).range(['red','#f7f7f7','#67a9cf']);

$.getJSON('data/course_list.json', function(data){
  data = data['courses'];

  departments = [];
  $.each(data, function(key, val) {
    course_id = val['id']
    departments.push('<li class="department-name"><a href="course.html"><small>[' + val['course_number'] +']</small> '+ val['name'] + '</a><span class="sentiment_score" id="course-id-' + course_id + '"></span></li>');
  });
  $('.departments-list').append(departments.join(''));

  width = 20;
  height = 20;
  $.each(data, function(key, val) {
    course_id = val['id'];
    svg = d3.select('#course-id-' + course_id)
      .append('svg')
      .attr('width', width)
      .attr('height', width)
      .style('display','inline-block')
      .style('position','relative')
      .style('top', '2px')

    svg.append('circle')
      .attr('cx', width/2)
      .attr('cy', width/2)
      .attr('r', width*.45)
      .attr('fill', function(d){
        score = (Math.random()*0.6)-0.3
        return color_scale(score);
      })
      .style('opacity', 0.7)
      .on('mouseover', function(d){
        var parentOffset = $(".departments").offset();
        console.log(parentOffset)
        d3.select('#dc-tooltip')
          .style('visibility','visible')
          .style('top', d3.event.pageY+2-parentOffset.top + 'px')
          .style('left', d3.event.pageX+2-parentOffset.left + 'px')
          .html("Average Score: " + ((Math.random()*0.6)-0.3).toFixed(2).toString())
          .transition().style('opacity', .9);
      })
      .on('mouseout', function(d){
        d3.select('#dc-tooltip')
          .transition().style('opacity', 0);
      });
  })
})
$(document).ready(function(){
  $("#search-bar").keyup(function(){
      // Retrieve the input field text
      var filter = $(this).val();
      
      // Loop through the list
      $(".department-name").each(function(){
          // If the list item does not contain the text phrase fade it out
          if ($(this).text().search(new RegExp(filter, "i")) < 0) {
              $(this).fadeOut();
          } else {
              $(this).show();
          }
      });
  });
});