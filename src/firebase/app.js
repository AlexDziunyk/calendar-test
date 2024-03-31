// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA42tOeKtDszY2pEzFzQpjVm6dfACZBfxE",
  authDomain: "chronos-80fdf.firebaseapp.com",
  projectId: "chronos-80fdf",
  storageBucket: "chronos-80fdf.appspot.com",
  messagingSenderId: "47619394989",
  appId: "1:47619394989:web:d10ec348646d26d8956524"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const googleAuthProvider = new GoogleAuthProvider();
