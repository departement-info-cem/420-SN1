# Fonctions (définition et utilisation), librairie standard

Quand on approche un problème, on peut le découper en sous-problèmes.

Pour cela on peut trouver une solution au sous problème etc.

DEMO SUR LA SEQUENCE DE 1 11 21 etc

## Définition d'une fonction simple

```python
def double(x):
    return x*x
```

Définir une fonction ne fait rien, on se donne juste un outil qu'on
pourra utiliser plus tard. Un peu comme quand on écrit une recette, on a
rien à manger mais on pourra suivre la recette plus tard.

## Appel d'une fonction

On va regarder ce qui se passe sur un exemple simple
```python
def double(x):
    return x*x

a = double(4)
print(a)
```
1. quand on définit la fonction, il ne se passe rien, les 2 premières lignes ne font rien
2. **double(4)** appelle la fonction double
- le paramètre est évalué, ça donne 4
- 4 remplace *x* comme valeur du paramètre
- la fonction calcule *x * x* soit *4 * 4* soit 16
- *return* renvoie la valeur 16
- alors *double(4)* vaut 16
3. on affiche la valeur avec un print

## Paramètre à la définition et à l'appel

Lors d'un appel d'une fonction, on évalue le paramètre fourni avant de le
passer à la fonction. Sur un exemple un peu plus complexe:
```python
def double(x):
    return x*x

a = 25
print( double( double(4) + double( 5 + double(a) ) ) )
```
Encore une fois, quand ça se complique le mode débogage devient notre
meilleur ami pour ne pas abandonner.

## Typage (optionnel mais bien utile) d'une fonction

## Paramètre nommé

```python
def double(*x, ):
    return x*x

a = 25
print( double( double(4) + double( 5 + double(a) ) ) )
```

## Paramètre avec valeur par défaut


```python
def racine(nombre, base=2):
    # ton code ici
    return 1
```


## Exercice fonction simple

On veut faire une fonction simple qui prend un nombre et qui renvoie son carré.

Définis cette fonction et appelle la avec un nombre de ton choix.

## Exercice sur une variable locale à la méthode

```python
def minMaxMoyenne(liste):
    min = liste[0]
    max = liste[0]
    somme = 0
    for element in liste:
        if element < min:
            min = element
        if element > max:
            max = element
            somme += element

minMaxMoyenne([1,2,3,4,5])
a = min   # est-ce que cette ligne est correcte?
```

TODO lien vers la portée



## Mais combien vaut x?

```python
def calculComplexe(a, b, c):
    x = a**b
    y = c*(b-a)
    return a**b + c*(b-a)

x = 5
calculComplexe(3,5,7)
print(x)
```

Combien vaut x dans calculComplexe? dans le script principal? C'est le même x?

TODO lien vers le shadowing et la pile d'appels dans le débogueur