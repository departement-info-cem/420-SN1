"""
autocorrection.py — Validation automatique du TP2 : Analyse de données
Section validée   : ÉLÉMENTS À ANALYSER (QA1 à QA6)
Référence         : Arbres répertoriés dans la Ville de Québec
"""

import sys
import os
import inspect
import math
import pandas as pd

# ── Importation optionnelle de requests (nécessaire pour la mise à jour) ────
try:
    import requests
    REQUESTS_DISPONIBLE = True
except ImportError:
    REQUESTS_DISPONIBLE = False

# ── Importation du module de l'étudiant ─────────────────────────────────────
try:
    import analyse
except ModuleNotFoundError:
    print("\033[31m❌ Le fichier analyse.py est introuvable dans le répertoire courant!\033[0m")
    sys.exit(1)
except Exception as e:
    print(f"\033[31m❌ Erreur lors de l'importation de analyse.py :\033[0m")
    print(f"   {e}")
    sys.exit(1)


# ════════════════════════════════════════════════════════════════════════════════
# ⚙️  CONFIGURATION GÉNÉRALE
# ════════════════════════════════════════════════════════════════════════════════

VERSION          = "1.0.0"
#URL_MISE_A_JOUR  = "https://REMPLACER_PAR_URL_REELLE/autocorrection.py"  # ← Configurer ici
URL_MISE_A_JOUR  = "https://raw.githubusercontent.com/departement-info-cem/420-SN1/refs/heads/main/web/static/ressources/tp2/autocorrecteur.py"  # ← Configurer ici
ABREVIATIONS     = ["QA1", "QA2", "QA3", "QA4", "QA5", "QA6"]
NB_QUESTIONS     = 6


# ════════════════════════════════════════════════════════════════════════════════
# 📋  RÉSULTATS ATTENDUS  ←  REMPLACER LES VALEURS PAR LES BONNES RÉPONSES
# ════════════════════════════════════════════════════════════════════════════════
#
# Structure de chaque entrée :
#   "question"        → intitulé affiché dans la console
#   "valeur"          → réponse correcte  ← À REMPLACER PAR LA VRAIE RÉPONSE
#   "type_attendu"    → type Python que la fonction doit retourner
#   "ordre_important" → (list uniquement) True si l'ordre des éléments compte
#   "tolerance"       → (dict/float uniquement) écart absolu accepté

RESULTATS_ATTENDUS = {
    "QA1": {
        "question"        : "Quelles sont les variables présentes dans le jeu de données?",
        "valeur"          : ["ID", "TYPE_LIEU", "NOM_LATIN", "NOM_FRANCAIS", "TYPE_ARBRE", "DIAMETRE", "POSITION_MESURE", "MULTI_TRONC", "DATE_PLANTE", "TYPE_PROP", "LATITUDE", "LONGITUDE", "NOM_TOPOGRAPHIE"],   # ← À REMPLACER
        "type_attendu"    : list,
        "ordre_important" : False,
    },
    "QA2": {
        "question"     : "Le nom de la topographie où se trouve l'arbre avec le tronc le plus grand?",
        "valeur"       : "Parc Gérard-Marchand",                 # ← À REMPLACER
        "type_attendu" : str,
    },
    "QA3": {
        "question"     : "Combien d'espèces différentes chez les feuillus et les conifères?",
        "valeur"       : (68, 419),                        # ← À REMPLACER : (nb_feuillus, nb_conifères)
        "type_attendu" : tuple,
    },
    "QA4": {
        "question"        : "Quelles espèces trouve-t-on dans le Parc Aimée-Miville? (triées alphabétiquement)",
        "valeur"          : ["chêne rouge", "sapin baumier", "thuya de l'est", "érable rouge"],       # ← À REMPLACER
        "type_attendu"    : list,
        "ordre_important" : False,                           # Triées alpha → ordre important
    },
    "QA5": {
        "question"     : "De quelle espèce est l'arbre avec le tronc le plus gros? (en français)",
        "valeur"       : "érable argenté",                      # ← À REMPLACER
        "type_attendu" : str,
    },
    "QA6": {
        "question"     : "Diamètre moyen du tronc des feuillus et conifères à l'Université Laval?",
        "valeur"       : {
            "diametre_feuillus"  : 19.198396793587175,                    # ← À REMPLACER
            "diametre_coniferes" : 5.419161676646707,                    # ← À REMPLACER
        },
        "type_attendu" : dict,
        "tolerance"    : 0.01,                              # Tolérance sur les flottants
    },
}


