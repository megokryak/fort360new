import "./style.scss";

import { notify, validateEmail } from "/assets/js/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  // Получение элементов формы
  const form = document.querySelector(".reg-form");
  const personalDataCheckbox = document.getElementById("reg_personal_data");
  const submitButton = document.querySelector(".reg-submit");

  // Функция для сброса формы
  function resetForm() {
    form.reset();
    personalDataCheckbox.checked = false;
  }

  // Обработчик отправки формы
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const formValues = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      organization: formData.get("organization"),
      password: formData.get("password"),
      email: formData.get("email"),
      personal_data: formData.get("reg_personal_data") ? true : false,
    };

    // Проверка на пустые поля
    if (!formValues.firstname) {
      notify("Ошибка!", "Пожалуйста, заполните поле «Имя»", "error");
      return;
    }
    if (!formValues.lastname) {
      notify("Ошибка!", "Пожалуйста, заполните поле «Фамилия»", "error");
      return;
    }
    if (!formValues.organization) {
      notify("Ошибка!", "Пожалуйста, заполните поле «Организация»", "error");
      return;
    }
    if (!formValues.password) {
      notify("Ошибка!", "Пожалуйста, заполните поле «Пароль»", "error");
      return;
    }
    if (!formValues.email) {
      notify("Ошибка!", "Пожалуйста, заполните поле «E-mail»", "error");
      return;
    }
    if (!validateEmail(formValues.email)) {
      notify(
        "Ошибка!",
        `Почта указана некорректно: ${formValues.email}`,
        "error"
      );
      return;
    }
    if (!formValues.personal_data) {
      notify(
        "Ошибка!",
        "Пожалуйста, согласитесь на обработку персональных данных",
        "error"
      );
      return;
    }

    if (!validateEmail(formValues.email)) {
      notify(
        "Ошибка!",
        `Почта указана некорректно: ${formValues.email}`,
        "error"
      );
      return;
    }

    submitButton.disabled = true;

    try {
      const url = "/portal/reg/";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error("Ошибка сервера");
      }

      notify("Успех!", "Заявка на демо-доступ отправлена", "success");
      resetForm();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.username
      ) {
        notify("Ошибка!", error.response.data.username[0], "error");
      } else {
        notify("Ошибка!", error.message, "error");
      }
    } finally {
      submitButton.disabled = false;
    }
  });
});
