# Accueil, intro, plan de cours et premiers scripts

- plan de cours
- premier script et exécution
- mise en place du repo github pour les exercices et les notes? OneDrive?

## Plan de cours

Nous allons regarder le plan de cours pour voir :
- la planification des 15 semaines de cours
- les évaluations, leurs dates et les pondérations
- les règles relatives au plagiat
- les règles relatives aux absences

## Écouteurs

De nombreux éléments de contenus seront disponibles sous la forme :
- de videos pour vous permettre de les réécouter autant de fois que nécessaire
- de recettes pour vous permettre de les appliquer autant que nécessaire

Il est utile d'apporter des écouteurs filaires pour les cours.

## Plagiat

En programmation, c'est difficile de distinguer "s'aider" et "copier", "travailler ensemble" et
"un qui travaille, l'autre qui recopie".

Voici quelques règles pour vous aider :
- ne jamais partager un fichier de code ou un fragment de code, en général le copain le recopie sans réfléchir
- vous pouvez expliquer, dessiner, reformuler, mais n'écrivez pas le code pour un ami
- vous pouvez utiliser du code trouvé en ligne, juste mettre un petit commentaire au-dessus avec l'URL où vous l'avez trouvé
- si vous avez un doute, demandez à votre prof

## Demo 1 : bonjour le monde, interactif

On va ouvrir un terminal Powershell:
- un terminal, c'est une fenêtre qui nous invite à taper des commandes pour l'ordinateur
- Powershell, c'est le terminal à la mode pour un ordinateur qui roule Windows
- l'ordinateur attend nos instructions, on va partir python en tapant "python3"
- si l'ordinateur n'a pas l'air content, qu'il dit que Python n'est pas installé se référer à TODO
- si tout va bien on va pouvoir taper des trucs, vous devriez voir quelque chose qui ressemble à
```
Python 3.10.0 (v3.10.0:b494f5935c, Oct  4 2021, 14:59:19) [Clang 12.0.5 (clang-1205.0.22.11)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 
```
- on peut maintenant donner des instructions à l'ordinateur
- on va taper (enfin il ne faut pas taper les ">>>"), vous pouvez même copier/coller
```
>>> print("bonjour bonjour cher maitre humain")
```
- l'interpréteur Python3 comprend alors
    - l'ordre d'imprimer parce qu'on lui a dit "print", ici imprimer veut dire afficher dans notre terminal
    - le truc à imprimer est fourni entre les parenthèses, c'est un paramètre
    - ici on veut imprimer un bout de texte
    - l'interpréteur comprend que c'est du texte à afficher et pas d'autres instructions parce que c'est entre guillements.
- un dernier petit test en mode interactif et promis on arrête
- taper
```
>>> 6/2*(1+2)
```
- trop puissant !! il nous affiche la réponse
- pour quitter l'interpréteur Python, on peut fermer la fenêtre Powershell au complet ou faire **CONTROL+D**

## Demo 2 : bonjour le monde en python, dans un fichier texte

On va vite vouloir donner plein d'ordres à l'ordinateur en lui parlant en Python.

Ça devient pénible de les écrire les uns après les autres en mode interactif. Alors, on a
pensé à écrire les ordres les uns après les autres dans un fichier.

On va appeler ça un "programme Python" ou un "script Python". Concrètement, c'est un
fichier avec des ordres en Python. On va toujours le faire finir par ".py" pour pas
le mélanger avec les ".pdf" et les ".jpg".

On ouvre un éditeur de texte. Il y en a plein, nous, on va partir Notepad++.
- on ouvre le menu **Démarrer** de Windows
- on tape "not" et il devrait apparaitre une liste avec Notepad++
- on va taper dans la zone du fichier les instructions, une par ligne
```python
# ceci est un commentaire, cette ligne est pour les humains, l'ordinateur va l'ignorer
print("bonjour bonjour cher maitre humain")
6/2*(1+2)
print("Ca va aujourd'       hui?")
print( 4 / 5 *                (9  + 6) )
```
- on sauve le fichier à un endroit où vous saurez le retrouver, par exemple sur le bureau avec comme nom "bonjour.py"
- jusqu'ici ça ne fait rien
- on va donc "exécuter" notre script, il ne s'agit pas de le tuer. On demande à python de suivre nos ordres, d'"exécuter" nos ordres. Comme le script est une suite d'ordre, on "exécute un script"
- dans le terminal, on va taper
```shell
python3 c:\Users\monmatricule\Desktop\bonjour.py
```
- Vous venez d'exécuter un Python
- Regardons ce qu'on vient de voir
    - l'interpréteur a affiché trois lignes
    - il exécute dans l'ordre de haut en bas
    - il n'affiche pas mon calcul de la ligne 2, en mode script, si on ne demande pas de "print" rien de s'affiche
    - les espaces peuvent être importants ou pas : 
      - en début de ligne c'est important
      - dans une expression, c'est ignoré


