import React, { useState } from "react";
import styles from "./styles.module.css";

/* ------------------------------------------------------------------ */
/*  Disposition « Français (Canada) » (clavier des laboratoires)       */
/*  Coordonnées en « unités de touche » (1 u = largeur d'une lettre). */
/* ------------------------------------------------------------------ */

type Touche = {
  id: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  base?: string; // touche seule
  maj?: string; // Maj + touche
  alt?: string; // Alt Car + touche
  lettre?: string; // touche de lettre
  label?: string; // touche spéciale
  sous?: string; // légende secondaire (pavé numérique)
  morte?: Array<"base" | "maj">; // touches mortes
  entree?: boolean; // forme de la touche Entrée (ISO)
};

const LETTRES = (ligne: string, x0: number, y: number, alt: Record<string, string> = {}): Touche[] =>
  ligne.split("").map((l, i) => ({ id: l.toLowerCase(), x: x0 + i, y, lettre: l, alt: alt[l] }));

const R1 = 1.5; // première rangée du bloc principal
const NAV = 15.25;
const PAV = 18.75;

const TOUCHES: Touche[] = [
  // Rangée des fonctions
  { id: "echap", x: 0, y: 0, label: "Échap" },
  ...[1, 2, 3, 4].map((n, i) => ({ id: `f${n}`, x: 2 + i, y: 0, label: `F${n}` })),
  ...[5, 6, 7, 8].map((n, i) => ({ id: `f${n}`, x: 6.5 + i, y: 0, label: `F${n}` })),
  ...[9, 10, 11, 12].map((n, i) => ({ id: `f${n}`, x: 11 + i, y: 0, label: `F${n}` })),
  { id: "impec", x: NAV, y: 0, label: "ImpÉc Syst" },
  { id: "defil", x: NAV + 1, y: 0, label: "Défil" },
  { id: "pause", x: NAV + 2, y: 0, label: "Pause Attn" },

  // Rangée des chiffres
  { id: "diese", x: 0, y: R1, base: "#", maj: "|", alt: "\\" },
  { id: "k1", x: 1, y: R1, base: "1", maj: "!", alt: "±" },
  { id: "k2", x: 2, y: R1, base: "2", maj: '"', alt: "@" },
  { id: "k3", x: 3, y: R1, base: "3", maj: "/", alt: "£" },
  { id: "k4", x: 4, y: R1, base: "4", maj: "$", alt: "¢" },
  { id: "k5", x: 5, y: R1, base: "5", maj: "%", alt: "¤" },
  { id: "k6", x: 6, y: R1, base: "6", maj: "?", alt: "¬" },
  { id: "k7", x: 7, y: R1, base: "7", maj: "&", alt: "¦" },
  { id: "k8", x: 8, y: R1, base: "8", maj: "*", alt: "²" },
  { id: "k9", x: 9, y: R1, base: "9", maj: "(", alt: "³" },
  { id: "k0", x: 10, y: R1, base: "0", maj: ")", alt: "¼" },
  { id: "moins", x: 11, y: R1, base: "-", maj: "_", alt: "½" },
  { id: "egal", x: 12, y: R1, base: "=", maj: "+", alt: "¾" },
  { id: "retour", x: 13, y: R1, w: 2, label: "⟵ Retour" },
  { id: "inser", x: NAV, y: R1, label: "Inser" },
  { id: "pos1", x: NAV + 1, y: R1, label: "Pos1" },
  { id: "pgar", x: NAV + 2, y: R1, label: "PgAR" },
  { id: "verrnum", x: PAV, y: R1, label: "Verr Num" },
  { id: "npdiv", x: PAV + 1, y: R1, base: "/" },
  { id: "npmul", x: PAV + 2, y: R1, base: "*" },
  { id: "npmoins", x: PAV + 3, y: R1, base: "-" },

  // Rangée QWERTY
  { id: "tab", x: 0, y: R1 + 1, w: 1.5, label: "Tab ⭾" },
  ...LETTRES("QWERTYUIOP", 1.5, R1 + 1, { O: "§", P: "¶" }),
  { id: "circ", x: 11.5, y: R1 + 1, base: "^", maj: "^", alt: "[", morte: ["base", "maj"] },
  { id: "cedille", x: 12.5, y: R1 + 1, base: "¸", maj: "¨", alt: "]", morte: ["base", "maj"] },
  { id: "entree", x: 13.5, y: R1 + 1, w: 1.5, h: 2, label: "Entrée ↵", entree: true },
  { id: "suppr", x: NAV, y: R1 + 1, label: "Suppr" },
  { id: "fin", x: NAV + 1, y: R1 + 1, label: "Fin" },
  { id: "pgav", x: NAV + 2, y: R1 + 1, label: "PgAV" },
  { id: "np7", x: PAV, y: R1 + 1, base: "7", sous: "Pos1" },
  { id: "np8", x: PAV + 1, y: R1 + 1, base: "8", sous: "↑" },
  { id: "np9", x: PAV + 2, y: R1 + 1, base: "9", sous: "PgAR" },
  { id: "npplus", x: PAV + 3, y: R1 + 1, h: 2, base: "+" },

  // Rangée ASDF
  { id: "fixmaj", x: 0, y: R1 + 2, w: 1.75, label: "Fix Maj" },
  ...LETTRES("ASDFGHJKL", 1.75, R1 + 2),
  { id: "pointvirgule", x: 10.75, y: R1 + 2, base: ";", maj: ":", alt: "~" },
  { id: "grave", x: 11.75, y: R1 + 2, base: "`", maj: "`", alt: "{", morte: ["base", "maj"] },
  { id: "inf", x: 12.75, y: R1 + 2, base: "<", maj: ">", alt: "}" },
  { id: "np4", x: PAV, y: R1 + 2, base: "4", sous: "←" },
  { id: "np5", x: PAV + 1, y: R1 + 2, base: "5" },
  { id: "np6", x: PAV + 2, y: R1 + 2, base: "6", sous: "→" },

  // Rangée ZXCV
  { id: "majg", x: 0, y: R1 + 3, w: 1.25, label: "⇧ Maj" },
  { id: "guillemets", x: 1.25, y: R1 + 3, base: "«", maj: "»", alt: "°" },
  ...LETTRES("ZXCVBNM", 2.25, R1 + 3, { M: "µ" }),
  { id: "virgule", x: 9.25, y: R1 + 3, base: ",", maj: "'", alt: "¯" },
  { id: "point", x: 10.25, y: R1 + 3, base: ".", maj: "." },
  { id: "eaigu", x: 11.25, y: R1 + 3, base: "é", maj: "É", alt: "´" },
  { id: "majd", x: 12.25, y: R1 + 3, w: 2.75, label: "⇧ Maj" },
  { id: "haut", x: NAV + 1, y: R1 + 3, label: "↑" },
  { id: "np1", x: PAV, y: R1 + 3, base: "1", sous: "Fin" },
  { id: "np2", x: PAV + 1, y: R1 + 3, base: "2", sous: "↓" },
  { id: "np3", x: PAV + 2, y: R1 + 3, base: "3", sous: "PgAV" },
  { id: "npentree", x: PAV + 3, y: R1 + 3, h: 2, label: "Entr" },

  // Rangée du bas
  { id: "ctrlg", x: 0, y: R1 + 4, w: 1.25, label: "Ctrl" },
  { id: "wing", x: 1.25, y: R1 + 4, w: 1.25, label: "⊞" },
  { id: "altg", x: 2.5, y: R1 + 4, w: 1.25, label: "Alt" },
  { id: "espace", x: 3.75, y: R1 + 4, w: 6.25, label: "Espace" },
  { id: "altcar", x: 10, y: R1 + 4, w: 1.25, label: "Alt Car" },
  { id: "wind", x: 11.25, y: R1 + 4, w: 1.25, label: "⊞" },
  { id: "menu", x: 12.5, y: R1 + 4, w: 1.25, label: "☰" },
  { id: "ctrld", x: 13.75, y: R1 + 4, w: 1.25, label: "Ctrl" },
  { id: "gauche", x: NAV, y: R1 + 4, label: "←" },
  { id: "bas", x: NAV + 1, y: R1 + 4, label: "↓" },
  { id: "droite", x: NAV + 2, y: R1 + 4, label: "→" },
  { id: "np0", x: PAV, y: R1 + 4, w: 2, base: "0", sous: "Inser" },
  { id: "nppoint", x: PAV + 2, y: R1 + 4, base: ".", sous: "Suppr" },
];

