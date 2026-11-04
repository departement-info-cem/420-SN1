---
unlisted: true
title: TP2 Partie 1 (révision)
---

:::danger Version de révision — enseignants seulement
Cette page n'est pas liée dans le menu et n'est pas indexée. Retour à la [page TP2](./tp2.md). Voir aussi [TP2 Partie 2](./tp2-partie2.md).
:::

# TP2 Partie 1

Cette partie du TP compte pour 10 % et est à remettre cinq jours après la séance 12.

## 🌳 Analyse des arbres répertoriés dans la Ville de Québec

Commencez par explorer les données du fichier CSV pour comprendre leur structure et leur contenu, en utilisant des fonctions comme `head()`, `info()` et `describe()` de Pandas.


### 📝 Description
- La Ville de Québec a répertorié les arbres situés sur son territoire. \
L'objectif de ce projet est d'analyser ces données pour comprendre la répartition des espèces d'arbres, leur taille, etc.


### 🔢 Source de données
- Données Québec : [Arbres répertoriés dans la Ville de Québec](https://www.donneesquebec.ca/recherche/dataset/vque_26)
- Téléchargez le fichier CSV.
- Vous pouvez aussi exécuter le fichier `telecharger_arbres_csv.py`


### 🔍 Éléments à analyser
Les six questions représentent 90 % du pointage de cette partie. 

Le pointage est de 15% par question.

Écrivez une fonction par question :

#### Question 1 (15%) - Quels noms latins d'espèces distincts sont présents dans le jeu de données?

- La fonction doit être la seule à posséder `QA1` dans sa docstring
- Elle retourne une liste de chaînes


#### Question 2 (15%) - Quelle est la topographie où se trouve l'arbre le plus au nord, au sud, à l'est ou à l'ouest? 
- La fonction `question2(cardinal)` prend en paramètre obligatoire le point cardinal : `"nord"`, `"sud"`, `"est"` ou `"ouest"`.
- La fonction doit être la seule à posséder `QA2` dans sa docstring
- Elle retourne une chaîne.

#### Question 3 (15%) - Quelques infos sur l'arbre le plus au nord, au sud, à l'est ou à l'ouest? 
- La fonction `question3(cardinal)` prend en paramètre obligatoire le point cardinal : `"nord"`, `"sud"`, `"est"` ou `"ouest"`.
- La fonction doit être la seule à posséder `QA3` dans sa docstring
- Elle retourne un dictionnaire avec les clés `espece_en_français` de l'espèce (str), `coordonnées` (tuple de deux float : `(latitude, longitude)`) et `nom` du lieu (str).

#### Question 4 (15%) Combien d'espèces distinctes sont recensées dans le lieu demandé? 
- La fonction `question4(nom_lieu)` prend le nom du lieu en paramètre. 
- Elle doit être la seule à posséder `QA4` dans sa docstring et retourner un entier.

#### Question 5 (15%) Quel lieu compte le plus d'espèces arbres?  
- La fonction doit être la seule à posséder `QA5` dans sa docstring 
- Elle retourne un dictionnaire avec les clés `nom_lieu` et `nombre_espèces`.
- On veut sans doute parcourir l'ensemble des noms de lieux.
- Un indice, tu peux sans doute te servir d'une question précédente.
- Aussi le temps d'exécution de cette fonction risque d'être assez long.

#### Question 6 (15%) Quel est le diamètre moyen du tronc des feuillus et des conifères au parc Bardy ou ailleurs?
- La fonction doit être la seule à posséder `QA6` dans sa docstring.
- La fonction a un paramètre optionnel avec la valeur par défaut "Parc Bardy"
- Elle retourne un dictionnaire avec les clés `diametre_feuillus` (float) et `diametre_coniferes` (float).

### Contraintes à respecter

Chaque fonction doit :
- pouvoir être appelée sans paramètre, sauf `question2(cardinal)`, `question3(cardinal)` et `question4(nom_lieu)` qui prennent un paramètre obligatoire et `question6(lieu="Parc Bardy")` qui prend un paramètre optionnel;
- retourner le résultat dans le format indiqué;
- appeler `pd.read_csv()`;
- nettoyer les données au besoin;
- utiliser l'abréviation demandée dans sa docstring;
- ne pas appeler `print()`.

### Autocorrecteur
L'autocorrecteur compare les valeurs retournées par votre code aux réponses attendues.

### Évaluation des docstrings
Les docstrings comptent pour **10 % du pointage de cette partie**. Elles doivent décrire clairement le rôle de chaque fonction et sa valeur de retour.
Chaque abréviation `QA1` à `QA6` doit apparaître dans la docstring de sa fonction seulement.

---

➡️ [TP2 Partie 2](./tp2-partie2.md)
