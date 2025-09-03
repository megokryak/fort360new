document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".modal--demo");
  const closeBtn = modal.querySelector(".modal__close-btn");
  const openBtns = document.querySelectorAll(".btn--demo");

  // Открытие по кнопкам .btn--demo (их может быть несколько)
  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(modal);
    });
  });

  // Закрытие по крестику
  closeBtn?.addEventListener("click", () => closeModal(modal));

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

  const openModal = (modalCB) => {
    resetDemoForm()
    modalCB.classList.remove("modal--close");
    document.body.style.overflow = "hidden"; // блокируем скролл страницы
  };

  const closeModal = (modalCB) => {
    modalCB.classList.add("modal--close");
    document.body.style.overflow = ""; // возвращаем скролл
  };

  // Функция для валидации email
  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
  }

  // Функция для отображения уведомлений
  function notify(title, text, type) {
      const notification = document.createElement('div');
      notification.className = `notification notification--${type}`;
      notification.innerHTML = `${text}`;
      document.body.appendChild(notification);

      setTimeout(() => {
          notification.remove();
      }, 3000);
  }

  // Получение элементов формы
  const demoform = document.querySelector('.demo-form');
  const nameInput = document.getElementById('name');
  const organizationInput = document.getElementById('organization');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const personalDataCheckbox = document.getElementById('demo_personal_data');
  const submitButton = document.querySelector('.demo-submit');

  // Функция для сброса формы
  function resetDemoForm() {
      demoform.reset();
      personalDataCheckbox.checked = false;
  }

  // Обработчик отправки формы
  demoform.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(demoform);
      const formValues = {
          name: formData.get('name'),
          organization: formData.get('organization'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          personal_data: formData.get('personal_data') ? true : false,
      };

      // Проверка на пустые поля
      if (!formValues.name) {
          notify("Ошибка!", "Пожалуйста, заполните поле «Ваше имя»", 'error');
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
              resetDemoForm();
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
