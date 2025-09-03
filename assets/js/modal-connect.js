document.addEventListener("DOMContentLoaded", () => {
  const modalConnect = document.querySelector(".modal--connect");
  const closeBtnConnect = modalConnect.querySelector(".modal__close-btn");
  const openBtnsConnect = document.querySelectorAll(".open--connect");

  const openModal = (modalCB) => {
    modalCB.classList.remove("modal--close");
    document.body.style.overflow = "hidden"; // блокируем скролл страницы
  };

  const closeModal = (modalCB) => {
    modalCB.classList.add("modal--close");
    document.body.style.overflow = ""; // возвращаем скролл
  };

  // Открытие по кнопкам .about-btn (их может быть несколько)
  openBtnsConnect.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(modalConnect);
    });
  });

  // Закрытие по крестику
  closeBtnConnect?.addEventListener("click", () => closeModal(modalConnect));

  // Закрытие по клику вне .modal-demo__container (по фону)
  modalConnect.addEventListener("click", (e) => {
    if (!e.target.closest(".modal__container")) {
      closeModal(modalConnect);
    }
  });

  // Дополнительно: закрытие по Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalConnect.classList.contains("modal--close")) {
      closeModal(modalConnect);
    }
  });
});