# ════════════════════════════════════════════════════════════════════════════════
# 🖨️  FONCTIONS D'AFFICHAGE
# ════════════════════════════════════════════════════════════════════════════════

def print_vert(texte):   print(f"\033[32m{texte}\033[0m")
def print_rouge(texte):  print(f"\033[31m{texte}\033[0m")
def print_jaune(texte):  print(f"\033[93m{texte}\033[0m")
def print_cyan(texte):   print(f"\033[96m{texte}\033[0m")


def cellule_bool_coloree(valeur, largeur):
    """
    Retourne une chaîne de longueur visible `largeur`,
    centrée, avec 'True' en vert ou 'False' en rouge.
    """
    texte  = "True" if valeur else "False"
    code   = "\033[32m" if valeur else "\033[31m"
    pad    = largeur - len(texte)
    pad_g  = pad // 2
    pad_d  = pad - pad_g
    return f"{' ' * pad_g}{code}{texte}\033[0m{' ' * pad_d}"


def banniere(titre):
    ligne = "*+*" * 26 + "*"
    print(ligne)
    print(f"  {titre}")
    print(ligne)


# ════════════════════════════════════════════════════════════════════════════════
# 🔄  ÉTAPE #0 — MISE À JOUR AUTOMATIQUE
# ════════════════════════════════════════════════════════════════════════════════

def etape_0_mise_a_jour():
    banniere(f"🔄 ÉTAPE 0 de 2 — Vérification de la version du script ({VERSION})")
    print()

    if not REQUESTS_DISPONIBLE:
        print_jaune("⚠️  Le module 'requests' n'est pas installé.")
        print_jaune("   Vérification des mises à jour désactivée.")
        print_jaune("   Installez-le avec : pip install requests")
        print()
        return

    if "REMPLACER" in URL_MISE_A_JOUR:
        print_jaune("⚠️  L'URL de mise à jour n'est pas configurée. Étape ignorée.")
        print()
        return

    try:
        reponse = requests.get(URL_MISE_A_JOUR, timeout=1000)

        if reponse.status_code != 200:
            print_jaune(f"⚠️  Impossible d'accéder à l'URL (code HTTP {reponse.status_code}).")
            print()
            return

        contenu_distant = reponse.text
        version_distante = None

        for ligne in contenu_distant.splitlines():
            if ligne.strip().startswith("VERSION"):
                try:
                    version_distante = ligne.split("=")[1].strip().strip('"').strip("'")
                except Exception:
                    pass
                break

        if version_distante is None:
            print_jaune("⚠️  Impossible de lire la version distante.")

        elif version_distante != VERSION:
            print_jaune(f"⚠️  Nouvelle version disponible : {version_distante}  (version actuelle : {VERSION})")
            print_jaune("    Mise à jour automatique en cours...")
            with open(os.path.abspath(__file__), "w", encoding="utf-8") as f:
                f.write(contenu_distant)
            print_vert("✅ Mise à jour réussie! Veuillez relancer le script.")
            sys.exit(0)

        else:
            print_vert(f"✅ Le script est à jour (version {VERSION}).")

    except requests.exceptions.ConnectionError:
        print_jaune("⚠️  Pas de connexion Internet — vérification des mises à jour ignorée.")
    except Exception as e:
        print_jaune(f"⚠️  Erreur lors de la vérification des mises à jour : {e}")

    print()


# ════════════════════════════════════════════════════════════════════════════════
# ✅  ÉTAPE #1 — VALIDATION DE L'ABSENCE DE PARAMÈTRES
# ════════════════════════════════════════════════════════════════════════════════

def obtenir_abreviation_qa(func):
    """Retourne la première abréviation QA trouvée dans la docstring, ou '—'."""
    doc = func.__doc__ or ""
    for abr in ABREVIATIONS:
        if abr in doc:
            return abr
    return "—"


