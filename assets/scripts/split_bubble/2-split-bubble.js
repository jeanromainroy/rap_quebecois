"use strict";

function cleanStr(input) {
    var clean = input.replace(/\W/g, '')
    return clean;
}

/**
 * Crée les axes du graphique à bandes.
 *
 * @param g       Le groupe SVG dans lequel le graphique à bandes doit être dessiné.
 * @param xAxis   L'axe X.
 * @param width   La largeur du graphique.
 * @param height  La hauteur du graphique.
 */
function createAxes_split_bubble(g, xAxis, width, height) {
    
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
      .text("Proportion");

    g.append("text")
      .style("text-anchor", "start")
      .attr('font-size', '0.8em')
      .attr("y", Math.round(height/2.0)+38)
      .attr("x", width-42)
      .text("Anglais");

}


/**
 * Crée des cercles SVG en utilisant les domaines X et Y spécifiés.
 *
 * @param g                     Le groupe SVG dans lequel les bubbles doivent être dessinées.
 * @param g                     Le SVG dans lequel les clip path doivent etre ajoutes.
 * @param xAxis                 L'échelle pour l'axe X.
 * @param yAxis                 L'échelle pour l'axe Y.
 * @param data                  Données provenant du fichier CSV.
 * @param radius                Le rayon des bubbles.
 * @param tip                   L'infobulle à afficher lorsqu'une barre est survolée.
 *
 */
function createSplitBubbles(g, svg, xAxis, yAxis, data, radius, tip){

    var clips_eng = svg.selectAll("defs")
                .data(data)
                .enter()
                .append("g");

    clips_eng
        .append("clipPath")
        .attr("id",function(d){
            return "clip_eng_" + cleanStr(d.artist_name);
        })
        .append("rect")
        .attr("x", function(d){
            return xAxis(getProportionEnglish(d)) - radius;
        })
        .attr("y", function(d){
            return yAxis(d.artist_name) - radius;            
        })
        .attr("width",function(d){
            return getProportionEnglish(d)*2*radius;
        })
        .attr("height",2*radius);


    var clips_fra = svg.selectAll("defs")
                .data(data)
                .enter()
                .append("g");

    clips_fra
        .append("clipPath")
        .attr("id",function(d){
            return "clip_fra_" + cleanStr(d.artist_name);
        })
        .append("rect")
        .attr("x", function(d){
            return (xAxis(getProportionEnglish(d)) - radius) + getProportionEnglish(d)*2*radius;
        })
        .attr("y", function(d){
            return yAxis(d.artist_name) - radius;            
        })
        .attr("width",function(d){
            return 2*radius*(1-getProportionEnglish(d));
        })
        .attr("height",2*radius);




    var circles_fra = g.selectAll("circle-fra")
                    .data(data)
                    .enter()
                    .append("g");

    circles_fra
        .append("circle")
        .attr("cx", function(d){
            return xAxis(getProportionEnglish(d));
        })
        .attr("cy", function(d){
            return yAxis(d.artist_name);            
        })
        .attr("r", radius)
	    .attr("fill","#66A7C5")
        .attr("clip-path",function(d){
            return "url(#" + "clip_fra_" + cleanStr(d.artist_name) + ")";
        })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);


    var circles_eng = g.selectAll("circle-eng")
                    .data(data)
                    .enter()
                    .append("g");

    circles_eng
        .append("circle")
        .attr("cx", function(d){
            return xAxis(getProportionEnglish(d));
        })
        .attr("cy", function(d){
            return yAxis(d.artist_name);            
        })
        .attr("r", radius)
        .attr("fill","#EE3233")
        .attr("clip-path",function(d){
            return "url(#" + "clip_eng_" + cleanStr(d.artist_name) + ")";
        })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);
}
