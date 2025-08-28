document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".modal--demo");
  const modalConsultation = document.querySelector(".modal--consultation");
  const modalPrice = document.querySelector(".modal--connect");
  const modalCallMe = document.querySelector(".modal--call-me");

  const container = modal.querySelector(".modal__container");
  const closeBtn = modal.querySelector(".modal__close-btn");
  const openBtns = document.querySelectorAll(".btn--demo");

  const closeBtnConsultation =
    modalConsultation.querySelector(".modal__close-btn");
  const openBtnsConsultation = document.querySelectorAll(".about__btn");

  const closeBtnPrice = modalPrice.querySelector(".modal__close-btn");
  const openBtnsPrice = document.querySelectorAll(".card__btn-primary");

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

  // Открытие по кнопкам .btn--demo (их может быть несколько)
  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(modal);
    });
  });

  // Открытие по кнопкам .about-btn (их может быть несколько)
  openBtnsConsultation.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(modalConsultation);
    });
  });

  // Открытие по кнопкам .about-btn (их может быть несколько)
  openBtnsPrice.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(modalPrice);
    });
  });

  // Открытие по кнопкам .about-btn (их может быть несколько)
  openBtnsCallMe.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(modalCallMe);
    });
  });

  // Закрытие по крестику
  closeBtn?.addEventListener("click", () => closeModal(modal));
  closeBtnConsultation?.addEventListener("click", () =>
    closeModal(modalConsultation)
  );
  closeBtnPrice?.addEventListener("click", () => closeModal(modalPrice));
  closeBtnClallMe?.addEventListener("click", () => closeModal(modalCallMe));

  // Закрытие по клику вне .modal-demo__container (по фону)
  modal.addEventListener("click", (e) => {
    if (!e.target.closest(".modal__container")) {
      closeModal(modal);
    }
  });

  modalConsultation.addEventListener("click", (e) => {
    if (!e.target.closest(".modal__container")) {
      closeModal(modalConsultation);
    }
  });

  modalPrice.addEventListener("click", (e) => {
    if (!e.target.closest(".modal__container")) {
      closeModal(modalPrice);
    }
  });

  modalCallMe.addEventListener("click", (e) => {
    if (!e.target.closest(".modal__container")) {
      closeModal(modalCallMe);
    }
  });

  // Дополнительно: закрытие по Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("modal--close")) {
      closeModal(modal);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      !modalConsultation.classList.contains("modal--close")
    ) {
      closeModal(modalConsultation);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalPrice.classList.contains("modal--close")) {
      closeModal(modalPrice);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalCallMe.classList.contains("modal--close")) {
      closeModal(modalCallMe);
    }
  });
});
