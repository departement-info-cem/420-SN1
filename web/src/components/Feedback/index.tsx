import React, { useState, useRef } from 'react';
import styles from './styles.module.css';
import type { FeedbackConfig } from './FeedbackContext';
import { useFeedbackConfig } from './FeedbackContext';

// ── Types ─────────────────────────────────────────────────────────────────────

interface FeedbackProps extends FeedbackConfig {
  /**
   * Identifiant lisible associant la rétroaction à son contexte.
   * Exemples : "Rencontre #4 - if" · "Rencontre #1 - Variables"
   * Ce champ est obligatoire et transmis tel quel au serveur.
   */
  feedbackId: string;
}

// ── Icônes ────────────────────────────────────────────────────────────────────

function StarIcon({ filled, size = 26 }: { filled: boolean; size?: number }): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}
         fill={filled ? 'currentColor' : 'none'}
         stroke="currentColor" strokeWidth="1.6"
         strokeLinejoin="round" strokeLinecap="round">
      <path d="M12 2.6 14.96 8.6 21.6 9.57 16.8 14.24 17.93 20.86 12 17.74 6.07 20.86 7.2 14.24 2.4 9.57 9.04 8.6Z" />
    </svg>
  );
}

function CheckIcon({ size = 20 }: { size?: number }): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
         stroke="currentColor" strokeWidth="2.6"
         strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5 10 17.5 19.5 7" />
    </svg>
  );
}

// ── Utilitaires ───────────────────────────────────────────────────────────────

const MAX_CHARS = 500;
const VISITOR_KEY = 'v';

function newGuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  const rnd = (n: number): Uint8Array => {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const a = new Uint8Array(n);
      crypto.getRandomValues(a);
      return a;
    }
    const a = new Uint8Array(n);
    for (let i = 0; i < n; i++) a[i] = Math.floor(Math.random() * 256);
    return a;
  };
  const b = rnd(16);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, '0'));
  return `${h.slice(0, 4).join('')}-${h.slice(4, 6).join('')}-${h.slice(6, 8).join('')}-${h.slice(8, 10).join('')}-${h.slice(10, 16).join('')}`;
}

/**
 * Retourne l'identifiant visiteur persistant stocké dans localStorage ("v").
 * Crée et sauvegarde un nouveau GUID si aucun n'existe encore.
 * Retourne une chaîne vide si localStorage est inaccessible (SSR, mode privé bloquant, etc.).
 */
function getOrCreateVisitorId(): string {
  try {
    const existing = localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const id = newGuid();
    localStorage.setItem(VISITOR_KEY, id);
    return id;
  } catch {
    return '';
  }
}

// ── Composant principal ───────────────────────────────────────────────────────

/**
 * Widget de rétroaction par étoiles.
 * Toutes les props sont optionnelles — les valeurs manquantes sont héritées
 * du FeedbackProvider parent, puis des DEFAULT_CONFIG.
 */
