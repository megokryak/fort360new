document.addEventListener("DOMContentLoaded", () => {
  // 1) ЦЕНЫ ТОЛЬКО В КОДЕ
  // Порядок соответствует порядку .price__card в разметке
  const PRICE_DATA = {
    monthly: [0, 10000, 20000, 40000],
    yearly: [0, 110000, 220000, 440000],
  };

  const formatRub = (n) =>
    n === 0 ? "Бесплатно" : new Intl.NumberFormat("ru-RU").format(n) + " ₽";

  // 2) Узлы цен каждого тарифа (dd внутри блока "Стоимость пользования")
  const cards = [...document.querySelectorAll(".price__card")];
  const priceEls = cards.map((c) =>
    c.querySelector(".card__feature--price dd")
  );

  // 3) Кнопки переключения периода (моб/дескт. — любые с data-period)
  const tabs = [...document.querySelectorAll(".price__tab[data-period]")];

  function setPeriod(period) {
    // подсветка активной вкладки
    tabs.forEach((btn) => {
      const active = btn.dataset.period === period;
      btn.classList.toggle("price__tab--is-active", active);
      btn.setAttribute("aria-selected", String(active));
    });

    // подстановка цен
    const arr = PRICE_DATA[period] || [];
    priceEls.forEach((el, i) => {
      const val = arr[i];
      // если на всякий случай массив короче — не трогаем ячейку
      if (typeof val !== "number") return;
      el.textContent = formatRub(val);
    });
  }

  // клики по "Месяц/Год"
  tabs.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      setPeriod(btn.dataset.period);
    });
  });

  // стартовое состояние
  setPeriod("monthly");
});
