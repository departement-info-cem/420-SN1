---
unlisted: true
title: TP2 Partie 2 (révision)
---

:::danger Version de révision — enseignants seulement
Cette page n'est pas liée dans le menu et n'est pas indexée. Retour à la [page TP2](./tp2.md). Voir aussi [TP2 Partie 1](./tp2-partie1.md).
:::

# TP2 Partie 2

Cette partie du TP compte pour 15 % de la session et est à remettre le jour de la séance 15.

Le sommaire et les figures représentent 90 % du pointage de cette partie.

## ✏️ Fichier sommaire.txt

Développez `question_sommaire()` dans `figures.py` pour enregistrer les six questions et leurs réponses dans `sommaire.txt`.

- La fonction appelle les fonctions de `analyse.py`.
- Pas besoin d'appeler QA2 puisque QA3 donne la même information et même plus.
- Pour QA3, utilisez les points cardinaux (`"nord"`, `"sud"`, `"est"` ou `"ouest"`) comme argument. On veut les 4 résultats.
- Pour QA4, utilisez un nom de parc comme argument.
- Le fichier présente chaque question suivie de sa réponse.
- Les réponses ne contiennent ni accolades, ni crochets, ni parenthèses, ni guillemets ajoutés pour afficher les collections.
- La fonction ne prend aucun paramètre et ne retourne aucune valeur.
- Sa docstring contient l'abréviation `QASommaire`.

## 📊 Figures à produire

Produisez quatre figures, chacune dans une fonction distincte de `figures.py`.

Chaque fonction doit charger les données avec `pd.read_csv()`, préparer un DataFrame limité aux données nécessaires, créer le graphique avec Matplotlib et l'enregistrer en PNG. Elle ne retourne rien et doit pouvoir être appelée sans argument.

### Figure 1 — Carte des arbres de Québec

Afficher les arbres de la ville selon qu'ils se trouvent dans un parc ou pas. Enregistrez la figure sous `figure1.png`.
- on considère que les arbres qui sont dans un parc ont un nom topographique qui commence avec "Parc" on veut les afficher avec un point vert
- les arbres hors parc seront affichés en rouge


- Retirez les arbres sans type ou coordonnées. 
- Représentez chaque type par un nuage de points avec des marqueurs de taille `0.1`. 
- La légende porte le titre *Arbres dans un parc ou hors parc à Québec* et utilise `markerscale=30`.

### Figure 2 — Nombre d'arbres par espèce au parc Bardy

Comparer le nombre d'arbres de chaque espèce au parc Bardy. Enregistrez la figure sous `figure2.png`.

DataFrame préparé — aperçu de cinq lignes :

| NOM_FRANCAIS | NB_ARBRES |
| --- | --- |
| érable argenté | 33 |
| lilas Japonais 'Ivory Silk' | 30 |
| érable de Norvège | 19 |
| orme 'Morton Accolade' | 19 |
| orme d'Amérique | 14 |

Faites pivoter les étiquettes de l'axe des x de 45° et alignez-les à droite.

### Figure 3 — Carte des arbres d'un lieu

Afficher les arbres du lieu demandé. La fonction `figure3(lieu="Parc Bardy")` peut être appelée avec un autre lieu. Enregistrez la figure sous `figure3.png`.

DataFrame préparé — aperçu de cinq lignes :

| TYPE_ARBRE | LATITUDE | LONGITUDE |
| --- | --- | --- |
| Feuillu | 46.842675 | -71.224166 |
| Feuillu | 46.842594 | -71.224283 |
| Feuillu | 46.842509 | -71.224427 |
| Feuillu | 46.842511 | -71.224518 |
| Feuillu | 46.842852 | -71.224837 |

Retirez les lignes sans type ou coordonnées. Représentez chaque type par un nuage de points avec des marqueurs de taille `15`.

### Figure 4 — Diamètres des arbres

Comparer les diamètres des feuillus et des conifères dans un diagramme à moustaches. `figure4(lieu=None)` utilise toutes les données par défaut ou filtre le lieu demandé. Enregistrez la figure sous `figure4.png`.

DataFrame préparé — aperçu de six lignes :

| TYPE_ARBRE | DIAMETRE |
| --- | --- |
| Feuillu | 53 |
| Feuillu | 116 |
| Feuillu | 58 |
| Conifère | 87 |
| Conifère | 30 |
| Conifère | 37 |

### Évaluation des docstrings

Les docstrings comptent pour **10 % du pointage de cette partie**.
Elles doivent être rédigées en français et décrire le rôle de chaque fonction, ses paramètres et son résultat.

---

⬅️ [TP2 Partie 1](./tp2-partie1.md)
