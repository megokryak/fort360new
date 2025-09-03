document.addEventListener("DOMContentLoaded", () => {
  const modalConsultation = document.querySelector(".modal--consultation");

  const closeBtnConsultation = modalConsultation.querySelector(".modal__close-btn");
  const openBtnsConsultation = document.querySelectorAll(".open--consultation");


  const openModal = (modalCB) => {
    modalCB.classList.remove("modal--close");
    document.body.style.overflow = "hidden"; // блокируем скролл страницы
  };

  const closeModal = (modalCB) => {
    modalCB.classList.add("modal--close");
    document.body.style.overflow = ""; // возвращаем скролл
  };



  // Открытие по кнопкам .about-btn (их может быть несколько)
  openBtnsConsultation.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(modalConsultation);
    });
  });


  // Закрытие по крестику
  closeBtnConsultation?.addEventListener("click", () =>
    closeModal(modalConsultation)
  );

  // Закрытие по клику вне .modal-demo__container (по фону)
  modalConsultation.addEventListener("click", (e) => {
    if (!e.target.closest(".modal__container")) {
      closeModal(modalConsultation);
    }
  });


  // Дополнительно: закрытие по Esc
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      !modalConsultation.classList.contains("modal--close")
    ) {
      closeModal(modalConsultation);
    }
  });
});


// 2 модалки 1 на странице