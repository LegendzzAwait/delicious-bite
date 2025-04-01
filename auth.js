import { auth } from "/firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const authButtons = document.getElementById("authButtons");
  const profileContainer = document.getElementById("profileContainer");
  
  // Monitor user authentication status
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("✅ User authenticated:", user.email);
      authButtons.style.display = "none"; // Hide login/register buttons
      profileContainer.style.display = "flex"; // Show profile/logout button
    } else {
      console.log("❌ No user authenticated.");
      authButtons.style.display = "flex";
      profileContainer.style.display = "none";
      
      // ❌ Removed the redirection to `login.html`
    }
  });
  
  // Logout function
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          alert("Logged out successfully!");
          location.reload(); // Reload the page instead of redirecting
        })
        .catch((error) => {
          console.error("Logout Error:", error);
        });
    });
  }
  
  // Redirect buttons
  if (loginButton) {
    loginButton.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
  if (registerButton) {
    registerButton.addEventListener("click", () => {
      window.location.href = "register.html";
    });
  }
});