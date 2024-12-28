const menu = document.querySelector("#menu");
const nav = document.querySelector("#nav");
const back = document.querySelector("#back");
const list = document.querySelector("#list");

menu.addEventListener("click", ()=>{
    nav.classList.remove("hidden");
    list.classList.add("desplegar");
})

back.addEventListener("click", ()=>{
    nav.classList.add("hidden");
    list.classList.remove("desplegar");
})