import "./index.html";
import "./index.scss";
import "./js/swipers";
import JustValidate from "just-validate";
import IMask from "imask";

let validation = new JustValidate("form");

const element = document.getElementById("tel");
const maskOptions = {
  mask: "+{38} (000) 000 00 00",
  lazy: true,
  placeholder: "+38 (___) ___ __ __",
};
const mask = IMask(element, maskOptions);

element.addEventListener("focus", () => {
  mask.updateOptions({ lazy: false });
});

element.addEventListener("blur", () => {
  if (!element.value || element.value.includes("_")) {
    mask.updateOptions({ lazy: true });
  }
});

validation
  .addField("#name", [
    {
      rule: "required",
      errorMessage: "Введіть ім'я!",
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Мінімум 2 символи!",
    },
  ])
  .addField("#tel", [
    {
      rule: "required",
      errorMessage: "Введіть номер телефону!",
    },
    {
      validator: (value) => {
        const digits = value.replace(/\D/g, "");
        return digits.length === 12;
      },
      errorMessage: "Виберіть номер телефону повністю!",
    },
  ])
  .addField("#products", [
    {
      rule: "required",
      errorMessage: "Виберіть продукт!",
    },
  ])
  .addField("#message", [
    {
      rule: "required",
      errorMessage: "Введіть ваш коментар!",
    },
  ])
  .onSuccess((event) => {
    event.preventDefault();
    sendEmail();
  });

function sendEmail() {
  let params = {
    name: document.getElementById("name").value,
    tel: document.getElementById("tel").value,
    product: document.getElementById("products").value,
    message: document.getElementById("message").value,
  };

  emailjs.send("service_60unl82", "template_3ju81yi", params).then(function () {
    let successMessage = document.querySelector(".success-message");
    successMessage.classList.add("_active");
    document.getElementById("name").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("products").value = "";
    document.getElementById("message").value = "";
    setTimeout(() => {
      successMessage.classList.remove("_active");
    }, 5000);
  });
}

let iconMenu = document.querySelector(".icon-menu__body");
iconMenu.addEventListener("click", function (e) {
  let menu = document.querySelector(".icon-menu__menu");
  let body = document.querySelector("body");
  menu.classList.toggle("_active");
  body.classList.toggle("_lock");
  iconMenu.classList.toggle("_active");
  e.preventDefault();
});

document.addEventListener("click", function (e) {
  let menu = document.querySelector(".icon-menu__menu");
  let body = document.querySelector("body");
  if (
    e.target.classList.contains("im-nav__item") &&
    iconMenu.classList.contains("_active")
  ) {
    menu.classList.remove("_active");
    body.classList.remove("_lock");
    iconMenu.classList.remove("_active");
  }
});

const sweetsMenu = document.querySelector(".sweets");
sweetsMenu.addEventListener("click", function (e) {
  let sweetsMenuBody = document.querySelector(".sweets__menu-body");
  let sweetsArrow = document.querySelector(".sweets__arrow");
  sweetsMenuBody.classList.toggle("_active");
  sweetsArrow.classList.toggle("_active");
  sweetsMenu.classList.toggle("_no-hover");
});

document.addEventListener("click", function (e) {
  let sweetsMenuBody = document.querySelector(".sweets__menu-body");
  let sweetsArrow = document.querySelector(".sweets__arrow");
  if (
    sweetsMenuBody.classList.contains("_active") &&
    !sweetsMenu.contains(e.target)
  ) {
    sweetsMenuBody.classList.remove("_active");
    sweetsArrow.classList.remove("_active");
    sweetsMenu.classList.remove("_no-hover");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const headerElement = document.querySelector(".header");

  function handleScroll() {
    if (window.scrollY > 50) {
      headerElement.classList.add("_scroll");
    } else {
      headerElement.classList.remove("_scroll");
    }
  }

  handleScroll();
  window.addEventListener("scroll", handleScroll);
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = [
    {
      section: document.querySelector(".product-card"),
      menuItem: document.querySelector(".menu__item_product-card"),
    },
    {
      section: document.querySelector(".comments-slider"),
      menuItem: document.querySelector(".menu__item_comments"),
    },
    {
      section: document.querySelector(".steps"),
      menuItem: document.querySelector(".menu__item_steps"),
    },
  ];

  function checkScroll() {
    sections.forEach(({ section, menuItem }) => {
      if (!section || !menuItem) return;

      const rect = section.getBoundingClientRect();

      if (rect.top <= 0 && rect.bottom > 0) {
        menuItem.classList.add("_active");
      } else {
        menuItem.classList.remove("_active");
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
});

//
const goLinks = document.querySelectorAll(".go_link[data-goto]");
if (goLinks.length > 0) {
  goLinks.forEach((goLink) => {
    goLink.addEventListener("click", onGoLinkClick);
  });

  function onGoLinkClick(e) {
    const goLink = e.target;
    if (goLink.dataset.goto && document.querySelector(goLink.dataset.goto)) {
      const gotoBlock = document.querySelector(goLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top + pageYOffset + 1;

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}

//
document.addEventListener("DOMContentLoaded", function () {
  function onEntry(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("_show");
        observer.unobserve(entry.target);
      }
    });
  }

  let options = {
    threshold: 0.1,
  };

  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll(".show-anim");

  elements.forEach((el) => observer.observe(el));
});

function updateMenuPosition() {
  const sweetsElement = document.querySelector(".sweets");
  const menuBodyElement = document.querySelector(".sweets__menu-body");

  if (sweetsElement && menuBodyElement) {
    const rect = sweetsElement.getBoundingClientRect();
    const leftOffset = rect.left + window.scrollX - 10;

    menuBodyElement.style.left = `${leftOffset}px`;
  }
}

window.addEventListener("load", updateMenuPosition);
window.addEventListener("resize", updateMenuPosition);
