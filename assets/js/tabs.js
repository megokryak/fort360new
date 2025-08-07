//ПЕРОЕКЛЮЧЕНИЕ ТАБОВ
function startTabsProduct() {
  const tabs = document.querySelectorAll("#tabs");
  for (let index = 0; index < tabs.length; index++) {
    activationTabs(tabs[index]);
  }
  function activationTabs(tab) {
    const tabButtons = tab.querySelectorAll(".tab-button-item");
    const tabContentItem = tab.querySelectorAll(".tab-content-item");
    tabButtons.forEach((button, index) => {
      button.setAttribute("data-tab", index + 1);
      tabContentItem[index].setAttribute("data-tab", index + 1);
      button.addEventListener("click", function (e) {
        changeTab(tab, index);
      });
    });
  }
}
function changeTab(tab, index) {
  const tabButtons = tab.querySelectorAll(".tab-button-item");
  const tabContentItem = tab.querySelectorAll(".tab-content-item");
  tabButtons.forEach((btn) =>
    btn.classList.remove("section-description__plan-item--active")
  );
  tabContentItem.forEach((content) => content.classList.remove("active"));
  tabButtons[index].classList.add("section-description__plan-item--active");
  tabContentItem[index].classList.add("active");
}
document.addEventListener("DOMContentLoaded", function () {
  startTabsProduct();
});
