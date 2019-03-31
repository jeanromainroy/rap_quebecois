(function (d3, localization) {
    "use strict";
  
    /***** Configuration *****/
    var chartMargin = {
      top: 20,
      right: 50,
      bottom: 150,
      left: 50
    };
    var chartWidth = 1300 - chartMargin.left - chartMargin.right;
    var chartHeight = 550 - chartMargin.top - chartMargin.bottom;

    /***** Échelles *****/
    var color = d3.scaleOrdinal()
    var xScale = d3.scaleBand().range([0, chartWidth]);
    var yScale = d3.scaleLinear().range([chartHeight, 0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale).tickFormat(localization.getFormattedNumber);
  
    /***** Création des éléments du diagramme à barres *****/
    var candlestickChartSvg = d3.select("body")
        .append("svg")
        .attr("width", chartWidth + chartMargin.left + chartMargin.right)
        .attr("height", chartHeight + chartMargin.top + chartMargin.bottom);
  
    var candlestickChartGroup = candlestickChartSvg.append("g")
        .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");
  
  
    /***** Chargement des données *****/
    d3.csv("assets/data/statistics.csv").then(function (data) {

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-20, 0]);

        /***** Prétraitement des données *****/
        domainColor(color, data);
        rangeColor(color,data);

        domainX(xScale, data);
        domainY(yScale, data);
  
        /***** Création du Candlestick Chart *****/
        createAxes(candlestickChartGroup, xAxis, yAxis, chartHeight);
        createStems(candlestickChartGroup, xScale, yScale, data, tip);   
        createCandles(candlestickChartGroup, xScale, yScale, data, color, tip);
        createImages(candlestickChartGroup, xScale, yScale, data, chartHeight);   
        

        /***** Création de l'infobulle *****/
        tip.html(function(d){
            return getToolTipText.call(this, d, data);
        });
        candlestickChartSvg.call(tip);
     
    });
  
})(d3, localization);
  