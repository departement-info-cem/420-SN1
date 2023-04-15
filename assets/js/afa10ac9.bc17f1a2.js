"use strict";(self.webpackChunk_420_SN1=self.webpackChunk_420_SN1||[]).push([[412],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>k});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var o=n.createContext({}),p=function(e){var t=n.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(o.Provider,{value:t},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,o=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),s=p(r),d=a,k=s["".concat(o,".").concat(d)]||s[d]||m[d]||l;return r?n.createElement(k,i(i({ref:t},c),{},{components:r})):n.createElement(k,i({ref:t},c))}));function k(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,i=new Array(l);i[0]=d;var u={};for(var o in t)hasOwnProperty.call(t,o)&&(u[o]=t[o]);u.originalType=e,u[s]="string"==typeof e?e:a,i[1]=u;for(var p=2;p<l;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},4755:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>u,toc:()=>p});var n=r(7462),a=(r(7294),r(3905));const l={},i="Travail 1 : Calcul de la racine d'un nombre, stupide et brutale",u={unversionedId:"tp/tp1",id:"tp/tp1",title:"Travail 1 : Calcul de la racine d'un nombre, stupide et brutale",description:"L'ordinateur est stupide mais tr\xe8s rapide. On va calculer la racine",source:"@site/docs/02-tp/01-tp1.md",sourceDirName:"02-tp",slug:"/tp/tp1",permalink:"/420-SN1/tp/tp1",draft:!1,editUrl:"https://github.com/departement-info-cem/420-SN1/tree/main/docs/02-tp/01-tp1.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"tp",next:{title:"Travail 2 : charger des donn\xe9es, trouver la loi scientifique",permalink:"/420-SN1/tp/tp2"}},o={},p=[{value:"m\xe9thode 1, chiffre par chiffre, par en dessous",id:"m\xe9thode-1-chiffre-par-chiffre-par-en-dessous",level:3},{value:"m\xe9thode 2 : dichotomie (couper en 2)",id:"m\xe9thode-2--dichotomie-couper-en-2",level:3},{value:"Calcul de la racine carr\xe9e",id:"calcul-de-la-racine-carr\xe9e",level:2},{value:"Comparaison de performance",id:"comparaison-de-performance",level:2},{value:"GENERALISER \xe0 racine ni\xe8me de x",id:"generaliser-\xe0-racine-ni\xe8me-de-x",level:2}],c={toc:p},s="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(s,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"travail-1--calcul-de-la-racine-dun-nombre-stupide-et-brutale"},"Travail 1 : Calcul de la racine d'un nombre, stupide et brutale"),(0,a.kt)("p",null,"L'ordinateur est stupide mais tr\xe8s rapide. On va calculer la racine\navec une m\xe9thode tr\xe8s lente et stupide ce qui est parfait pour un ordinateur."),(0,a.kt)("h3",{id:"m\xe9thode-1-chiffre-par-chiffre-par-en-dessous"},"m\xe9thode 1, chiffre par chiffre, par en dessous"),(0,a.kt)("p",null,"Un exemple sur la racine carr\xe9e de 8:"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"unit\xe9 :")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"0 : 0 * 0 = 0"),(0,a.kt)("li",{parentName:"ul"},"1 : 1 * 1 = 1"),(0,a.kt)("li",{parentName:"ul"},"2 : 2 * 2 = 4"),(0,a.kt)("li",{parentName:"ul"},"3 : 3 * 3 = 9")),(0,a.kt)("p",null,"Comme ",(0,a.kt)("strong",{parentName:"p"},"8")," est entre 4 et 9, on sait que la racine de 8\nest entre 2 et 3: 2,..."),(0,a.kt)("p",null,"On valide 2 comme chiffe des unit\xe9s."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"premi\xe8re d\xe9cimale")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"2,0 * 2,0 = 4"),(0,a.kt)("li",{parentName:"ul"},"2,1",(0,a.kt)("sup",null,"2")," = 4,41"),(0,a.kt)("li",{parentName:"ul"},"2,2",(0,a.kt)("sup",null,"2")," = 4,84"),(0,a.kt)("li",{parentName:"ul"},"2,3",(0,a.kt)("sup",null,"2")," = 5,29"),(0,a.kt)("li",{parentName:"ul"},"2,4",(0,a.kt)("sup",null,"2")," = 5,76"),(0,a.kt)("li",{parentName:"ul"},"2,5",(0,a.kt)("sup",null,"2")," = 6,25"),(0,a.kt)("li",{parentName:"ul"},"2,6",(0,a.kt)("sup",null,"2")," = 6,76"),(0,a.kt)("li",{parentName:"ul"},"2,7",(0,a.kt)("sup",null,"2")," = 7,29"),(0,a.kt)("li",{parentName:"ul"},"2,8",(0,a.kt)("sup",null,"2")," = 7,84"),(0,a.kt)("li",{parentName:"ul"},"2,9",(0,a.kt)("sup",null,"2")," = 8,41")),(0,a.kt)("p",null,"La racine de 8 ressemble \xe0 2,8.... 8 sera le chiffre des dixi\xe8me."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"2\xe8me d\xe9cimale")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"2,80",(0,a.kt)("sup",null,"2")," = 7,84"),(0,a.kt)("li",{parentName:"ul"},"2,81",(0,a.kt)("sup",null,"2")," = 7,8961"),(0,a.kt)("li",{parentName:"ul"},"2,82",(0,a.kt)("sup",null,"2")," = 7,9524"),(0,a.kt)("li",{parentName:"ul"},"2,83",(0,a.kt)("sup",null,"2")," = 8,0089")),(0,a.kt)("p",null,"Racine de 8 est de la forme 2,82..."),(0,a.kt)("h3",{id:"m\xe9thode-2--dichotomie-couper-en-2"},"m\xe9thode 2 : dichotomie (couper en 2)"),(0,a.kt)("p",null,"On commence avec racine carr\xe9e de 8 doit \xeatre entre 0 et 8, on va essayer de resserrer cet interval jusqu'\xe0 trouver la racine"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"[0 .. 8]"," le milieu est : 4 * 4 = 16"),(0,a.kt)("li",{parentName:"ul"},"on doit d\xe9cider si la racine de 8 est dans ","[0 .. 4]"," ou ","[4 .. 8]",", comme 16 est au dessus de 8, la racine de 8 doit \xeatre entre 0 et 4"),(0,a.kt)("li",{parentName:"ul"},"[0 .. 4]"," le milieu est 2 : 2 * 2 = 4"),(0,a.kt)("li",{parentName:"ul"},"Comme 4 est en dessous de 8, le r\xe9sultat est dans la moiti\xe9 haute ","[2 .. 4]"),(0,a.kt)("li",{parentName:"ul"},"[2 .. 4]"," 3",(0,a.kt)("sup",null,"2")," = 9 donc ","[2 .. 3]"),(0,a.kt)("li",{parentName:"ul"},"[2 .. 3]"," 2,5",(0,a.kt)("sup",null,"2")," = 6,25 donc ","[2,5 .. 3]"),(0,a.kt)("li",{parentName:"ul"},"[2,5 .. 3]"," 2,75",(0,a.kt)("sup",null,"2")," = 7,5625 donc ","[2,75 .. 3]"),(0,a.kt)("li",{parentName:"ul"},"[2,75 .. 3]"," 2,875",(0,a.kt)("sup",null,"2")," = 8.265625 donc ","[2,75 .. 2,875]"),(0,a.kt)("li",{parentName:"ul"},"etc.")),(0,a.kt)("h2",{id:"calcul-de-la-racine-carr\xe9e"},"Calcul de la racine carr\xe9e"),(0,a.kt)("p",null,"En utilisant le principe de ton choix, tu dois produire un script\nappel\xe9 racineCarree",(0,a.kt)("em",{parentName:"p"},"NomDeFamille"),".py dans lequel on trouvera une fonction"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"def racineCarre(nombre: float) -> float:\n  #ton code ici\n  return racine\n")),(0,a.kt)("p",null,"Vous devrez aussi montrer les appels de cette m\xe9thode sur les nombre 0 0,1 0,2 0,9 8 9 81 123 et -3."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"1 point")," le fichier existe, son nom respecte la consigne, il contient la fonction demand\xe9e et n'a pas d'erreur de syntaxe"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"2 points")," les racines carr\xe9es affich\xe9es pour 0 0,1 0,2 0,9 8 9 81 123 sont bonnes \xe0 0,001 pr\xe8s."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"1 point")," l'appel pour le nombre n\xe9gatif lance une exception")),(0,a.kt)("h2",{id:"comparaison-de-performance"},"Comparaison de performance"),(0,a.kt)("p",null,"FAIRE FAIRE UN TRUC POUR COMPARER LES TEMPS EXECUTION VERSUS sqrt DE LIB STD"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"g\xe9n\xe9rer un tableau de 10000 nombres tir\xe9s au pseudo hasard entre 10 et 1000"),(0,a.kt)("li",{parentName:"ul"},"calculer le temps n\xe9cessaire pour calculer les racines carr\xe9es de ces nombres avec votre m\xe9thode"),(0,a.kt)("li",{parentName:"ul"},"calculer le temps n\xe9cessaire pour calculer les racines carr\xe9es avec la m\xe9thode fournie dans python"),(0,a.kt)("li",{parentName:"ul"},"afficher les 2 dur\xe9es avec un print en millisecondes et le temps moyen en millisecondes pour les 2 m\xe9thodes")),(0,a.kt)("h2",{id:"generaliser-\xe0-racine-ni\xe8me-de-x"},"GENERALISER \xe0 racine ni\xe8me de x"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"def racineCarre(base: int, nombre: float) -> float:\n  #ton code ici\n  return racine\n")),(0,a.kt)("p",null,"Pour un ",(0,a.kt)("strong",{parentName:"p"},"n")," entier positif, faire une fonction qui permet de calculer la racine $\\sqrt","[n]","{x}$"),(0,a.kt)("p",null,"Possibilit\xe9 de calculer un logarithme \xe0 la place comme un inverse de exponentiel\n",(0,a.kt)("a",{parentName:"p",href:"https://www.quora.com/What-does-it-mean-to-raise-a-number-to-a-non-integer-power"},"https://www.quora.com/What-does-it-mean-to-raise-a-number-to-a-non-integer-power")),(0,a.kt)("p",null,"Possibilit\xe9 de chercher l'inverse de"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"def funkyFonction(x):\n    return x**x\n```# TP1\n")))}m.isMDXComponent=!0}}]);