(function () {
  const header = document.querySelector(".header");
  if (!header) return;

  let headerHeight = 0;

  function measure() {
    headerHeight = header.offsetHeight;
  }

  function onScroll() {
    if (window.scrollY >= headerHeight) {
      if (!header.classList.contains("header--fixed")) {
        header.classList.add("header--fixed");
        document.body.style.paddingTop = headerHeight + "px";
      }
    } else {
      if (header.classList.contains("header--fixed")) {
        header.classList.remove("header--fixed");
        document.body.style.paddingTop = "";
      }
    }
  }

  window.addEventListener("load", () => {
    measure();
    onScroll();
  });
  window.addEventListener("resize", () => {
    measure();
    onScroll();
  });
  window.addEventListener("scroll", onScroll, { passive: true });
})();
