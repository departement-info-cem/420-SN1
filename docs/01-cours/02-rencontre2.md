# Expressions, variables et types

## expression, valeur type

Une expression est un bout de code qui a une valeur et un type.
- *5* est une expression qui vaut 5 et de type entier
- *"5"* est une expression de type texte

## Opérateur et fonctions

- *5 + 3* est une expression de type entier qui vaut 8
- *"coucou " + str(81)* est une expression de type texte qui vaut "coucou 8"

On voit que *+* ne fait pas la même chose selon le type de son opérateur. Pour des nombres
il fait la somme habituelle. Pour du texte, il met les 2 textes bout à bout.

Les fonctions comme **str()** peuvent avoir un type. Ici **str** transforme une
expression qu'on lui passe en texte:
- *81* est un entier qui vaut 81
- *str(81)* est un texte constitué du caractère *8* suivi du caractère *1*


### Exécution : évaluateur d'expression
On peut vite se laisser emporter et construire des expressions assez complexes:
```python
str( 5 + 8 * (7 + 98 * 6) / 5 / 6.7 * 10 - 4)
```

Pour évaluer cette expression petit bout par petit bout, on peut utiliser un évaluateur d'expression.
Il faut placer un point d'arrêt sur la ligne dans le script.

## type d'une expression

Python contient une fonction permettant de connaître le type d'une expression:

```python
truc = ...
print( type(truc) )
```


## variable

Un nom qui va désigner plusieurs valeurs au fil du temps.

Dans un premier temps on va avoir des "variables" qui "varient" à chaque assignation.

Il est donc important de voir ce qu'est une assignation

```python
nomDeMaVariable = expression
```
- Ceci n'est pas une égalité comme en maths
- on calcule expression, ce qui nous donne une valeur et un type
- on associe, on "assigne" cette valeur et type au *nomDeMaVariable*

Exécute en mode débogage et on regarde la valeur de x changer.

TODO ajouter un exemple avec du hasard

```python
x = 5 * 6
y = 2 * x
x = x * x + 25.6
x = str(5 - x)
```
- si on était en maths, y devrait toujours valoir le double de x
    - si x évolue dans le temps
    - comme on a posé y qui est 2*x
    - on devrait avoir y qui évolue avec le temps
- en programmation le **=** n'est pas une équation, c'est une **assignation**
    - on évalue l'expression en partie droite *2 * x*
    - comme x vaut 30 à ce moment là, ça donne 60
    - on assigne cette valeur dans la variable y
    - si on veut assigner une nouvelle valeur, il faut un autre *y = ...*

## types de base

La plupart des langages de programmation on des types de base pour représenter les nombres

- Entier : 1 2 3 -99 etc.
- Flottant : 1.0 2.5 -99.9 etc.
- Texte : "bonjour" "salut" "123" etc.
- Booléen : True False

## types composés


### tableaux

On peut vouloir représenter une séquence de plusieurs valeurs d'un même type


### tuples
On peut regrouper plusieurs valeurs de types différents dans un tuple, la syntaxe est des parenthèses et des virgules pour séparer les valeurs
```python
(4.5 , "salut")
```
On accède à chaque valeur par un index
```python
(4.5 , "salut")[0]  # vaut 4.5
(4.5 , "salut")[1]  # vaut salut
```

Cela permet de garder plusieurs valeurs dans une seule variable

```python
coordonnees = (4.5 , 10.5)              # coordonnées d'un point dans un plan cartésien par exemple
print(type(coordonnees))
autreCoordonnees = (5.6 , 3.5)
```

### dictionnaires

On peut vouloir associer des valeurs à des clés, on utilise un dictionnaire
```python
dico = { "cle1" : 4.5 , "cle2" : "salut" }
```

# Exercices

## Exercices trace_types.md


```python


```


## Exercice tableau
TODO faire un exercice qui calcule 
