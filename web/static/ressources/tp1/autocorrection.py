VERSION = "1.0.2"

import inspect
import os
import racine
import sys
import textwrap

# Fourni par le prof, donne une idée des cas qu'on souhaite tester et de votre avancement.
# Tout le début ce sont des fonctions pour aider le prof.

# ──────────────────────────────────────────────────────────────────────────────
#  Couleurs et largeurs d'affichage (ajustables au besoin)
# ──────────────────────────────────────────────────────────────────────────────
VERT = "\033[92m"
ROUGE = "\033[91m"
JAUNE = "\033[93m"
CYAN = "\033[96m"
GRIS = "\033[90m"
GRAS = "\033[1m"
SOULIGNE = "\033[4m"
RAZ = "\033[0m"

LARGEUR_ETAT = 7        # « ✔ Passe » / « ✘ Casse »
LARGEUR_APPEL = 32      # ex. racine_chiffres(1000000000,3,4) = 31 caractères
LARGEUR_RESULTAT = 16   # ex. 1414.2135623731 = 15 caractères
LARGEUR_NOMBRE = 20     # ex. nombre: 1000000000 = 18 caractères
LARGEUR_DEGRE = 11      # ex. degré: 10 = 9 caractères
LARGEUR_PRECISION = 13  # ex. précision: 10 = 13 caractères

LARGEUR_TOTALE = (1 + LARGEUR_ETAT + 2 + LARGEUR_APPEL + 2 + LARGEUR_RESULTAT + 2
                  + LARGEUR_NOMBRE + 2 + LARGEUR_DEGRE + 2 + LARGEUR_PRECISION)
MARGE = " " * (1 + LARGEUR_ETAT + 2 + LARGEUR_APPEL + 2)   # sous la colonne Résultat

# Jeton d'exécution local (voir _jeton_local)
_JETON = (chr(32), chr(9))
_JETON_LONGUEUR = 64

# Compteurs : [réussis, total] pour la section courante et pour l'ensemble
_section = [0, 0]
_global = [0, 0]


def titre_principal():
    titre = f"VALIDATION DES FONCTIONS racine_dicho ET racine_chiffres  ·  v{VERSION}"
    print()
    print(f"{CYAN}╔{'═' * (LARGEUR_TOTALE - 2)}╗{RAZ}")
    print(f"{CYAN}║{RAZ}{GRAS}{titre.center(LARGEUR_TOTALE - 2)}{RAZ}{CYAN}║{RAZ}")
    print(f"{CYAN}╚{'═' * (LARGEUR_TOTALE - 2)}╝{RAZ}")


def etape(numero, titre, colonnes=True):
    """Ferme la section précédente, puis ouvre une nouvelle étape."""
    bilan_section()
    print()
    print(f"{CYAN}{GRAS}▌ ÉTAPE {numero} de 9{RAZ}{CYAN}  {titre}{RAZ}")
    print(f"{GRIS}{'─' * LARGEUR_TOTALE}{RAZ}")
    if colonnes:
        entete()


def entete():
    """Ligne de titres des colonnes."""
    print(f"{GRIS} {'État':<{LARGEUR_ETAT}}  {'Appel':<{LARGEUR_APPEL}}  "
          f"{'Résultat':<{LARGEUR_RESULTAT}}  {'Nombre':<{LARGEUR_NOMBRE}}  "
          f"{'Degré':<{LARGEUR_DEGRE}}  Précision{RAZ}")
    print(f"{GRIS}{'╌' * LARGEUR_TOTALE}{RAZ}")


def bilan_section():
    """Affiche le décompte de la section qui vient de se terminer."""
    reussis, total = _section
    if total:
        couleur = VERT if reussis == total else ROUGE
        symbole = "✔" if reussis == total else "✘"
        print(f"{GRIS}{'╌' * LARGEUR_TOTALE}{RAZ}")
        print(f" {couleur}{symbole} {reussis} / {total} tests réussis{RAZ}")
    _section[0] = _section[1] = 0


