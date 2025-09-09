document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.querySelector(".subscribe #phone");

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
