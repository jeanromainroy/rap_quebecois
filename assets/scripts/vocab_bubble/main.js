(function (d3, localization) {
    "use strict";
  
    /***** Configuration *****/
    var chartMargin = {
      top: 20,
      right: 50,
      bottom: 20,
      left: 50
    };
    var chartWidth = 1200 - chartMargin.left - chartMargin.right;
    var chartHeight = 500 - chartMargin.top - chartMargin.bottom;

    /***** Échelles *****/
    var xScale = d3.scaleLinear().range([0, chartWidth]);
    var yScale = d3.scaleOrdinal();
    var radius = 25;

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
  
    /***** Création des éléments du diagramme à barres *****/
    var bubbleChartSvg = d3.select("body")
        .append("svg")
        .attr("width", chartWidth + chartMargin.left + chartMargin.right)
        .attr("height", chartHeight + chartMargin.top + chartMargin.bottom);
  
    var bubbleChartGroup = bubbleChartSvg.append("g")
        .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");
  
  
    /***** Chargement des données *****/
    d3.csv("assets/data/statistics.csv").then(function (data) {

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0]);

        /***** Prétraitement des données *****/
        domainX_vocab(xScale, data);
        domainY_vocab(yScale, data);
        rangeY_vocab(yScale, xScale, chartHeight, radius, data);
  
        /***** Création du Stacked Bubble Chart *****/
        createAxes_bubble(bubbleChartGroup, xAxis, chartWidth, chartHeight);
        createBubbles(bubbleChartGroup, xScale, yScale, data, radius, tip);
        
        /***** Création de l'infobulle *****/
        tip.html(function(d) {
            return getToolTipText.call(this, d);
        });
        bubbleChartSvg.call(tip);
    });
  
})(d3, localization);
  