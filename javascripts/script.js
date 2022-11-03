const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const car = document.getElementById('car');
const x = document.getElementById('cross');

const getMenu = () => {

    nav.style.right="0px";
    car.style.opacity="0";
}

const closeMenu = () => {

    nav.style.right="-300px";
    x.classList.add('active');
    car.style.opacity="1";
}

