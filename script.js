// Theme switch: updates the page theme and button label.
const themeToggle = document.querySelector("#themeToggle");
themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  themeToggle.textContent = isDark ? "☀ Light" : "☾ Theme";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
});

// Project filtering uses an array of buttons and DOM updates.
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const projectItems = [...document.querySelectorAll(".project-item")];
const filterStatus = document.querySelector("#filterStatus");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    projectItems.forEach((project) => {
      const shouldShow = filter === "all" || project.dataset.category === filter;
      project.classList.toggle("d-none", !shouldShow);
      if (shouldShow) visibleCount++;
    });
    filterStatus.textContent = `Showing ${visibleCount} project${visibleCount === 1 ? "" : "s"}`;
  });
});

// Client-side contact form validation. This demo does not submit data to a server.
const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");
const fields = [...contactForm.querySelectorAll("input, textarea")];

const isValidField = (field) => {
  if (field.id === "name") return field.value.trim().length >= 2;
  if (field.id === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
  if (field.id === "message") return field.value.trim().length >= 10;
  return field.checkValidity();
};

fields.forEach((field) => {
  field.addEventListener("input", () => {
    field.classList.toggle("is-invalid", !isValidField(field));
    field.classList.toggle("is-valid", isValidField(field) && field.value.trim() !== "");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let allValid = true;
  fields.forEach((field) => {
    const valid = isValidField(field);
    field.classList.toggle("is-invalid", !valid);
    field.classList.toggle("is-valid", valid);
    if (!valid) allValid = false;
  });
  if (allValid) {
    formMessage.textContent = "Your details are valid. This demo does not send the message.";
    formMessage.className = "mt-3 text-success fw-semibold";
  } else {
    formMessage.textContent = "Please correct the highlighted fields and try again.";
    formMessage.className = "mt-3 text-danger fw-semibold";
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
