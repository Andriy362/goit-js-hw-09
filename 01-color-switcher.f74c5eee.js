const t=document.querySelector("body"),e=document.querySelector("button[data-start]"),r=document.querySelector("button[data-stop]");r.setAttribute("disabled",!0);let d=null;e.addEventListener("click",(()=>{d=setInterval((()=>{const e=`#${Math.floor(16777215*Math.random()).toString(16)}`;t.style.backgroundColor=e}),1e3),d&&r.removeAttribute("disabled"),e.setAttribute("disabled",!0)})),r.addEventListener("click",(()=>{clearInterval(d),d&&r.setAttribute("disabled",!0),e.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.f74c5eee.js.map