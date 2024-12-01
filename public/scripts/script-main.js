import{c as I,a as se,r as o,u as R,b,j as e,O as G,N as U,d as te,e as ae,i as oe,g as re,f as ne,h as ie,k as le,l as ce,m as C,n as N,o as j,s as de,p as ue,q as z,t as f,v as me,w as L,R as O,x as h,y as v,z as H,C as W,A as pe,B as he,D as xe,E as x,F as ge,P as je,I as fe,G as Le,H as Ce}from"./script-n-modules.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))l(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function i(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(a){if(a.ep)return;a.ep=!0;const n=i(a);fetch(a.href,n)}})();const be={dataLoadState:0,dataLoadError:null,musicAlbums:{},radioList:{}},Z=I({name:"musicLists",initialState:be,reducers:{setLoadStateML:(s,t)=>{s.dataLoadState=t.payload.state,s.dataLoadError=t.payload.error},setDataML:(s,t)=>{s.musicAlbums=t.payload.albums,s.radioList=t.payload.radioList},setResultLoadML:(s,t)=>{s.dataLoadState=t.payload.state,s.dataLoadError=t.payload.error,s.musicAlbums=t.payload.data.albums,s.radioList=t.payload.data.radioList}}}),ve=Z.reducer,{setDataML:bs,setLoadStateML:F,setResultLoadML:ye}=Z.actions,we={dataLoadState:0,dataLoadError:null,userAlbums:null,userMusicList:null},V=I({name:"musicUser",initialState:we,reducers:{setLoadStateMU:(s,t)=>{s.dataLoadState=t.payload.state,s.dataLoadError=t.payload.error},setDataMU:(s,t)=>{s.userAlbums=t.payload.albums&&{},s.userMusicList=t.payload.musicList&&[]},setResultLoadMU:(s,t)=>{s.dataLoadState=t.payload.state,s.dataLoadError=t.payload.error,s.userAlbums=t.payload.albums,s.userMusicList=t.payload.musicList}}}),{setLoadStateMU:B,setDataMU:vs,setResultLoadMU:_e}=V.actions,Se=V.reducer,Ee={dataLoadState:0,dataLoadError:null,user:{email:null,uid:null},userSettings:null,userIsAuth:!1},K=I({name:"userData",initialState:Ee,reducers:{setLoadStateUD:(s,t)=>{s.dataLoadState=t.payload.state,s.dataLoadError=t.payload.error},setUserAuth:(s,t)=>{s.userIsAuth=t.payload},setResultLoadUD:(s,t)=>{s.dataLoadState=t.payload.state,s.dataLoadError=t.payload.error,s.user=t.payload.data},setUserSettings:(s,t)=>{s.userSettings=t.payload.settings}}}),{setLoadStateUD:y,setUserAuth:A,setResultLoadUD:X,setUserSettings:ke}=K.actions,Pe=K.reducer,Me=se({reducer:{musicLists:ve,musicUser:Se,userData:Pe},middleware:s=>s({serializableCheck:!1})}),Ue=({uriLogin:s})=>{const t=R(),i=b(r=>r.userData.userIsAuth),[l,a]=o.useState(!0),n=()=>{const r=localStorage.getItem("userKeyData");if(!r)return!1;const d=JSON.parse(atob(r.split(".")[1])),c=Math.floor(Date.now()/1e3);return console.log(`Осталось сессии: ${(d.exp-c)/60} минут`),d.exp>c?{email:d.email,uid:d.user_id}:null};return o.useEffect(()=>{if(!i){const r=n();r?(t(X({state:2,error:null,data:r})),t(A(!0))):t(A(!1))}a(!1)},[t,i]),l?e.jsx(o.Fragment,{}):i?e.jsx(G,{}):e.jsx(U,{to:s})},Ae=o.memo(Ue),De=({title:s})=>{const t=te();return o.useEffect(()=>{document.title=s},[t,s]),null},P=o.memo(De);let m=new ae.EventEmitter;const Ie=(s,t=500)=>{const[i,l]=o.useState(s);return o.useEffect(()=>{let a;return s?l(!0):a=setTimeout(()=>l(!1),t),()=>clearTimeout(a)},[s,t]),i};function Re({component:s,visible:t=!0,delay:i=1e3,mountClass:l=null,unmountClass:a=null,...n}){const r=Ie(t,i);return!!r&&e.jsx("div",{className:r&&!t?a:l,children:e.jsx(s,{...n,children:n.children})})}const D=o.memo(Re),Ne=JSON.parse('{"apiKey": "AIzaSyD4y08rA6vQnPazm6QpqAlIFEquxRMW7HA", "authDomain": "my-project-jsx-72502.firebaseapp.com", "projectId": "my-project-jsx-72502", "storageBucket": "my-project-jsx-72502.firebasestorage.app", "messagingSenderId": "593778910270", "appId": "1:593778910270:web:1de92e1a9e515e258c9d6f", "databaseURL": "https://my-project-jsx-72502-default-rtdb.europe-west1.firebasedatabase.app/"}'),q=oe(Ne),ze=re(q),Fe="dbMusicLists",Be="dbMusicUsers",$e="dbUsersData",$=ne(q);function _(s){let t=s;switch(s){case"auth/email-already-in-use":t="Эл. почта уже используется!";break;case"auth/user-not-found":t="Такой пользователь не найден!";break;case"auth/user/disabled":t="Пользователь заблокирован!";break;case"auth/invalid-credential":t="Неверный email или пароль!";break}return t}const M=async s=>{try{const t=ie(ze),i=await le(ce(t,s));return i.exists()?i.val():null}catch(t){return console.error("Ошибка при получении данных:",t.message),null}},J=e.jsxs("svg",{className:"logo",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M9 18V5l12-2v13"}),e.jsx("circle",{cx:"6",cy:"18",r:"3"}),e.jsx("circle",{cx:"18",cy:"16",r:"3"})]});function Te(){return e.jsxs("div",{className:"logo-for-page__box",children:[e.jsx("div",{className:"logo-for-page__img",children:J}),e.jsx(C,{as:"h1",size:"6",trim:"start",mt:"2",children:"MuSBoX"})]})}const Ge=e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"mr-2 h-4 w-4",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("polygon",{points:"10 8 16 12 10 16 10 8"})]}),Oe=e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"mr-2 h-4 w-4",children:[e.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),e.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),e.jsx("rect",{x:"14",y:"14",width:"7",height:"7"}),e.jsx("rect",{x:"3",y:"14",width:"7",height:"7"})]}),He=e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"mr-2 h-4 w-4",children:[e.jsx("circle",{cx:"12",cy:"12",r:"2"}),e.jsx("path",{d:"M4.93 19.07a10 10 0 0 1 0-14.14"}),e.jsx("path",{d:"M7.76 16.24a6 6 0 0 1-1.3-1.95 6 6 0 0 1 0-4.59 6 6 0 0 1 1.3-1.95"}),e.jsx("path",{d:"M16.24 7.76a6 6 0 0 1 1.3 2 6 6 0 0 1 0 4.59 6 6 0 0 1-1.3 1.95"}),e.jsx("path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14"})]}),We=e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"mr-2 h-4 w-4",children:[e.jsx("path",{d:"m16 6 4 14"}),e.jsx("path",{d:"M12 6v14"}),e.jsx("path",{d:"M8 8v12"}),e.jsx("path",{d:"M4 4v16"})]});function Ze({albumsList:s}){const t=N(),i=a=>{console.log(a),t(a)},l=s?s.map(a=>e.jsxs(j,{onClick:()=>i(xs+"/"+a.id),size:"4",variant:"soft",children:[We,a.name]},a.id)):e.jsx("div",{style:{width:"100%",display:"flex",justifyContent:"center"},children:e.jsx(de,{size:"3"})});return e.jsxs("aside",{className:"list-menu__box",children:[e.jsxs("div",{className:"list-menu__box-nav",children:[e.jsx(C,{className:"list-menu__nav-title",as:"h2",size:"5",weight:"bold",mb:"3",children:"Навигация"}),e.jsxs("div",{className:"list-menu__nav",children:[e.jsxs(j,{size:"4",variant:"soft",children:[Oe,e.jsx("span",{children:"Актуальное"})]}),e.jsxs(j,{size:"4",variant:"soft",children:[He,e.jsx("span",{children:"Радио"})]}),e.jsxs(j,{size:"4",variant:"soft",children:[Ge,e.jsx("span",{children:"Мой плейлист"})]})]})]}),e.jsxs("div",{className:"list-menu__box-albums",children:[e.jsx(C,{className:"list-menu__box-albums-title",as:"h2",size:"5",weight:"bold",mb:"3",children:"Альбомы"}),e.jsx("div",{className:"list-menu__box-scr-area",children:e.jsx(ue,{type:"auto",scrollbars:"both",children:e.jsx("div",{className:`list-menu__scr-list ${s&&"delay-m__type-3"}`,children:l})})})]})]})}const Ve=o.memo(Ze);function Ke(){return e.jsx("div",{className:"header-panel__box"})}const Xe=o.memo(Ke);function qe(){return e.jsx("div",{className:"body-list__box"})}const Je=o.memo(qe);function Qe(){return e.jsx("div",{className:"music-player__box"})}const Ye=o.memo(Qe);function es(){const s=R(),t=b(a=>a.musicLists),i=b(a=>a.musicUser),l=b(a=>a.userData);return o.useEffect(()=>{const a=async()=>{try{s(F({state:1,error:null})),s(B({state:1,error:null})),s(y({state:1,error:null}));const[n,r,d]=await Promise.all([M(Fe),M(Be+"/"+l.user.uid),M($e+"/"+l.user.uid)]);s(ye({state:2,error:null,data:n})),s(_e({state:2,error:null,data:r})),s(y({state:2,error:null})),s(ke(d))}catch(n){s(F({state:3,error:_(n.code)})),s(B({state:3,error:_(n.code)})),s(y({state:3,error:_(n.code)})),console.error("Ошибка при загрузке данных:",n.code)}};l.user.uid&&a()},[s,l.user]),e.jsxs("main",{className:"page-home__main",children:[e.jsxs("div",{style:{position:"absolute",zIndex:"100"},children:[e.jsx("button",{onClick:()=>console.log(l),children:"testUS"}),e.jsx("button",{onClick:()=>console.log(i),children:"testMU"}),e.jsx("button",{onClick:()=>console.log(t),children:"testML"}),e.jsx("button",{onClick:()=>m.emit("goPageSignIn"),children:"singin"})]}),e.jsx(z,{style:{padding:"0",height:"100%",width:"100%"},children:e.jsxs("div",{className:"page-home__box",children:[e.jsx(Te,{}),e.jsx(Ve,{albumsList:t.musicAlbums.all}),e.jsx(Xe,{}),e.jsx(Je,{}),e.jsx(Ye,{})]})})]})}const S=o.memo(es),ss=()=>{const s=N(),[t,i]=o.useState(!0),l=o.useRef(null),a=o.useCallback(r=>{clearTimeout(l.current),l.current=setTimeout(()=>{s(r)},1e3)},[s]),n=o.useCallback(()=>{i(!1),a(k)},[a]);return o.useEffect(()=>(m.on("goPageSignIn",n),()=>{clearTimeout(l.current),m.removeListener("goPageSignIn",n)}),[n]),o.useEffect(()=>{if(t)return;const r=setTimeout(()=>{i(!0)},1e3);return()=>clearTimeout(r)},[t]),e.jsx(D,{component:S,visible:t,delay:1e3,mountClass:"delay-m__type-2",unmountClass:"delay-unm__type-2"})};function ts(){return e.jsxs(f,{justify:"center",align:"center",wrap:"wrap",width:"80%",mx:"auto",children:[J,e.jsx(C,{as:"h1",size:"9",trim:"start",mt:"2",children:"MuSBoX"})]})}const as=o.memo(ts),os=()=>{const s=N(),[t,i]=o.useState(!0),[l,a]=o.useState(!0),n=o.useRef(null),r=o.useCallback(p=>{clearTimeout(n.current),n.current=setTimeout(()=>{s(p)},1e3)},[s]),d=o.useCallback(()=>{a(!1),r(k)},[r]),c=o.useCallback(()=>{a(!1),r(hs)},[r]),g=o.useCallback(()=>{a(!1),i(!1),r(Q)},[r]);return o.useEffect(()=>(m.on("goPageSignIn",d),m.on("goPageSignUp",c),m.on("goPageHome",g),()=>{clearTimeout(n.current),m.removeListener("goPageSignIn",d),m.removeListener("goPageSignUp",c),m.removeListener("goPageHome",g)}),[g,d,c]),o.useEffect(()=>{if(l)return;const p=setTimeout(()=>{a(!0)},1e3);return()=>clearTimeout(p)},[l]),e.jsxs(me,{height:"100vh",align:"center",justify:"center",columns:"repeat(auto-fill, minmax(345px, 50%))",children:[e.jsx(D,{component:as,visible:t,delay:1e3,mountClass:"delay-m__type-2",unmountClass:"delay-unm__type-2"}),e.jsx(D,{component:G,visible:l,delay:1e3,mountClass:"delay-m__type-2",unmountClass:"delay-unm__type-2"})]})},E=e.jsx("svg",{width:"20",height:"15",viewBox:"0 0 15 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{transform:"translateY(3px)"},children:e.jsx("path",{d:"M0.877075 7.49972C0.877075 3.84204 3.84222 0.876892 7.49991 0.876892C11.1576 0.876892 14.1227 3.84204 14.1227 7.49972C14.1227 11.1574 11.1576 14.1226 7.49991 14.1226C3.84222 14.1226 0.877075 11.1574 0.877075 7.49972ZM7.49991 1.82689C4.36689 1.82689 1.82708 4.36671 1.82708 7.49972C1.82708 10.6327 4.36689 13.1726 7.49991 13.1726C10.6329 13.1726 13.1727 10.6327 13.1727 7.49972C13.1727 4.36671 10.6329 1.82689 7.49991 1.82689ZM8.24993 10.5C8.24993 10.9142 7.91414 11.25 7.49993 11.25C7.08571 11.25 6.74993 10.9142 6.74993 10.5C6.74993 10.0858 7.08571 9.75 7.49993 9.75C7.91414 9.75 8.24993 10.0858 8.24993 10.5ZM6.05003 6.25C6.05003 5.57211 6.63511 4.925 7.50003 4.925C8.36496 4.925 8.95003 5.57211 8.95003 6.25C8.95003 6.74118 8.68002 6.99212 8.21447 7.27494C8.16251 7.30651 8.10258 7.34131 8.03847 7.37854L8.03841 7.37858C7.85521 7.48497 7.63788 7.61119 7.47449 7.73849C7.23214 7.92732 6.95003 8.23198 6.95003 8.7C6.95004 9.00376 7.19628 9.25 7.50004 9.25C7.8024 9.25 8.04778 9.00601 8.05002 8.70417L8.05056 8.7033C8.05924 8.6896 8.08493 8.65735 8.15058 8.6062C8.25207 8.52712 8.36508 8.46163 8.51567 8.37436L8.51571 8.37433C8.59422 8.32883 8.68296 8.27741 8.78559 8.21506C9.32004 7.89038 10.05 7.35382 10.05 6.25C10.05 4.92789 8.93511 3.825 7.50003 3.825C6.06496 3.825 4.95003 4.92789 4.95003 6.25C4.95003 6.55376 5.19628 6.8 5.50003 6.8C5.80379 6.8 6.05003 6.55376 6.05003 6.25Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})});function rs(s){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(s)}function ns({loadStatus:s,errSignIn:t}){const[i,l]=o.useState(""),[a,n]=o.useState(""),[r,d]=o.useState(!1);o.useEffect(()=>{if(r||t){const p=document.getElementById("err-info");p==null||p.scrollIntoView({block:"start",behavior:"smooth"})}},[r,t]);const c=()=>{m.emit("goPageSignUp")},g=p=>{p.preventDefault(),rs(i)&&a.length>0?(d(!1),m.emit("sendSignInData",i,a)):d(!0)};return e.jsx(L,{mx:"auto",maxWidth:"350px",minWidth:"350px",children:e.jsx(O,{onSubmit:g,onReset:c,children:e.jsxs(z,{size:"4",children:[e.jsx(C,{as:"h3",size:"6",trim:"start",mb:"4",align:"center",children:"Авторизация"}),e.jsxs(L,{mb:"5",children:[e.jsx(f,{mb:"1",justify:"between",align:"baseline",children:e.jsx(h,{as:"label",htmlFor:"input-auth-login",size:"2",weight:"bold",children:"Эл. почта"})}),e.jsx(v,{placeholder:"Введите ваш email",id:"input-auth-login",mb:"1",autoComplete:"username",value:i,onChange:p=>l(p.target.value)})]}),e.jsxs(L,{mb:"5",children:[e.jsx(f,{align:"baseline",justify:"between",mb:"1",children:e.jsx(h,{as:"label",size:"2",weight:"bold",htmlFor:"input-auth-pass1",children:"Пароль"})}),e.jsx(v,{type:"password",placeholder:"Введите ваш пароль",id:"input-auth-pass1",mb:"1",autoComplete:"new-password",value:a,onChange:p=>n(p.target.value)})]}),(r||t)&&e.jsx(H,{id:"err-info",children:e.jsxs(W,{as:"div",size:"1",children:[r&&e.jsxs(h,{as:"div",className:"sign-in__text",children:['Проверьте правильность заполненных полей "Эл. почта" и "Пароль". ',E]}),t&&e.jsx(h,{as:"div",className:"sign-in__text",children:t})]})}),e.jsxs(f,{mt:"6",justify:"end",gap:"3",children:[e.jsx(j,{variant:"outline",style:{width:"135px"},type:"reset",disabled:s,children:"Создать аккаунт"}),e.jsx(j,{style:{width:"135px"},type:"submit",loading:s,children:"Авторизоваться"})]})]})})})}const is=o.memo(ns);function ls(s){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(s)}function cs(s){return/^(?=.*[0-9]{1,})(?=.*[a-zA-Z]{1,}).{6,}$/.test(s)}function ds(s,t){return s===t}function us({loadStatus:s,errSignUp:t}){const[i,l]=o.useState(""),[a,n]=o.useState(""),[r,d]=o.useState(""),[c,g]=o.useState({email:!1,password:!1,passwordRepeat:!1});o.useEffect(()=>{if(c.email||c.password||c.passwordRepeat||t){const u=document.getElementById("err-info");u==null||u.scrollIntoView({block:"start",behavior:"smooth"})}},[c,t]),o.useEffect(()=>{const u=w=>{w=w||window.event,(i||a||r)&&(w.preventDefault(),w.returnValue="Есть несохранённые данные!")};return(i||a||r)&&window.addEventListener("beforeunload",u),()=>{window.removeEventListener("beforeunload",u)}},[i,a,r]);const p=()=>{m.emit("goPageSignIn")},Y=()=>{const u={email:!ls(i),password:!cs(a),passwordRepeat:!ds(a,r)};return g(u),!Object.values(u).includes(!0)},ee=u=>{u.preventDefault(),Y()&&m.emit("sendSignUpData",i,a)};return e.jsx(L,{mx:"auto",maxWidth:"350px",minWidth:"350px",children:e.jsx(O,{onSubmit:ee,onReset:p,children:e.jsxs(z,{size:"4",children:[e.jsx(C,{as:"h3",size:"6",trim:"start",mb:"4",align:"center",children:"Регистрация"}),e.jsxs(L,{mb:"5",children:[e.jsx(f,{mb:"1",justify:"between",align:"baseline",children:e.jsx(h,{as:"label",htmlFor:"input-auth-login",size:"2",weight:"bold",children:"Эл. почта"})}),e.jsx(v,{placeholder:"Введите ваш email",id:"input-auth-login",mb:"1",autoComplete:"username",value:i,onChange:u=>l(u.target.value)})]}),e.jsxs(L,{mb:"5",children:[e.jsx(f,{align:"baseline",justify:"between",mb:"1",children:e.jsx(h,{as:"label",size:"2",weight:"bold",htmlFor:"input-auth-pass1",children:"Пароль"})}),e.jsx(v,{type:"password",placeholder:"Введите ваш пароль",id:"input-auth-pass1",mb:"1",autoComplete:"new-password",value:a,onChange:u=>n(u.target.value)})]}),e.jsxs(L,{mb:"5",children:[e.jsx(f,{align:"baseline",justify:"between",mb:"1",children:e.jsx(h,{as:"label",size:"2",weight:"bold",htmlFor:"input-auth-pass2",children:"Повторите пароль"})}),e.jsx(v,{type:"password",placeholder:"Введите ваш пароль",id:"input-auth-pass2",mb:"1",autoComplete:"new-password",value:r,onChange:u=>d(u.target.value)})]}),(c.email||c.password||c.passwordRepeat||t)&&e.jsx(H,{id:"err-info",children:e.jsxs(W,{as:"div",size:"1",children:[c.email&&e.jsxs(h,{as:"div",className:"sign-up__text",children:["Проверьте Email ",E,e.jsx("ul",{children:e.jsx("li",{children:"Формат: user@mail.by"})})]}),c.password&&e.jsxs(h,{as:"div",className:"sign-up__text",children:["Некорректный пароль ",E,e.jsxs("ul",{children:[e.jsx("li",{children:"Минимальная длина: 6 символов;"}),e.jsx("li",{children:"Пароль должен содержать буквы (английские);"}),e.jsx("li",{children:"Пароль должен содержать цифры."})]})]}),c.passwordRepeat&&e.jsxs(h,{as:"div",className:"sign-up__text",children:["Пароли не совпадают! ",E]}),t&&e.jsx(h,{as:"div",className:"sign-up__text",children:t})]})}),e.jsxs(f,{mt:"6",justify:"end",gap:"3",children:[e.jsx(j,{variant:"outline",style:{width:"135px"},type:"reset",disabled:s,children:"Авторизоваться"}),e.jsx(j,{style:{width:"135px"},type:"submit",loading:s,children:"Создать аккаунт"})]})]})})})}const ms=o.memo(us),ps=({isSignUp:s})=>{const t=R(),i=b(n=>n.userData),l=o.useCallback(async(n,r)=>{try{t(y({state:1,error:null}));let d;if(s?d=await pe($,n,r):d=await he($,n,r),d){let c=d.user,g={email:c.email,uid:c.uid};localStorage.setItem("userKeyData",JSON.stringify(c.stsTokenManager.accessToken)),t(X({state:2,error:null,data:g})),t(A(!0)),m.emit("goPageHome")}}catch(d){t(y({state:3,error:_(d.code)}))}},[t,s]),a=o.useCallback((n,r)=>l(n,r),[l]);return o.useEffect(()=>(m.on(s?"sendSignUpData":"sendSignInData",a),()=>{m.removeListener(s?"sendSignUpData":"sendSignInData",a)}),[a,s]),e.jsx("div",{children:s?e.jsx(ms,{loadStatus:i.dataLoadState===1,errSignUp:i.dataLoadError}):e.jsx(is,{loadStatus:i.dataLoadState===1,errSignIn:i.dataLoadError})})},T=o.memo(ps),hs="/auth/sign-up",k="/auth/sign-in",Q="/home",xs="/home/album";function gs(){return e.jsxs(xe,{children:[e.jsx(x,{element:e.jsx(Ae,{uriLogin:k}),children:e.jsxs(x,{path:"/home",element:e.jsxs(e.Fragment,{children:[e.jsx(P,{title:"MuSBoX - Web Player"}),e.jsx(ss,{})]}),children:[e.jsx(x,{index:!0,path:"",element:e.jsx(e.Fragment,{children:e.jsx(S,{})})}),e.jsx(x,{index:!0,path:"album",element:e.jsx(e.Fragment,{children:e.jsx(S,{})})}),e.jsx(x,{index:!0,path:"album/:id",element:e.jsx(e.Fragment,{children:e.jsx(S,{})})})]})}),e.jsxs(x,{path:"/auth",element:e.jsx(e.Fragment,{children:e.jsx(os,{})}),children:[e.jsx(x,{path:"sign-in",element:e.jsxs(e.Fragment,{children:[e.jsx(P,{title:"MuSBoX - Авторизация"}),e.jsx(T,{isSignUp:!1})]})}),e.jsx(x,{path:"sign-up",element:e.jsxs(e.Fragment,{children:[e.jsx(P,{title:"MuSBoX - Регистрация"}),e.jsx(T,{isSignUp:!0})]})}),e.jsx(x,{index:!0,path:"*",element:e.jsx(U,{to:k,replace:!0})})]}),e.jsx(x,{path:"*",element:e.jsx(U,{to:Q})})]})}const js=o.memo(gs),fs=e.jsxs("svg",{width:"2560",height:"1920",viewBox:"0 0 2560 1920",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{opacity:.6,pointerEvents:"none",position:"absolute",width:"100%",height:"100%",zIndex:-100},children:[e.jsxs("g",{children:[e.jsx("path",{d:"M-119.809 -1055.99L859.027 -684.98C915.435 -663.6 955.626 -624.994 968.519 -579.807L1129.49 -15.6245L1860.47 -241.727C1919.02 -259.836 1985.68 -257.939 2042.09 -236.559L3020.93 134.453C3124.79 173.822 3164.97 266.777 3110.66 342.073L2850.06 703.385C2827.36 734.857 2790.34 759.666 2745.28 773.604L1467.45 1168.86L1748.58 2154.16C1758.67 2189.52 1751.28 2226.32 1727.72 2258.12L1361.75 2752.01L203.258 2312.91C146.85 2291.53 106.659 2252.92 93.7664 2207.73L-67.2076 1643.55L-798.184 1869.65C-856.73 1887.76 -923.398 1885.87 -979.806 1864.48L-2138.3 1425.38L-1787.63 925.687C-1765.05 893.507 -1727.57 868.111 -1681.77 853.942L-405.167 459.07L-686.568 -527.183C-696.491 -561.961 -689.511 -598.157 -666.811 -629.629L-406.21 -990.941C-351.902 -1066.24 -223.676 -1095.36 -119.809 -1055.99Z",fill:"url(#paint0_radial_37_453)"}),e.jsx("path",{d:"M885.9 -99.2158L1864.74 271.796C1921.14 293.177 1961.34 331.783 1974.23 376.97L2135.2 941.152L2866.18 715.049C2924.72 696.94 2991.39 698.837 3047.8 720.218L4026.64 1091.23C4130.5 1130.6 4170.68 1223.55 4116.37 1298.85L3855.77 1660.16C3833.07 1691.63 3796.05 1716.44 3750.99 1730.38L2473.16 2125.63L2754.29 3110.94C2764.38 3146.29 2756.99 3183.09 2733.43 3214.9L2367.46 3708.79L1208.97 3269.68C1152.56 3248.3 1112.37 3209.7 1099.48 3164.51C816.824 2173.87 747.087 1929.46 319.141 429.593C309.218 394.815 316.198 358.619 338.898 327.147L599.499 -34.1647C653.807 -109.461 782.033 -138.585 885.9 -99.2158Z",fill:"url(#paint1_radial_37_453)"}),e.jsx("path",{d:"M1597.13 169.784L2575.97 540.796C2632.38 562.177 2672.57 600.783 2685.46 645.97L2846.44 1210.15L3577.41 984.049C3635.96 965.94 3702.63 967.837 3759.03 989.218L4737.87 1360.23C4841.74 1399.6 4881.91 1492.55 4827.61 1567.85L4567 1929.16C4544.3 1960.63 4507.28 1985.44 4462.22 1999.38L3184.4 2394.63L3465.53 3379.94C3475.61 3415.29 3468.23 3452.09 3444.66 3483.9L3078.69 3977.79L1920.2 3538.68C1863.79 3517.3 1823.6 3478.7 1810.71 3433.51L1649.74 2869.33L918.759 3095.43C860.213 3113.54 793.545 3111.64 737.138 3090.26L-421.356 2651.15L-70.6875 2151.46C-48.1049 2119.28 -10.63 2093.89 35.1782 2079.72L1311.78 1684.85L1030.38 698.593C1020.45 663.815 1027.43 627.619 1050.13 596.147L1310.73 234.835C1365.04 159.539 1493.27 130.415 1597.13 169.784Z",fill:"url(#paint2_radial_37_453)"}),e.jsx("g",{filter:"url(#filter0_f_37_453)",children:e.jsx("path",{d:"M2395.71 -658.308L3374.55 -287.296C3430.96 -265.915 3471.15 -227.309 3484.04 -182.122L3645.01 382.06L4375.99 155.958C4434.54 137.848 4501.2 139.745 4557.61 161.126L5536.45 532.138C5640.32 571.507 5680.49 664.461 5626.18 739.757L5365.58 1101.07C5342.88 1132.54 5305.86 1157.35 5260.8 1171.29L3982.97 1566.54L4264.1 2551.84C4274.19 2587.2 4266.81 2624 4243.24 2655.81L3877.27 3149.7L2718.78 2710.59C2662.37 2689.21 2622.18 2650.6 2609.29 2605.42L2448.31 2041.24L1717.34 2267.34C1658.79 2285.45 1592.12 2283.55 1535.72 2262.17L377.222 1823.06L727.891 1323.37C750.473 1291.19 787.948 1265.8 833.756 1251.63L2110.35 856.754L1828.95 -129.498C1819.03 -164.277 1826.01 -200.472 1848.71 -231.944L2109.31 -593.257C2163.62 -668.552 2291.85 -697.677 2395.71 -658.308Z",fill:"url(#paint3_radial_37_453)"})}),e.jsx("path",{d:"M3059.26 767.932L3310.25 1618.16C3324.72 1667.15 3315.74 1727.88 3285.79 1783.6L2911.89 2479.3L3514.51 2558.36C3562.77 2564.69 3599.15 2596.78 3613.62 2645.77L3864.61 3496C3891.25 3586.22 3837.41 3706.98 3744.37 3765.74L3297.91 4047.66C3259.03 4072.22 3217.48 4082.97 3180.34 4078.1L2126.89 3939.89L1473.9 5154.88C1450.47 5198.48 1415.9 5235.81 1376.24 5260.35L760.412 5641.34L463.348 4635.06C448.884 4586.06 457.863 4525.33 487.81 4469.61L861.713 3773.92L259.094 3694.86C210.828 3688.53 174.448 3656.44 159.984 3607.44L-137.08 2601.17L474.823 2206.89C514.228 2181.5 556.514 2170.3 594.278 2175.25L1646.71 2313.32L2300.33 1097.17C2323.38 1054.28 2357.22 1017.43 2396.11 992.876L2842.57 710.953C2935.61 652.202 3032.62 677.712 3059.26 767.932Z",fill:"url(#paint4_radial_37_453)"})]}),e.jsxs("defs",{children:[e.jsxs("radialGradient",{id:"paint0_radial_37_453",cx:"0",cy:"0",r:"1",gradientUnits:"userSpaceOnUse",gradientTransform:"translate(-804.109 -2036.8) rotate(64.9401) scale(6436.87 6304.81)",children:[e.jsx("stop",{stopColor:"var(--color-background)"}),e.jsx("stop",{offset:"0.0833333",stopColor:"var(--accent-7)"}),e.jsx("stop",{offset:"0.364583",stopColor:"var(--accent-5)"}),e.jsx("stop",{offset:"0.658041",stopColor:"var(--color-background)"}),e.jsx("stop",{offset:"0.798521",stopColor:"var(--accent-9)"}),e.jsx("stop",{offset:"0.942708",stopColor:"var(--color-background)"}),e.jsx("stop",{offset:"1",stopColor:"var(--color-background)"})]}),e.jsxs("radialGradient",{id:"paint1_radial_37_453",cx:"0",cy:"0",r:"1",gradientUnits:"userSpaceOnUse",gradientTransform:"translate(201.6 -1080.02) rotate(64.9401) scale(6436.87 6304.81)",children:[e.jsx("stop",{stopColor:"var(--color-background)"}),e.jsx("stop",{offset:"0.0833333",stopColor:"var(--accent-2)"}),e.jsx("stop",{offset:"0.333803",stopColor:"var(--accent-1)"}),e.jsx("stop",{offset:"0.658041",stopColor:"var(--color-background)"}),e.jsx("stop",{offset:"0.798521",stopColor:"var(--accent-9)"}),e.jsx("stop",{offset:"0.942708",stopColor:"var(--color-background)"}),e.jsx("stop",{offset:"1",stopColor:"var(--color-background)"})]}),e.jsxs("radialGradient",{id:"paint2_radial_37_453",cx:"0",cy:"0",r:"1",gradientUnits:"userSpaceOnUse",gradientTransform:"translate(912.834 -811.021) rotate(64.9401) scale(6436.87 6304.81)",children:[e.jsx("stop",{stopColor:"var(--color-background)"}),e.jsx("stop",{offset:"0.140625",stopColor:"var(--accent-3)"}),e.jsx("stop",{offset:"0.333803",stopColor:"var(--accent-7)"}),e.jsx("stop",{offset:"0.658041",stopColor:"var(--color-background)"}),e.jsx("stop",{offset:"0.798521",stopColor:"var(--accent-9)"}),e.jsx("stop",{offset:"0.942708",stopColor:"var(--color-background)"}),e.jsx("stop",{offset:"1",stopColor:"var(--color-background)"})]}),e.jsxs("radialGradient",{id:"paint3_radial_37_453",cx:"0",cy:"0",r:"1",gradientUnits:"userSpaceOnUse",gradientTransform:"translate(1711.41 -1639.11) rotate(64.9401) scale(6436.87 6304.81)",children:[e.jsx("stop",{stopColor:"var(--color-background)"}),e.jsx("stop",{offset:"0.0833333",stopColor:"var(--accent-7)"}),e.jsx("stop",{offset:"0.333803",stopColor:"var(--accent-1)"}),e.jsx("stop",{offset:"0.658041",stopColor:"var(--color-background)"}),e.jsx("stop",{offset:"0.798521",stopColor:"var(--accent-9)"}),e.jsx("stop",{offset:"0.942708",stopColor:"var(--color-background)"}),e.jsx("stop",{offset:"1",stopColor:"var(--color-background)"})]}),e.jsxs("radialGradient",{id:"paint4_radial_37_453",cx:"0",cy:"0",r:"1",gradientUnits:"userSpaceOnUse",gradientTransform:"translate(3479.06 -623.459) rotate(113.028) scale(8332.26 4870.62)",children:[e.jsx("stop",{stopColor:"var(--color-background)"}),e.jsx("stop",{offset:"0.0833333",stopColor:"var(--accent-7)"}),e.jsx("stop",{offset:"0.333803",stopColor:"var(--accent-1)"}),e.jsx("stop",{offset:"0.658041",stopColor:"var(--color-background)"}),e.jsx("stop",{offset:"0.798521",stopColor:"var(--accent-9)"}),e.jsx("stop",{offset:"0.942708",stopColor:"var(--color-background)"}),e.jsx("stop",{offset:"1",stopColor:"var(--color-background)"})]})]})]});function Ls(){return e.jsx(ge,{children:e.jsx(je,{store:Me,children:e.jsxs(fe,{accentColor:"amber",grayColor:"mauve",appearance:"dark",children:[fs,e.jsxs(Le,{size:"4",maxWidth:"1920px",children:[" ",e.jsx(js,{})]})]})})})}Ce(document.getElementById("root")).render(e.jsx(Ls,{}));
