VERSION = "1.0.8"

"""
autocorrection.py — Validation automatique du TP2 : Analyse de données
Section validée   : questions d'analyse
Référence         : Arbres répertoriés dans la Ville de Québec
"""

import sys
import os
import subprocess
import inspect
import math
import numpy as np
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

#URL_MISE_A_JOUR  = "https://REMPLACER_PAR_URL_REELLE/autocorrection.py"  # ← Configurer ici
URL_MISE_A_JOUR  = "https://raw.githubusercontent.com/departement-info-cem/420-SN1/refs/heads/main/web/static/ressources/tp2/autocorrecteur.py"  # ← Configurer ici
SCRIPT_TELECHARGEMENT_CSV = "telecharger_arbres_csv.py"  # relancé après chaque mise à jour

# Fonctions de analyse.py validées par l'autocorrecteur, avec leurs paramètres.
# Chaque paramètre est un tuple (nom, valeur par défaut); OBLIGATOIRE indique
# qu'aucune valeur par défaut n'est permise.
OBLIGATOIRE = inspect.Parameter.empty
SIGNATURES_ATTENDUES = {
    "question1": [],
    "question2": [("cardinal", OBLIGATOIRE)],
    "question3": [("cardinal", OBLIGATOIRE)],
    "question4": [("nom_lieu", OBLIGATOIRE)],
    "question5": [],
    "question6": [("lieu", "Parc Bardy")],
}
FONCTIONS_ATTENDUES = list(SIGNATURES_ATTENDUES)
NB_QUESTIONS     = len(FONCTIONS_ATTENDUES)


# ════════════════════════════════════════════════════════════════════════════════
# 📋  RÉSULTATS ATTENDUS  ←  REMPLACER LES VALEURS PAR LES BONNES RÉPONSES
# ════════════════════════════════════════════════════════════════════════════════
#
# Structure de chaque entrée :
# Chaque clé est le nom de la fonction à appeler dans analyse.py.
#
#   "question"        → intitulé affiché dans la console
#   "valeur"          → réponse correcte, écrite explicitement ci-dessous
#   "cas"             → liste de (argument, réponse attendue) pour les fonctions
#                       qui prennent un paramètre
#   "type_attendu"    → type Python que la fonction doit retourner
#   "ordre_important" → (list uniquement) True si l'ordre des éléments compte
#   "tolerance"       → (dict/float uniquement) écart absolu accepté

