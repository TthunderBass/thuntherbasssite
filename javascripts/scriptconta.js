const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const x = document.getElementById('cross');

const getMenu = () => {

    nav.style.right="0px";
}

const closeMenu = () => {

    nav.style.right="-300px";
    x.classList.add('active');
}

