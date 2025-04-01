// Ensure EmailJS SDK is initialized
emailjs.init("h2khQ4w9-tYJDzJcm"); // Replace with your actual EmailJS user ID

// Import Firebase modules (Ensure script is loaded as a module)
import { auth } from "/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Function to open order popup with authentication and email verification check
function openOrderPopup(itemName, price) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (!user.emailVerified) {
        alert("Please verify your email before placing an order.");
        return;
      }
      
      document.getElementById("selectedItem").textContent = `${itemName} - ₱${price.toFixed(2)}`;
      
      const nameField = document.getElementById("customerName");
      const emailField = document.getElementById("customerEmail");
      
      nameField.value = user.displayName || "Unknown User";
      emailField.value = user.email || "No Email";
      
      // Make fields read-only
      nameField.readOnly = true;
      emailField.readOnly = true;
      
      document.getElementById("orderPopup").style.display = "block";
    } else {
      alert("You need to log in to place an order.");
      window.location.href = "login.html"; // Redirect to login page
    }
  });
}

// Function to close order popup
function closeOrderPopup() {
  document.getElementById("orderPopup").style.display = "none";
}

// Function to send order via EmailJS
function sendOrder() {
  const item = document.getElementById("selectedItem").textContent;
  const quantity = parseInt(document.getElementById("quantity").value);
  const price = parseFloat(item.split('₱')[1].trim());
  const name = document.getElementById("customerName").value.trim();
  const email = document.getElementById("customerEmail").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("deliveryLocation").value.trim();
  const errorMessage = document.getElementById("errorMessage");
  
  // Clear previous error messages
  errorMessage.style.display = "none";
  errorMessage.textContent = "";
  
  // Validation
  if (!phone || !address || isNaN(quantity) || quantity <= 0) {
    errorMessage.textContent = "Please fill in all fields correctly!";
    errorMessage.style.display = "block";
    return;
  }
  
  // Prepare the template data for EmailJS
  const templateParams = {
    order_item: item,
    order_quantity: quantity,
    order_price: `₱${(price * quantity).toFixed(2)}`,
    customer_name: name,
    customer_email: email,
    customer_phone: phone,
    delivery_address: address
  };
  
  // Send order details via EmailJS
  emailjs.send("service_oxfkq39", "template_vgiozwv", templateParams)
    .then(response => {
      console.log("Order sent successfully", response);
      alert("Order placed successfully!");
      closeOrderPopup();
    })
    .catch(error => {
      console.error("Error sending order", error);
      alert("Failed to send order. Please try again later.");
    });
}

// Attach functions to the global window object for HTML access
window.openOrderPopup = openOrderPopup;
window.closeOrderPopup = closeOrderPopup;
window.sendOrder = sendOrder;