def etape_1_validation_parametres():
    banniere("🤖 ÉTAPE 1 de 2 — Validation de l'absence de paramètres")
    print()

    toutes_fonctions = inspect.getmembers(analyse, inspect.isfunction)

    if not toutes_fonctions:
        print_rouge("❌ Aucune fonction détectée dans analyse.py!")
        sys.exit(1)

    # Construire les données pour le tableau
    infos = []
    for nom, func in toutes_fonctions:
        sig = inspect.signature(func)
        params_obligatoires = [
            p for p in sig.parameters.values()
            if p.default is inspect.Parameter.empty
            and p.kind not in (
                inspect.Parameter.VAR_POSITIONAL,
                inspect.Parameter.VAR_KEYWORD
            )
        ]
        infos.append({
            "nom"            : nom,
            "abreviation"    : obtenir_abreviation_qa(func),
            "sans_parametre" : len(params_obligatoires) == 0,
        })

    # Calculer les largeurs des colonnes
    col_nom = max(len("Fonction"),     max(len(i["nom"])         for i in infos)) + 2
    col_abr = max(len("Abréviation"),  max(len(i["abreviation"]) for i in infos)) + 2
    col_par = len("Sans paramètre") + 4

    sep = f"  +{'-' * col_nom}+{'-' * col_abr}+{'-' * col_par}+"

    # Afficher le tableau
    print(sep)
    print(f"  |{'Fonction':^{col_nom}}|{'Abréviation':^{col_abr}}|{'Sans paramètre':^{col_par}}|")
    print(sep)

    erreur = False
    for i in infos:
        nom_cell = f"{i['nom']:^{col_nom}}"
        abr_cell = f"{i['abreviation']:^{col_abr}}"
        par_cell = cellule_bool_coloree(i["sans_parametre"], col_par)
        print(f"  |{nom_cell}|{abr_cell}|{par_cell}|")
        if not i["sans_parametre"]:
            erreur = True

    print(sep)
    print()

    if erreur:
        print_rouge("❌ ERREUR : Une ou plusieurs fonctions nécessitent un paramètre obligatoire.")
        print_rouge("   Les fonctions doivent toutes pouvoir être appelées sans argument.")
        print_rouge("   ⛔ L'étape #2 ne sera pas exécutée.")
        sys.exit(1)

    print_vert("✅ Toutes les fonctions peuvent être appelées sans paramètre.")
    print()


# ════════════════════════════════════════════════════════════════════════════════
# 🔍  ÉTAPE #2 — VALIDATION DES QUESTIONS D'ANALYSE
# ════════════════════════════════════════════════════════════════════════════════

def trouver_fonctions_qa():
    """
    Parcourt le module analyse et retourne un dict {abréviation: fonction}.
    Arrête l'exécution si une abréviation est présente dans plusieurs fonctions.
    """
    toutes  = inspect.getmembers(analyse, inspect.isfunction)
    resultat = {}
    erreur   = False

    for abr in ABREVIATIONS:
        correspondances = [
            (nom, func) for nom, func in toutes
            if abr in (func.__doc__ or "")
        ]

        if len(correspondances) > 1:
            print_rouge(f"❌ ERREUR : {len(correspondances)} fonctions possèdent l'abréviation {abr} :")
            for nom, _ in correspondances:
                print_rouge(f"   - {nom}")
            print_rouge("   Chaque abréviation doit apparaître dans une seule fonction.")
            erreur = True

        elif len(correspondances) == 1:
            resultat[abr] = correspondances[0][1]

    if erreur:
        sys.exit(1)

    return resultat


# ── Fonctions de validation par type ────────────────────────────────────────

def valider_liste(obtenu, attendu, ordre_important):
    """Valide une liste et fournit des indices précis sur les erreurs."""
    ensemble_obtenu  = set(obtenu)
    ensemble_attendu = set(attendu)

    # Cas succès
    if list(obtenu) == attendu:
        print_vert("   ✅ Résultat correct!")
        return True

    if not ordre_important and ensemble_obtenu == ensemble_attendu:
        print_vert("   ✅ Résultat correct! (l'ordre n'est pas important)")
        return True

    # Cas d'erreur avec indices
    if len(obtenu) > len(attendu):
        print_rouge(f"   ❌ Trop d'éléments dans la liste ({len(obtenu)} obtenus, {len(attendu)} attendus).")
        en_trop = ensemble_obtenu - ensemble_attendu
        if en_trop:
            print_rouge(f"      Éléments en trop : {sorted(en_trop)}")

    elif len(obtenu) < len(attendu):
        print_rouge(f"   ❌ Il manque des éléments dans la liste ({len(obtenu)} obtenus, {len(attendu)} attendus).")
        manquants = ensemble_attendu - ensemble_obtenu
        if manquants:
            print_rouge(f"      Éléments manquants : {sorted(manquants)}")

    else:
        # Même longueur
        if ensemble_obtenu != ensemble_attendu:
            print_rouge("   ❌ La liste ne contient pas les bons éléments.")
            manquants = ensemble_attendu - ensemble_obtenu
            en_trop   = ensemble_obtenu - ensemble_attendu
            if manquants:
                print_rouge(f"      Éléments manquants : {sorted(manquants)}")
            if en_trop:
                print_rouge(f"      Éléments en trop   : {sorted(en_trop)}")
        elif ordre_important:
            print_rouge("   ❌ Les éléments sont bons, mais pas dans le bon ordre.")
            print_rouge(f"      Attendu : {attendu}")
            print_rouge(f"      Obtenu  : {obtenu}")

    return False


