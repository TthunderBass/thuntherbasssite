
let rolagem = document.getElementById("Scrolllado");
let alturaPag = document.body.scrollHeight - window.innerHeight;

window.onscroll = function rolar(){

    let rolar = parseFloat((window.pageYOffset / alturaPag) * 118);

    rolagem.style.height = rolar + "%";
}