"use strict";

/**
 * Crée les axes du graphique à bandes.
 *
 * @param g       Le groupe SVG dans lequel le graphique à bandes doit être dessiné.
 * @param xAxis   L'axe X.
 * @param yAxis   L'axe Y.
 * @param height  La hauteur du graphique.
 */
function createAxes(g, xAxis, yAxis, height) {
    
    // Axe horizontal
    g.append("g")
        .attr("class", "x axis")
        .attr("id","horz_label")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 16) // vertical padding 
        .attr("x", 0) // horizontal padding 
        .attr("transform", "translate(14,4)rotate(60)")
        .style("text-anchor", "start");
  
    g.append("g")
      .attr("class", "y axis")
      .attr("id","vert_label")
      .call(yAxis);
  
    // Title Y Axis
    g.append("text")
      .style("text-anchor", "start")
      .attr('font-size', '0.8em')
      .attr("y", -10)
      .attr("x", -24)
      .text("# Mots Uniques");


    // Average Reference Line
    g.append("line")
        .attr("id","refline_ave")
        .style("opacity",0)
        .style("stroke", "black")  
        .attr("x1", 0) 
        .attr("y1", 40)
        .attr("x2", 1200)
        .attr("y2", 40);

    // Max Reference Line
    g.append("line")
        .attr("id","refline_min")
        .style("opacity",0)
        .style("stroke", "black")  
        .attr("x1", 0) 
        .attr("y1", 40)
        .attr("x2", 1200)
        .attr("y2", 40);

    // Max Reference Line
    g.append("line")
        .attr("id","refline_max")
        .style("opacity",0)
        .style("stroke", "black")  
        .attr("x1", 0) 
        .attr("y1", 40)
        .attr("x2", 1200)
        .attr("y2", 40);

    // Reference text
    g.append("text")
    .attr("id","reftext_ave")
    .attr('font-size', '0.8em')
    .attr("x", -36) 
    .attr("y", 0);

    // Reference text
    g.append("text")
        .attr("id","reftext_min")
        .attr('font-size', '0.8em')
        .attr("x", -36) 
        .attr("y", 0);

    // Reference text
    g.append("text")
    .attr("id","reftext_max")
    .attr('font-size', '0.8em')
    .attr("x", -36) 
    .attr("y", 0);

}


/**
 * Crée des rectangles SVG en utilisant les domaines X et Y spécifiés.
 *
 * @param g                     Le groupe SVG dans lequel les chandelles doivent être dessinées.
 * @param xAxis                 L'échelle pour l'axe X.
 * @param yAxis                 L'échelle pour l'axe Y.
 * @param data                  Données provenant du fichier CSV.
 * @param candle_width          La largeur des chandelles
 * @param height                La hauteur du graphique.
 *
 */
function createCandles(g, xAxis, yAxis, data, candle_width, height) {

    // On dessine les rectangles
    var candles = g.selectAll("rect")
        .data(data)
        .enter()
        .append('g');


    candles
        .append("rect")
        .attr('x', function(d){
            return xAxis(d.artist_name);
        })
        .attr('y', function(d){
            var offset = (+d["standard deviation"])/2.0;
            return yAxis(+d.average + offset);
        })
        .attr('width', function(d){
            return candle_width;
        })
        .attr('height', function(d){
            var offset = (+d["standard deviation"])/2.0;
            var diff = yAxis(+d.average - offset) - yAxis(+d.average + offset);
            return diff;
        })
        .attr("fill", function (d) {
            return "#57b1ff";
        })
        .on("mouseover", function(d){
            mouseOver(d,xAxis,yAxis,height);
        })
        .on("mouseout", function(d){
            mouseOut(d,height);
        });   
}



function cleanStr(input) {
    var clean = input.replace(/\W/g, '')
    return clean;
}

function select_axis_label(datum) {

    return d3.select('#horz_label')
    	.selectAll('text')
    	.filter(function(x) {
            return x != datum; 
        });
}


