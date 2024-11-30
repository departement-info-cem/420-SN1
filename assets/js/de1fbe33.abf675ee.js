"use strict";(self.webpackChunksn1=self.webpackChunksn1||[]).push([[9202],{1636:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>d,frontMatter:()=>l,metadata:()=>r,toc:()=>o});const r=JSON.parse('{"id":"cours/rencontre2","title":"2 expressions, variables et types","description":"expression, valeur type","source":"@site/docs/01-cours/02-rencontre2.md","sourceDirName":"01-cours","slug":"/cours/rencontre2","permalink":"/420-SN1/cours/rencontre2","draft":false,"unlisted":false,"editUrl":"https://github.com/departement-info-cem/420-SN1/tree/main/docs/01-cours/02-rencontre2.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{},"sidebar":"docs","previous":{"title":"1 Accueil, intro, plan de cours et premiers scripts","permalink":"/420-SN1/cours/rencontre1"},"next":{"title":"3 Structures de contr\xf4le","permalink":"/420-SN1/cours/rencontre3"}}');var i=s(4848),t=s(8453);const l={},a="2 expressions, variables et types",c={},o=[{value:"expression, valeur type",id:"expression-valeur-type",level:2},{value:"Op\xe9rateur et fonctions",id:"op\xe9rateur-et-fonctions",level:2},{value:"Ex\xe9cution : \xe9valuateur d&#39;expression",id:"ex\xe9cution--\xe9valuateur-dexpression",level:3},{value:"type d&#39;une expression",id:"type-dune-expression",level:2},{value:"variable",id:"variable",level:2},{value:"types de base",id:"types-de-base",level:2},{value:"types compos\xe9s",id:"types-compos\xe9s",level:2},{value:"tableaux",id:"tableaux",level:3},{value:"tuples",id:"tuples",level:3},{value:"dictionnaires",id:"dictionnaires",level:3},{value:"Exercices trace_types.md",id:"exercices-trace_typesmd",level:2},{value:"Exercice tableau",id:"exercice-tableau",level:2}];function u(e){const n={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"2-expressions-variables-et-types",children:"2 expressions, variables et types"})}),"\n",(0,i.jsx)(n.h2,{id:"expression-valeur-type",children:"expression, valeur type"}),"\n",(0,i.jsx)(n.p,{children:"Une expression est un bout de code qui a une valeur et un type."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.em,{children:"5"})," est une expression qui vaut 5 et de type entier"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.em,{children:'"5"'})," est une expression de type texte"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"op\xe9rateur-et-fonctions",children:"Op\xe9rateur et fonctions"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.em,{children:"5 + 3"})," est une expression de type entier qui vaut 8"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.em,{children:'"coucou " + str(81)'}),' est une expression de type texte qui vaut "coucou 8"']}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["On voit que ",(0,i.jsx)(n.em,{children:"+"})," ne fait pas la m\xeame chose selon le type de son op\xe9rateur. Pour des nombres\nil fait la somme habituelle. Pour du texte, il met les 2 textes bout \xe0 bout."]}),"\n",(0,i.jsxs)(n.p,{children:["Les fonctions comme ",(0,i.jsx)(n.strong,{children:"str()"})," peuvent avoir un type. Ici ",(0,i.jsx)(n.strong,{children:"str"})," transforme une\nexpression qu'on lui passe en texte:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.em,{children:"81"})," est un entier qui vaut 81"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.em,{children:"str(81)"})," est un texte constitu\xe9 du caract\xe8re ",(0,i.jsx)(n.em,{children:"8"})," suivi du caract\xe8re ",(0,i.jsx)(n.em,{children:"1"})]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"ex\xe9cution--\xe9valuateur-dexpression",children:"Ex\xe9cution : \xe9valuateur d'expression"}),"\n",(0,i.jsx)(n.p,{children:"On peut vite se laisser emporter et construire des expressions assez complexes:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:"str( 5 + 8 * (7 + 98 * 6) / 5 / 6.7 * 10 - 4)\n"})}),"\n",(0,i.jsx)(n.p,{children:"Pour \xe9valuer cette expression petit bout par petit bout, on peut utiliser un \xe9valuateur d'expression.\nIl faut placer un point d'arr\xeat sur la ligne dans le script."}),"\n",(0,i.jsx)(n.h2,{id:"type-dune-expression",children:"type d'une expression"}),"\n",(0,i.jsx)(n.p,{children:"Python contient une fonction permettant de conna\xeetre le type d'une expression:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:"truc = ...\nprint( type(truc) )\n"})}),"\n",(0,i.jsx)(n.h2,{id:"variable",children:"variable"}),"\n",(0,i.jsx)(n.p,{children:"Un nom qui va d\xe9signer plusieurs valeurs au fil du temps."}),"\n",(0,i.jsx)(n.p,{children:'Dans un premier temps on va avoir des "variables" qui "varient" \xe0 chaque assignation.'}),"\n",(0,i.jsx)(n.p,{children:"Il est donc important de voir ce qu'est une assignation"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:"nomDeMaVariable = expression\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Ceci n'est pas une \xe9galit\xe9 comme en maths"}),"\n",(0,i.jsx)(n.li,{children:"on calcule expression, ce qui nous donne une valeur et un type"}),"\n",(0,i.jsxs)(n.li,{children:['on associe, on "assigne" cette valeur et type au ',(0,i.jsx)(n.em,{children:"nomDeMaVariable"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Ex\xe9cute en mode d\xe9bogage et on regarde la valeur de x changer."}),"\n",(0,i.jsx)(n.p,{children:"TODO ajouter un exemple avec du hasard"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:"x = 5 * 6\ny = 2 * x\nx = x * x + 25.6\nx = str(5 - x)\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["si on \xe9tait en maths, y devrait toujours valoir le double de x","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"si x \xe9volue dans le temps"}),"\n",(0,i.jsx)(n.li,{children:"comme on a pos\xe9 y qui est 2*x"}),"\n",(0,i.jsx)(n.li,{children:"on devrait avoir y qui \xe9volue avec le temps"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["en programmation le ",(0,i.jsx)(n.strong,{children:"="})," n'est pas une \xe9quation, c'est une ",(0,i.jsx)(n.strong,{children:"assignation"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["on \xe9value l'expression en partie droite ",(0,i.jsx)(n.em,{children:"2 * x"})]}),"\n",(0,i.jsx)(n.li,{children:"comme x vaut 30 \xe0 ce moment l\xe0, \xe7a donne 60"}),"\n",(0,i.jsx)(n.li,{children:"on assigne cette valeur dans la variable y"}),"\n",(0,i.jsxs)(n.li,{children:["si on veut assigner une nouvelle valeur, il faut un autre ",(0,i.jsx)(n.em,{children:"y = ..."})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"types-de-base",children:"types de base"}),"\n",(0,i.jsx)(n.p,{children:"La plupart des langages de programmation on des types de base pour repr\xe9senter les nombres"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Entier : 1 2 3 -99 etc."}),"\n",(0,i.jsx)(n.li,{children:"Flottant : 1.0 2.5 -99.9 etc."}),"\n",(0,i.jsx)(n.li,{children:'Texte : "bonjour" "salut" "123" etc.'}),"\n",(0,i.jsx)(n.li,{children:"Bool\xe9en : True False"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"types-compos\xe9s",children:"types compos\xe9s"}),"\n",(0,i.jsx)(n.h3,{id:"tableaux",children:"tableaux"}),"\n",(0,i.jsx)(n.p,{children:"On peut vouloir repr\xe9senter une s\xe9quence de plusieurs valeurs d'un m\xeame type"}),"\n",(0,i.jsx)(n.h3,{id:"tuples",children:"tuples"}),"\n",(0,i.jsx)(n.p,{children:"On peut regrouper plusieurs valeurs de types diff\xe9rents dans un tuple, la syntaxe est des parenth\xe8ses et des virgules pour s\xe9parer les valeurs"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'(4.5 , "salut")\n'})}),"\n",(0,i.jsx)(n.p,{children:"On acc\xe8de \xe0 chaque valeur par un index"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'(4.5 , "salut")[0]  # vaut 4.5\n(4.5 , "salut")[1]  # vaut salut\n'})}),"\n",(0,i.jsx)(n.p,{children:"Cela permet de garder plusieurs valeurs dans une seule variable"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:"coordonnees = (4.5 , 10.5)              # coordonn\xe9es d'un point dans un plan cart\xe9sien par exemple\nprint(type(coordonnees))\nautreCoordonnees = (5.6 , 3.5)\n"})}),"\n",(0,i.jsx)(n.h3,{id:"dictionnaires",children:"dictionnaires"}),"\n",(0,i.jsx)(n.p,{children:"On peut vouloir associer des valeurs \xe0 des cl\xe9s, on utilise un dictionnaire"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'dico = { "cle1" : 4.5 , "cle2" : "salut" }\n'})}),"\n",(0,i.jsx)(n.h1,{id:"exercices",children:"Exercices"}),"\n",(0,i.jsx)(n.h2,{id:"exercices-trace_typesmd",children:"Exercices trace_types.md"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:"\n\n"})}),"\n",(0,i.jsx)(n.h2,{id:"exercice-tableau",children:"Exercice tableau"}),"\n",(0,i.jsx)(n.p,{children:"TODO faire un exercice qui calcule"})]})}function d(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>a});var r=s(6540);const i={},t=r.createContext(i);function l(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);