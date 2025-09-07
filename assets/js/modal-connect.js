import { notify, validateEmail } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".modal--connect");
  const closeBtnConnect = modal.querySelector(".modal__close-btn");
  const openBtnsConnect = document.querySelectorAll(".open--connect");

  const openModal = (modalCB) => {
    resetForm()
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
      openModal(modal);
    });
  });

  // Закрытие по крестику
  closeBtnConnect?.addEventListener("click", () => closeModal(modal));

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

  // Получение элементов формы
  const form = document.querySelector('.connect-form');
  const personalDataCheckbox = document.getElementById('connect_personal_data');
  const submitButton = document.querySelector('.connect-submit');

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
          firstname: formData.get('firstname'),
          lastname: formData.get('lastname'),
          organization: formData.get('organization'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          text: formData.get('subscribe-selected'),
          personal_data: formData.get('connect_personal_data') ? true : false,
      };

      // Проверка на пустые поля
      if (!formValues.firstname) {
          notify("Ошибка!", "Пожалуйста, заполните поле Имя»", 'error');
          return;
      }
      if (!formValues.lastname) {
          notify("Ошибка!", "Пожалуйста, заполните поле Фамилия»", 'error');
          return;
      }
      if (!formValues.organization) {
          notify("Ошибка!", "Пожалуйста, заполните поле «Организация»", 'error');
          return;
      }
      if (!formValues.phone) {
          notify("Ошибка!", "Пожалуйста, заполните поле «Телефон»", 'error');
          return;
      }
      if (!formValues.email) {
          notify("Ошибка!", "Пожалуйста, заполните поле «E-mail»", 'error');
          return;
      }
      if (!validateEmail(formValues.email)) {
          notify("Ошибка!", `Почта указана некорректно: ${formValues.email}`, 'error');
          return;
      }
      if (!formValues.personal_data) {
          notify("Ошибка!", "Пожалуйста, согласитесь на обработку персональных данных", 'error');
          return;
      }

      if (!validateEmail(formValues.email)) {
          notify("Ошибка!", `Почта указана некорректно: ${formValues.email}`, 'error');
          return;
      }

      submitButton.disabled = true;

      try {
          const url = 'http://tsg:9850/portal/support/'
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formValues),
          });

          if (!response.ok) {
              throw new Error('Ошибка сервера');
          }

          notify("Успех!", "Запрос на подключение отправлен", 'success');
          resetForm();
          closeModal(modal);

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