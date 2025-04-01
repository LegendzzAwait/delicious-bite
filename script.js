// Initialize EmailJS with your User ID
emailjs.init("xdc-f59toRwMm5io_"); // Replace with your actual User ID

// Function to handle logout (assuming you're using Firebase Authentication)
function logoutUser() {
  // Ensure `auth` is defined in your Firebase setup
  signOut(auth) // This assumes you have initialized Firebase Authentication properly
    .then(() => {
      alert("Successfully logged out!");
      location.reload(); // Reload the page after logging out
    })
    .catch((error) => {
      console.error("Error logging out:", error);
    });
}

// Optional: If you are testing or handling other events, you could add more functions here.