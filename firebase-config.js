// firebase-config.js

// إعداد Firebase
var firebaseConfig = {

  apiKey: "AIzaSyAYm33ORopfeFBW22gdnLU71Yq2W62UN58",
  authDomain: "spos-sport.firebaseapp.com",
  databaseURL: "https://spos-sport-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "spos-sport",
  storageBucket: "spos-sport.appspot.com",
  messagingSenderId: "755322200260",
  appId: "1:755322200260:web:b48a65bdb3528c5a28a991",
  measurementId: "G-ZKMWF7WKMD"

};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);

// تهيئة Firestore (إذا كنت تستخدمه)
var db = firebase.firestore();