RESULTATS_ATTENDUS = {
    "question1": {
        "question"        : "Quels noms latins d'espèces distincts sont présents dans le jeu de données?",
        "valeur"          : """Abies
Abies Koreana 'Silberlocke'
Abies alba
Abies alba 'Pendula'
Abies balsamea
Abies concolor
Abies fraseri
Abies lasiocarpa
Acer
Acer freemanii 'Autumn Blaze'
Acer freemanii 'Autumn Fantasy'
Acer freemanii 'Celebration'
Acer freemanii 'Firefall'
Acer freemanii 'Marmo'
Acer freemanii 'Matador'
Acer freemanii 'Sienna Glen'
Acer ginnala
Acer ginnala 'Flame'
Acer ginnala 'Ruby Sleepers'
Acer miyabei 'State Street'
Acer negundo
Acer negundo 'Baron'
Acer negundo 'Kelly Gold'
Acer negundo 'Sensation'
Acer pensylvanicum
Acer platanoides
Acer platanoides 'Alberta Park'
Acer platanoides 'Cleveland'
Acer platanoides 'Columnare Compacta'
Acer platanoides 'Columnare'
Acer platanoides 'Crimson King'
Acer platanoides 'Crimson Sentry'
Acer platanoides 'Deborah'
Acer platanoides 'Drummondii'
Acer platanoides 'Emerald Queen'
Acer platanoides 'Fairview'
Acer platanoides 'Medzam'
Acer platanoides 'Pond'
Acer platanoides 'Royal Red'
Acer platanoides 'Schwedleri'
Acer platanoïdes 'Prince Gold'
Acer platanoïdes 'Superform'
Acer pseudoplatanus
Acer pseudoplatanus 'RegalPetticoat'
Acer rubrum
Acer rubrum 'Armstrong Gold'
Acer rubrum 'Armstrong'
Acer rubrum 'Autumn Flame'
Acer rubrum 'Bowhall'
Acer rubrum 'Brandywine'
Acer rubrum 'Columnare'
Acer rubrum 'Embers'
Acer rubrum 'Karpick'
Acer rubrum 'Morgan'
Acer rubrum 'Northfire'
Acer rubrum 'Northwood'
Acer rubrum 'Red Rocket'
Acer rubrum 'Red Sunset'
Acer rubrum 'Redpointe'
Acer rubrum 'Supersonic'
Acer saccharinum
Acer saccharinum 'Laciniatum Wieri'
Acer saccharinum 'Pyramidale'
Acer saccharinum 'Sheridan'
Acer saccharinum 'Silver Queen'
Acer saccharinum 'Skinner'
Acer saccharum
Acer saccharum 'Arrow Head'
Acer saccharum 'Autumn Faith'
Acer saccharum 'Autumn Fest'
Acer saccharum 'Endowment'
Acer saccharum 'Fairview'
Acer saccharum 'Fall Fiesta'
Acer saccharum 'Green Mountain'
Acer saccharum 'Legacy'
Acer saccharum 'Seneca Chief'
Acer saccharum 'Temple Upright'
Acer saccharum 'Unity'
Acer saccharum nigrum
Acer spicatum
Acer tataricum
Acer tataricum 'Hot Wings'
Acer tataricum 'Pattern Perfect'
Acer tataricum 'Rugged Charm'
Aesculus
Aesculus 'Autumn Splendor'
Aesculus glabra
Aesculus hippocastanum
Aesculus x carnea
Alnus
Alnus glutinosa
Alnus glutinosa 'Imperialis'
Alnus incana 'Aurea'
Alnus spaethii
Amelanchier
Amelanchier arborea
Amelanchier canadensis
Amelanchier canadensis 'Robin Hill'
Amelanchier canadensis 'lamarckii'
Amelanchier grandiflora 'Autumn Brilliance'
Amelanchier grandiflora 'Princess Diana'
Amelanchier laevis
Amelanchier laevis 'Ballerina'
Amelanchier laevis 'Cumulus'
Amelanchier laevis Spring Flurry
Arbre feuillu privé en haie
Betula
Betula alleghaniensis
Betula glandulosa
Betula nigra
Betula nigra 'Heritage'
Betula papyrifera
Betula papyrifera 'Oenci'
Betula papyrifera 'Prairie Dream'
Betula papyrifera 'Reflection Renaissance'
Betula pendula
Betula pendula 'Laciniata'
Betula pendula 'Purpurea'
Betula platiphylla Dakota Pinnacle
Betula platyphylla 'Japonica'
Betula populifolia
Betula pumila
Carpinus caroliana
Carpinus caroliana Rising Fire
Carya cordiformis
Carya laciniosa
Carya ovata
Catalpa
Catalpa ovata
Catalpa speciosa
Celtis occidentalis
Celtis occidentalis ' Ultra'
Celtis occidentalis 'Chiacagoland'
Celtis occidentalis 'Prairie Sentinel'
Cercidiphyllum japonicum
Cercis canadensis
Chamaecyparis pisifera
Cladrastris lutea
Conifère privé en haie
Cornus alternifolia
Corylus colurna
Crataegus
Crataegus crus-galli 'Inermis'
Crataegus crus-galli inermis 'Cruzam'
Crataegus leavigata 'Crimson Cloud'
Crataegus mordenensis 'Snowbird'
Crataegus mordenensis 'Toba'
Crataegus punctata
Crataegus virilis 'Winter King'
Elaeagnus angustifolia
Essence à déterminer
Eucommia ulmoïdes
Fagus
Fagus grandifolia
Fagus sylvatica 'Red Obelisk'
Fagus sylvatica purpurea
Fraxinus
Fraxinus americana
Fraxinus americana 'Autumn Applause'
Fraxinus americana 'Autumn Blaze'
Fraxinus americana 'Autumn Purple'
Fraxinus americana 'Manitou'
Fraxinus americana 'Northern Treasure'
Fraxinus americana 'Windy City'
Fraxinus excelsior
Fraxinus excelsior 'Pendula'
Fraxinus mandshurica
Fraxinus nigra
Fraxinus nigra 'Fall Gold'
Fraxinus pennsylvanica
Fraxinus pennsylvanica 'Bergeson'
Fraxinus pennsylvanica 'Lanceolata'
Fraxinus pennsylvanica 'Marshall Seedless'
Fraxinus pennsylvanica 'Patmore'
Fraxinus pennsylvanica 'Prairie Spire'
Fraxinus pennsylvanica 'Summit'
Fraxinus quadrangulata
Ginkgo biloba
Ginkgo biloba 'Magyar'
Ginkgo biloba 'Princeton Sentry'
Ginkgo biloba Autumn Gold
Ginkgo biloba Fairmount
Ginkgo biloba The President
Gleditsia
Gleditsia triacanthos inermis
Gleditsia triacanthos inermis 'Dursan'
Gleditsia triacanthos inermis 'Halka'
Gleditsia triacanthos inermis 'Imperial'
Gleditsia triacanthos inermis 'Northern Acclaim'
Gleditsia triacanthos inermis 'Perfection'
Gleditsia triacanthos inermis 'Shademaster'
Gleditsia triacanthos inermis 'Skyline'
Gleditsia triacanthos inermis 'Spectrum'
Gleditsia triacanthos inermis 'Street Keeper'
Gleditsia triacanthos inermis 'Sunburst'
Gymnocladus dioicus
Gymnocladus dioicus 'Espresso'
Juglans
Juglans cinerea
Juglans nigra
Larix
Larix Kaempferi
Larix decidua
Larix decidua 'Pendula'
Larix laricina
Larix x marschlinsii
Liquidambar styraciflua 'Moraine'
Liriodendron tulipifera
Maackia amurensis
Magnolia
Magnolia acuminata
Magnolia loebneri Leonard Messel
Malus
Malus 'Almey'
Malus 'American Beauty'
Malus 'Autumn Delight '
Malus 'Autumn Gold'
Malus 'Brandywine'
Malus 'Centurion'
Malus 'Coralburst'
Malus 'Coutabri'
Malus 'Cowichan'
Malus 'Dolgo'
Malus 'Echtermeyer'
Malus 'Evereste'
Malus 'Gladiator'
Malus 'Golden Raindrops'
Malus 'Harvest Gold'
Malus 'Hopa'
Malus 'Indian Magic'
Malus 'Indian Summer'
Malus 'John Downie'
Malus 'Kerr'
Malus 'Liberty'
Malus 'Louisa'
Malus 'Madonna'
Malus 'Makamik'
Malus 'Maybride'
Malus 'Ming Dynasty'
Malus 'Molten Lava'
Malus 'Naragansett'
Malus 'Ormiston Roy'
Malus 'Pink River'
Malus 'Pink Spires'
Malus 'Prairie Fire'
Malus 'Radiant'
Malus 'Ralph Shay'
Malus 'Red Jade'
Malus 'Red Jewel'
Malus 'Red Splendor'
Malus 'Rinki'
Malus 'Robinson'
Malus 'Rosseau'
Malus 'Royal Beauty'
Malus 'Royal Raindrops'
Malus 'Royalty'
Malus 'Rudolph'
Malus 'Scarlett'
Malus 'Selkirck'
Malus 'Shaker Gold'
Malus 'Snowcloud'
Malus 'Snowdrif '
Malus 'Springsnow'
Malus 'Sugar Tyme'
Malus 'Sweet Sixteen'
Malus 'Thunderchild'
Malus 'Tschonoskii'
Malus 'Winter Gold'
Malus baccata
Malus baccata ' Rosthern '
Malus baccata 'Columnaris'
Malus baccata 'Erecta'
Malus floribunda 'Rosea'
Malus ioensis 'Klehmi'
Malus moerlandsii 'Liset'
Malus moerlandsii 'Profusion'
Malus purpurea
Malus purpurea 'Eleyi Compacta'
Malus sargentii
Malus zumi 'Calocarpa'
Metasequoia glyptostroboides
Morus alba
Morus alba 'Pendula'
Orme privé en haie
Ostrya virginiana
Phellodendron Eye Stopper
Phellodendron amurense
Phellodendron amurense 'His Majesty'
Phellodendron amurense 'Macho'
Picea
Picea abies
Picea abies 'Acrocona'
Picea abies 'Penddula'
Picea abies 'Rubra Spicata'
Picea abies 'Viminalis'
Picea abies 'Virgata '
Picea asperata 'Pendula'
Picea glauca
Picea glauca 'Coerulea'
Picea glauca 'Pendula'
Picea mariana
Picea omorika
Picea omorika 'Pendua'
Picea pugens 'Bakerii'
Picea pungens
Picea pungens 'Baby Blue Eyes'
Picea pungens 'Fat Albert'
Picea pungens 'Glauca Bleu Intense'
Picea pungens 'Glauca Fastigiata'
Picea pungens 'Glauca'
Picea pungens 'Hoopsii'
Picea pungens 'Iseli Fastigiata'
Picea pungens 'Koster'
Picea pungens 'Mission Blue'
Picea pungens 'Moerheim'
Picea pungens 'Montgomery'
Picea pungens 'Pendula'
Picea pungens 'Shilo Weeping'
Picea pungens 'Tiffin'
Pinus
Pinus aristata
Pinus banksiana
Pinus cembra
Pinus mugo
Pinus mugo 'Mughus'
Pinus nigra
Pinus nigra 'Arnold Sentinel'
Pinus parviflora
Pinus ponderosa
Pinus resinosa
Pinus strobus
Pinus strobus 'Alba'
Pinus sylvestris
Platanus acerifolia 'Exclamation'
Platanus occidentalis
Populus
Populus X berolinensis
Populus alba
Populus balsamifera
Populus canadensis 'Eugeni'
Populus canadensis 'Prairie Sky'
Populus canescens 'Tower'
Populus deltoides
Populus deltoides 'Siouxland'
Populus grandidentata
Populus nigra 'Italica'
Populus tremula 'Erecta'
Populus tremuloides
Populus tremuloides 'Prairie Gold '
Populus x canescens
Prunus
Prunus 'Pembina'
Prunus cistena
Prunus maackii
Prunus maackii 'Ming'
Prunus maackii Goldspur
Prunus maackii Klondike
Prunus padus
Prunus padus 'Colorata'
Prunus padus 'Commutata'
Prunus pensylvanica
Prunus serotina
Prunus toka
Prunus virginiana
Prunus virginiana 'Schubert'
Pseudotsuga Menziesii
Pseudotsuga menziesii glauca
Ptelea trifoliata
Pyrus
Pyrus 'Bartlett'
Pyrus calleryana 'Chanticleer'
Pyrus communis 'Beauté Flamande'
Pyrus communis 'Clapp's Favorite '
Pyrus fauriei 'Westwood'
Pyrus ussuriensis
Pyrus ussuriensis Mordak
Pyrus ussuriensis Mountain frost
Quercus
Quercus 'Regal Prince'
Quercus Jordan Street
Quercus Streetspire
Quercus alba
Quercus biicolor
Quercus coccinea
Quercus ellipsoidalis
Quercus ellipsoidalis 'Majestic Skies'
Quercus macrocarpa
Quercus macrocarpa 'Urban Pinnacle'
Quercus muehlenbergii
Quercus palustris
Quercus palustris 'GreenPillar'
Quercus palustris 'Pacific Brilliance'
Quercus petraea
Quercus robur
Quercus robur 'Crimson Spire'
Quercus robur 'Fastigiata Skyrocket'
Quercus robur 'Fatigiata'
Quercus robur 'Kindred Spirit'
Quercus rubra
Rhus typhina
Robinia pseudoacacia
Robinia pseudoacacia 'Purple Robe'
Salix
Salix alba
Salix alba 'Tristis'
Salix babylonica
Salix babylonica 'Prairie Cascade'
Salix fragilis
Salix pentandra
Sorbus
Sorbus americana
Sorbus americana 'Belmonte'
Sorbus aucuparia
Sorbus aucuparia 'Cardinal Royal'
Sorbus aucuparia 'Fastigiata'
Sorbus aucuparia 'Rossica'
Sorbus decora
Sorbus intermedia
Sorbus thuringiaca 'Fastigiata'
Syringa pekinensis 'SunDak'
Syringa reticulata
Syringa reticulata 'Boulevard'
Syringa reticulata 'Golden Eclipse'
Syringa reticulata 'Ivory Silk'
Syringa vulgaris
Thuja
Thuja occidentalis
Thuja occidentalis 'Fastigiata'
Thuja occidentalis 'Smaragd '
Tilia
Tilia 'Flavescens Glenleven'
Tilia 'Flavescens Sheridan hybrids'
Tilia americana
Tilia americana 'American Sentry'
Tilia americana 'Boulevard'
Tilia americana 'Nova'
Tilia americana 'Redmond'
Tilia americana 'fastigiata'
Tilia cordata
Tilia cordata 'Corzam'
Tilia cordata 'De Groot'
Tilia cordata 'Golden Cascade'
Tilia cordata 'Greenspire'
Tilia cordata 'Norlin'
Tilia dasystyla
Tilia europaea 'Pallida'
Tilia europaea 'Wratislaviensis'
Tilia mongolica 'Harvest Gold'
Tilia platyphyllos
Tilia tomentosa 'Shahazam'
Tilia tomentosa 'Sterling'
Tsuga canadensis
Ulmus
Ulmus 'Danada Charm'
Ulmus 'Frontier'
Ulmus 'Homestead'
Ulmus 'Morten Commendation'
Ulmus 'Morton Accolade'
Ulmus 'Morton Glossy Triumph'
Ulmus 'New Horizon'
Ulmus 'Regal'
Ulmus americana
Ulmus americana 'Brandon'
Ulmus americana 'Delaware'
Ulmus americana 'Jefferson'
Ulmus americana 'New Harmony'
Ulmus americana 'Princeton'
Ulmus americana 'Valley Forge'
Ulmus davidiana 'Discovery'
Ulmus davidiana 'Greenstone'
Ulmus davidiana Burgundy Glow
Ulmus glabra
Ulmus glabra 'Camperdownii'
Ulmus glabra 'Exoniensis'
Ulmus hollandica 'Pioneer'
Ulmus parvifolia 'Geisha'
Ulmus patriot
Ulmus pumila
Ulmus pumila 'Park Royal'
Ulmus rubra
Ulmus thomasii
Ulmus wilsoniana 'Prospector'
Ulmus x
Viburnum lentago
syringa reticulata ssp amurensis
thuya occidentalis 'Nigra'""".splitlines(),
        "type_attendu"    : list,
        "ordre_important" : False,
    },
    "question2": {
        "question"     : "Quelle est la topographie où se trouve l'arbre le plus au point cardinal demandé?",
        "type_attendu" : str,
        "cas"          : [
            ("sud", "Rue Moisan"),
            ("nord", "Rue des Hautes-Terres"),
            ("est", "Piste cyclable Corridor du Littoral"),
            ("ouest", "Chemin du Roy"),
        ],
    },
    "question3": {
        "question"     : "Quelques infos sur l'arbre le plus au point cardinal demandé?",
        "type_attendu" : dict,
        "cas"          : [
            ("sud", {
                "espece_en_français": "orme d'Amérique",
                "coordonnées": (46.7236561843032, -71.48769442648174),
                "nom": "Rue Moisan",
            }),
            ("nord", {
                "espece_en_français": "aubépine ergot-de-coq 'Inermis'",
                "coordonnées": (46.95887005661445, -71.21440621073573),
                "nom": "Rue des Hautes-Terres",
            }),
            ("est", {
                "espece_en_français": "peuplier à feuilles deltoides",
                "coordonnées": (46.88353165685608, -71.14657868701667),
                "nom": "Piste cyclable Corridor du Littoral",
            }),
            ("ouest", {
                "espece_en_français": "orme d'Amérique",
                "coordonnées": (46.7252505146418, -71.53657773485358),
                "nom": "Chemin du Roy",
            }),
        ],
    },
    "question4": {
        "question"     : "Combien d'espèces distinctes sont recensées dans le lieu demandé?",
        "valeur"       : 44,
        "type_attendu" : int,
        "cas"          : [
            ("Parc Jean-Marc-Gauthier", 26),
            ("Parc De Beaumont", 32),
            ("Parc Bardy", 44),
            ("Parc-école de Stadacona", 6)
        ],
    },
    "question5": {
        "question"     : "Quel lieu compte le plus d'espèces d'arbres?",
        "valeur"       : {
            "nom_lieu": "Parc de l'Arboretum",
            "nombre_espèces": 204,
        },
        "type_attendu" : dict,
    },
    "question6": {
        "question"     : "Quel est le diamètre moyen du tronc des feuillus et des conifères dans le lieu demandé?",
        "type_attendu" : dict,
        "tolerance"    : 0.01,
        "cas"          : [
            ("Parc Bardy", {
                "diametre_feuillus": 27.2347,
                "diametre_coniferes": 23.375,
            }),
            ("Parc De Beaumont", {
                "diametre_feuillus": 36.8804,
                "diametre_coniferes": 32.3404,
            }),
        ],
    },
}


