"use strict";(self.webpackChunksn1=self.webpackChunksn1||[]).push([[8401],{6894:(e,n,t)=>{t.d(n,{A:()=>h});var r=t(7151),i=t(6540),s=t(4848);var l=t(3554),c=t.n(l);const u="videoContainer_ZjX3";var o=t(1432);var a=t(1470),d=t(9365);const h={...r.A,Column:function(e){let{children:n,size:t}=e;const r=null!=t?"col-"+t:"col";return(0,s.jsx)("div",{className:r,children:n})},Highlight:function(e){let{children:n,color:t}=e;switch(t){case"note":t="#6c757d";break;case"tip":t="#198754";break;case"info":t="#0d6efd";break;case"caution":t="#b58d20";break;case"danger":t="#dc3545";break;case void 0:t="#0dcaf0"}return(0,s.jsx)("span",{style:{backgroundColor:t,borderRadius:"2px",padding:"0.2rem"},children:n})},Row:function(e){let{children:n}=e;return(0,s.jsx)("div",{className:"row",children:n})},Video:function(e){let{url:n}=e;return(0,s.jsx)("div",{className:u,children:(0,s.jsx)(c(),{width:"100%",height:"auto",controls:!0,url:n})})},GHCode:function(e){let{language:n,user:t="departement-info-cem",repo:r,filePath:l,startLine:c=0,endLine:u,showLineNumber:a=!1,branch:d="main",ignore:h}=e;const[b,m]=(0,i.useState)(null),[f,p]=(0,i.useState)(!0),[g,N]=(0,i.useState)(null);if((0,i.useEffect)((()=>{(async function(e,n,t,r){var i=new XMLHttpRequest;return new Promise((function(s,l){i.onreadystatechange=function(){4==i.readyState&&(i.status>=300?l("Error, status code = "+i.status):s(i.responseText))},i.open("GET",`https://raw.githubusercontent.com/${e}/${n}/${r}/${t}`),i.send()}))})(t,r,l,d).then((e=>{m(e),p(!1)})).catch((e=>{N(e),p(!1)}))}),[]),f)return(0,s.jsx)("div",{children:"Chargement..."});if(g)return(0,s.jsx)("div",{children:"Une erreur est survenue. Appellez votre enseignant!"});null==n&&(n=l.split(".").at(-1));let v=b.split("\n").map(((e,n)=>({lineNumber:n+1,code:e})));return null!=h&&(v=function(e,n){let t=e;const r=n.split(",");return r.forEach((e=>{const n=e.split("-"),r=n[0].split(":"),i=+r[0],s=1==r.length?0:+r[1],l=n[1].split(":"),c=+l[0],u=t.find((e=>e.lineNumber==c)),o=1==l.length?u.code.length:+l[1],a=n.length<=2?"":n[2],d=t.indexOf(t.find((e=>e.lineNumber==i)));t=function(e,n,t,r,i,s){return e.filter((e=>{let l=n,c=t;return 0!=i&&(l+=1),r!=s.length&&(c-=1),e.lineNumber<l||e.lineNumber>c}))}(t,i,c,o,s,u.code),t=function(e,n,t,r,i,s){return e.map((e=>(e.lineNumber==n?e.lineNumber==r?e.code=e.code.substring(0,t)+s+e.code.substring(i):e.code=e.code.substring(0,t)+s:e.lineNumber==r&&(e.code=e.code.substring(i)),e)))}(t,i,s,c,o,a),""!=a&&t.splice(d,0,{lineNumber:i,code:a})})),t}(v,h)),u=u??v.at(-1).lineNumber,v=v.filter((e=>e.lineNumber>=c&&e.lineNumber<=u)),(0,s.jsx)(o.A,{showLineNumbers:a,language:n,children:v.map((e=>e.code)).join("\n")})},Tabs:a.A,TabItem:d.A}}}]);