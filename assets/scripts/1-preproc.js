"use strict";

/**
 * Précise le domaine en associant un nom de rappeur à une couleur précise.
 *
 * @param color   Échelle spectrale de couleurs.
 * @param data    Données provenant du fichier CSV.
 */
function domainColor(color, data) {
  
    var names = []
    data.forEach(function(d){
        names.push(d.artist_name);
    });

    color.domain(names);  
}

/**
 * Précise le range en associant un nom de rappeur à une couleur précise.
 *
 * @param color   Échelle spectrale de couleurs.
 * @param data    Données provenant du fichier CSV.
 */
function rangeColor(color, data) {
  
    var names = []
    data.forEach(function(d){
        names.push(d.artist_name);
    });

    color.range(d3.range(names.length).map(d3.scaleLinear()
    .domain([0, names.length - 1])
    .range(["red", "blue"])
    .interpolate(d3.interpolateLab)));
}


/**
 * Précise le domaine de l'échelle pour l'axe X.
 *
 * @param xAxis       Échelle en X.
 * @param data        Données provenant du fichier CSV.
 */
function domainX(xAxis, data) {

    var names = []
    data.forEach(function(d){
        names.push(d.artist_name);
    });
    
    xAxis.domain(names);
}

  
/**
 * Précise le domaine de l'échelle pour l'axe Y.
 *
 * @param yAxis       Échelle en Y.
 * @param data        Données provenant du fichier CSV.
*/
function domainY(yAxis, data) {

    // Find Max
    var maxVal = 0;
    data.forEach(function(d){
        if((+d.max) > maxVal){
            maxVal = +d.max;
        }
    });

    // Fin Min
    var minVal = maxVal;
    data.forEach(function(d){
        if((+d.min) < minVal){
            minVal = +d.min;
        }
    });

    // Set domain
    yAxis.domain([minVal,maxVal]);
}
  