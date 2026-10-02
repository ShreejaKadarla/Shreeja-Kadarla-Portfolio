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


// Contact Form Validation
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formStatus = document.getElementById("formMessage");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Clear previous messages
        formStatus.textContent = "";
        formStatus.className = "";

        // Reset validation styles
        [nameInput, emailInput, messageInput].forEach(input => {
            input.classList.remove("is-valid", "is-invalid");
            const feedback = input.parentElement.querySelector(".invalid-feedback");
            if (feedback) feedback.textContent = "";
        });

        let isValid = true;

        // Validate name
        if (!nameInput.value.trim()) {
            showError(nameInput, "Please enter your name.");
            isValid = false;
        } else {
            nameInput.classList.add("is-valid");
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailInput.value.trim()) {
            showError(emailInput, "Please enter your email address.");
            isValid = false;
        } else if (!emailPattern.test(emailInput.value.trim())) {
            showError(emailInput, "Please enter a valid email address.");
            isValid = false;
        } else {
            emailInput.classList.add("is-valid");
        }

        // Validate message
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, "Please enter a message of at least 10 characters.");
            isValid = false;
        } else {
            messageInput.classList.add("is-valid");
        }

        // Display final result
        if (isValid) {
            formStatus.textContent =
                "Your details are valid! This demo does not send the message.";
            formStatus.className = "text-success mt-3";
        } else {
            formStatus.textContent =
                "Please correct the errors above and try again.";
            formStatus.className = "text-danger mt-3";
        }
    });

    function showError(input, message) {
        input.classList.add("is-invalid");
        const feedback = input.parentElement.querySelector(".invalid-feedback");
        if (feedback) {
            feedback.textContent = message;
        }
    }

    // Clear old status when the user edits a field
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener("input", function () {
            formStatus.textContent = "";
            formStatus.className = "";

            input.classList.remove("is-valid", "is-invalid");
            const feedback = input.parentElement.querySelector(".invalid-feedback");
            if (feedback) feedback.textContent = "";
        });
    });
}