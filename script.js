
const menuToggle = document.querySelector("#menuToggle");
const navigation = document.querySelector("#navigation");

menuToggle.addEventListener("click", () => {
  const opened = navigation.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(opened));
  menuToggle.textContent = opened ? "✕" : "☰";
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

const bookingForm = document.querySelector("#bookingForm");
const formMessage = document.querySelector("#formMessage");

bookingForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) return;

  const name = bookingForm.elements.name.value.trim();

  formMessage.textContent =
    `Спасибо, ${name}! Форма работает в деморежиме. ` +
    "Для настоящей брони нужно подключить отправку заявок.";

  bookingForm.reset();
});

document.querySelector("#year").textContent =
  new Date().getFullYear();
