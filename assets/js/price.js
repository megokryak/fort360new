document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".price__wrapper-list");
  const specRowEls = [
    ...document.querySelectorAll(".price__specs .price__specs-cell--details"),
  ];
  const cards = [...document.querySelectorAll(".price__card")];

  const cardDetails = cards.map((card) => [
    ...card.querySelectorAll(".card__feature--details"),
  ]);

  const setRowContentVisible = (rowIndex, visible) => {
    const leftList = specRowEls[rowIndex]?.querySelector(".card__list");
    if (leftList) leftList.style.display = visible ? "" : "none";
    cardDetails.forEach((detailsList) => {
      const d = detailsList[rowIndex];
      if (!d) return;
      const ul = d.querySelector(".card__list-status");
      if (ul) ul.style.display = visible ? "" : "none";
      d.querySelectorAll(".card__item-status").forEach((li) => {
        li.style.display = visible ? "" : "none";
      });
    });
  };

  // NEW: сброс выставленных высот у элементов строки
  const resetHeightsForRow = (rowIndex) => {
    const leftItems =
      specRowEls[rowIndex]?.querySelectorAll(".card__item") || [];
    leftItems.forEach((li) => (li.style.minHeight = ""));

    cardDetails.forEach((detailsList) => {
      const d = detailsList[rowIndex];
      if (!d) return;
      d.querySelectorAll(".card__item-status").forEach(
        (li) => (li.style.minHeight = "")
      );
    });
  };

  // NEW: выравнивание по максимальной высоте каждого пункта
  const alignHeightsForRow = (rowIndex) => {
    const leftItems = [
      ...(specRowEls[rowIndex]?.querySelectorAll(".card__item") || []),
    ];
    const perCardItems = cardDetails.map((detailsList) => {
      const d = detailsList[rowIndex];
      return d ? [...d.querySelectorAll(".card__item-status")] : [];
    });

    const rowsCount = Math.max(
      leftItems.length,
      ...perCardItems.map((arr) => arr.length)
    );

    // Сначала сбросим высоты — важно при ресайзе
    resetHeightsForRow(rowIndex);

    for (let i = 0; i < rowsCount; i++) {
      const elems = [];
      if (leftItems[i]) elems.push(leftItems[i]);
      perCardItems.forEach((arr) => {
        if (arr[i]) elems.push(arr[i]);
      });

      if (!elems.length) continue;

      // Берём высоты после того как элементы показаны
      const maxH = Math.max(...elems.map((el) => el.offsetHeight));
      elems.forEach((el) => (el.style.minHeight = maxH + "px"));
    }
  };

  // небольшой debounce для ресайза
  const debounce = (fn, wait = 120) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  };

  const toggleRow = (rowIndex, forceState = null) => {
    const sample = cardDetails[0]?.[rowIndex];
    const wantOpen = forceState === null ? !sample?.open : !!forceState;

    cardDetails.forEach((detailsList) => {
      const d = detailsList[rowIndex];
      if (!d) return;
      d.open = wantOpen;
    });

    specRowEls[rowIndex]?.classList.toggle("is-open", wantOpen);
    setRowContentVisible(rowIndex, wantOpen);

    // NEW: после открытия выравниваем, после закрытия — сбрасываем
    if (wantOpen) {
      // дать браузеру отрисовать «display:block», чтобы offsetHeight был корректным
      requestAnimationFrame(() => alignHeightsForRow(rowIndex));
    } else {
      resetHeightsForRow(rowIndex);
    }
  };

  specRowEls.forEach((cell, rowIndex) => {
    cell.setAttribute("tabindex", "0");

    const handler = (e) => {
      e.preventDefault();
      const currentOpen = cardDetails[0]?.[rowIndex]?.open ?? false;
      toggleRow(rowIndex, !currentOpen);
    };

    cell.addEventListener("click", handler);
    cell.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") handler(e);
    });

    const leftList = cell.querySelector(".card__list");
    if (leftList) leftList.style.display = "none";
  });

  wrapper.addEventListener("click", (e) => {
    const summary = e.target.closest(".card__feature--details > summary");
    if (!summary) return;

    e.preventDefault();

    const card = summary.closest(".price__card");
    const cardIndex = cards.indexOf(card);
    if (cardIndex === -1) return;

    const detailsList = cardDetails[cardIndex];
    const detailsEl = summary.parentElement;
    const rowIndex = detailsList.indexOf(detailsEl);
    if (rowIndex === -1) return;

    const isOpen = detailsEl.open;
    toggleRow(rowIndex, !isOpen);
  });

  specRowEls.forEach((_, i) => setRowContentVisible(i, false));

  // NEW: при ресайзе пересчитать высоты для всех открытых строк
  const recalcAllOpen = () => {
    specRowEls.forEach((cell, idx) => {
      const isOpen = cardDetails[0]?.[idx]?.open;
      if (isOpen) {
        alignHeightsForRow(idx);
      }
    });
  };
  window.addEventListener("resize", debounce(recalcAllOpen, 120));
});
