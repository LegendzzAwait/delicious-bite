import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaCxCrlDkruILZ4_CqkhzUYnUpGt-LdQA",
  authDomain: "bite-456f3.firebaseapp.com",
  projectId: "bite-456f3",
  storageBucket: "bite-456f3.appspot.com",
  messagingSenderId: "682427279140",
  appId: "1:682427279140:web:9720354771be81c86b35b1",
  measurementId: "G-HL9YLMMD12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Debugging: Ensure Firebase initializes correctly
console.log("Firebase Initialized:", app.name);

// Check authentication status
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ User is logged in:", user.email);
  } else {
    console.log("❌ No user logged in.");
  }
});

// Export Firebase authentication
export { auth };