# ════════════════════════════════════════════════════════════════════════════════
# 🖨️  FONCTIONS D'AFFICHAGE
# ════════════════════════════════════════════════════════════════════════════════

def print_vert(texte):   print(f"\033[32m{texte}\033[0m")
def print_rouge(texte):  print(f"\033[31m{texte}\033[0m")
def print_jaune(texte):  print(f"\033[93m{texte}\033[0m")
def print_cyan(texte):   print(f"\033[96m{texte}\033[0m")


def banniere(titre):
    ligne = "*+*" * 26 + "*"
    print(ligne)
    print(f"  {titre}")
    print(ligne)


# ════════════════════════════════════════════════════════════════════════════════
# 🔄  ÉTAPE #0 — MISE À JOUR AUTOMATIQUE
# ════════════════════════════════════════════════════════════════════════════════

def relancer_telechargement_csv():
    """
    Exécute telecharger_arbres_csv.py (situé dans le même dossier que ce script)
    pour récupérer la version du fichier CSV qui correspond au nouvel autocorrecteur.
    """
    dossier = os.path.dirname(os.path.abspath(__file__))
    chemin  = os.path.join(dossier, SCRIPT_TELECHARGEMENT_CSV)

    if not os.path.isfile(chemin):
        print_jaune(f"⚠️  {SCRIPT_TELECHARGEMENT_CSV} est introuvable dans {dossier}.")
        print_jaune("    Exécutez-le manuellement pour mettre à jour le fichier CSV.")
        return

    print_jaune(f"    Exécution de {SCRIPT_TELECHARGEMENT_CSV} pour mettre à jour le fichier CSV...")
    print()
    try:
        resultat = subprocess.run([sys.executable, chemin], cwd=dossier)
    except Exception as e:
        print_rouge(f"❌ Impossible d'exécuter {SCRIPT_TELECHARGEMENT_CSV} : {e}")
        return

    print()
    if resultat.returncode == 0:
        print_vert("✅ Le fichier CSV a été mis à jour.")
    else:
        print_rouge(f"❌ {SCRIPT_TELECHARGEMENT_CSV} s'est terminé avec une erreur (code {resultat.returncode}).")
        print_rouge("   Exécutez-le manuellement pour mettre à jour le fichier CSV.")


