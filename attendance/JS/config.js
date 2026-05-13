const firebaseConfig = {
  apiKey: "AIzaSyAXIMFknOteCuZhUSKTRZ0E47-zoEDYlvs",
  authDomain: "attendance-43576.firebaseapp.com",
  databaseURL: "https://attendance-43576-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "attendance-43576",
  storageBucket: "attendance-43576.firebasestorage.app",
  messagingSenderId: "1039686457340",
  appId: "1:1039686457340:web:a0a5ff26c199f2596e0479",
  measurementId: "G-TC9RJST6F2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
console.log("");