/** Данные тарифов: можно загрузить с сервера */
const PLANS = [
  {
    name: "Старт",
    monthly: 10000,
    yearly: 10000 * 10, // пример: год = 10*мес
    users: "10 пользователей",
    orgs: "1 организация",
    db: "до 5 ГБ",
    modules: { collab: true, docs: false, mobile: false, admin: false },
  },
  {
    name: "Компания",
    monthly: 20000,
    yearly: 20000 * 10,
    users: "20 пользователей",
    orgs: "5 организаций",
    db: "до 20 ГБ",
    modules: { collab: true, docs: true, mobile: "+", admin: true },
  },
  {
    name: "Холдинг",
    monthly: 45000,
    yearly: 45000 * 10,
    users: "без ограничений",
    orgs: "без ограничений",
    db: "до 200 ГБ",
    modules: { collab: true, docs: true, mobile: true, admin: true },
  },
];

let currentIndex = 1; // по макету выбран "Компания"
let currentPeriod = "monthly";

const $ = (sel) => document.querySelector(sel);
const setBadge = (el, val) => {
  el.classList.remove("badge--ok", "badge--plus");
  if (val === true) {
    el.textContent = "✓";
    el.classList.add("badge--ok");
  } else if (val === "+") {
    el.textContent = "＋";
    el.classList.add("badge--plus");
  } else {
    el.textContent = "—";
  }
};

function render() {
  const p = PLANS[currentIndex];
  $("#plan-name").textContent = p.name;
  $("#f-users").textContent = p.users;
  $("#f-orgs").textContent = p.orgs;
  $("#f-db").textContent = p.db;
  $("#price").textContent = p[currentPeriod].toLocaleString("ru-RU");

  setBadge($("#f-collab-badge"), p.modules.collab);
  setBadge($("#f-docs-badge"), p.modules.docs);
  setBadge($("#f-mobile-badge"), p.modules.mobile);
  setBadge($("#f-admin-badge"), p.modules.admin);
}
render();

// стрелки
document.querySelector(".nav-btn--next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % PLANS.length;
  render();
});
document.querySelector(".nav-btn--prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + PLANS.length) % PLANS.length;
  render();
});

// табы
document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab")
      .forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    currentPeriod = btn.dataset.period; // 'monthly' | 'yearly'
    render();
  });
});

// CTA — тут можно подставить id плана/период
document.getElementById("cta").addEventListener("click", () => {
  const p = PLANS[currentIndex];
  alert(
    `Подключаем тариф «${p.name}», период: ${
      currentPeriod === "monthly" ? "месяц" : "год"
    }`
  );
});
