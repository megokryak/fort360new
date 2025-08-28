document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".about__together-slider", {
    // Основные параметры
    loop: false,
    slidesPerView: "auto",
    centeredSlides: false,

    // Автопрокрутка
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    // Пагинация
    // pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    // },

    // Навигация
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },

    // Адаптивность
    // breakpoints: {
    //   640: {
    //     spaceBetween: 40,
    //   },
    //   1024: {
    //     spaceBetween: 50,
    //   },
    // },
  });

  let swiperFunctional = null;

  function initFunctionalSwiper() {
    if (window.innerWidth < 1200 && !swiperFunctional) {
      // Инициализируем Swiper для функциональных блоков
      swiperFunctional = new Swiper(".functional__slider", {
        loop: false,
        slidesPerView: "auto",
        centeredSlides: false,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
      });
    } else if (window.innerWidth >= 1200 && swiperFunctional) {
      swiperFunctional.destroy(true, true);
      swiperFunctional = null;
    }
  }

  // Запускаем при загрузке
  initFunctionalSwiper();

  // И при изменении размера окна
  window.addEventListener("resize", () => {
    initFunctionalSwiper();
  });

  const swiperImg = new Swiper(".functional__img-slider", {
    // Основные параметры
    loop: true,
    centeredSlides: false,
    slidesPerView: "auto",
    spaceBetween: 20,

    autoplay: {
      delay: 3000, // Задержка в 3 секунды
      disableOnInteraction: false, // Не останавливать при взаимодействии с слайдером
    },

    // Адаптивность
    breakpoints: {
      1200: {
        spaceBetween: 30,
      },
      1920: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
    },
  });

  const swiperCases = new Swiper(".cases__swiper", {
    // Основные параметры
    loop: false,
    centeredSlides: false,
    slidesPerView: "auto",

    navigation: {
      nextEl: ".cases__pagination-btn--next",
      prevEl: ".cases__pagination-btn--prev",
    },
    pagination: {
      el: ".cases__pagination-list",
      clickable: true,
      bulletClass: "cases__pagination-item", // класс элемента-ли
      bulletActiveClass: "cases__pagination-item--active", // добавь в CSS
      renderBullet: (index, className) => {
        // Можно просто вернуть пустой span, т.к. у тебя уже есть своя разметка
        return `<li class="${className}"><span class="cases__mark"></span></li>`;
      },
    },
  });

  let swiperPrice = null;

  function initPriceSwiper() {
    if (window.innerWidth < 1200 && !swiperPrice) {
      // Инициализируем Swiper для функциональных блоков
      swiperPrice = new Swiper(".price__wrapper-list", {
        // Основные параметры
        loop: false,
        centeredSlides: false,
        slidesPerView: 1,

        navigation: {
          nextEl: ".price__nav-btn--next",
          prevEl: ".price__nav-btn--prev",
        },
      });
    } else if (window.innerWidth >= 1200 && swiperPrice) {
      swiperPrice.destroy(true, true);
      swiperPrice = null;
    }
  }

  // Запускаем при загрузке
  initPriceSwiper();

  // И при изменении размера окна
  window.addEventListener("resize", () => {
    initPriceSwiper();
  });
});