function mouseOver(d,xAxis,yAxis,height){

    var lineDOM_ave = d3.select("#refline_ave");
    lineDOM_ave.attr('x1',0).attr('x2',xAxis.range()[1]);
    lineDOM_ave.attr('y1',yAxis(d.average)).attr('y2',yAxis(d.average));
    lineDOM_ave.style('opacity',1);

    var lineDOM_min = d3.select("#refline_min");
    lineDOM_min.attr('x1',0).attr('x2',xAxis.range()[1]);
    lineDOM_min.attr('y1',yAxis(d.min)).attr('y2',yAxis(d.min));
    lineDOM_min.style('opacity',1);

    var lineDOM_max = d3.select("#refline_max");
    lineDOM_max.attr('x1',0).attr('x2',xAxis.range()[1]);
    lineDOM_max.attr('y1',yAxis(d.max)).attr('y2',yAxis(d.max));
    lineDOM_max.style('opacity',1);

    d3.select("#vert_label").attr("opacity",0.1);

    select_axis_label(d.artist_name).attr('opacity', 0.1).style("text-anchor", "start");
    

    var textDOM_ave = d3.select("#reftext_ave");
    textDOM_ave.attr('y',yAxis(d.average)+4);
    if(+d.average < 1000){
        textDOM_ave.attr("x", -30);
    }else{
        textDOM_ave.attr("x", -36);
    }
    textDOM_ave.text(d.average);

    var textDOM_min = d3.select("#reftext_min");
    textDOM_min.attr('y',yAxis(d.min)+4);
    if(+d.average < 1000){
        textDOM_min.attr("x", -30);
    }else{
        textDOM_min.attr("x", -36);
    }
    textDOM_min.text(d.min);

    var textDOM_max = d3.select("#reftext_max");
    textDOM_max.attr('y',yAxis(d.max)+4);
    if(+d.average < 1000){
        textDOM_max.attr("x", -30);
    }else{
        textDOM_max.attr("x", -36);
    }
    textDOM_max.text(d.max);

    d3.selectAll("rect").filter(function(d2){
        return d2.artist_name != d.artist_name;
    }).attr("opacity",0.3);

    d3.selectAll("#stems").filter(function(d2){
        return d2.artist_name != d.artist_name;
    }).attr("opacity",0.1);

}

function mouseOut(d,height){
    
    var lineDOM_ave = d3.select("#refline_ave");
    lineDOM_ave.style('opacity',0);

    var lineDOM_min = d3.select("#refline_min");
    lineDOM_min.style('opacity',0);

    var lineDOM_max = d3.select("#refline_max");
    lineDOM_max.style('opacity',0);

    d3.select("#vert_label").attr("opacity",1);

    select_axis_label(d.artist_name).attr('opacity', 1).style("text-anchor", "start");

    var textDOM_ave = d3.select("#reftext_ave");
    textDOM_ave.text("");

    var textDOM_min = d3.select("#reftext_min");
    textDOM_min.text("");

    var textDOM_max = d3.select("#reftext_max");
    textDOM_max.text("");

    d3.selectAll("rect").attr("opacity",1);
    d3.selectAll("#stems").attr("opacity",1);
}



/**
 * Crée des ligne SVG en utilisant les domaines X et Y spécifiés.
 *
 * @param g                     Le groupe SVG dans lequel les tiges doivent être dessinées.
 * @param xAxis                 L'échelle pour l'axe X.
 * @param yAxis                 L'échelle pour l'axe Y.
 * @param data                  Données provenant du fichier CSV.
 * @param candle_width          La largeur des chandelles
 * @param height                La hauteur du graphique.
 *
 */
function createStems(g, xAxis, yAxis, data, candle_width, height) {

    // On dessine les lignes
    var stems = g.selectAll("g.line")
        .data(data)
        .enter()
        .append('g');


    stems
        .append("line")
        .attr("id","stems")
        .attr('x1', function(d){
            return xAxis(d.artist_name) + candle_width/2;
        })
        .attr('x2', function(d){
            return xAxis(d.artist_name) + candle_width/2;
        })
        .attr('y1', function(d){
            return yAxis(+d.min);
        })
        .attr('y2', function(d){
            return yAxis(+d.max);
        })
        .attr("stroke", function (d) {
            return "#000";
        })
        .attr("stroke-width", function (d) {
            return "3px";
        })
        .on("mouseover", function(d){
            mouseOver(d,xAxis,yAxis,height);
        })
        .on("mouseout", function(d){
            mouseOut(d,height);
        });    
}

