import{j as e,r as s,m as r}from"./index-d2272b43.js";const n=()=>e.jsx("div",{className:"topBar"}),c=()=>{const[a,i]=s.useState();return s.useEffect(()=>{function o(){const t=window.innerWidth;t>1439?i("lap"):t>=768&&t<1440?i("tab"):t<768&&i("mob")}return localStorage.getItem("darkmode")||localStorage.setItem("darkmode","disable"),o(),window.addEventListener("resize",o),()=>{window.removeEventListener("resize",o)}},[]),e.jsxs(r.div,{className:"home",initial:{opacity:0},animate:{opacity:1},exit:{opacity:.5},transition:{ease:"linear",duration:.5},children:[a==="mob"&&e.jsx(n,{}),e.jsx("h2",{children:"Home"}),e.jsx("div",{}),e.jsx("div",{style:{backgroundColor:"yellow"}}),e.jsx("div",{})]})};export{c as default};
