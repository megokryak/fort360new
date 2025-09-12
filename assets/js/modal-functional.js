document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".modal--functional");

  const closeBtnFunctional = modal.querySelector(".modal__close-btn");
  const openBtnsFunctional = document.querySelectorAll(
    ".main__functional .functional__img"
  );

  const openModal = (modalCB) => {
    modalCB.classList.remove("modal--close");
    document.body.style.overflow = "hidden"; // блокируем скролл страницы
  };

  const closeModal = (modalCB) => {
    modalCB.classList.add("modal--close");
    document.body.style.overflow = ""; // возвращаем скролл
  };

  if (window.innerWidth >= 1920) {
    // Открытие по кнопкам .about-btn (их может быть несколько)
    openBtnsFunctional.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(modal);
      });
    });
  }

  // Закрытие по крестику
  closeBtnFunctional?.addEventListener("click", () => closeModal(modal));

  // Закрытие по клику вне .modal-demo__container (по фону)
  modal.addEventListener("click", (e) => {
    if (!e.target.closest(".modal__container")) {
      closeModal(modal);
    }
  });

  // Дополнительно: закрытие по Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("modal--close")) {
      closeModal(modal);
    }
  });
});
