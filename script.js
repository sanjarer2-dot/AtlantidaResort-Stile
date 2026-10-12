```javascript
// ========================================
// ATLANTIDA RESORT — SCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  // ЭЛЕМЕНТЫ
  const menuToggle = document.querySelector("#menuToggle");
  const navigation = document.querySelector("#navigation");

  const bookingForm = document.querySelector("#bookingForm");
  const formMessage = document.querySelector("#formMessage");

  const guestService = document.querySelector("#guestService");
  const year = document.querySelector("#year");

  // ========================================
  // МОБИЛЬНОЕ МЕНЮ
  // ========================================

  function closeMenu() {
    if (!menuToggle || !navigation) return;

    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Открыть меню");

    menuToggle.innerHTML = "<span></span><span></span>";
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const opened = navigation.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(opened));
      menuToggle.setAttribute(
        "aria-label",
        opened ? "Закрыть меню" : "Открыть меню"
      );

      // Не заменяем внутреннюю структуру кнопки символом ✕:
      // CSS сможет корректно анимировать две полоски.
      menuToggle.classList.toggle("active", opened);
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    // Закрываем меню клавишей Escape.
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.classList.remove("active");
      }
    });

    // Закрываем меню при переходе на широкий экран.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) {
        closeMenu();
        menuToggle.classList.remove("active");
      }
    });
  }

  // ========================================
  // РОМАНТИЧЕСКОЕ ПРЕДЛОЖЕНИЕ
  // ========================================

  document.querySelectorAll("[data-service]").forEach(button => {
    button.addEventListener("click", () => {
      if (guestService) {
        guestService.value = button.dataset.service;
      }
    });
  });

  // ========================================
  // ФОРМА БРОНИРОВАНИЯ — ДЕМО
  // ========================================

  if (bookingForm && formMessage) {
    bookingForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!bookingForm.reportValidity()) return;

      const name = bookingForm.elements.name.value.trim();

      formMessage.textContent =
        `Спасибо, ${name}! Данные заполнены. ` +
        "Это демоверсия: заявка пока не отправлена администрации.";

      formMessage.classList.add("visible");

      // Оставляем заполненные данные на экране,
      // чтобы посетитель мог проверить их.
    });

    bookingForm.addEventListener("input", () => {
      formMessage.textContent = "";
      formMessage.classList.remove("visible");
    });

    bookingForm.addEventListener("change", () => {
      formMessage.textContent = "";
      formMessage.classList.remove("visible");
    });
  }

  // ========================================
  // АВТОМАТИЧЕСКИЙ ГОД В ПОДВАЛЕ
  // ========================================

  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
```