def etape_0_mise_a_jour():
    banniere(f"🔄 ÉTAPE 0 de 2 — Vérification de la version du script ({VERSION})")
    print()

    if not REQUESTS_DISPONIBLE:
        print_jaune("⚠️  Le module 'requests' n'est pas installé.")
        print_jaune("   Vérification des mises à jour impossible.")
        print_jaune("   Installez-le avec : pip install requests")
        print()
        exit()
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

        elif tuple(map(int, version_distante.split("."))) > tuple(map(int, VERSION.split("."))):
            print_jaune(f"⚠️  Nouvelle version disponible : {version_distante}  (version actuelle : {VERSION})")
            print_jaune("    Mise à jour automatique en cours...")
            with open(os.path.abspath(__file__), "w", encoding="utf-8") as f:
                f.write(contenu_distant)
            print_vert("✅ Mise à jour de l'autocorrecteur réussie!")
            relancer_telechargement_csv()
            print_vert("👉 Veuillez relancer l'autocorrecteur.")
            sys.exit(0)

        else:
            print_vert(f"✅ Le script est à jour (version {VERSION}).")

    except requests.exceptions.ConnectionError:
        print_jaune("⚠️  Pas de connexion Internet — vérification des mises à jour ignorée.")
    except Exception as e:
        print_jaune(f"⚠️  Erreur lors de la vérification des mises à jour : {e}")

    print()


