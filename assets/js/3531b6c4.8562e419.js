"use strict";(self.webpackChunksn1=self.webpackChunksn1||[]).push([[9558],{4005:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>c,frontMatter:()=>t,metadata:()=>s,toc:()=>u});const s=JSON.parse('{"id":"tp/tp2","title":"Travail 2 : charger des donn\xe9es, trouver la loi scientifique","description":"Quand on exp\xe9rimente en sciences, on r\xe9cup\xe8re des donn\xe9es et on souhaite voir si","source":"@site/docs/02-tp/02-tp2.md","sourceDirName":"02-tp","slug":"/tp/tp2","permalink":"/420-SN1/tp/tp2","draft":false,"unlisted":false,"editUrl":"https://github.com/departement-info-cem/420-SN1/tree/main/docs/02-tp/02-tp2.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{},"sidebar":"tp","previous":{"title":"Travail 1 : Calcul de la racine d\'un nombre, stupide et brutale","permalink":"/420-SN1/tp/tp1"},"next":{"title":"Travail 3 : Trajectoire sans solution analytique","permalink":"/420-SN1/tp/tp3-a"}}');var r=i(4848),l=i(8453);const t={},o="Travail 2 : charger des donn\xe9es, trouver la loi scientifique",a={},u=[{value:"Les donn\xe9es : Energie",id:"les-donn\xe9es--energie",level:2},{value:"Visualiser le nuage de points",id:"visualiser-le-nuage-de-points",level:2},{value:"Utiliser des librairies pour extraire une loi",id:"utiliser-des-librairies-pour-extraire-une-loi",level:2},{value:"Visualiser la &quot;loi&quot; physique et le nuage de points",id:"visualiser-la-loi-physique-et-le-nuage-de-points",level:2},{value:"Pr\xe9dire",id:"pr\xe9dire",level:2}];function d(e){const n={a:"a",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",ul:"ul",...(0,l.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"travail-2--charger-des-donn\xe9es-trouver-la-loi-scientifique",children:"Travail 2 : charger des donn\xe9es, trouver la loi scientifique"})}),"\n",(0,r.jsx)(n.p,{children:"Quand on exp\xe9rimente en sciences, on r\xe9cup\xe8re des donn\xe9es et on souhaite voir si\non peut en extraire une formule / \xe9quation / th\xe9orie."}),"\n",(0,r.jsx)(n.p,{children:"Dans ce processus, on peut utiliser plusieurs moyens qui sont facilit\xe9s par\nl'informatique."}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Traiter, modifier, calculer sur beaucoup de mesures"}),"\n",(0,r.jsx)(n.li,{children:"Visualiser les donn\xe9es"}),"\n",(0,r.jsx)(n.li,{children:'Essayer de trouver une formule qui "colle" aux donn\xe9es'}),"\n",(0,r.jsx)(n.li,{children:"Voir \xe0 quel point la formule est bonne"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"les-donn\xe9es--energie",children:"Les donn\xe9es : Energie"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://www.youtube.com/watch?v=kg5RFxbtDJE",children:"https://www.youtube.com/watch?v=kg5RFxbtDJE"})}),"\n",(0,r.jsx)(n.p,{children:"On essaie de d\xe9terminer quelle quantit\xe9 d'\xe9nergie correspond \xe0 la vitesse d'un objet avec une certaine masse."}),"\n",(0,r.jsx)(n.p,{children:"Pour faire \xe7a on a effectu\xe9 l'exp\xe9rience suivante:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"on a pris des paires de boules de masse \xe9gale"}),"\n",(0,r.jsx)(n.li,{children:"on les a plac\xe9es sur des chariots sur un rail l'un en face de l'autre"}),"\n",(0,r.jsx)(n.li,{children:"on a lanc\xe9 les chariots \xe0 une vitesse pr\xe9cise l'un vers l'autre"}),"\n",(0,r.jsx)(n.li,{children:"on a mesur\xe9 la temp\xe9rature des boules avant le lancement"}),"\n",(0,r.jsx)(n.li,{children:"on a mesur\xe9 la temp\xe9rature des boules apr\xe8s la collision"}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Notre but est de d\xe9terminer la quantit\xe9 d'\xe9nergie accumul\xe9e dans les boules en fonction de la vitesse."}),"\n",(0,r.jsx)(n.p,{children:"On a effectu\xe9 une s\xe9rie d'exp\xe9riences ce qui nous a donn\xe9 une collection de points de donn\xe9es."}),"\n",(0,r.jsx)(n.p,{children:"On va vouloir commencer par"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"les charger en m\xe9moire en utilisant pandas"}),"\n",(0,r.jsx)(n.li,{children:"les r\xe9organiser pour les avoir dans le sens o\xf9 une colonne d\xe9pend des autres"}),"\n",(0,r.jsx)(n.li,{children:"les visualiser en utilisant matplotlib"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"visualiser-le-nuage-de-points",children:"Visualiser le nuage de points"}),"\n",(0,r.jsx)(n.p,{children:"On va vouloir voir la diff\xe9rence de temp\xe9rature en fonction"}),"\n",(0,r.jsx)(n.h2,{id:"utiliser-des-librairies-pour-extraire-une-loi",children:"Utiliser des librairies pour extraire une loi"}),"\n",(0,r.jsx)(n.p,{children:"La plupart des lois physiques ont la gentillesse de correspondre \xe0 des polyn\xf4mes, des exponentielles, des logarithmes etc."}),"\n",(0,r.jsx)(n.p,{children:'On va donc pouvoir essayer de d\xe9terminer si on peut trouver une fonction qui "collent" aux donn\xe9es.'}),"\n",(0,r.jsx)(n.p,{children:"On veut quelque chose de la forme $DeltaT = f(masse, vitesse)$, on va pouvoir utiliser les possibilit\xe9 suivante:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"$DeltaT = a * masse^b * vitesse^c$"}),"\n",(0,r.jsx)(n.li,{children:"on va alors chercher les a, b et c qui permettent d'avoir la courbe la plus proche"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"visualiser-la-loi-physique-et-le-nuage-de-points",children:'Visualiser la "loi" physique et le nuage de points'}),"\n",(0,r.jsx)(n.p,{children:"On veut se convaincre que le tout fonctionne"}),"\n",(0,r.jsx)(n.h2,{id:"pr\xe9dire",children:"Pr\xe9dire"})]})}function c(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>t,x:()=>o});var s=i(6540);const r={},l=s.createContext(r);function t(e){const n=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);