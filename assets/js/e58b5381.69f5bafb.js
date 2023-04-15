"use strict";(self.webpackChunk_420_SN1=self.webpackChunk_420_SN1||[]).push([[815],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>f});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var a=n.createContext({}),u=function(e){var t=n.useContext(a),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},s=function(e){var t=u(e.components);return n.createElement(a.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,c=e.originalType,a=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(r),d=i,f=p["".concat(a,".").concat(d)]||p[d]||m[d]||c;return r?n.createElement(f,o(o({ref:t},s),{},{components:r})):n.createElement(f,o({ref:t},s))}));function f(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var c=r.length,o=new Array(c);o[0]=d;var l={};for(var a in t)hasOwnProperty.call(t,a)&&(l[a]=t[a]);l.originalType=e,l[p]="string"==typeof e?e:i,o[1]=l;for(var u=2;u<c;u++)o[u]=r[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},3612:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>a,contentTitle:()=>o,default:()=>m,frontMatter:()=>c,metadata:()=>l,toc:()=>u});var n=r(7462),i=(r(7294),r(3905));const c={},o="8 Fichiers, fichiers CSV",l={unversionedId:"cours/rencontre8",id:"cours/rencontre8",title:"8 Fichiers, fichiers CSV",description:"Aujourd'hui nous allons voir comment manipuler des fichiers texte.",source:"@site/docs/01-cours/08-rencontre8.md",sourceDirName:"01-cours",slug:"/cours/rencontre8",permalink:"/sn1/cours/rencontre8",draft:!1,editUrl:"https://github.com/departement-info-cem/sn1/tree/main/docs/01-cours/08-rencontre8.md",tags:[],version:"current",sidebarPosition:8,frontMatter:{},sidebar:"docs",previous:{title:"7 intra",permalink:"/sn1/cours/rencontre7"},next:{title:"9 numpy, polyn\xf4mes, calcul",permalink:"/sn1/cours/rencontre9"}},a={},u=[{value:"Fichiers texte",id:"fichiers-texte",level:2},{value:"Exemple",id:"exemple",level:3},{value:"Fichiers CSV",id:"fichiers-csv",level:2},{value:"Exercice",id:"exercice",level:2},{value:"Exercice exo-csv.py",id:"exercice-exo-csvpy",level:3},{value:"Exercice exo-plot.py",id:"exercice-exo-plotpy",level:3}],s={toc:u},p="wrapper";function m(e){let{components:t,...r}=e;return(0,i.kt)(p,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"8-fichiers-fichiers-csv"},"8 Fichiers, fichiers CSV"),(0,i.kt)("p",null,"Aujourd'hui nous allons voir comment manipuler des fichiers texte."),(0,i.kt)("p",null,"Dans une deuxi\xe8me partie, nous manipulerons des fichiers \"Comma Separated Values\". Il s'agit d'un standard\nqui permet facilement de charger des donn\xe9es ou de sauver des fichiers."),(0,i.kt)("h2",{id:"fichiers-texte"},"Fichiers texte"),(0,i.kt)("p",null,"Un fichier texte c'est quoi?"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"une suite de caract\xe8res comme '1' 'a' '\xe9' ou encore un espace ' ', une tabulation ou un saut de ligne"),(0,i.kt)("li",{parentName:"ul"},"pour chaque caract\xe8re, on associe un encodage binaire, par exemple ' ' (un espace)"),(0,i.kt)("li",{parentName:"ul"})),(0,i.kt)("h3",{id:"exemple"},"Exemple"),(0,i.kt)("p",null,"On veut faire le fichier texte appel\xe9 yo.txt"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Hey!\nyou\n")),(0,i.kt)("h2",{id:"fichiers-csv"},"Fichiers CSV"),(0,i.kt)("p",null,"Les fichiers CSV sont un cas sp\xe9cial de fichier texte"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"une entr\xe9e de donn\xe9es correspond \xe0 une ligne"),(0,i.kt)("li",{parentName:"ul"},"chaque morceau de donn\xe9es est s\xe9par\xe9 des autres par un s\xe9parateur, habituellement une virgule")),(0,i.kt)("p",null,"On peut souvent ouvrir ou cr\xe9er un fichier CSV"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\xe0 la main"),(0,i.kt)("li",{parentName:"ul"},"avec Excel"),(0,i.kt)("li",{parentName:"ul"},"avec du code Python pour les manipuler etc.")),(0,i.kt)("h1",{id:"exercices"},"Exercices"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"http://www.youtube.com/watch?v=0TqWgIC0T0c"},(0,i.kt)("img",{parentName:"a",src:"http://img.youtube.com/vi/0TqWgIC0T0c/0.jpg",alt:"IMAGE ALT TEXT HERE"}))),(0,i.kt)("h2",{id:"exercice"},"Exercice"),(0,i.kt)("h3",{id:"exercice-exo-csvpy"},"Exercice exo-csv.py"),(0,i.kt)("p",null,"Vous devez charger le fichier Turing.csv qui contient tous les gagnants du Prix Turing."),(0,i.kt)("p",null,"En utilisant votre script Python, vous devez:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"afficher les ann\xe9es avec 3 laur\xe9ats"),(0,i.kt)("li",{parentName:"ul"},"afficher les laur\xe9ats dont la contribution mentionne le mot ",(0,i.kt)("em",null,"intelligence"))),(0,i.kt)("h3",{id:"exercice-exo-plotpy"},"Exercice exo-plot.py"))}m.isMDXComponent=!0}}]);