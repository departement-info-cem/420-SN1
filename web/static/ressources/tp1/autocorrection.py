import racine
import math

# CONFIGURATION DU SCRIPT, MODIFIEZ UNIQUEMENT CES LIGNES AUX BESOINS, MODIFIEZ RIEN D'AUTRE
methode1 = racine.racine_dichotomie  # Mettre le nom exacte de la fonction pour la racine dichotomie. Juste le nom, sans parenthèse!
methode2 = racine.racine_chiffre_par_chiffre  # Mettre le nom exacte de la fonction pour la racine chiffre par chiffre. Juste le nom, sans parenthèse!
valider_methode1 = True # Mettre à False pour désactiver les tests en lien avec la méthode 1
valider_methode2 = True  # Mettre à False pour désactiver les tests en lien avec la méthode 2
valider_parametres = True  # Mettre à False pour désactiver les tests en lien avec les paramètres (raise des ValueError)
valider_cas_racine_cubique_et_4eme = True  # Mettre à False pour désactiver les tests en lien avec les racines cubique et 4ème
# FIN DE LA CONFIGURATION

def verifier_racine_base_diverse(methode, nombre, base):
    if base == 2:
        attendu = round(math.sqrt(nombre), racine.PRECISION)
    elif base == 3:
        attendu = round(math.cbrt(nombre), racine.PRECISION)
    elif base == 4:
        attendu = round(math.sqrt(math.sqrt(nombre)), racine.PRECISION)

    obtenu = methode(nombre, base)

    if obtenu == attendu:
        print(f"\033[32mSuccès\033[0m")
    else:
        print(f"\033[31mÉchec\033[0m")
        print(f"\033[31m     attendu : {attendu}\033[0m")
        print(f"\033[31m      obtenu : {obtenu}\033[0m")
        global erreur_detecte
        erreur_detecte = True


def verifier_racine_carre(methode, nombre):
    attendu = round(math.sqrt(nombre), racine.PRECISION)

    obtenu = methode(nombre)

    if obtenu == attendu:
        print(f"\033[32mSuccès\033[0m")
    else:
        print(f"\033[31mÉchec\033[0m")
        print(f"\033[31m     attendu : {attendu}\033[0m")
        print(f"\033[31m      obtenu : {obtenu}\033[0m")
        global erreur_detecte
        erreur_detecte = True


# Valider la présence de la variable globale PRECISION
try:
    valeur = racine.PRECISION
except AttributeError:
    print("Oups, la variable PRECISION est manquante dans le module racine!")
    exit()

erreur_detecte = False

liste_methodes = []
if valider_methode1 :
    liste_methodes.append(methode1)
if valider_methode2 :
    liste_methodes.append(methode2)
liste_precisions = [4, 5, 6, 7, 8, 9, 10]
liste_cas_racine_carre = [0, 0.1, 0.2, 0.9, 8, 9, 81, 123, 999]
liste_cas_racine_diverses = [8, 9, 81, 123]

print("*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*")
print("     SCRIPT DE VALIDATION DES 2 FONCTIONS CALCULANT LA RACINE CARRÉE")
print()
print("    🤖 ÉTAPE 1 de 2 - Exécution des tests avec des paramètres valides ")
print("*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*\n")
for methode in liste_methodes:

    for precision in liste_precisions:

        racine.PRECISION = precision  # Modifier la précision du module

        for cas in liste_cas_racine_carre:
            instruction = f"{methode.__name__}({cas})"
            print(f"  {instruction:<50} précision {precision:<2} base par défaut        ", end="")
            verifier_racine_carre(methode, cas)

        if valider_cas_racine_cubique_et_4eme:
            for base in [2, 3, 4]:
                for cas in liste_cas_racine_diverses:
                    instruction = f"{methode.__name__}({cas})"
                    print(f"  {instruction:<50} précision {precision:<2} base {base}                 ", end="")
                    verifier_racine_base_diverse(methode, cas, base)

if erreur_detecte:
    print("\033[31m\n❌ Certains tests de calcul de racine avec des paramètres valides ne fonctionnent pas!\n\033[0m")
else:
    print("\033[32m\n✅ Tous les tests de calcul de racine avec des paramètres valides fonctionnent!\n\033[0m")

erreur_detecte_partie_2 = False

if valider_parametres:

    print("*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*")
    print("🤖 ÉTAPE 2 de 2 - Exécution des tests avec des paramètres invalides ")
    print("*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*\n")

    for methode in liste_methodes:

        try:
            instruction = f"{methode.__name__}(-3)"
            print(f"  {instruction:<50}", end="")
            methode(-3)
            print(f"\033[31mÉchec\033[0m")
            print("\033[31mLa racine négative n'est pas possible (avec base 2), exception non levée.\033[0m")
            erreur_detecte_partie_2 = True
        except ValueError as e:
            print(f"\033[32mSuccès\033[0m")

    if valider_cas_racine_cubique_et_4eme:

        for methode in liste_methodes:

            try:
                instruction = f"{methode.__name__}(-4, 4)"
                print(f"  {instruction:<50}", end="")
                methode(-4, 4)
                print(f"\033[31mÉchec\033[0m")
                print(
                    "\033[31mLa racine d'un nombre négatif est possible uniquement avec une base impaire, exception non levée.\033[0m")
                erreur_detecte_partie_2 = True
            except ValueError as e:
                print(f"\033[32mSuccès\033[0m")

            try:
                instruction = f"{methode.__name__}(4, 1.5)"
                print(f"  {instruction:<50}", end="")
                methode(4, 1.5)
                print(f"\033[31mÉchec\033[0m")
                print("\033[31mLa base doit être supérieure ou égale à 2, exception non levée.\033[0m")
                erreur_detecte_partie_2 = True
            except ValueError as e:
                print(f"\033[32mSuccès\033[0m")

    if erreur_detecte_partie_2:
        print(
            "\033[31m\n❌ Certains tests de calcul de racine avec des paramètres invalides ne fonctionnent pas!\n\033[0m")
    else:
        print("\033[32m\n✅ Tous les tests de calcul de racine avec des paramètres invalides fonctionnent!\n\033[0m")

if erreur_detecte == False and erreur_detecte_partie_2 == False:
    print("\n\033[32m*** ✅ TOUS LES TESTS ONT PASSÉ AVEC SUCCÈS 🎉 BRAVO! ***\033[0m")
else:
    print("\033[31m🛑 DES CORRECTIONS SONT NÉCESSAIRES \033[0m")

if valider_parametres == False or valider_cas_racine_cubique_et_4eme == False or len(liste_methodes) != 2:
    print("\033[93m⚠️ ATTENTION! VOUS AVEZ DÉSACTIVÉS CERTAINS TESTS \033[0m")
