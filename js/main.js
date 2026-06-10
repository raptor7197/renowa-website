(function () {
  "use strict";

  var menuToggle = document.getElementById("menu-toggle");
  var navOverlay = document.getElementById("nav-overlay");
  var focusableSelector =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function openMenu() {
    if (navOverlay.classList.contains("is-open")) return;

    document.body.classList.add("menu-open");
    navOverlay.classList.add("is-open");
    navOverlay.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "メニューを閉じる");
    var firstLink = navOverlay.querySelector("a, button");
    if (firstLink) firstLink.focus();
  }

  function closeMenu(options) {
    if (!navOverlay.classList.contains("is-open")) return;

    var shouldRestoreFocus = !options || options.restoreFocus !== false;
    document.body.classList.remove("menu-open");
    navOverlay.classList.remove("is-open");
    navOverlay.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "メニューを開く");
    if (shouldRestoreFocus) menuToggle.focus();
  }

  function toggleMenu() {
    if (navOverlay.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuToggle.addEventListener("click", toggleMenu);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navOverlay.classList.contains("is-open")) {
      closeMenu();
    }

    if (e.key === "Tab" && navOverlay.classList.contains("is-open")) {
      var focusable = navOverlay.querySelectorAll(focusableSelector);
      if (!focusable.length) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      closeMenu({ restoreFocus: false });

      var headerHeight = document.querySelector(".site-header").offsetHeight;
      var top =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  navOverlay.addEventListener("click", function (e) {
    if (e.target === navOverlay || e.target.classList.contains("nav-overlay__bg")) {
      closeMenu();
    }
  });

  // Hero Carousel
  var heroImages = document.querySelectorAll("#hero-carousel .hero__image");
  if (heroImages.length > 1) {
    var currentIndex = 0;
    setInterval(function () {
      heroImages[currentIndex].classList.remove("is-active");
      currentIndex = (currentIndex + 1) % heroImages.length;
      heroImages[currentIndex].classList.add("is-active");
    }, 5000);
  }
})();