## Demo 3 : bonjour le monde dans un environnement de développement

On a gagné, on a perdu
- on a gagné qu'on peut lancer plein d'ordres en exécutant un fichier Yeah!
- on a perdu parce que ça va tellement vite qu'on ne sait plus trop quel ordre a provoqué quoi

On va être honnête, vos scripts ne vont pas souvent faire ce que vous voulez. Par contre, ils
vont faire exactement ce que vous avez écrit. Il va donc falloir souvent trouver où moi humain
je me suis mal exprimé.

On va alors utiliser un environnement de développement pour se doter des pouvoirs super :
- on va pouvoir arrêter le temps
- on va pouvoir voir à l'intérieur de l'ordinateur

On va partir PyCharm pour exécuter notre script en mode super développeur :
- partir l'application PyCharm, on appelle ça un IDE
- Integrated Developpement Environment, un environnement intégré pour programmer
- créer un fichier test_ide.py avec le contenu suivant
```python
# commentaire : une ligne pour le programmeur qui est ignorée par l'ordi, commence par un "#"
print("bonjour bonjour cher maitre humain")
6/2*(1+2)
print("Ca va aujourd'       hui?")          # les espaces entre "" sont pris en compte
print( 4 / 5 *                (9  + 6) )    # les espaces dans une expression sont ignorés
```
- l'exécuter en cliquant sur le triangle vert
- on devrait voir.

### le point d'arrêt : arrêter le temps

- en cliquant dans la marge du code, on va mettre un point d'arrêt
- on va maintenit partir notre code en mode débogage en cliquant sur la bestiole, sur le bug
- l'exécution s'arrête sur le point d'arrêt

## Jargon

Dans tous les domaines, il y a un vocabulaire un jargon, on a déjà rencontré des termes par très intuitifs :
- "print" ("imprimer") qui veut dire affiche à l'écran au lieu d'imprimer du papier
- "exécuter" un programme !?

On va essayer de pointer les termes jargoniques au fur et à mesure.

# Exercices

## Exercice de débogage de la semaine TODO

Parce qu'on apprend jamais aussi bien que par soi-même…

## Exercice refaire_les_demos.py

Refaire les étapes des 3 démos par vous-même. S'assurer qu'on comprend un
peu ce qui se passe. Ne pas hésiter à poser des questions si certains points
sont moins clairs.

## Exercice points_arrets.py

On va exécuter un script auquel on ne comprend rien pour l'instant. Le but
est de se familiariser avec le débogueur.

Tout d'abord créer un nouveau fichier points_arrets.py et y copier le code suivant :

```python
# ceci est une fonction, on va en parler en semaine 4
def calculComplexe(a, b, c):
  return a**b + c*(b-a)
print("Arreter le temps, c'est impossible Marty")
a = calculComplexe(3,5,7)
b = calculComplexe(a,6,9)
c = calculComplexe(b,a,b)
a = calculComplexe(a,a,a)
print("le resultat est ", calculComplexe(a, b, c))  
```

On voudrait savoir quelles sont les valeurs de *a* au fil de l'exécution du script. Vous pouvez soit :
- essayer de calculer à la main combien ça vaut
- poser un point d'arrêt et observer

## Exercice la_sequence.py

Dans un fichier la_sequence.py, écrivez une dizaine de lignes de commandes Python. Vous pouvez inclure :
- des déclarations de variables
- des calculs avec assignations
- des affichages avec print

Exécutez votre code en mode débogage pour vous familiariser avec le débogueur (ce sera l'outil le plus utile de votre vie pour programmer)