# ════════════════════════════════════════════════════════════════════════════════
# ✅  ÉTAPE #1 — VALIDATION DES SIGNATURES
# ════════════════════════════════════════════════════════════════════════════════

def formater_signature(nom):
    """Retourne la signature attendue d'une fonction, ex. question6(lieu="Parc Bardy")."""
    morceaux = []
    for nom_param, defaut in SIGNATURES_ATTENDUES[nom]:
        if defaut is OBLIGATOIRE:
            morceaux.append(nom_param)
        else:
            morceaux.append(f"{nom_param}={defaut!r}".replace("'", '"'))
    return f"{nom}({', '.join(morceaux)})"


def signature_est_conforme(func, parametres_attendus):
    """Vérifie que les paramètres de func correspondent exactement à ceux attendus."""
    params = list(inspect.signature(func).parameters.values())
    if len(params) != len(parametres_attendus):
        return False
    for param, (nom_attendu, defaut_attendu) in zip(params, parametres_attendus):
        if param.name != nom_attendu:
            return False
        if param.kind not in (
            inspect.Parameter.POSITIONAL_ONLY,
            inspect.Parameter.POSITIONAL_OR_KEYWORD,
        ):
            return False
        if defaut_attendu is OBLIGATOIRE:
            if param.default is not inspect.Parameter.empty:
                return False
        elif param.default is inspect.Parameter.empty or param.default != defaut_attendu:
            return False
    return True


