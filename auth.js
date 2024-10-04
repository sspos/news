const auth = firebase.auth();

const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const userId = userCredential.user.uid;
      
      // افتراضياً، ليس كل مستخدم أدمن، يتم إضافة المستخدم إلى Firestore
      db.collection('users').doc(userId).set({
        email: email,
        isAdmin: false  // نبدأ بالحقل الافتراضي كمستخدم عادي
      }).then(() => {
        alert("تم إنشاء الحساب بنجاح!");
        window.location.href = "index.html"; // إعادة التوجيه للصفحة الرئيسية
      });
    })
    .catch((error) => {
      alert("حدث خطأ أثناء إنشاء الحساب: " + error.message);
    });
});
