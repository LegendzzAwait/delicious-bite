import { auth } from "/firebase.js"; // Ensure the correct path
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorElement = document.getElementById("registerError");
  
  // Clear previous errors
  errorElement.style.display = "none";
  errorElement.textContent = "";
  
  // Validate inputs
  if (!firstName || !lastName) {
    showError("Please enter your first and last name.");
    return;
  }
  
  if (password !== confirmPassword) {
    showError("Passwords do not match.");
    return;
  }
  
  // Create user with email & password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      
      // Update user profile with first and last name
      return updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      }).then(() => {
        // Send email verification
        return sendEmailVerification(user);
      }).then(() => {
        alert("Registration successful! A verification email has been sent. Please verify your email before logging in.");
        window.location.href = "login.html"; // Redirect to login page
      });
    })
    .catch((error) => {
      let errorMessage = "Registration failed. Please try again.";
      
      // Custom error messages
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered. Please log in instead.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format. Please enter a valid email.";
          break;
        case "auth/weak-password":
          errorMessage = "Password must be at least 6 characters.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please try again later.";
          break;
      }
      
      showError(errorMessage);
    });
});

// Function to show error messages
function showError(message) {
  const errorElement = document.getElementById("registerError");
  if (!errorElement) {
    console.error("Error element not found in the DOM.");
    return;
  }
  errorElement.textContent = message;
  errorElement.style.display = "block"; // Show error message
}