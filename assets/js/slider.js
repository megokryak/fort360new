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

  const swiperFunctional = new Swiper(".functional__slider", {
    // Основные параметры
    loop: false,
    slidesPerView: "auto",
    centeredSlides: false,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,

    // // Автопрокрутка
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },

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
});