def valider_tuple(obtenu, attendu):
    """Valide un tuple élément par élément avec des messages ciblés."""
    if obtenu == attendu:
        print_vert("   ✅ Résultat correct!")
        return True

    print_rouge("   ❌ Résultat incorrect.")

    if len(obtenu) != len(attendu):
        print_rouge(f"      Le tuple contient {len(obtenu)} élément(s), attendu : {len(attendu)}.")
    else:
        etiquettes = ["feuillus", "conifères"]  # Spécifique à QA3 du TP2
        for idx, (val_obt, val_att) in enumerate(zip(obtenu, attendu)):
            if val_obt != val_att:
                label = etiquettes[idx] if idx < len(etiquettes) else f"index {idx}"
                if isinstance(val_att, (int, float)):
                    direction = "trop élevé" if val_obt > val_att else "trop bas"
                    print_rouge(f"      [{label}] → {val_obt}  (attendu : {val_att}, valeur {direction})")
                else:
                    print_rouge(f"      [{label}] → '{val_obt}'  (attendu : '{val_att}')")

    return False


def valider_dict(obtenu, attendu, tolerance):
    """Valide un dictionnaire clé par clé, avec tolérance sur les flottants."""
    correct = True

    cles_manquantes = set(attendu.keys()) - set(obtenu.keys())
    cles_en_trop    = set(obtenu.keys())  - set(attendu.keys())

    if cles_manquantes:
        print_rouge(f"   ❌ Clé(s) manquante(s) dans le dictionnaire : {cles_manquantes}")
        correct = False

    if cles_en_trop:
        print_rouge(f"   ❌ Clé(s) inattendue(s) dans le dictionnaire : {cles_en_trop}")
        correct = False

    for cle in set(attendu.keys()) & set(obtenu.keys()):
        val_att = attendu[cle]
        val_obt = obtenu[cle]

        if isinstance(val_att, float):
            tol = tolerance if tolerance > 0 else 1e-9
            if not math.isclose(float(val_obt), val_att, abs_tol=tol):
                direction = "trop élevée" if val_obt > val_att else "trop basse"
                print_rouge(f"   ❌ '{cle}' : valeur {direction}.")
                print_rouge(f"      Attendu : {val_att:.4f}   Obtenu : {val_obt:.4f}")
                correct = False

        elif isinstance(val_att, int):
            if val_obt != val_att:
                direction = "trop élevée" if val_obt > val_att else "trop basse"
                print_rouge(f"   ❌ '{cle}' : valeur {direction}.")
                print_rouge(f"      Attendu : {val_att}   Obtenu : {val_obt}")
                correct = False

        else:
            if val_obt != val_att:
                print_rouge(f"   ❌ '{cle}' : valeur incorrecte.")
                print_rouge(f"      Attendu : '{val_att}'   Obtenu : '{val_obt}'")
                correct = False

    if correct:
        print_vert("   ✅ Résultat correct!")

    return correct


def valider_resultat(abr, obtenu):
    """
    Dispatche la validation selon le type attendu pour une abréviation donnée.
    Retourne True si la réponse est correcte, False sinon.
    """
    config        = RESULTATS_ATTENDUS[abr]
    attendu       = config["valeur"]
    type_attendu  = config["type_attendu"]

    # ── Vérification du type de retour ──────────────────────────────────────
    #if not isinstance(obtenu, type_attendu) or not ((isinstance(obtenu, "StringArray") and type_attendu == "list")) :
    if not isinstance(obtenu, type_attendu) and (type_attendu == list and not isinstance(obtenu, pd.arrays.StringArray)) :
        print_rouge(f"   ❌ Mauvais type de retour!")
        print_rouge(f"      Type attendu : {type_attendu.__name__}")
        print_rouge(f"      Type obtenu  : {type(obtenu).__name__}")
        return False

    # ── Validation selon le type ─────────────────────────────────────────────
    if type_attendu == str:
        if obtenu == attendu:
            print_vert("   ✅ Résultat correct!")
            return True
        else:
            print_rouge(f"   ❌ Résultat incorrect.")
            print_rouge(f"      Attendu : '{attendu}'")
            print_rouge(f"      Obtenu  : '{obtenu}'")
            return False

    elif type_attendu in (int, float):
        tol = config.get("tolerance", 0)
        if math.isclose(float(obtenu), float(attendu), abs_tol=tol):
            print_vert("   ✅ Résultat correct!")
            return True
        else:
            direction = "trop élevée" if obtenu > attendu else "trop basse"
            print_rouge(f"   ❌ Valeur {direction}.")
            print_rouge(f"      Attendu : {attendu}   Obtenu : {obtenu}")
            return False

    elif type_attendu == list or type_attendu == pd.arrays.StringArray:
        return valider_liste(obtenu, attendu, config.get("ordre_important", True))

    elif type_attendu == tuple:
        return valider_tuple(obtenu, attendu)

    elif type_attendu == dict:
        return valider_dict(obtenu, attendu, config.get("tolerance", 0.0))

    # Type non géré
    print_jaune(f"   ⚠️  Type '{type_attendu.__name__}' non pris en charge par le validateur.")
    return False


