document.addEventListener("DOMContentLoaded", () => {
  const modalCallMe = document.querySelector(".modal--call-me");

  const closeBtnClallMe = modalCallMe.querySelector(".modal__close-btn");
  const openBtnsCallMe = document.querySelectorAll(".callback");

  const openModal = (modalCB) => {
    modalCB.classList.remove("modal--close");
    document.body.style.overflow = "hidden"; // блокируем скролл страницы
  };

  const closeModal = (modalCB) => {
    modalCB.classList.add("modal--close");
    document.body.style.overflow = ""; // возвращаем скролл
  };



  // Открытие по кнопкам .about-btn (их может быть несколько)
  openBtnsCallMe.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(modalCallMe);
    });
  });

  // Закрытие по крестику
  closeBtnClallMe?.addEventListener("click", () => closeModal(modalCallMe));

  // Закрытие по клику вне .modal-demo__container (по фону)
  modalCallMe.addEventListener("click", (e) => {
    if (!e.target.closest(".modal__container")) {
      closeModal(modalCallMe);
    }
  });

  // Дополнительно: закрытие по Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalCallMe.classList.contains("modal--close")) {
      closeModal(modalCallMe);
    }
  });

});