def cellule_statut(statut, largeur):
    """Cellule centrée et colorée : True (vert), False (rouge) ou Absente (jaune)."""
    if statut is None:
        texte, code = "Absente", "\033[93m"
    else:
        texte = "True" if statut else "False"
        code  = "\033[32m" if statut else "\033[31m"
    pad   = largeur - len(texte)
    pad_g = pad // 2
    pad_d = pad - pad_g
    return f"{' ' * pad_g}{code}{texte}\033[0m{' ' * pad_d}"


def etape_1_validation_parametres():
    banniere("🤖 ÉTAPE 1 de 2 — Validation des signatures")
    print()

    infos = []
    for nom, parametres in SIGNATURES_ATTENDUES.items():
        func = getattr(analyse, nom, None)
        if not inspect.isfunction(func):
            statut = None  # fonction absente
        else:
            statut = signature_est_conforme(func, parametres)
        infos.append({
            "nom"       : nom,
            "signature" : formater_signature(nom),
            "statut"    : statut,
        })

    if all(i["statut"] is None for i in infos):
        print_rouge("❌ Aucune des fonctions attendues (question1 à question6) n'a été trouvée dans analyse.py!")
        sys.exit(1)

    col_nom = max(len("Fonction"), max(len(i["nom"]) for i in infos)) + 2
    col_sig = max(len("Signature attendue"), max(len(i["signature"]) for i in infos)) + 2
    col_ok  = len("Signature conforme") + 2

    sep = f"  +{'-' * col_nom}+{'-' * col_sig}+{'-' * col_ok}+"

    print(sep)
    print(
        f"  |{'Fonction':^{col_nom}}|{'Signature attendue':^{col_sig}}|"
        f"{'Signature conforme':^{col_ok}}|"
    )
    print(sep)

    erreur = False
    for i in infos:
        nom_cell = f"{i['nom']:^{col_nom}}"
        sig_cell = f"{i['signature']:^{col_sig}}"
        ok_cell  = cellule_statut(i["statut"], col_ok)
        print(f"  |{nom_cell}|{sig_cell}|{ok_cell}|")
        if i["statut"] is False:
            erreur = True

    print(sep)
    print()

    if erreur:
        print_rouge("❌ ERREUR : Une ou plusieurs fonctions n'ont pas la signature attendue.")
        print_rouge("   question2 et question3 doivent prendre uniquement le paramètre obligatoire cardinal.")
        print_rouge("   question4 doit prendre uniquement le paramètre obligatoire nom_lieu.")
        print_rouge('   question6 doit prendre le paramètre optionnel lieu="Parc Bardy".')
        print_rouge("   question1 et question5 ne doivent prendre aucun paramètre.")
        print_rouge("   ⛔ L'étape #2 ne sera pas exécutée.")
        sys.exit(1)

    absentes = [i["nom"] for i in infos if i["statut"] is None]
    if absentes:
        print_jaune("⚠️  Fonction(s) absente(s) de analyse.py : " + ", ".join(absentes))
        print_vert("✅ Les fonctions présentes ont la signature attendue.")
    else:
        print_vert("✅ Toutes les fonctions ont la signature attendue.")
    print()


