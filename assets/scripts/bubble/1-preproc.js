"use strict";


/**
 * Précise le domaine de l'échelle pour l'axe X.
 *
 * @param xAxis       Échelle en X.
 * @param data        Données provenant du fichier CSV.
 */
function domainX_bubble(xAxis, data) {


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
    xAxis.domain([minVal,maxVal]);
}


/**
 * Précise le domaine de l'échelle pour l'axe Y.
 *
 * @param yAxis       Échelle en Y.
 * @param data        Données provenant du fichier CSV.
*/
function domainY_bubble(yAxis, data) {

    var names = []
    data.forEach(function(d){
        names.push(d.artist_name);
    });
    
    yAxis.domain(names);
}

  
/**
 * Précise le range de l'échelle pour l'axe Y.
 *
 * @param yAxis       Échelle en Y.
 * @param xAxis       Échelle en X.
 * @param height      Hauteur du graphique
 * @param radius      Rayon des bulles
 * @param data        Données provenant du fichier CSV.
 * 
*/
function rangeY_bubble(yAxis, xAxis, height, radius, data) {

    const halfHeight = height/2.0;
    const moveIncrement = 2;
    const linePaddingTop = 4;
    const linePaddingBottom = 30;
    const bubblePadding = 4;

    var averages = []
    data.forEach(function(d){
        averages.push(+d.average);
    });

    var direction = 1;
    var yPos = []
    yPos.push(halfHeight - 1.5*radius); // First Artist

    for(var i = 1 ; i < averages.length ; i++){

        var currentXPos = xAxis(averages[i]);
        var currentYPos = halfHeight;

        for(var j = 0 ; j < i ; j++){

            var previousXPos = xAxis(averages[j]);
            var previousYPos = yPos[j];

            while(true){

                if(quadDist(currentXPos,currentYPos,previousXPos,previousYPos) < (2*radius + bubblePadding)){
                    currentYPos = currentYPos + direction*moveIncrement;
                }else if(((currentYPos + radius + linePaddingTop) > halfHeight) && ((currentYPos - radius - linePaddingBottom) < halfHeight)){
                    currentYPos = currentYPos + direction*moveIncrement;
                }else{
                    break;
                }
            }            
        }
        
        yPos.push(currentYPos);

        direction = -(direction);
    }

    yAxis.range(yPos);
}

function quadDist(x1,y1,x2,y2){

    return Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2));
}
  