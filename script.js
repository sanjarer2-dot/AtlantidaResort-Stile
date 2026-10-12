(() => {
  "use strict";

  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");
  const bookingForm = document.getElementById("bookingForm");
  const formMessage = document.getElementById("formMessage");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Открыть меню" : "Закрыть меню");
      navigation.classList.toggle("open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Открыть меню");
      });
    });

    document.addEventListener("click", (event) => {
      if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Открыть меню");
      }
    });
  }

  // Scroll reveal animation, with a fallback for older browsers.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  // Full-screen gallery lightbox.
  const galleryItems = Array.from(document.querySelectorAll(".gallery-item[data-full]"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  const lightboxCount = document.getElementById("lightboxCount");
  let activeImage = 0;
  let previousFocus = null;

  function showImage(index) {
    if (!galleryItems.length) return;
    activeImage = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[activeImage];
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector("img")?.alt || "Фотография ATLANTIDA RESORT";
    lightboxCount.textContent = `${String(activeImage + 1).padStart(2, "0")} / ${String(galleryItems.length).padStart(2, "0")}`;
  }

  function openLightbox(index) {
    previousFocus = document.activeElement;
    showImage(index);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("locked");
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
    lightboxImage.src = "";
    if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
  }

  galleryItems.forEach((item, index) => item.addEventListener("click", () => openLightbox(index)));
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", () => showImage(activeImage - 1));
  lightboxNext.addEventListener("click", () => showImage(activeImage + 1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(activeImage - 1);
    if (event.key === "ArrowRight") showImage(activeImage + 1);
  });

  // Demo-only form validation. No data is sent anywhere until a real endpoint is connected.
  if (bookingForm) {
    const dateInput = document.getElementById("visitDate");
    if (dateInput) {
      const today = new Date();
      const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
        .toISOString().slice(0, 10);
      dateInput.min = localToday;
    }

    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!bookingForm.reportValidity()) return;
      if (formMessage) {
        formMessage.textContent = "Форма заполнена! Сейчас это демонстрация: заявка не отправлена. Подключим отправку в WhatsApp, Telegram или на почту следующим шагом.";
      }
    });
  }
})();