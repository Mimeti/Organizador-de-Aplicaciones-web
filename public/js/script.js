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

var loader=function(e){
    let file=e.targets.files;

    let show = "<span>Imagen seleccionada: </span>"+file[0].name;

    let output = document.getElementById("file");
    output.innerHTML = show;
    output.classList.add("active")
}

let fileinput = document.getElementById("IMG_app");
fileinput.addEventListener("change", loader);