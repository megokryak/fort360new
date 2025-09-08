import { notify, validateEmail } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('.consult2-form');
  const personalDataCheckbox = document.getElementById('consult_personal_data2');
  const submitButton = document.querySelector('.consult-submit2');

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
          text: formData.get('message'),
          personal_data: formData.get('consult_personal_data2') ? true : false,
      };

      // Проверка на пустые поля
      if (!formValues.firstname) {
          notify("Ошибка!", "Пожалуйста, заполните поле «Имя»", 'error');
          return;
      }
      if (!formValues.lastname) {
          notify("Ошибка!", "Пожалуйста, заполните поле «Фамилия»", 'error');
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
          const url = '/portal/support/'
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

          notify("Успех!", "Заявка на демо-доступ отправлена", 'success');
          resetForm();

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