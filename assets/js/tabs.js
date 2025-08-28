document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".functional__item[data-tab]");
  const texts = document.querySelectorAll(".functional__text[data-tab]");
  const imgLists = document.querySelectorAll(
    ".functional__img-slider[data-tab]"
  );

  // Универсальная функция показа нужного data-tab
  function showTab(tabId) {
    // 1) активность кнопок
    tabs.forEach((t) => {
      const isActive = t.dataset.tab === tabId;
      t.classList.toggle("functional__item--active", isActive);
      t.setAttribute("aria-selected", isActive ? "true" : "false");
      t.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    // 2) тексты
    texts.forEach((block) => {
      block.classList.toggle(
        "functional__text--hidden",
        block.dataset.tab !== tabId
      );
      block.hidden = block.dataset.tab !== tabId; // для доступности
    });

    // 3) изображения (наборы)
    imgLists.forEach((list) => {
      const show = list.dataset.tab === tabId;
      list.classList.toggle("functional__img-list--hidden", !show);
      list.hidden = !show;
    });

    // Если используете Swiper для блоков с картинками:
    // Если у вас по одному Swiper'у на каждый список — обновите видимый:
    // if (window.functionalImgSwipers?.[tabId]) {
    //   window.functionalImgSwipers[tabId].update();
    // }
  }

  // Клик мышью
  tabs.forEach((tab) => {
    tab.setAttribute("role", "tab");
    tab.setAttribute(
      "aria-selected",
      tab.classList.contains("functional__item--active") ? "true" : "false"
    );
    tab.setAttribute(
      "tabindex",
      tab.classList.contains("functional__item--active") ? "0" : "-1"
    );

    tab.addEventListener("click", () => showTab(tab.dataset.tab));
    tab.addEventListener("keydown", (e) => {
      // ENTER / SPACE — выбрать вкладку с клавиатуры
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        showTab(tab.dataset.tab);
      }
    });
  });

  // Показать ту, что отмечена активной в разметке
  const initiallyActive = document.querySelector(
    ".functional__item.functional__item--active[data-tab]"
  );
  showTab(initiallyActive ? initiallyActive.dataset.tab : tabs[0]?.dataset.tab);
});
