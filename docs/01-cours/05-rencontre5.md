# Débogage / exécution et algorithmique

ATTENTION : Tu devras regarder l'examen formatif d'ici au prochain cours si tu veux poser des questions / corriger 
ton travail.


# Algorithmique

On va voir une démarche algorithmique sur quelques exemples
- identifier une boucle
- identifier le type de boucle à utiliser
- identifier un sous problème

## Exemple 1 : afficher un rectangle

## Exemple 2 : faire une pyramide

## Exemple 3 : calculer 1 11 21 1211

## Exemple 4 : decider si 2 textes sont des anagrammes


# Débogage

On va revenir à travers des exercices sur les:
- point arrêt simple
- step over, resume, step into
- visualisation de la pile d'appels de fonction
- evaluate expression sur un point d'arrêt

# Exercices

:::tip
## Exerice de révision : appel de fonction 

Produis la trace du code suivant dans le fichier **appel-revision.md**:
```python
def double(x, y, z):
    b = 9
    return x*y + z-x

a = 5
b = 6
z = 7
a = double(z, b, a)
```


:::

## Exercice Débogue et compte

En déboguant le code avec un point d'arrêt, détermine combien de fois la ligne 8 de l'exemple suivant
est appelée et les valeurs successives de resultat
```python
def factorielle(n):
    resultat = 1
    for i in range(1, n):
        resultat = resultat * i
    return resultat
    
r = factorielle(9)
print(r)
```


## Exercice EvalueUneExpression

```python
a = 7
b = "gna"
c = 9.7
d = True
while (a < 999):
    a += c * 3
    c = c * (a / c)
    b = str(c) + b
```

Sans modifier le code, donne la valeur des expressions suivantes quand le code est arrété à la ligne
XX

```python

```

TODO exemple de

- a < b
- a < b
- a < b
- a < b

## Exercice islam-chretien.py

Sachant que le calendrier mulsulman commence en 622 du calendrier chrétien mais que ses années sont plus courtes,
il va y avoir un jour où pour la première fois les musulmans et les chrétiens seront dans la même année.

En 622, le calendrier musulman est en 1.

Écris un programme qui détermine l'année où les deux calendriers se rejoignent pour la première fois.
- le calendrier musulman s'appelle aussi [calendrier hégirien](https://fr.wikipedia.org/wiki/Calendrier_hégirien)
- tu peux chercher une librairie de conversion entre dates


## Exercice moyenne.py

TODO mauvais exemple

Le code suivant est supposé calculer la moyenne d'un tableau de nombre.

```python
def moyenne(tableau):
    total = 0
    for e in tableau:
        total = total + e
    return total / len(tableau)
    
t = [1, 56, 67, 89]
m = moyenne(t)
print( "la moyenne est " + str(m) )
```
- commencer par calculer la moyenne entre 1, 56, 67 et 89 à la main
- essayer de prévoir les valeurs successives de total sur une feuille de papier
- à l'aide du débogueur
    - valide les valeurs successives de total
    - valide la valeur de len(tableau)
- si tu arrives à trouver le problème, répare-le, sinon regarde avec ton prof
