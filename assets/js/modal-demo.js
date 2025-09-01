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

  // Функция для валидации email
  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
  }

  // Функция для отображения уведомлений
  function notify(title, text, type) {
      const notification = document.createElement('div');
      notification.className = `notification notification--${type}`;
      notification.innerHTML = `<strong>${title}</strong>: ${text}`;
      document.body.appendChild(notification);

      setTimeout(() => {
          notification.remove();
      }, 3000);
  }

  // Получение элементов формы
  const form = document.querySelector('.demo-form');
  const nameInput = document.getElementById('name');
  const organizationInput = document.getElementById('organization');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const personalDataCheckbox = document.getElementById('personal_data');
  const submitButton = document.querySelector('.demo-submit');

  // Функция для сброса формы
  function resetForm() {
      form.reset();
      personalDataCheckbox.checked = false;
  }

  // Обработчик отправки формы
  form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const formValues = {
          name: formData.get('name'),
          organization: formData.get('organization'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          personal_data: formData.get('personal_data') ? true : false,
      };

      if (!validateEmail(formValues.email)) {
          notify("Ошибка!", `Почта указана некорректно: ${formValues.email}`, 'error');
          return;
      }

      submitButton.disabled = true;

      try {
          const response = await fetch('/portal/demo/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formValues),
          });

          if (!response.ok) {
              throw new Error('Ошибка сервера');
          }

          const data = await response.json();

          if (data.username) {
              notify("Ошибка!", data.username[0], 'error');
          } else {
              notify("Успех!", "Заявка на демо-доступ отправлена", 'success');
              resetForm();
          }
      } catch (error) {
          if (error.response && error.response.data && error.response.data.username) {
              notify("Ошибка!", error.response.data.username[0], 'error');
          } else {
              notify("Ошибка!", error.message, 'error');
          }
      } finally {
          submitButton.disabled = false;
      }
  });
});
