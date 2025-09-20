document
  .querySelectorAll('.main-nav__fullscreen-list a[href^="#"]')
  .forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const headerH = document.querySelector(".header").offsetHeight;
      const y =
        target.getBoundingClientRect().top + window.pageYOffset - headerH;
      window.scrollTo({ top: y, behavior: "smooth" });
      history.pushState(null, "", "#" + id);
    });
  });
