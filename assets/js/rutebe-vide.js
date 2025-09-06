document.querySelectorAll(".about__link-video").forEach((link) => {
  const playIcon = link.querySelector(".about__play-icon");
  const videoPlayer = link.querySelector(".about__rutube-player");

  link.addEventListener("click", (e) => {
    e.preventDefault();

    if (!videoPlayer.classList.contains("about__rutube-player--active")) {
      videoPlayer.classList.add("about__rutube-player--active");
      playIcon.style.display = "none";
    }
  });
});
