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
});
