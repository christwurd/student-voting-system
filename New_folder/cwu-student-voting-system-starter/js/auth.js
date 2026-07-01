document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#loginForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const identifier = document.querySelector("#identifier").value.trim();
    const password = document.querySelector("#password").value.trim();

    // Validate input fields
    if (!identifier || !password) {
      showToast("Please enter your student ID/email and password.");
      return;
    }

    // Check credentials (demo mode)
    const validUser = ["21200854", "student@cwu.edu", "admin@cwu.edu"].includes(identifier);
    const validPassword = password === "password";

    if (!validUser || !validPassword) {
      showToast("Invalid login details. Try demo password: password");
      return;
    }

    // Store login info
    localStorage.setItem("cwu_logged_in", "true");
    localStorage.setItem("cwu_user", identifier.includes("admin") ? "admin" : "student");

    showToast("Login successful. Redirecting...");

    setTimeout(() => {
      location.href = identifier.includes("admin") ? "admin.html" : "dashboard.html";
    }, 800);
  });
});