# ════════════════════════════════════════════════════════════════════════════════
# 🔍  ÉTAPE #2 — VALIDATION DES QUESTIONS D'ANALYSE
# ════════════════════════════════════════════════════════════════════════════════

def trouver_fonctions_analyse():
    """
    Retourne un dict {nom_fonction: fonction} contenant les fonctions attendues
    (question1 à question6) qui sont définies dans le module analyse.
    """
    resultat = {}
    for nom in FONCTIONS_ATTENDUES:
        func = getattr(analyse, nom, None)
        if inspect.isfunction(func):
            resultat[nom] = func
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

        if isinstance(val_att, tuple):
            tol = tolerance if tolerance > 0 else 1e-9
            if not isinstance(val_obt, tuple):
                print_rouge(f"   ❌ '{cle}' : doit être un tuple.")
                print_rouge(f"      Type obtenu : {type(val_obt).__name__}")
                correct = False
            elif len(val_obt) != len(val_att):
                print_rouge(f"   ❌ '{cle}' : le tuple doit contenir {len(val_att)} éléments (obtenu : {len(val_obt)}).")
                correct = False
            else:
                try:
                    egaux = all(math.isclose(float(o), a, abs_tol=tol) for o, a in zip(val_obt, val_att))
                except (TypeError, ValueError):
                    egaux = False
                if not egaux:
                    if tuple(val_obt[::-1]) == val_att or (
                        all(isinstance(v, (int, float)) for v in val_obt)
                        and all(math.isclose(float(o), a, abs_tol=tol) for o, a in zip(val_obt[::-1], val_att))
                    ):
                        print_rouge(f"   ❌ '{cle}' : les valeurs sont inversées. L'ordre attendu est (latitude, longitude).")
                    else:
                        print_rouge(f"   ❌ '{cle}' : valeur incorrecte.")
                    print_rouge(f"      Attendu : {val_att}   Obtenu : {val_obt}")
                    correct = False

        elif isinstance(val_att, float):
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


