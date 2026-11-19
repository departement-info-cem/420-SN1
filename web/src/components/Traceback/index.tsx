import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Affiche un message d'erreur Python (traceback) avec le rendu de la console de PyCharm :
 * fond foncé, texte rouge, chemin du fichier en bleu souligné, dernière ligne en gras.
 *
 * Utilisation dans un fichier .mdx (le bloc de code reste écrit normalement) :
 *
 *   <Traceback>
 *
 *   ```
 *   Traceback (most recent call last):
 *     File "...\r03_exemple.py", line 4, in <module>
 *   NameError: name 'x' is not defined
 *   ```
 *
 *   </Traceback>
 */

// Extrait le texte brut des enfants (le bloc de code markdown devient <pre><code>texte</code></pre>)
function extraireTexte(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extraireTexte).join('');
  if (React.isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return extraireTexte(props.children);
  }
  return '';
}

// Met le chemin de chaque ligne « File "chemin" » en évidence
function formaterLigne(ligne: string, index: number): ReactNode {
  const m = ligne.match(/^(\s*File ")([^"]+)(".*)$/);
  if (!m) return ligne;
  return (
    <>
      {m[1]}
      <span className={styles.fichier}>{m[2]}</span>
      {m[3]}
    </>
  );
}

export default function Traceback({ children }: { children: ReactNode }): JSX.Element {
  const lignes = extraireTexte(children).replace(/\n+$/, '').split('\n');
  return (
    <div className={styles.traceback}>
      <pre className={styles.pre}>
        <code>
          {lignes.map((ligne, i) => (
            <span
              key={i}
              className={i === lignes.length - 1 ? `${styles.ligne} ${styles.derniere}` : styles.ligne}
            >
              {formaterLigne(ligne, i)}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
