const auth = firebase.auth();

const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("تم إنشاء الحساب بنجاح!");
      window.location.href = "index.html"; // إعادة توجيه المستخدم إلى الصفحة الرئيسية بعد إنشاء الحساب
    })
    .catch((error) => {
      alert("حدث خطأ أثناء إنشاء الحساب: " + error.message);
    });
});

// نموذج تسجيل الدخول
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("تم تسجيل الدخول بنجاح!");
      window.location.href = "index.html"; // إعادة توجيه المستخدم إلى الصفحة الرئيسية بعد تسجيل الدخول
    })
    .catch((error) => {
      alert("حدث خطأ أثناء تسجيل الدخول: " + error.message);
    });
});
