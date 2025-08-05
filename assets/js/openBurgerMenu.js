const mWidth = 360; // Define the threshold for mobile view
const xWidth = 600; // Define the threshold for extra small view
const tWidth = 900; // Define the threshold for tablet view
const dWidth = 1200; // Define the threshold for desktop view
const fWidth = 1920; // Define the threshold for full HD view

const burger = document.querySelector(".header__toggle");
const headerText = document.querySelector(".header__logo-text");

if (window.innerWidth < dWidth) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("header__toggle--open");
  });
}

if (window.innerWidth < fWidth && window.innerWidth >= dWidth) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("header__toggle--open");
    headerText.classList.toggle("header__logo-text--hidden");
  });
}
