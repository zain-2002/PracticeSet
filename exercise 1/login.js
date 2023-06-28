// register form 
let createAccountBtn = document.getElementById('createAccount')
const showRegisterForm = () => {
  document.querySelector('.login').style.display = 'none';
  document.querySelector('.register').style.display = 'block';
}
createAccountBtn.addEventListener('click', showRegisterForm)


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth,  createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvrBoaDaXkmDZFEDyFI5MNI63dugzmPmY",
  authDomain: "project-1-7c0af.firebaseapp.com",
  projectId: "project-1-7c0af",
  storageBucket: "project-1-7c0af.appspot.com",
  messagingSenderId: "65951281326",
  appId: "1:65951281326:web:a93d2b2c350db8e77f7d3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
let registerBtn = document.getElementById('registerBtn')

function registration() {
  let firstName = document.getElementById('firstName').value
  let lastName = document.getElementById('lastName').value
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value
  let confirmPassword = document.getElementById('confirmPassword').value

  if (password === confirmPassword) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
  });  
  } else {
    document.getElementById('confirmPasswordError').innerText = 'Password and confirm password should be same'
  }
  
}

registerBtn.addEventListener('click', registration)