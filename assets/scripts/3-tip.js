"use strict";

/**
 * Obtient le texte associé à l'infobulle.
 *
 * @param d               Les données associées à la barre survollée par la souris.
 * @param currentData     Les données qui sont actuellement utilisées.
 * @param formatPercent   Fonction permettant de formater correctement un pourcentage.
 * @return {string}       Le texte à afficher dans l'infobulle.
 */
function getToolTipText(d, currentData) {
    // TODO: Retourner le texte à afficher dans l'infobulle selon le format demandé.
    //       Assurez-vous d'utiliser la fonction "formatPercent" pour formater le pourcentage correctement.
    return d.artist_name;    
}
  