export default function Feedback({ feedbackId, ...configProps }: FeedbackProps): JSX.Element {
  // Résolution de la configuration (props > contexte > défauts)
  const {
    question,
    minLabel,
    maxLabel,
    ratingFeedback,
    allowComment,
    submitUrl,
  } = useFeedbackConfig(configProps);

  // État étoiles
  const [rating, setRating]   = useState(0);
  const [hover, setHover]     = useState(0);
  const [shake, setShake]     = useState(0);

  // État soumission note
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  // État commentaire (modification post-soumission)
  const [comment, setComment]               = useState('');
  const [commentSent, setCommentSent]       = useState(false);
  const [commentSending, setCommentSending] = useState(false);

  const guidRef      = useRef<string | null>(null);
  const visitorRef   = useRef<string | null>(null);
  const textareaRef  = useRef<HTMLTextAreaElement>(null);
  if (guidRef.current   === null) guidRef.current   = newGuid();
  if (visitorRef.current === null) visitorRef.current = getOrCreateVisitorId();

  // ── Envoi générique ─────────────────────────────────────────────────────────

  const send = async (ratingValue: number, commentValue: string): Promise<void> => {
    const loc = typeof window !== 'undefined' ? window.location : null;
    const payload = {
      id:          guidRef.current,
      feedbackId,
      visitorId:   visitorRef.current ?? '',
      rating:      ratingValue,
      ratingLabel: ratingFeedback[ratingValue] ?? '',
      comment:     commentValue,
      domain:      loc?.hostname  ?? '',
      page:        loc?.pathname  ?? '',
      url:         loc?.href      ?? '',
      queryString: loc?.search    ?? '',
      userAgent:   typeof navigator !== 'undefined' ? navigator.userAgent : '',
      submittedAt: new Date().toISOString(),
    };
    try {
      const res = await fetch(submitUrl, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setError(null);
    } catch (err) {
      console.error('[feedback] envoi échoué :', err, payload);
      setError(err instanceof Error ? err.message : 'Envoi échoué');
    }
  };

  // ── Clic sur une étoile → soumission immédiate (optimiste) ─────────────────

  const onStarClick = async (n: number) => {
    if (sending || submitted) return;
    setRating(n);
    setShake(n);
    setTimeout(() => setShake(0), 380);
    setSubmitted(true);
    setSending(true);
    await send(n, '');
    setSending(false);
  };

  // ── Envoi du commentaire ────────────────────────────────────────────────────

  const onSubmitComment = async () => {
    if (!comment.trim() || commentSending) return;
    setCommentSending(true);
    await send(rating, comment.trim());
    setCommentSending(false);
    setCommentSent(true);
  };

  // ── Réinitialisation ────────────────────────────────────────────────────────

  const onModifyRating = () => {
    setSubmitted(false);
    setCommentSent(false);
    setError(null);
    setRating(0);
    setHover(0);
  };

  // ── ─────────────────────────────────────────────────────────────────────────
  //  ÉTAT SOUMIS
  // ────────────────────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <section className={styles.root} aria-label="Rétroaction envoyée">
        <div className={styles.thanks}>

          <div className={styles.check} aria-hidden="true">
            <CheckIcon size={20} />
          </div>

          <div className={styles.thanksContent}>
            <h3 className={styles.thanksTitle}>Merci pour ta rétroaction&nbsp;!</h3>

            {/* Étoiles statiques */}
            <div className={styles.thanksStars} aria-label={`Note : ${rating} sur 5`}>
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className={n <= rating ? styles.thanksStarFilled : styles.thanksStarEmpty}>
                  <StarIcon filled={n <= rating} size={20} />
                </span>
              ))}
            </div>

            <p className={styles.thanksBody}>{ratingFeedback[rating]}</p>

            {error && (
              <p className={styles.errorNote}>
                <strong>Note dév&nbsp;:</strong> la requête n'a pas abouti ({error}).
                Consulte la console pour le détail du payload.
              </p>
            )}

            {/* Zone commentaire (optionnelle selon la config) */}
            {allowComment && (
              !commentSent ? (
                <div className={styles.commentSection}>
                  <label className={styles.commentLabel} htmlFor="fb-comment">
                    Ajouter un commentaire{' '}
                    <span className={styles.optional}>(optionnel)</span>
                  </label>
                  <textarea
                    id="fb-comment"
                    ref={textareaRef}
                    className={styles.textarea}
                    placeholder="Explique-nous brièvement ce qui pourrait être amélioré…"
                    value={comment}
                    maxLength={MAX_CHARS}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className={styles.commentActions}>
                    <span className={`${styles.charCount}${comment.length > MAX_CHARS - 50 ? ` ${styles.charCountWarn}` : ''}`}>
                      {comment.length} / {MAX_CHARS}
                    </span>
                    <button
                      type="button"
                      className={styles.submit}
                      disabled={!comment.trim() || commentSending}
                      onClick={onSubmitComment}
                    >
                      {commentSending ? 'Envoi…' : 'Envoyer'}
                    </button>
                  </div>
                </div>
              ) : (
                <p className={styles.commentConfirm} aria-live="polite">
                  <CheckIcon size={14} />
                  &nbsp;Commentaire enregistré
                </p>
              )
            )}

            <button type="button" className={styles.thanksLink} onClick={onModifyRating}>
              Modifier ma note
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── ─────────────────────────────────────────────────────────────────────────
  //  ÉTAT INITIAL — sélection de la note
  // ────────────────────────────────────────────────────────────────────────────

  const displayRating = hover || rating;

  return (
    <section className={styles.root} aria-labelledby="fb-prompt">
      <p id="fb-prompt" className={styles.prompt}>
        {question}
      </p>

      <div className={styles.starsWrap}>
        <div
          className={styles.stars}
          role="radiogroup"
          aria-label="Note de 1 à 5"
          onMouseLeave={() => setHover(0)}
        >
          {[1, 2, 3, 4, 5].map((n) => {
            const active = n <= displayRating;
            const cls = [
              styles.star,
              active      ? styles.starActive  : '',
              shake === n ? styles.shake        : '',
              sending     ? styles.starDisabled : '',
            ].filter(Boolean).join(' ');
            return (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={rating === n}
                aria-label={`${n} étoile${n > 1 ? 's' : ''}`}
                className={cls}
                disabled={sending}
                onMouseEnter={() => { if (!sending) setHover(n); }}
                onFocus={()      => { if (!sending) setHover(n); }}
                onBlur={()       => setHover(0)}
                onClick={()      => onStarClick(n)}
              >
                <StarIcon filled={active} size={30} />
              </button>
            );
          })}
        </div>

        <div className={styles.scaleLabels} aria-hidden="true">
          <span>{minLabel}</span>
          <span className={styles.scaleDot}>·</span>
          <span>{maxLabel}</span>
        </div>

        <div className={styles.ratingText} aria-live="polite">
          {sending
            ? 'Envoi en cours…'
            : displayRating > 0
            ? ratingFeedback[displayRating]
            : ' '}
        </div>
      </div>
    </section>
  );
}