const PAR_ID: Record<string, Touche> = Object.fromEntries(TOUCHES.map((t) => [t.id, t]));
const LARGEUR = PAV + 4; // en unités
const HAUTEUR = R1 + 5;

/* ------------------------------------------------------------------ */
/*  Caractères importants en Python                                   */
/* ------------------------------------------------------------------ */

type Modif = null | "maj" | "altcar";
type Caractere = {
  c: string;
  nom: string;
  mod: Modif;
  touche: string;
  morte?: boolean; // touche morte : appuyer ensuite sur Espace
  aussi?: string; // autre touche possible (pavé numérique)
  python: string; // exemple d'utilisation
};

export const GROUPES: { titre: string; caracteres: Caractere[] }[] = [
  {
    titre: "Chaînes et commentaires",
    caracteres: [
      { c: "'", nom: "Apostrophe", mod: "maj", touche: "virgule", python: "nom = 'Alice'" },
      { c: '"', nom: "Guillemet", mod: "maj", touche: "k2", python: 'print("Bonjour")' },
      { c: "#", nom: "Dièse", mod: null, touche: "diese", python: "# Ceci est un commentaire" },
      { c: "\\", nom: "Barre oblique inversée", mod: "altcar", touche: "diese", python: 'print("Ligne 1\\nLigne 2")' },
    ],
  },
  {
    titre: "Parenthèses, crochets et accolades",
    caracteres: [
      { c: "(", nom: "Parenthèse ouvrante", mod: "maj", touche: "k9", python: "print(x)" },
      { c: ")", nom: "Parenthèse fermante", mod: "maj", touche: "k0", python: "total = (a + b) * 2" },
      { c: "[", nom: "Crochet ouvrant", mod: "altcar", touche: "circ", python: "notes = [80, 92]" },
      { c: "]", nom: "Crochet fermant", mod: "altcar", touche: "cedille", python: "premier = notes[0]" },
      { c: "{", nom: "Accolade ouvrante", mod: "altcar", touche: "grave", python: 'print(f"Total : {total}")' },
      { c: "}", nom: "Accolade fermante", mod: "altcar", touche: "inf", python: 'print(f"{nom} a {age} ans")' },
    ],
  },
  {
    titre: "Affectation et comparaisons",
    caracteres: [
      { c: "=", nom: "Égal", mod: null, touche: "egal", python: "x = 5      # affectation\nif x == 5: # comparaison" },
      { c: "<", nom: "Plus petit que", mod: null, touche: "inf", python: "if age < 18:" },
      { c: ">", nom: "Plus grand que", mod: "maj", touche: "inf", python: "if note >= 60:" },
      { c: "!", nom: "Point d'exclamation", mod: "maj", touche: "k1", python: 'if reponse != "oui":' },
      { c: ":", nom: "Deux-points", mod: "maj", touche: "pointvirgule", python: "def saluer():\nif x > 0:\nfor i in range(3):" },
    ],
  },
  {
    titre: "Opérateurs mathématiques",
    caracteres: [
      { c: "+", nom: "Plus", mod: "maj", touche: "egal", aussi: "npplus", python: "somme = a + b" },
      { c: "-", nom: "Moins (trait d'union)", mod: null, touche: "moins", aussi: "npmoins", python: "difference = a - b" },
      { c: "*", nom: "Astérisque", mod: "maj", touche: "k8", aussi: "npmul", python: "aire = largeur * hauteur\ncube = x ** 3" },
      { c: "/", nom: "Barre oblique", mod: "maj", touche: "k3", aussi: "npdiv", python: "moyenne = total / 3\nquotient = 7 // 2" },
      { c: "%", nom: "Pourcentage (modulo)", mod: "maj", touche: "k5", python: "if n % 2 == 0:  # n est pair" },
      { c: "^", nom: "Accent circonflexe", mod: null, touche: "circ", morte: true, python: "x = 5 ^ 3  # OU exclusif (pas une puissance!)" },
    ],
  },
  {
    titre: "Autres symboles utiles",
    caracteres: [
      { c: "_", nom: "Tiret bas (souligné)", mod: "maj", touche: "moins", python: "prix_total = 0\nif __name__ == \"__main__\":" },
      { c: "&", nom: "Esperluette", mod: "maj", touche: "k7", python: "x = 6 & 3  # ET bit à bit (on utilise and en logique)" },
      { c: "|", nom: "Barre verticale", mod: "maj", touche: "diese", python: "x = 6 | 3  # OU bit à bit (on utilise or en logique)" },
      { c: ",", nom: "Virgule", mod: null, touche: "virgule", python: "print(a, b, c)" },
      { c: ".", nom: "Point", mod: null, touche: "point", aussi: "nppoint", python: "pi = 3.14\nnom.upper()" },
      { c: "?", nom: "Point d'interrogation", mod: "maj", touche: "k6", python: 'age = input("Quel âge as-tu? ")' },
      { c: "`", nom: "Accent grave (Markdown)", mod: null, touche: "grave", morte: true, python: "Dans un fichier Markdown : `print()`" },
    ],
  },
];

