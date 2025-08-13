const isTouch =
  window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
  navigator.maxTouchPoints > 0;

if (isTouch) {
  document.querySelectorAll(".cases__wrapper-text").forEach((wrap) => {
    wrap.setAttribute("role", "button");
    wrap.setAttribute("tabindex", "0");

    const toggle = (e) => {
      if (typeof swiperCases !== "undefined" && swiperCases.isDragging) return;
      e.preventDefault();
      e.stopPropagation();

      wrap.classList.toggle("is-flipped");

      if (typeof swiperCases !== "undefined") {
        swiperCases.allowTouchMove = !wrap.classList.contains("is-flipped");
      }
    };

    // теперь обычный клик
    wrap.addEventListener("click", toggle, { passive: false });

    wrap.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        toggle(e);
      }
    });
  });
}