def type_est_valide(obtenu, type_attendu):
    """
    Vérifie que la valeur retournée est du type attendu.
    Les types numériques de NumPy (ex. numpy.int64) et les StringArray de pandas
    sont acceptés comme équivalents des types Python correspondants.
    """
    if isinstance(obtenu, bool):
        return type_attendu == bool
    if type_attendu == list:
        return isinstance(obtenu, (list, pd.arrays.StringArray))
    if type_attendu == int:
        return isinstance(obtenu, (int, np.integer))
    if type_attendu == float:
        return isinstance(obtenu, (int, float, np.integer, np.floating))
    return isinstance(obtenu, type_attendu)


def valider_resultat(nom_fonction, obtenu, valeur_attendue=None):
    """
    Dispatche la validation selon le type attendu pour une fonction donnée.
    Retourne True si la réponse est correcte, False sinon.
    """
    config        = RESULTATS_ATTENDUS[nom_fonction]
    attendu       = config["valeur"] if valeur_attendue is None else valeur_attendue
    type_attendu  = config["type_attendu"]

    # ── Vérification du type de retour ──────────────────────────────────────
    if not type_est_valide(obtenu, type_attendu):
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

    elif type_attendu == dict:
        return valider_dict(obtenu, attendu, config.get("tolerance", 0.0))

    # Type non géré
    print_jaune(f"   ⚠️  Type '{type_attendu.__name__}' non pris en charge par le validateur.")
    return False


def etape_2_validation_questions():
    banniere("🤖 ÉTAPE 2 de 2 — Validation des questions d'analyse (question1 à question6)")
    print()

    fonctions = trouver_fonctions_analyse()

    if not fonctions:
        print_jaune("⚠️  Aucune fonction d'analyse (question1 à question6) trouvée dans analyse.py.")
        print_jaune("   Assurez-vous que les fonctions portent exactement ces noms.")
        sys.exit(0)

    nb_trouvees = len(fonctions)
    print(f"  {nb_trouvees} fonction(s) d'analyse trouvée(s) sur {NB_QUESTIONS} attendues.\n")

    resultats = {}

    for nom in FONCTIONS_ATTENDUES:

        if nom not in fonctions:
            print_jaune(f"  [{nom}] ⚠️  Fonction non trouvée — ignorée.")
            print()
            continue

        func     = fonctions[nom]
        question = RESULTATS_ATTENDUS[nom].get("question", nom)

        print(f"  [{formater_signature(nom)}]")
        print(f"         {question}")

        if "cas" in RESULTATS_ATTENDUS[nom]:
            resultats_cas = []
            for argument, valeur_attendue in RESULTATS_ATTENDUS[nom]["cas"]:
                print(f"   Cas : {argument}")
                try:
                    obtenu = func(argument)
                    resultats_cas.append(
                        valider_resultat(nom, obtenu, valeur_attendue)
                    )
                except Exception as e:
                    print_rouge(f"   ❌ Erreur avec l'argument {argument} :")
                    print_rouge(f"      {e}")
                    resultats_cas.append(False)
            resultats[nom] = all(resultats_cas)
        else:
            try:
                obtenu = func()
            except Exception as e:
                print_rouge(f"   ❌ Erreur lors de l'exécution de {nom}():")
                print_rouge(f"      {e}")
                resultats[nom] = False
                print()
                continue

            try:
                resultats[nom] = valider_resultat(nom, obtenu)
            except Exception as e:
                print_rouge(f"   ❌ Erreur lors de la validation du résultat de {nom}():")
                print_rouge(f"      {e}")
                resultats[nom] = False
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
            manquantes = [nom for nom in FONCTIONS_ATTENDUES if nom not in fonctions]
            print_jaune("⚠️  Les fonctions trouvées retournent les bons résultats,")
            print_jaune(f"   mais il manque encore {NB_QUESTIONS - nb_testees} question(s) :")
            for nom in manquantes:
                print_jaune(f"   - {nom}")

        if nb_testees < NB_QUESTIONS and nb_incorrectes > 0:
            manquantes = [nom for nom in FONCTIONS_ATTENDUES if nom not in fonctions]
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
print("  Section validée : ÉLÉMENTS À ANALYSER (question1 à question6)")
print("*+*" * 26 + "*")
print()

etape_0_mise_a_jour()
etape_1_validation_parametres()
etape_2_validation_questions()
