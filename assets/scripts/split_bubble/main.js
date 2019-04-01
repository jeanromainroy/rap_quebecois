(function (d3, localization) {
    "use strict";
  
    /***** Configuration *****/
    var chartMargin = {
      top: 20,
      right: 50,
      bottom: 150,
      left: 50
    };
    var chartWidth = 1200 - chartMargin.left - chartMargin.right;
    var chartHeight = 800 - chartMargin.top - chartMargin.bottom;

    /***** Échelles *****/
    var xScale = d3.scaleLinear().range([0, chartWidth]);
    var yScale = d3.scaleOrdinal();
    var radius = 30;

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
  
    /***** Création des éléments du diagramme à barres *****/
    var splitBubbleChartSvg = d3.select("body")
        .append("svg")
        .attr("width", chartWidth + chartMargin.left + chartMargin.right)
        .attr("height", chartHeight + chartMargin.top + chartMargin.bottom);
  
    var splitBubbleChartGroup = splitBubbleChartSvg.append("g")
        .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");
  
  
    /***** Chargement des données *****/
    d3.csv("assets/data/statistics.csv").then(function (data) {

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0]);

        /***** Prétraitement des données *****/
        domainX_split_bubble(xScale, data);
        domainY_split_bubble(yScale, data);
        rangeY_split_bubble(yScale, xScale, chartHeight, radius, data);
  
        /***** Création du Stacked Bubble Chart *****/
        createAxes_split_bubble(splitBubbleChartGroup, xAxis, chartWidth, chartHeight);
        createSplitBubbles(splitBubbleChartGroup, splitBubbleChartSvg, xScale, yScale, data, radius, tip);
        
        /***** Création de l'infobulle *****/
        tip.html(function(d) {
            return getToolTipText.call(this, d);
        });
        splitBubbleChartSvg.call(tip);
    });
  
})(d3, localization);
  