def etape_2_validation_questions():
    banniere("🤖 ÉTAPE 2 de 2 — Validation des questions d'analyse (QA1 à QA6)")
    print()

    # Détecter les fonctions QA (stoppe si doublon détecté)
    fonctions_qa = trouver_fonctions_qa()

    if not fonctions_qa:
        print_jaune("⚠️  Aucune fonction d'analyse (QA1–QA6) trouvée dans analyse.py.")
        print_jaune("   Assurez-vous que les abréviations sont présentes dans les docstrings.")
        sys.exit(0)

    nb_trouvees = len(fonctions_qa)
    print(f"  {nb_trouvees} fonction(s) d'analyse trouvée(s) sur {NB_QUESTIONS} attendues.\n")

    resultats = {}

    for abr in ABREVIATIONS:

        if abr not in fonctions_qa:
            print_jaune(f"  [{abr}] ⚠️  Fonction non trouvée — ignorée.")
            print()
            continue

        func     = fonctions_qa[abr]
        question = RESULTATS_ATTENDUS[abr].get("question", abr)

        print(f"  [{abr}] {func.__name__}()")
        print(f"         {question}")

        try:
            obtenu = func()
        except Exception as e:
            print_rouge(f"   ❌ Erreur lors de l'exécution de {func.__name__}() :")
            print_rouge(f"      {e}")
            resultats[abr] = False
            print()
            continue

        resultats[abr] = valider_resultat(abr, obtenu)
        print()

    # ── Bilan final ──────────────────────────────────────────────────────────
    print("*+*" * 26 + "*")

    nb_correctes   = sum(1 for v in resultats.values() if v)
    nb_incorrectes = sum(1 for v in resultats.values() if not v)
    nb_testees     = len(resultats)

    if nb_testees == NB_QUESTIONS and nb_incorrectes == 0:
        print()
        print_vert("*** ✅ TOUTES LES QUESTIONS D'ANALYSE SONT CORRECTES! 🎉 BRAVO! ***")
        print_vert("    Les 6 fonctions ont retourné les résultats attendus.")

    else:
        if nb_incorrectes > 0:
            print()
            print_rouge(f"🛑 {nb_incorrectes} question(s) incorrecte(s) sur {nb_testees} testée(s).")
            print_rouge("   Corrigez les erreurs indiquées ci-dessus et relancez le script.")

        if nb_testees < NB_QUESTIONS and nb_incorrectes == 0 and nb_testees > 0:
            print()
            manquantes = [abr for abr in ABREVIATIONS if abr not in fonctions_qa]
            print_jaune("⚠️  Les fonctions trouvées retournent les bons résultats,")
            print_jaune(f"   mais il manque encore {NB_QUESTIONS - nb_testees} question(s) :")
            for abr in manquantes:
                print_jaune(f"   - {abr}")

        if nb_testees < NB_QUESTIONS and nb_incorrectes > 0:
            manquantes = [abr for abr in ABREVIATIONS if abr not in fonctions_qa]
            print()
            print_jaune(f"⚠️  De plus, {NB_QUESTIONS - nb_testees} fonction(s) manquante(s) : "
                        + ", ".join(manquantes))

    print()


# ════════════════════════════════════════════════════════════════════════════════
# 🚀  POINT D'ENTRÉE
# ════════════════════════════════════════════════════════════════════════════════

print()
print("*+*" * 26 + "*")
print(f"  SCRIPT D'AUTOCORRECTION — TP2 : Analyse de données ({VERSION})")
print(f"  Section validée : ÉLÉMENTS À ANALYSER (QA1 à QA6)")
print("*+*" * 26 + "*")
print()

etape_0_mise_a_jour()
etape_1_validation_parametres()
etape_2_validation_questions()
