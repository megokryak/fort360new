function equalizeSlideHeights(selector) {
  const slides = selector.querySelectorAll(cases__item);
  console.log(slides);
  let maxHeight = 0;

  // Ищем максимальную
  slides.forEach((slide) => {
    let text = slide.querySelector(".cases__wrapper-text-upper");
    console.log(text);
    maxHeight = Math.max(maxHeight, text.offsetHeight);
  });

  // Присваиваем всем
  slides.forEach((slide) => {
    let text = slide.querySelector(".cases__wrapper-text-upper");
    text.style.height = maxHeight + "px";
  });
}

// Запускаем при загрузке и ресайзе
console.log("Equalize slide heights script loaded");
window.addEventListener("load", () => equalizeSlideHeights(".cases__list"));
window.addEventListener("resize", () => equalizeSlideHeights(".cases__list"));
