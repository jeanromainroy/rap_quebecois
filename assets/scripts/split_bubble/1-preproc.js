"use strict";

/**
 * Retourne la proportion de francais pour un artiste
 *
 * @param datum        Range de statistique pour un artiste
 * @return {var}       Proportion de francais
 */
function getProportionEnglish(datum){

    var ave_fra = +datum['francais average'];
    var ave_eng = +datum['english average'];
    var prop_fra = ave_eng/(1.0*(ave_fra + ave_eng));

    return prop_fra;
}


/**
 * Précise le domaine de l'échelle pour l'axe X.
 *
 * @param xAxis       Échelle en X.
 * @param data        Données provenant du fichier CSV.
 */
function domainX_split_bubble(xAxis, data) {


    // Find Max
    var maxVal = 0;
    data.forEach(function(d){

        var prop_fra = getProportionEnglish(d);

        if(prop_fra > maxVal){
            maxVal = prop_fra;
        }
    });

    // Fin Min
    var minVal = maxVal;
    data.forEach(function(d){

        var prop_fra = getProportionEnglish(d);

        if(prop_fra < minVal){
            minVal = prop_fra;
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
function domainY_split_bubble(yAxis, data) {

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
function rangeY_split_bubble(yAxis, xAxis, height, radius, data) {

    const halfHeight = height/2.0;

    const bubblePadding = 2;
    
    const linePaddingTop = 4;
    const linePaddingBottom = 30;

    var prop_fra = []
    data.forEach(function(d){
        prop_fra.push(getProportionEnglish(d));
    });

    var direction = 1;
    var yPos = []

    for(var i = 0 ; i < prop_fra.length ; i++){

        var currentXPos = xAxis(prop_fra[i]);
        var currentYPos = halfHeight;

        while(true){

            var testAllPassed = 0;

            for(var j = 0 ; j < i ; j++){

                var previousXPos = xAxis(prop_fra[j]);
                var previousYPos = yPos[j];
    
                while(true){
    
                    if(quadDist(currentXPos,currentYPos,previousXPos,previousYPos) < (2*radius + bubblePadding)){
                        currentYPos = currentYPos + direction;
                        testAllPassed = testAllPassed + 1;
                    }else if(((currentYPos + radius + linePaddingTop) > halfHeight) && ((currentYPos - radius - linePaddingBottom) < halfHeight)){
                        currentYPos = currentYPos + direction;
                        testAllPassed = testAllPassed + 1;
                    }else{
                        break;
                    }
                }            
            }

            if(testAllPassed == 0){
                break;
            }
        }
        
        if(i != 0){
            yPos.push(currentYPos);
        }else{
            yPos.push(halfHeight - radius - linePaddingTop);
        }

        direction = -(direction);
    }

    yAxis.range(yPos);
}

function quadDist(x1,y1,x2,y2){

    return Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2));
}
  