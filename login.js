import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const forgotPasswordLink = document.getElementById("forgotPassword");
  
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      const auth = getAuth();
      
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Logged in as:", userCredential.user.email);
          window.location.href = "index.html";
        })
        .catch((error) => {
          let errorMessage = "Login failed. Please try again.";
          switch (error.code) {
            case "auth/wrong-password":
              errorMessage = "Incorrect password. Please check and try again.";
              break;
            case "auth/user-not-found":
              errorMessage = "No account found. Please sign up or check your email.";
              break;
            case "auth/invalid-email":
              errorMessage = "Invalid email format. Please enter a valid email.";
              break;
            case "auth/too-many-requests":
              errorMessage = "Too many attempts. Please try again later.";
              break;
          }
          document.getElementById("error-message").innerText = errorMessage;
        });
    });
  }
  
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", (event) => {
      event.preventDefault();
      const email = prompt("Enter your email to reset password:");
      if (email) {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
          .then(() => alert("Password reset email sent! Check your inbox."))
          .catch((error) => alert("Error: " + error.message));
      }
    });
  }
});