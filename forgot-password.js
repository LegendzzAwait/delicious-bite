import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", (event) => {
      event.preventDefault();
      
      const email = document.getElementById("resetEmail").value.trim();
      if (!email) {
        document.getElementById("reset-message").innerText = "Please enter a valid email.";
        return;
      }
      
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          document.getElementById("reset-message").innerText = "Password reset email sent! Check your inbox.";
        })
        .catch((error) => {
          document.getElementById("reset-message").innerText = "Error: " + error.message;
        });
    });
  }
});