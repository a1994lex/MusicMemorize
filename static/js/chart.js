$( document ).ready(function() {
  $('.tooltipped').tooltip({delay: 50});

  //////////////////////////
  ////// BAR CHART /////////
  //////////////////////////
    function build() {
      var margin = {top: 20, right: 20, bottom: 70, left: 40},
          height = 500 - margin.top - margin.bottom,
          width = parseInt(d3.select('#bar_div').style('width'), 10),
          width = width - margin.left - margin.right;
      var parseDate = d3.time.format("%Y-%m-%d").parse;
      var in_pad = .1;
      var out_pad = .25;
      var x = d3.scale.ordinal().rangeRoundBands([0, width], in_pad, out_pad);
      var y = d3.scale.linear().range([height, 0]);
      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickFormat(d3.time.format("%a %e"));
      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(10);
      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
            .html(function(d) {
              return "<strong>Purchases:</strong> <span style='color:red'>" + d.count + "</span>";
            });
      var svg = d3.select("#bar_div").append("svg")
          .attr('id', 'purchase_chart')
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr('id', 'g_element')
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
      svg.call(tip);

      d3.json("/build_chart/", function(error, data) {
          data.forEach(function(d) {
              d.date = parseDate(d.date);
              d.count = +d.count;
          });
        x.domain(data.map(function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.count; })]);
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
          .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "1.6em")
            .attr("dy", "1.45em");
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end");
        svg.selectAll("bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .transition()
              .ease("elastic")
            .delay(function (d, i) { return i*180; })
            .attr("x", function(d) { return x(d.date); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.count); })
            .attr("height", function(d) { return height - y(d.count); });
        d3.select("#bar_loader").remove();
      });
    }

//////////////////////////
////// DONUT CHARTS //////
//////////////////////////

    // Get data for pie charts
    jQuery.extend({
      getValues: function(url) {
          var result = null;
          $.ajax({
              url: url,
              type: 'get',
              dataType: 'json',
              async: false,
              success: function(data) {
                  result = data;
              }
          });
         return result;
      }
    });

    var duration   = 500,
        transition = 200;

    function custChart() {
      var element = '#customer_chart';
      var percent = $.getValues('/build_customer');
      var remove = "#customer_loader";
      var svg_id = "cust_svg";
      drawDonutChart (element, percent, remove, svg_id);
    }

    function returnChart() {
      var element = '#return_chart';
      var percent = $.getValues('/build_returnable');
      var remove = "#return_loader";
      var svg_id = "return_svg";
      drawDonutChart (element, percent, remove, svg_id);
    }

    function drawDonutChart(element, percent, remove, svg_id) {
        var margin = {top: 7, right: 7, bottom: 7, left: 7};
        var width = parseInt(d3.select('#return_chart').style('width'), 10);
        var height = width;

        width = width * 0.75;
        height = height * 0.75;

        var dataset = {
              lower: calcPercent(0),
              upper: calcPercent(percent)
            },
            radius = Math.min((width  - margin.right - margin.left), (height - margin.top - margin.bottom)) / 2,
            pie = d3.layout.pie().sort(null),
            format = d3.format(".0%");

        var arc = d3.svg.arc()
              .innerRadius(radius - 20)
              .outerRadius(radius);

        var svg = d3.select(element).append("svg")
              .attr('id', svg_id)
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var path = svg.selectAll("path")
              .data(pie(dataset.lower))
              .enter().append("path")
              .attr("class", function(d, i) { return "color" + i })
              .attr("d", arc)
              .each(function(d) { this._current = d; }); // store the initial values

        var text = svg.append("text")
              .attr("text-anchor", "middle")
              .attr("dy", "0.35em");

        if (typeof(percent) === "string") {
          text.text(percent);
        }
        else {
          var progress = 0;
          var timeout = setTimeout(function () {
            clearTimeout(timeout);
            path = path.data(pie(dataset.upper)); // update the data
            path.transition().duration(duration).attrTween("d", function (a) {
              var i  = d3.interpolate(this._current, a);
              var i2 = d3.interpolate(progress, percent)
              this._current = i(0);
              return function(t) {
                text.text( format(i2(t) / 100) );
                return arc(i(t));
              };
            }); // redraw the arcs
          }, 200);
        }
        d3.select(remove).remove();
    };

    function calcPercent(percent) {
        return [percent, 100-percent];
    };

    // RESPONSIVE CHART BUILD
    d3.select(window).on('resize', function() {
        // Remove old svg
        d3.select('#cust_svg').remove('svg');
        d3.select('#return_svg').remove('svg');
        d3.select("#purchase_chart").remove("svg");
        // Build responsive charts
        build();
        custChart ();
        returnChart();
    });

    // INITIAL BUILD
    build();
    custChart ();
    returnChart();
});
