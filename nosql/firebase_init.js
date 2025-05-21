// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxALIKZePLcBlEKSvi0O-gDxVdBe2pDto",
  authDomain: "basededatospowergym.firebaseapp.com",
  projectId: "basededatospowergym",
  storageBucket: "basededatospowergym.firebasestorage.app",
  messagingSenderId: "576046501747",
  appId: "1:576046501747:web:12964e10d73ae31e50ff06"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };