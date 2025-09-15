import { notify, validateEmail } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".modal--call-me");

  const closeBtnClallMe = modal.querySelector(".modal__close-btn");
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
      openModal(modal);
    });
  });

  // Закрытие по крестику
  closeBtnClallMe?.addEventListener("click", () => closeModal(modal));

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

  const form = document.querySelector(".callme-form");
  // const personalDataCheckbox = document.getElementById('consult_personal_data');
  const submitButton = document.querySelector(".callme-submit");

  // Функция для сброса формы
  function resetForm() {
    form.reset();
  }

  // Обработчик отправки формы
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const formValues = {
      firstname: formData.get("firstname") || '',
      lastname: formData.get("lastname") || '',
      organization: formData.get("organization") || '',
      phone: formData.get("phone") || '',
      email: formData.get("phone") || '',
      text: 'запрос обратного звонка',
      personal_data: formData.get("consult_personal_data") ? true : false,
    };


    if (!formValues.firstname) {
      notify("Ошибка!", "Пожалуйста, заполните поле «Имя»", "error");
      return;
    }
    if (!formValues.phone) {
      notify("Ошибка!", "Пожалуйста, заполните поле «Телефон»", "error");
      return;
    }

    submitButton.disabled = true;

    try {
      const url = "/portal/support/";
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

      notify("Успех!", "Заявка обратный звонок отправлена", "success");
      resetForm();
      closeModal(modal);
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

  // Добавление маски в телефон
  const phoneInput = document.querySelector(".modal--call-me #phone");

  phoneInput.addEventListener("input", function () {
    let inputValue = phoneInput.value.replace(/\D/g, ""); // Убираем все нецифровые символы

    // Ограничиваем длину ввода до 10 цифр
    if (inputValue.length > 11) inputValue = inputValue.slice(0, 11);

    // Форматируем номер по маске
    let formattedValue = "";

    if (inputValue.length > 1) {
      formattedValue = "+7 (" + inputValue.slice(1, 4);
    }
    if (inputValue.length > 4) {
      formattedValue += ") " + inputValue.slice(4, 7);
    }
    if (inputValue.length > 7) {
      formattedValue += "-" + inputValue.slice(7, 9);
    }
    if (inputValue.length > 9) {
      formattedValue += "-" + inputValue.slice(9, 11);
    }

    // Если введено меньше, чем 2 символа, оставляем только +7
    if (inputValue.length <= 1) {
      formattedValue = "+7";
    }

    phoneInput.value = formattedValue;
  });
});
