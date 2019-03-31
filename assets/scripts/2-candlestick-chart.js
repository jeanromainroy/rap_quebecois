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
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 16) // vertical padding 
        .attr("x", 0) // horizontal padding 
        .attr("transform", "translate(20,50)rotate(60)")
        .style("text-anchor", "start");
  
    g.append("g")
      .attr("class", "y axis")
      .call(yAxis);
  
    // Title Y Axis
    g.append("text")
      .style("text-anchor", "start")
      .attr('font-size', '0.8em')
      .attr("y", -10)
      .attr("x", -24)
      .text("# Mots Uniques");

}


/**
 * Crée des rectangles SVG en utilisant les domaines X et Y spécifiés.
 *
 * @param g                     Le groupe SVG dans lequel les chandelles doivent être dessinées.
 * @param xAxis                 L'échelle pour l'axe X.
 * @param yAxis                 L'échelle pour l'axe Y.
 * @param data                  Données provenant du fichier CSV.
 * @param tip                   L'infobulle à afficher lorsqu'une barre est survolée.
 * @param height                La hauteur du graphique.
 *
 */
function createCandles(g, xAxis, yAxis, data, tip, height) {

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
            return 20;
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
            tip.show;
            mouseOver(d.artist_name,height);
        })
        .on("mouseout", function(d){
            tip.hide;
            mouseOut(d.artist_name,height);
        });   
}



function cleanStr(input) {
    var clean = input.replace(/\W/g, '')
    return clean;
}

function mouseOver(artistName,height){

    var imgDOM = d3.select("#" + cleanStr(artistName));
    imgDOM.attr('width',100).attr('height',100);
    imgDOM.attr('y',height - 110);
}

function mouseOut(artistName,height){

    var imgDOM = d3.select("#" + cleanStr(artistName));
    imgDOM.attr('width',40).attr('height',40);
    imgDOM.attr('y',height + 10);
}



/**
 * Crée des ligne SVG en utilisant les domaines X et Y spécifiés.
 *
 * @param g                     Le groupe SVG dans lequel les tiges doivent être dessinées.
 * @param xAxis                 L'échelle pour l'axe X.
 * @param yAxis                 L'échelle pour l'axe Y.
 * @param data                  Données provenant du fichier CSV.
 * @param tip                   L'infobulle à afficher lorsqu'une barre est survolée.
 * @param height                La hauteur du graphique.
 *
 */
function createStems(g, xAxis, yAxis, data, tip, height) {

    // On dessine les lignes
    var stems = g.selectAll("g.line")
        .data(data)
        .enter()
        .append('g');


    stems
        .append("line")
        .attr('x1', function(d){
            return xAxis(d.artist_name) + 10;
        })
        .attr('x2', function(d){
            return xAxis(d.artist_name) + 10;
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
            tip.show;
            mouseOver(d.artist_name,height);
        })
        .on("mouseout", function(d){
            tip.hide;
            mouseOut(d.artist_name,height);
        });    
}



/**
 * Crée des ligne SVG en utilisant les domaines X et Y spécifiés.
 *
 * @param g                     Le groupe SVG dans lequel les tiges doivent être dessinées.
 * @param xAxis                 L'échelle pour l'axe X.
 * @param yAxis                 L'échelle pour l'axe Y.
 * @param data                  Données provenant du fichier CSV.
 * @param color                 L'échelle de couleurs ayant une couleur associée aux noms des artistes.
 * @param height                La hauteur du graphique.
 *
 */
function createImages(g, xAxis, yAxis, data, height) {

    // On dessine les lignes
    var imgs = g.selectAll("image")
        .data(data)
        .enter()
        .append('g');


    imgs
        .append("image")
        .attr("xlink:href",function(d){
            return "../../python/data/" + d.artist_name + "/img.jpg";
        })
        .attr("id",function(d){
            return cleanStr(d.artist_name);
        })
        .attr('x', function(d){
            return xAxis(d.artist_name);
        })
        .attr('y', function(d){
            //var offset = (+d["standard deviation"])/2.0;
            //return yAxis(+d.average + offset);
            return height + 10;
        })
        .attr('width', function(d){
            return 40;
        })
        .attr('height', function(d){
            //var offset = (+d["standard deviation"])/2.0;
            //var diff = yAxis(+d.average - offset) - yAxis(+d.average + offset);
            //return diff;
            return 40;
        });     
}


