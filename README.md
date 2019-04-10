# Projet Final INF8808 : Rap Quebecois

Dans le cadre de ce projet final notre équipe composée de deux étudiants de l’UQAM en journalisme et deux étudiants de polytechnique a choisi d’écrire un article sur les rappeurs québécois. Nous avons décidé que notre article aurait un format de type «scrollytelling» et aborde les thèmes du vocabulaire et de l'anglicisation.


## Getting Started

Le repertoire se divise entre les scripts python permettant de traiter le texte et la visualisation écrite en javascript/html/css. 


*Traitement des textes*

Les scripts furent développer à l'intérieur de Jupyter Notebook.

1. rap_quebecois/python/1-import.ipynb : l'execution de ce notebook permet de télécharger le répertoire de chaque rappeur depuis le site Genius

2. rap_quebecois/python/2-merge_lyrics.ipynb : l'execution de ce notebook permet de combiner toutes les paroles de chaque chanson pour chaque rappeur

3. rap_quebecois/python/3-extract_words.ipynb : l'execution de ce notebook permet d'extraire les mots des paroles et appliquer un pré-traitement

4. rap_quebecois/python/4-count_unique_words.ipynb : l'execution de ce notebook permet de compter le nombre de mots uniques

5. rap_quebecois/python/5-merge_stats.ipynb : l'execution de ce notebook permet de combiner les statistiques de tous les rappeurs

6. rap_quebecois/python/6-images.ipynb : l'execution de ce notebook permet de récupérer les portraits de chaque rappeur


*Visualisation*

La librairie D3 a été utilisée pour concevoir chaque visualisation. Le fichier rap_quebecois/index.html combine et présente chaque visualisation. 

Chaque visualisation se trouve dans un différent dossier rap_quebecois/assets/scripts/...


Pour voir le produit final, la visualisation est temporairement disponible à l'adresse : www.pandocloud.ca


### Prerequisites
	

Les librairies nécessaires peuvent être installées en utilisant l'outil pip

	pip3 install -r rap_quebecois/python/requirements.txt


## Author

* **Jean-Romain Roy** - *Initial work* - [jeanromainroy](https://github.com/jeanromainroy)