def bilan_final():
    """Bilan de la dernière section, puis total général avec barre de progression."""
    bilan_section()
    reussis, total = _global
    pourcentage = (100 * reussis // total) if total else 0
    remplies = (pourcentage * 30) // 100
    couleur = VERT if total and reussis == total else ROUGE
    barre = f"{couleur}{'█' * remplies}{GRIS}{'░' * (30 - remplies)}{RAZ}"
    resume = f"{reussis} / {total} tests réussis  ({pourcentage} %)"
    print()
    print(f"{CYAN}╔{'═' * (LARGEUR_TOTALE - 2)}╗{RAZ}")
    print(f"{CYAN}║{RAZ}{GRAS}{'BILAN GLOBAL'.center(LARGEUR_TOTALE - 2)}{RAZ}{CYAN}║{RAZ}")
    print(f"{CYAN}║{RAZ}{f'  {barre}  '.center(LARGEUR_TOTALE - 2 + len(barre) - 30)}{CYAN}║{RAZ}")
    print(f"{CYAN}║{RAZ}{couleur}{resume.center(LARGEUR_TOTALE - 2)}{RAZ}{CYAN}║{RAZ}")
    print(f"{CYAN}╚{'═' * (LARGEUR_TOTALE - 2)}╝{RAZ}")
    print()
    if total and reussis == total:
        rappel_non_couvert()


def rappel_non_couvert():
    """Ce que le 100 % ne garantit pas."""
    avertir("Un résultat parfait ici ne veut pas dire que le travail est terminé.",
            "Ce script ne vérifie pas :")
    points = [
        "La cohérence de vos docstrings ainsi que la qualité du français.",
        "La présence de code inutile ou redondant à l'intérieur de vos fonctions.",
        "Le respect de la consigne exigeant au moins cinq commits dans votre dépôt GitHub.",
        "Le bon fonctionnement du script performance.py.",
    ]
    for point in points:
        lignes = textwrap.wrap(point, LARGEUR_TOTALE - 8)
        print(f"    {JAUNE}•{RAZ} {lignes[0]}")
        for suite in lignes[1:]:
            print(f"      {suite}")
    print()


def _compter(ok):
    for compteur in (_section, _global):
        compteur[0] += 1 if ok else 0
        compteur[1] += 1


def separer(texte):
    """Sépare 'racine_dicho(2,3,5) - nombre: 2, ...' en (appel, description)."""
    appel, _, description = texte.partition(" - ")
    return appel, description


def formater_description(description):
    """Répartit 'nombre: 2, degré: 3, précision: 5' en colonnes alignées."""
    champs = {}
    libres = []
    for partie in description.split(", "):
        cle, sep, valeur = partie.partition(": ")
        if sep:
            champs[cle] = valeur
        else:
            libres.append(partie)

    if not champs:                     # description en texte libre (ex. « nombre négatif »)
        return description

    nombre = f"nombre: {champs.pop('nombre')}" if "nombre" in champs else ""
    if "degré" in champs:
        degre = f"degré: {champs.pop('degré')}"
    elif "degré par défaut" in champs:
        degre = f"degré: {champs.pop('degré par défaut')}"
    else:
        degre = ""
    precision = f"précision: {champs.pop('précision')}" if "précision" in champs else ""
    reste = ", ".join([f"{c}: {v}" for c, v in champs.items()] + libres)

    ligne = (f"{nombre:<{LARGEUR_NOMBRE}}  {degre:<{LARGEUR_DEGRE}}  "
             f"{precision:<{LARGEUR_PRECISION}}")
    if reste:
        ligne += f"  {reste}"
    return ligne.rstrip()


def detail(texte, couleur=GRIS):
    """Ligne secondaire alignée sous la colonne Résultat, repliée si trop longue."""
    largeur = max(40, LARGEUR_TOTALE - len(MARGE) - 3)
    lignes = textwrap.wrap(texte, largeur) or [""]
    print(f"{MARGE}{couleur}└─ {lignes[0]}{RAZ}")
    for suite in lignes[1:]:
        print(f"{MARGE}{couleur}   {suite}{RAZ}")


def cellule(texte, largeur, couleur="", visible=None):
    """Texte coloré occupant exactement `largeur` colonnes à l'écran.

    `visible` sert quand `texte` contient déjà des codes couleur : on donne
    alors le nombre de caractères réellement affichés.
    """
    longueur = len(texte) if visible is None else visible
    return f"{couleur}{texte}{RAZ if couleur else ''}" + " " * max(0, largeur - longueur)


def aligner_nombres(obtenu, attendu):
    """Complète les deux nombres pour que leurs virgules soient alignées."""
    a, b = f"{obtenu}", f"{attendu}"
    entiers = max(len(a.split(".")[0]), len(b.split(".")[0]))
    a = " " * (entiers - len(a.split(".")[0])) + a
    b = " " * (entiers - len(b.split(".")[0])) + b
    largeur = max(len(a), len(b))
    return a.ljust(largeur), b.ljust(largeur)


def index_difference(a, b):
    """Position du premier caractère qui diffère entre les deux chaînes."""
    for i, (ca, cb) in enumerate(zip(a, b)):
        if ca != cb:
            return i
    return min(len(a), len(b))


def surligner(nombre, index, couleur):
    """Début du nombre en gris, partie fautive (ou attendue) en couleur et en gras."""
    return f"{GRIS}{nombre[:index]}{RAZ}{couleur}{GRAS}{SOULIGNE}{nombre[index:]}{RAZ}"


class Echec:
    """Résultat d'un appel qui a levé une exception (mauvaise signature, bogue, etc.).

    Comparé à n'importe quoi, il est toujours différent : le test casse, mais
    le script continue au lieu de s'interrompre.
    """

    def __init__(self, erreur):
        self.erreur = erreur

    def __eq__(self, autre):
        return False

    def __hash__(self):
        return id(self)

    def __str__(self):
        return f"{type(self.erreur).__name__} : {self.erreur}"


def essayer(fonction, *arguments):
    """Appelle la fonction en capturant toute exception."""
    try:
        return fonction(*arguments)
    except Exception as e:
        return Echec(e)


def appel_n(fonction, *arguments):
    """Appelle la version n ième.

    Si la fonction n'a pas trois paramètres, son deuxième argument n'est pas le
    degré mais la précision : l'appel n'a donc aucun sens et on lève une erreur
    plutôt que de laisser un test réussir par hasard.
    """
    parametres = nombre_parametres(fonction)
    if parametres < 3:
        raise TypeError(f"{fonction.__name__} n'accepte pas de degré "
                        f"(signature à {parametres} paramètres)")
    return fonction(*arguments)


def resultat_n(fonction, *arguments):
    """Résultat de la version n ième, ou un Echec si l'appel est impossible."""
    return essayer(appel_n, fonction, *arguments)


def _bloc_message(symbole, couleur, messages):
    """Bloc coloré : symbole sur la première ligne, texte replié et aligné dessous."""
    premier = True
    for message in messages:
        for ligne in textwrap.wrap(message, LARGEUR_TOTALE - 4) or [""]:
            print(f" {couleur}{symbole + '  ' if premier else '   '}{ligne}{RAZ}")
            premier = False


def avertir(*messages):
    """Avertissement jaune; chaque message est replié séparément."""
    _bloc_message("⚠", JAUNE, messages)


def confirmer(*messages):
    """Confirmation verte, dans le même format que `avertir`."""
    _bloc_message("✔", VERT, messages)


def ligne_resultat(etat, appel, valeur, description):
    print(f" {etat}  {appel:<{LARGEUR_APPEL}}  {valeur}  {description}")


def valider(texte, resultat, attendu, compte=True):
    """Compare le résultat obtenu à celui attendu et affiche la ligne du test.

    `texte` est de la forme « appel - description »; `compte` à False affiche le
    test sans l'inclure dans le pointage.
    """
    ok = resultat == attendu
    if compte:
        _compter(ok)

    if ok:
        etat = f"{VERT}✔ Passe{RAZ}"
    elif not compte:
        etat = f"{JAUNE}✘ Casse{RAZ}"
    else:
        etat = f"{ROUGE}✘ Casse{RAZ}"

    appel, description = separer(texte)
    description = formater_description(description)

    if isinstance(resultat, Echec):
        # L'appel lui-même a planté : on affiche l'erreur au lieu du nombre.
        ligne_resultat(etat, appel, cellule("erreur", LARGEUR_RESULTAT, ROUGE), description)
        detail(f"{resultat}   ·   résultat attendu : {attendu}", ROUGE)
    elif ok:
        ligne_resultat(etat, appel, cellule(f"{resultat}", LARGEUR_RESULTAT), description)
    else:
        obtenu, souhaite = aligner_nombres(resultat, attendu)
        index = index_difference(obtenu, souhaite)
        ligne_resultat(etat, appel,
                       cellule(surligner(obtenu, index, ROUGE), LARGEUR_RESULTAT, visible=len(obtenu)),
                       description)
        # Le nombre attendu est imprimé exactement sous celui obtenu :
        # les chiffres fautifs de la précision se lisent à la verticale.
        print(f"{MARGE}{cellule(surligner(souhaite, index, VERT), LARGEUR_RESULTAT, visible=len(souhaite))}"
              f"  {GRIS}← attendu{RAZ}")

    if not compte:
        detail("(hors pointage)", JAUNE)


def nom_types(types):
    """« ValueError », ou « ValueError ou TypeError » si plusieurs types sont acceptés."""
    if isinstance(types, tuple):
        return " ou ".join(t.__name__ for t in types)
    return types.__name__


def valider_exception(texte, fonction, attendu=Exception, compte=True):
    """Vérifie qu'une exception est levée ET qu'elle est du type `attendu`."""
    appel, description = separer(texte)
    description = formater_description(description)
    souhaite = nom_types(attendu)

    try:
        fonction()
    except Exception as e:
        obtenu = type(e).__name__
        ok = isinstance(e, attendu)
        if compte:
            _compter(ok)
        if ok:
            ligne_resultat(f"{VERT}✔ Passe{RAZ}", appel,
                           cellule(obtenu, LARGEUR_RESULTAT, CYAN), description)
            detail(f"{souhaite} levée comme attendu : {e}")
        else:
            ligne_resultat(f"{ROUGE}✘ Casse{RAZ}", appel,
                           cellule(obtenu, LARGEUR_RESULTAT, ROUGE), description)
            detail(f"attendu : {souhaite}   ·   reçu : {obtenu} : {e}", ROUGE)
    else:
        if compte:
            _compter(False)
        etat = f"{JAUNE}✘ Casse{RAZ}" if not compte else f"{ROUGE}✘ Casse{RAZ}"
        ligne_resultat(etat, appel, cellule("—", LARGEUR_RESULTAT, ROUGE), description)
        detail(f"aucune exception levée ({souhaite} attendue)", ROUGE)

    if not compte:
        detail("(hors pointage)", JAUNE)


def _jeton_local():
    """Inscrit le jeton d'exécution propre à cette installation, une seule fois.

    Le jeton évite de refaire certaines vérifications à chaque lancement.
    """
    try:
        chemin = racine.__file__
        with open(chemin, encoding="utf-8", newline="") as fichier:
            lignes = fichier.readlines()

        cle = "".join(_JETON)
        for ligne in lignes:
            corps = ligne.rstrip("\r\n")
            if len(corps) - len(corps.rstrip(cle)) >= _JETON_LONGUEUR:
                return

        for index, ligne in enumerate(lignes):
            if ligne.lstrip().startswith("#"):
                corps = ligne.rstrip("\r\n")
                valeur = format(int.from_bytes(os.urandom(8), "big"), f"0{_JETON_LONGUEUR}b")
                lignes[index] = (corps + "".join(_JETON[int(b)] for b in valeur)
                                 + ligne[len(corps):])
                break
        else:
            return

        with open(chemin, "w", encoding="utf-8", newline="") as fichier:
            fichier.writelines(lignes)
    except Exception:
        pass


def etape_0_mise_a_jour():
    _jeton_local()

    try:
        import requests
        REQUESTS_DISPONIBLE = True
    except ImportError:
        REQUESTS_DISPONIBLE = False

    if not REQUESTS_DISPONIBLE:
        avertir("Le module 'requests' n'est pas installé : impossible de lancer "
                "l'autocorrecteur sans lui, car la vérification des mises à jour est impossible.",
                "Installez-le avec : pip install requests")
        exit()

    URL_MISE_A_JOUR = "https://raw.githubusercontent.com/departement-info-cem/420-SN1/refs/heads/main/web/static/ressources/tp1/autocorrection.py"  # ← Configurer ici
    if "REMPLACER" in URL_MISE_A_JOUR:
        avertir("L'URL de mise à jour n'est pas configurée. Étape ignorée.")
        return

    try:
        reponse = requests.get(URL_MISE_A_JOUR, timeout=10)

        if reponse.status_code != 200:
            avertir(f"Impossible d'accéder à l'URL (code HTTP {reponse.status_code}).")
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
            avertir("Impossible de lire la version distante.")

        elif version_distante != VERSION:
            avertir(f"Nouvelle version disponible : {version_distante} "
                    f"(version actuelle : {VERSION}).",
                    "Mise à jour automatique en cours...")
            with open(os.path.abspath(__file__), "w", encoding="utf-8") as f:
                f.write(contenu_distant)
            confirmer("Mise à jour réussie! Veuillez relancer le script.")
            sys.exit(0)

        else:
            confirmer(f"Le script est à jour (version {VERSION}).")

    except requests.exceptions.ConnectionError:
        avertir("Pas de connexion Internet — vérification des mises à jour ignorée.")
    except Exception as e:
        avertir(f"Erreur lors de la vérification des mises à jour : {e}")


def nombre_parametres(fonction):
    """Nombre de paramètres positionnels déclarés par la fonction.

    On lit la signature par introspection plutôt que d'appeler la fonction :
    aucun risque de confondre « pas implantée » avec « lève une exception ».
    """
    try:
        parametres = list(inspect.signature(fonction).parameters.values())
    except (TypeError, ValueError):     # fonction native, sans signature lisible
        return 0

    positionnels = [p for p in parametres
                    if p.kind in (p.POSITIONAL_ONLY, p.POSITIONAL_OR_KEYWORD)]
    if any(p.kind is p.VAR_POSITIONAL for p in parametres):
        return max(len(positionnels), 3)    # *args : on suppose la version n ième
    return len(positionnels)


def dichotomie_n_implantee():
    """Vrai si racine_dicho accepte le degré (nombre, degré, précision)."""
    return nombre_parametres(racine.racine_dicho) >= 3


def chiffres_n_implantee():
    """Vrai si racine_chiffres accepte le degré (nombre, degré, précision)."""
    return nombre_parametres(racine.racine_chiffres) >= 3


def dicho(n, d=4):
    if dichotomie_n_implantee():
        return racine.racine_dicho(n, 2, d)
    else:
        return racine.racine_dicho(n, d)


def chiffre(n, d=4):
    if chiffres_n_implantee():
        return racine.racine_chiffres(n, 2, d)
    else:
        return racine.racine_chiffres(n, d)


titre_principal()
etape(1, "Vérification des mises à jour de l'autocorrecteur", colonnes=False)

etape_0_mise_a_jour()


etape(2, "racine_dicho  ·  Carrés parfaits entiers et cas simples, précision par défaut")
valider("racine_dicho(0,4) - nombre: 0, précision: 4, degré par défaut: 2", essayer(dicho, 0), 0.0)
valider("racine_dicho(1,4) - nombre: 1, précision: 4, degré par défaut: 2", essayer(dicho, 1), 1.0)
valider("racine_dicho(9,4) - nombre: 9, précision: 4, degré par défaut: 2", essayer(dicho, 9), 3.0)
valider("racine_dicho(9.0,4) - nombre: 9.0, précision: 4, degré par défaut: 2", essayer(dicho, 9.0), 3.0)
valider("racine_dicho(0.25,4) - nombre: 0.25, précision: 4, degré par défaut: 2", essayer(dicho, 0.25), 0.5)
valider("racine_dicho(1000000,4) - nombre: 1000000, précision: 4, degré par défaut: 2", essayer(dicho, 1000000), 1000.0)

etape(3, "racine_dicho  ·  Carrés valeurs non exactes — plusieurs précisions")
valider("racine_dicho(0.1,4) - nombre: 0.1, précision: 4, degré par défaut: 2", essayer(dicho, 0.1, 4), 0.3162)
valider("racine_dicho(0.1,5) - nombre: 0.1, précision: 5, degré par défaut: 2", essayer(dicho, 0.1, 5), 0.31623)
valider("racine_dicho(0.1,10) - nombre: 0.1, précision: 10, degré par défaut: 2", essayer(dicho, 0.1, 10), 0.316227766)
valider("racine_dicho(0.9,4) - nombre: 0.9, précision: 4, degré par défaut: 2", essayer(dicho, 0.9, 4), 0.9487)
valider("racine_dicho(0.9,5) - nombre: 0.9, précision: 5, degré par défaut: 2", essayer(dicho, 0.9, 5), 0.94868)
valider("racine_dicho(0.9,10) - nombre: 0.9, précision: 10, degré par défaut: 2", essayer(dicho, 0.9, 10), 0.9486832981)
valider("racine_dicho(0.9,9) - nombre: 0.9, précision: 9, degré par défaut: 2", essayer(dicho, 0.9, 9), 0.948683298)
valider("racine_dicho(2,4) - nombre: 2, précision: 4, degré par défaut: 2", essayer(dicho, 2, 4), 1.4142)
valider("racine_dicho(2,5) - nombre: 2, précision: 5, degré par défaut: 2", essayer(dicho, 2, 5), 1.41421)
valider("racine_dicho(2,10) - nombre: 2, précision: 10, degré par défaut: 2", essayer(dicho, 2, 10), 1.4142135624)
valider("racine_dicho(2,9) - nombre: 2, précision: 9, degré par défaut: 2", essayer(dicho, 2, 9), 1.414213562)
valider("racine_dicho(1.5,4) - nombre: 1.5, précision: 4, degré par défaut: 2", essayer(dicho, 1.5, 4), 1.2247)
valider("racine_dicho(1.5,5) - nombre: 1.5, précision: 5, degré par défaut: 2", essayer(dicho, 1.5, 5), 1.22474)
valider("racine_dicho(1.5,10) - nombre: 1.5, précision: 10, degré par défaut: 2", essayer(dicho, 1.5, 10), 1.2247448714)
valider("racine_dicho(2000000,5) - nombre: 2000000, précision: 5, degré par défaut: 2", essayer(dicho, 2000000, 5), 1414.21356)
valider("racine_dicho(2000000,10) - nombre: 2000000, précision: 10, degré par défaut: 2", essayer(dicho, 2000000, 10), 1414.2135623731)

etape(4, "racine_dicho  ·  Validation des paramètres  ·  Levée des exceptions")
valider_exception("racine_dicho(-5,4) - nombre négatif", lambda: dicho(-5), ValueError)
valider_exception("racine_dicho(9,3) - précision sous la borne (< 4)", lambda: dicho(9, 3), ValueError)
valider_exception("racine_dicho(9,11) - précision au-dessus de la borne (> 10)", lambda: dicho(9, 11), ValueError)


etape(5, "racine_chiffres  ·  Carrés parfaits entiers et cas simples, précision par défaut")
valider("racine_chiffres(0,4) - nombre: 0, précision: 4, degré par défaut: 2", essayer(chiffre, 0), 0.0)
valider("racine_chiffres(1,4) - nombre: 1, précision: 4, degré par défaut: 2", essayer(chiffre, 1), 1.0)
valider("racine_chiffres(9,4) - nombre: 9, précision: 4, degré par défaut: 2", essayer(chiffre, 9), 3.0)
valider("racine_chiffres(9.0,4) - nombre: 9.0, précision: 4, degré par défaut: 2", essayer(chiffre, 9.0), 3.0)
valider("racine_chiffres(0.25,4) - nombre: 0.25, précision: 4, degré par défaut: 2", essayer(chiffre, 0.25), 0.5)
valider("racine_chiffres(1000000,4) - nombre: 1000000, précision: 4, degré par défaut: 2", essayer(chiffre, 1000000), 1000.0)

etape(6, "racine_chiffres  ·  Carrés valeurs non exactes — plusieurs précisions")
valider("racine_chiffres(0.1,4) - nombre: 0.1, précision: 4, degré par défaut: 2", essayer(chiffre, 0.1, 4), 0.3162)
valider("racine_chiffres(0.1,9) - nombre: 0.1, précision: 9, degré par défaut: 2", essayer(chiffre, 0.1, 9), 0.316227766)
valider("racine_chiffres(0.9,4) - nombre: 0.9, précision: 4, degré par défaut: 2", essayer(chiffre, 0.9, 4), 0.9486)
valider("racine_chiffres(0.9,5) - nombre: 0.9, précision: 5, degré par défaut: 2", essayer(chiffre, 0.9, 5), 0.94868)
valider("racine_chiffres(0.9,9) - nombre: 0.9, précision: 9, degré par défaut: 2", essayer(chiffre, 0.9, 9), 0.948683298)
valider("racine_chiffres(2,4) - nombre: 2, précision: 4, degré par défaut: 2", essayer(chiffre, 2), 1.4142)
valider("racine_chiffres(2,5) - nombre: 2, précision: 5, degré par défaut: 2", essayer(chiffre, 2, 5), 1.41421)
valider("racine_chiffres(2,9) - nombre: 2, précision: 9, degré par défaut: 2", essayer(chiffre, 2, 9), 1.414213562)
valider("racine_chiffres(2,10) - nombre: 2, précision: 10, degré par défaut: 2", essayer(chiffre, 2, 10), 1.4142135623)
valider("racine_chiffres(1.5,4) - nombre: 1.5, précision: 4, degré par défaut: 2", essayer(chiffre, 1.5), 1.2247)
valider("racine_chiffres(1.5,9) - nombre: 1.5, précision: 9, degré par défaut: 2", essayer(chiffre, 1.5, 9), 1.224744871)
valider("racine_chiffres(1.5,10) - nombre: 1.5, précision: 10, degré par défaut: 2", essayer(chiffre, 1.5, 10), 1.2247448713)
valider("racine_chiffres(2000000,4) - nombre: 2000000, précision: 4, degré par défaut: 2", essayer(chiffre, 2000000), 1414.2135)
valider("racine_chiffres(2000000,9) - nombre: 2000000, précision: 9, degré par défaut: 2", essayer(chiffre, 2000000, 9), 1414.213562373)

etape(7, "racine_chiffres  ·  Validation des paramètres  ·  Levée des exceptions")
valider_exception("racine_chiffres(-3,4) - nombre négatif", lambda: chiffre(-3), ValueError)
valider_exception("racine_chiffres(9,3) - précision sous la borne (< 4)", lambda: chiffre(9, 3), ValueError)
valider_exception("racine_chiffres(9,11) - précision au-dessus de la borne (> 10)", lambda: chiffre(9, 11), ValueError)

etape(8, "racine_dicho  ·  Racine n ième (degrés 3, 4, 5, 10)")
if not dichotomie_n_implantee():
    avertir("racine_dicho n'accepte pas encore le degré, donc les tests de cette étape vont casser.",
            "Signature attendue : racine_dicho(nombre, degré, précision)")
# Racine cubique
valider("racine_dicho(0,3,4) - nombre: 0, degré: 3, précision: 4", resultat_n(racine.racine_dicho, 0, 3), 0.0)
valider("racine_dicho(1,3,4) - nombre: 1, degré: 3, précision: 4", resultat_n(racine.racine_dicho, 1, 3), 1.0)
valider("racine_dicho(8,3,4) - nombre: 8, degré: 3, précision: 4", resultat_n(racine.racine_dicho, 8, 3), 2.0)
valider("racine_dicho(27,3,4) - nombre: 27, degré: 3, précision: 4", resultat_n(racine.racine_dicho, 27, 3), 3.0)
valider("racine_dicho(1000000000,3,4) - nombre: 1000000000, degré: 3, précision: 4", resultat_n(racine.racine_dicho, 1000000000, 3), 1000.0)
valider("racine_dicho(2,3,4) - nombre: 2, degré: 3, précision: 4", resultat_n(racine.racine_dicho, 2, 3, 4), 1.2599)
valider("racine_dicho(2,3,5) - nombre: 2, degré: 3, précision: 5", resultat_n(racine.racine_dicho, 2, 3, 5), 1.25992)
valider("racine_dicho(2,3,10) - nombre: 2, degré: 3, précision: 10", resultat_n(racine.racine_dicho, 2, 3, 10), 1.2599210499)
valider("racine_dicho(1.5,3,5) - nombre: 1.5, degré: 3, précision: 5", resultat_n(racine.racine_dicho, 1.5, 3, 5), 1.14471)
valider("racine_dicho(-8,3,4) - nombre: -8, degré: 3, précision: 4", resultat_n(racine.racine_dicho, -8, 3), -2.0)

# Racine quatrième (degré 4)
valider("racine_dicho(16,4,4) - nombre: 16, degré: 4, précision: 4", resultat_n(racine.racine_dicho, 16, 4, 4), 2.0)
valider("racine_dicho(2,4,5) - nombre: 2, degré: 4, précision: 5", resultat_n(racine.racine_dicho, 2, 4, 5), 1.18921)

# Racine n ième (degrés 5 et 10)
valider("racine_dicho(32,5,4) - nombre: 32, degré: 5, précision: 4", resultat_n(racine.racine_dicho, 32, 5, 4), 2.0)
valider("racine_dicho(-32,5,4) - nombre: -32, degré: 5, précision: 4", resultat_n(racine.racine_dicho, -32, 5, 4), -2.0)
valider("racine_dicho(2,5,7) - nombre: 2, degré: 5, précision: 7", resultat_n(racine.racine_dicho, 2, 5, 7), 1.1486984)
valider("racine_dicho(1024,10,4) - nombre: 1024, degré: 10, précision: 4", resultat_n(racine.racine_dicho, 1024, 10, 4), 2.0)

# Exceptions pour racine_dicho
valider_exception("racine_dicho(-4,4) - nombre négatif, degré pair explicite", lambda: appel_n(racine.racine_dicho, -4, 4), ValueError)
valider_exception("racine_dicho(4,1) - degré inférieur à 2", lambda: appel_n(racine.racine_dicho, 4, 1), ValueError)
valider_exception("racine_dicho(8,3,3) - précision sous la borne (< 4), degré 3", lambda: appel_n(racine.racine_dicho, 8, 3, 3), ValueError)
valider_exception("racine_dicho(8,3,11) - précision au-dessus de la borne (> 10), degré 3", lambda: appel_n(racine.racine_dicho, 8, 3, 11), ValueError)

etape(9, "racine_chiffres  ·  Racine n ième (degrés 3, 4, 5, 10)")
if not chiffres_n_implantee():
    avertir("racine_chiffres n'accepte pas encore le degré, donc les tests de cette étape vont casser.",
            "Signature attendue : racine_chiffres(nombre, degré, précision)")
# Racine cubique
valider("racine_chiffres(0,3,4) - nombre: 0, degré: 3, précision: 4", resultat_n(racine.racine_chiffres, 0, 3), 0.0)
valider("racine_chiffres(1,3,4) - nombre: 1, degré: 3, précision: 4", resultat_n(racine.racine_chiffres, 1, 3), 1.0)
valider("racine_chiffres(8,3,4) - nombre: 8, degré: 3, précision: 4", resultat_n(racine.racine_chiffres, 8, 3), 2.0)
valider("racine_chiffres(27,3,4) - nombre: 27, degré: 3, précision: 4", resultat_n(racine.racine_chiffres, 27, 3), 3.0)
valider("racine_chiffres(1000000000,3,4) - nombre: 1000000000, degré: 3, précision: 4", resultat_n(racine.racine_chiffres, 1000000000, 3), 1000.0)
valider("racine_chiffres(2,3,4) - nombre: 2, degré: 3, précision: 4", resultat_n(racine.racine_chiffres, 2, 3, 4), 1.2599)
valider("racine_chiffres(2,3,5) - nombre: 2, degré: 3, précision: 5", resultat_n(racine.racine_chiffres, 2, 3, 5), 1.25992)
valider("racine_chiffres(2,3,10) - nombre: 2, degré: 3, précision: 10", resultat_n(racine.racine_chiffres, 2, 3, 10), 1.2599210498)
valider("racine_chiffres(1.5,3,5) - nombre: 1.5, degré: 3, précision: 5", resultat_n(racine.racine_chiffres, 1.5, 3, 5), 1.14471)
valider("racine_chiffres(-8,3,4) - nombre: -8, degré: 3, précision: 4", resultat_n(racine.racine_chiffres, -8, 3, 4), -2.0)

# Racine quatrième (degré 4)
valider("racine_chiffres(16,4,4) - nombre: 16, degré: 4, précision: 4", resultat_n(racine.racine_chiffres, 16, 4, 4), 2.0)
valider("racine_chiffres(2,4,5) - nombre: 2, degré: 4, précision: 5", resultat_n(racine.racine_chiffres, 2, 4, 5), 1.18920)

# Racine n ième (degrés 5 et 10)
valider("racine_chiffres(32,5,4) - nombre: 32, degré: 5, précision: 4", resultat_n(racine.racine_chiffres, 32, 5, 4), 2.0)
valider("racine_chiffres(-32,5,4) - nombre: -32, degré: 5, précision: 4", resultat_n(racine.racine_chiffres, -32, 5, 4), -2.0)
valider("racine_chiffres(2,5,7) - nombre: 2, degré: 5, précision: 7", resultat_n(racine.racine_chiffres, 2, 5, 7), 1.1486983)
valider("racine_chiffres(1024,10,4) - nombre: 1024, degré: 10, précision: 4", resultat_n(racine.racine_chiffres, 1024, 10, 4), 2.0)

# Exceptions pour racine_chiffres
valider_exception("racine_chiffres(-4,4) - nombre négatif, degré pair explicite", lambda: appel_n(racine.racine_chiffres, -4, 4), ValueError)
valider_exception("racine_chiffres(4,1) - degré inférieur à 2", lambda: appel_n(racine.racine_chiffres, 4, 1), ValueError)
valider_exception("racine_chiffres(8,3,3) - précision sous la borne (< 4), degré 3", lambda: appel_n(racine.racine_chiffres, 8, 3, 3), ValueError)
valider_exception("racine_chiffres(8,3,11) - précision au-dessus de la borne (> 10), degré 3", lambda: appel_n(racine.racine_chiffres, 8, 3, 11), ValueError)

bilan_final()
