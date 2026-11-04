---
unlisted: true
title: TP2 (révision)
---

:::danger Version de révision — enseignants seulement
Cette page n'est pas liée dans le menu et n'est pas indexée. Voir [TP2 Partie 1](./tp2-partie1.md) et [TP2 Partie 2](./tp2-partie2.md).
:::

# TP2 🧮 Analyse de données

[Une vidéo](#explications-détaillées) expliquant en détail le TP et fournissant quelques conseils est disponible en bas de page.


## 🧠 Contexte
Les données sont partout autour de nous. Savoir les analyser et en tirer des conclusions est une compétence essentielle dans de nombreux domaines, en particulier en science.

Dans ce TP, vous allez choisir un ensemble de données réelles, les analyser à l'aide de Python et produire des visualisations pour illustrer vos découvertes.
  

##  🎯 Objectifs pédagogiques
À la fin de ce travail, vous serez capable de :

- Lire et traiter des fichiers CSV avec Pandas
- Créer des visualisations de données avec Matplotlib
- Interpréter des données scientifiques réelles
- Écrire dans un fichier texte un rapport


## 👀 Plagiat
Si votre travail est suspecté de plagiat (code copié d'un(e) autre étudiant(e), code généré par IA, notions non
abordées en classe, etc.), deux choses peuvent se produire :

- Le plagiat est prouvé par nos outils : note de 0, automatiquement.
- Le plagiat est plutôt évident, mais une validation est requise : vous serez convoqué(e) au bureau de votre
enseignant(e). Vous devrez répondre à certaines questions pour prouver que vous comprenez et maîtrisez le code
qui a été utilisé. Si vous ne réussissez pas à répondre à certaines questions, vous aurez la note
de 0 (si vous ne comprenez pas votre propre code, c'est que vous avez plagié, d'une manière ou d'une autre).

📝 Pour faire ce TP, vous devez :
- Suivre le lien donné pour chercher, trouver et télécharger le fichier CSV de données approprié en lien avec le projet.
- Écrire un script Python qui lit le fichier CSV, analyse les données et produit :
    - des figures (en format PNG) en utilisant les bibliothèques Pandas et Matplotlib.
    - un fichier texte contenant les réponses à des questions d'analyse.


## 📂 Fichiers dans le projet
    
La structure du dossier :

```
├── analyse.py                  # Réponses de la partie 1
├── figures.py                  # Réponses de la partie 2
├── autocorrecteur.py           # script pour correction de la partie 1
├── telecharger_arbres_csv.py   # script pour télécharger les données
└── .gitignore                  # à compléter pour ne pas sauver le fichier .csv
```


### Le rôle du fichier .gitignore

GitHub est avant tout une plateforme conçue pour héberger des fichiers légers contenant du code source. \
Par principe, certains éléments ne doivent jamais figurer dans un dépôt Git :

- **Les fichiers volumineux** : ils ralentissent les opérations de clonage et de mise à jour.
- **Les fichiers de configuration d'IDE** : par exemple, le dossier `.idea` de **PyCharm**, qui est propre à votre environnement de travail local.
- **Les fichiers générés** : tout ce qui peut être produit automatiquement par l'exécution de votre programme.

En suivant ces principes, **le fichier CSV** que vous devrez télécharger est particulièrement massif et ne devrait pas être sauvegardé sur GitHub. Vous devrez donc retélécharger le fichier CSV et le replacer dans votre dossier de projet à chaque fois que vous changerez de poste dans les laboratoires du Cégep.
Concernant **les fichiers TXT et PNG**, ils sont dans le cadre de ce TP le résultat direct de l'exécution de votre code, il est donc inutile de les versionner :
nous préférons que votre dépôt ne contienne que la "recette" (votre code) et non les produits finis.

**Le fichier `.gitignore` sert à quoi?** Il indique à Git d'ignorer (de ne pas sauvegarder dans le répertoire) certains fichiers ou dossiers en fonction de modèles (patterns) définis à l'intérieur. \
Dans le cadre de ce projet, il a été configuré pour exclure automatiquement les fichiers `CSV`, `PNG` et `TXT` de vos commits.


## Partie 1 10% à remettre le jour de la séance 12 + 5 jours

[Les instructions de la partie 1](./tp2-partie1.md)

## Partie 2 15% à remettre le jour de la séance 15

[Les instructions de la partie 2](./tp2-partie2.md)

## ⚠️ Note importante sur l'utilisation d'Excel ⚠️
Bien qu'Excel soit l'outil par défaut pour lire des fichiers CSV, il n'est pas adapté aux jeux de données massifs scientifiques que nous utilisons.

- **Affichage incomplet** : Au-delà d'un certain seuil (environ 1 million de lignes), Excel tronque les données et n'affiche pas la totalité du fichier.
- **Risque d'altération** : Excel a tendance à reformater automatiquement les données, ce qui peut corrompre l'intégrité de votre fichier CSV.

**Conseil** : Évitez d'ouvrir le fichier CSV avec Excel!



## Explications détaillées
[![Regarder la vidéo explicative sur YouTube](https://img.youtube.com/vi/1T-q7Y9dGkk/hqdefault.jpg)](https://www.youtube.com/watch?v=1T-q7Y9dGkk)