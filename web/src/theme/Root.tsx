import React, {useEffect} from 'react';
import type {ReactNode} from 'react';
import {FeedbackProvider} from '../components/Feedback/FeedbackContext';
import {useHistory, useLocation} from '@docusaurus/router';

/**
 * Composant racine Docusaurus (swizzle de @theme/Root).
 * Injecte la configuration globale du composant Feedback dans tout l'arbre.
 *
 * Les <Feedback /> du site héritent de ces valeurs sauf si une prop
 * est explicitement passée au composant ou surchargeée par un <FeedbackProvider>
 * imbriqué plus bas dans l'arbre.
 */
/**
 * Défile vers l'ancre (#id) de l'URL une fois les onglets affichés.
 *
 * Pour un lien comme /cours/rencontre10?onglet=numpy-conditions#compter-masque,
 * le navigateur défile vers l'ancre AVANT que <Tabs queryString> ait activé
 * le bon onglet : la position calculée est donc fausse. On refait le
 * défilement après le rendu de l'onglet.
 */
function ScrollToHashAfterTabs(): null {
    const {pathname, search, hash} = useLocation();
    useEffect(() => {
        if (!hash || !search) return;
        const id = decodeURIComponent(hash.slice(1));
        const timer = window.setTimeout(() => {
            if (window.location.hash !== hash) return;
            const element = document.getElementById(id);
            if (!element) return;
            // Laisse de l'espace pour la barre de navigation collante.
            element.style.scrollMarginTop = 'calc(var(--ifm-navbar-height) + 0.5rem)';
            element.scrollIntoView();
        }, 150);
        return () => window.clearTimeout(timer);
    }, [pathname, search, hash]);
    return null;
}

function ScrollToTopOnTabSelection(): null {
    const history = useHistory();

    useEffect(() => {
        let frame: number | null = null;

        function handleSelection(event: MouseEvent | KeyboardEvent) {
            if (event instanceof KeyboardEvent && event.key !== 'Enter') return;
            if (!(event.target instanceof Element)) return;

            const tab = event.target.closest('.tabs-collants > [role="tab"]');
            if (!tab) return;

            // L'ancienne ancre pourrait désigner un élément d'un autre onglet.
            if (history.location.hash) {
                history.replace({...history.location, hash: ''});
            }

            if (frame !== null) window.cancelAnimationFrame(frame);
            frame = window.requestAnimationFrame(() => {
                window.scrollTo({top: 0, behavior: 'auto'});
                frame = null;
            });
        }

        document.addEventListener('click', handleSelection);
        document.addEventListener('keydown', handleSelection);

        return () => {
            document.removeEventListener('click', handleSelection);
            document.removeEventListener('keydown', handleSelection);
            if (frame !== null) window.cancelAnimationFrame(frame);
        };
    }, [history]);

    return null;
}

export default function Root({children}: { children: ReactNode }): JSX.Element {
    return (
        <FeedbackProvider
            config={{
                question: 'Les explications de cette section étaient-elles claires ?',
                minLabel: '1 = Pas du tout clair',
                maxLabel: '5 = Très clair',
                ratingFeedback: {
                    1: "Désolé d'apprendre ça — ton commentaire nous aidera.",
                    2: "On peut faire mieux. Dis-nous ce qui coince.",
                    3: "Correct. Quelques précisions à ajouter ?",
                    4: "Merci ! Une petite amélioration en tête ?",
                    5: "Excellent — merci pour ta lecture attentive !",
                },
                allowComment: true,
                submitUrl:
                    'https://northamerica-northeast1-cegep-kevin.cloudfunctions.net/collect_retroaction',
            }}
        >
            <ScrollToHashAfterTabs/>
            <ScrollToTopOnTabSelection/>
            {children}
        </FeedbackProvider>
    );
}