const TOUS: Caractere[] = GROUPES.flatMap((g) => g.caracteres);

/* ------------------------------------------------------------------ */
/*  Rendu                                                             */
/* ------------------------------------------------------------------ */

type Surlignage = {
  cibles?: string[]; // touches principales
  modifs?: string[]; // touches à maintenir
  autres?: string[]; // autre façon (pavé numérique)
  legende?: { touche: string; niveau: "base" | "maj" | "alt" };
};

function Legende({ t, s }: { t: Touche; s: Surlignage }) {
  const actif = (niveau: "base" | "maj" | "alt") =>
    s.legende && s.legende.touche === t.id && s.legende.niveau === niveau ? styles.legActive : "";
  if (t.lettre) {
    return (
      <>
        <span className={styles.lettre}>{t.lettre}</span>
        {t.alt && <span className={`${styles.alt} ${actif("alt")}`}>{t.alt}</span>}
      </>
    );
  }
  if (t.maj || t.alt) {
    return (
      <>
        {t.maj && <span className={`${styles.maj} ${actif("maj")}`}>{t.maj}</span>}
        <span className={`${styles.base} ${actif("base")}`}>{t.base}</span>
        {t.alt && <span className={`${styles.alt} ${actif("alt")}`}>{t.alt}</span>}
      </>
    );
  }
  if (t.base) {
    return (
      <>
        <span className={`${styles.lettre} ${actif("base")}`}>{t.base}</span>
        {t.sous && <span className={styles.sous}>{t.sous}</span>}
      </>
    );
  }
  return <span className={styles.label}>{t.label}</span>;
}

