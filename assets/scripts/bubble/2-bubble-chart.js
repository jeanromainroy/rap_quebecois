"use strict";

/**
 * Crée les axes du graphique à bandes.
 *
 * @param g       Le groupe SVG dans lequel le graphique à bandes doit être dessiné.
 * @param xAxis   L'axe X.
 * @param width   La largeur du graphique.
 * @param height  La hauteur du graphique.
 */
function createAxes_bubble(g, xAxis, width, height) {
    
    // Axe horizontal
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + Math.round(height/2.0) + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 16) // vertical padding 
        .attr("x", 0) // horizontal padding 
        .style("text-anchor", "start");
  
    // Title Y Axis
    g.append("text")
      .style("text-anchor", "start")
      .attr('font-size', '0.8em')
      .attr("y", Math.round(height/2.0)+24)
      .attr("x", width-50)
      .text("# Mots Uniques");

}


/**
 * Crée des cercles SVG en utilisant les domaines X et Y spécifiés.
 *
 * @param g                     Le groupe SVG dans lequel les chandelles doivent être dessinées.
 * @param xAxis                 L'échelle pour l'axe X.
 * @param yAxis                 L'échelle pour l'axe Y.
 * @param data                  Données provenant du fichier CSV.
 * @param radius                Le rayon des bubbles.
 * @param tip                   L'infobulle à afficher lorsqu'une barre est survolée.
 *
 */
function createBubbles(g, xAxis, yAxis, data, radius, tip) {

    // On dessine les rectangles
    var bubbles = g.selectAll("image")
        .data(data)
        .enter()
        .append('g');


    bubbles
        .append("image")
        .attr("xlink:href",function(d){
            return "python/data/" + d.artist_name + "/cropped.jpg";
        })
        .attr('x', function(d){
            return xAxis(+d.average) - radius;
        })
        .attr('y', function(d){
            return yAxis(d.artist_name) - radius;
        })
        .attr('width', function(d){
            return radius*2;
        })
        .attr('height', function(d){
            return radius*2;
        })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);  
}