// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS99hQFXjGe-lxdj1J1KxGF9AS-PZpemg",
  authDomain: "sposnews-321f7.firebaseapp.com",
  projectId: "sposnews-321f7",
  storageBucket: "sposnews-321f7.appspot.com",
  messagingSenderId: "85605938688",
  appId: "1:85605938688:web:f59b2f8bd190a9a56d4ae5",
  measurementId: "G-DDCGG6ZNK4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore reference
const db = firebase.firestore();