export function Clavier({
  surligner = [],
  maintenir = [],
  surlignage,
  onToucheClic,
}: {
  surligner?: string[];
  maintenir?: string[];
  surlignage?: Surlignage;
  onToucheClic?: (t: Touche) => void;
}): JSX.Element {
  const s: Surlignage = surlignage ?? { cibles: surligner, modifs: maintenir };
  const classe = (t: Touche) => {
    const c = [styles.touche];
    if (t.entree) c.push(styles.entree);
    if (s.cibles?.includes(t.id)) c.push(styles.cible);
    if (s.modifs?.includes(t.id)) c.push(styles.modif);
    if (s.autres?.includes(t.id)) c.push(styles.autre);
    if (onToucheClic && (t.maj || t.alt)) c.push(styles.cliquable);
    return c.join(" ");
  };
  const info = (t: Touche) =>
    t.maj || t.alt
      ? [`Seule : ${t.base}`, t.maj && `Maj : ${t.maj}`, t.alt && `Alt Car : ${t.alt}`].filter(Boolean).join("   •   ")
      : undefined;

  return (
    <div className={styles.defilement}>
      <div className={styles.boitier}>
        <div className={styles.clavier} style={{ aspectRatio: `${LARGEUR} / ${HAUTEUR}` }}>
          {TOUCHES.map((t) => (
            <div
              key={t.id}
              className={classe(t)}
              title={info(t)}
              onClick={onToucheClic && (t.maj || t.alt) ? () => onToucheClic(t) : undefined}
              style={{
                left: `${(t.x / LARGEUR) * 100}%`,
                top: `${(t.y / HAUTEUR) * 100}%`,
                width: `${((t.w ?? 1) / LARGEUR) * 100}%`,
                height: `${((t.h ?? 1) / HAUTEUR) * 100}%`,
              }}
            >
              <div className={styles.dessus}>
                <Legende t={t} s={s} />
              </div>
            </div>
          ))}
          <div className={styles.voyants} style={{ left: `${(PAV / LARGEUR) * 100}%`, width: `${(4 / LARGEUR) * 100}%` }}>
            <span className={styles.voyantOn} title="Verr Num activé" />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Petites touches « dessinées » pour décrire une combinaison */
export function Kbd({ children, mod }: { children: React.ReactNode; mod?: "maj" | "altcar" }) {
  return <kbd className={`${styles.kbd} ${mod ? styles[`kbd_${mod}`] : ""}`}>{children}</kbd>;
}

function Combinaison({ car }: { car: Caractere }) {
  const t = PAR_ID[car.touche];
  const capTouche = (
    <Kbd>
      {t.maj && <span className={styles.kbdHaut}>{t.maj}</span>}
      <span>{t.base ?? t.lettre}</span>
      {t.alt && <span className={styles.kbdAlt}>{t.alt}</span>}
    </Kbd>
  );
  return (
    <div className={styles.combinaison}>
      {car.mod === "maj" && (
        <>
          <Kbd mod="maj">⇧ Maj</Kbd>
          <span className={styles.plus}>+</span>
        </>
      )}
      {car.mod === "altcar" && (
        <>
          <Kbd mod="altcar">Alt Car</Kbd>
          <span className={styles.plus}>+</span>
        </>
      )}
      {capTouche}
      {car.morte && (
        <>
          <span className={styles.puis}>puis</span>
          <Kbd>Espace</Kbd>
        </>
      )}
      <span className={styles.egal}>→</span>
      <span className={styles.resultat}>{car.c}</span>
    </div>
  );
}

export default function ClavierInteractif(): JSX.Element {
  const [choix, setChoix] = useState<Caractere>(TOUS[1]);
  const [toucheInfo, setToucheInfo] = useState<Touche | null>(null);

  const surlignage: Surlignage = toucheInfo
    ? { cibles: [toucheInfo.id] }
    : {
        cibles: [choix.touche, ...(choix.morte ? ["espace"] : [])],
        modifs: choix.mod === "maj" ? ["majg", "majd"] : choix.mod === "altcar" ? ["altcar"] : [],
        autres: choix.aussi ? [choix.aussi] : [],
        legende: { touche: choix.touche, niveau: choix.mod === "maj" ? "maj" : choix.mod === "altcar" ? "alt" : "base" },
      };

  return (
    <div className={styles.interactif}>
      <div className={styles.codeCouleurs}>
        <span><b className={styles.pastilleBase}>a</b> touche seule</span>
        <span><b className={styles.pastilleMaj}>a</b> <Kbd mod="maj">⇧ Maj</Kbd> + touche</span>
        <span><b className={styles.pastilleAlt}>a</b> <Kbd mod="altcar">Alt Car</Kbd> + touche</span>
      </div>

      <Clavier surlignage={surlignage} onToucheClic={(t) => setToucheInfo(t)} />

      <div className={styles.dessous}>
      <div className={styles.groupes}>
        {GROUPES.map((g) => (
          <div key={g.titre} className={styles.groupe}>
            <div className={styles.groupeTitre}>{g.titre}</div>
            <div className={styles.puces}>
              {g.caracteres.map((car) => (
                <button
                  key={car.c}
                  className={`${styles.puce} ${!toucheInfo && choix.c === car.c ? styles.puceActive : ""} ${
                    car.mod === "maj" ? styles.puceMaj : car.mod === "altcar" ? styles.puceAlt : ""
                  }`}
                  title={car.nom}
                  onClick={() => {
                    setChoix(car);
                    setToucheInfo(null);
                  }}
                  onMouseEnter={() => {
                    setChoix(car);
                    setToucheInfo(null);
                  }}
                >
                  {car.c}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.panneau} aria-live="polite">
        {toucheInfo ? (
          <>
            <div className={styles.panneauTitre}>Cette touche donne trois caractères :</div>
            <div className={styles.troisNiveaux}>
              <span><Kbd>{toucheInfo.base}</Kbd> → <b>{toucheInfo.base}</b></span>
              {toucheInfo.maj && (
                <span><Kbd mod="maj">⇧ Maj</Kbd> + <Kbd>{toucheInfo.base}</Kbd> → <b className={styles.txtMaj}>{toucheInfo.maj}</b></span>
              )}
              {toucheInfo.alt && (
                <span><Kbd mod="altcar">Alt Car</Kbd> + <Kbd>{toucheInfo.base}</Kbd> → <b className={styles.txtAlt}>{toucheInfo.alt}</b></span>
              )}
            </div>
            <button className={styles.fermer} onClick={() => setToucheInfo(null)}>↩ Revenir au caractère choisi</button>
          </>
        ) : (
          <>
            <div className={styles.panneauTitre}>
              <span className={styles.grosCar}>{choix.c}</span> {choix.nom}
            </div>
            <Combinaison car={choix} />
            {choix.morte && (
              <p className={styles.note}>
                ⚠️ C'est une <b>touche morte</b> : rien n'apparaît au premier appui (elle attend une lettre pour faire « ê » ou « è »).
                Appuyez ensuite sur <Kbd>Espace</Kbd> pour obtenir le caractère seul.
              </p>
            )}
            {choix.aussi && (
              <p className={styles.note}>
                💡 Aussi disponible directement sur le <b>pavé numérique</b> (touche encadrée en pointillé).
              </p>
            )}
            {choix.mod === "altcar" && (
              <p className={styles.note}>
                💡 <Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> (à gauche) fonctionne aussi à la place de <Kbd mod="altcar">Alt Car</Kbd>.
              </p>
            )}
            <pre className={styles.exemple}><code>{choix.python}</code></pre>
          </>
        )}
      </div>

      </div>
      <p className={styles.astuce}>👆 Survolez ou cliquez un caractère. Vous pouvez aussi cliquer une touche de symbole du clavier pour voir ses trois caractères.</p>
    </div>
  );
}
