import React, { useEffect } from "react";
import OriginalSearchBar from "@theme-original/SearchBar";
import { useHistory, useLocation } from "@docusaurus/router";

/**
 * Wraps @easyops-cn/docusaurus-search-local's SearchBar to corriger un bug :
 * quand highlightSearchTermsOnTargetPage est activé, le plugin ajoute
 * "?_highlight=xxx" même si l'URL a déjà un "?onglet=xxx", créant une URL
 * invalide "...?onglet=X?_highlight=Y" que React Router ne parse pas correctement.
 *
 * Ce wrapper détecte ce pattern après la navigation et remplace l'URL corrected
 * (second "?" → "&") avant que le composant Tabs ne s'affiche.
 */
export default function SearchBarWrapper(props) {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const search = location.search;
    // Détecter un second "?" dans les paramètres query (bug @easyops-cn)
    if (search && search.indexOf("?", 1) !== -1) {
      const fixed = "?" + search.slice(1).replace("?", "&");
      history.replace(location.pathname + fixed + location.hash);
    }
  }, [location.search]);

  return <OriginalSearchBar {...props} />;
}
