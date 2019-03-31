"use strict";


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
    yAxis.domain([minVal-160,maxVal+20]);
}
  