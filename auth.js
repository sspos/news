const auth = firebase.auth();

// نموذج إنشاء الحساب
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;

        // إضافة المستخدم إلى Firestore
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
}

// نموذج تسجيل الدخول
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;

        // استرجاع بيانات المستخدم من Firestore
        db.collection('users').doc(userId).get().then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            if (userData.isAdmin) {
              alert("مرحباً بك يا أدمن!");
              window.location.href = "admin.html"; // توجيه الأدمن إلى صفحة الإدارة
            } else {
              alert("تم تسجيل الدخول بنجاح!");
              window.location.href = "index.html"; // توجيه المستخدم العادي إلى الصفحة الرئيسية
            }
          } else {
            alert("لا يوجد بيانات لهذا المستخدم.");
          }
        });
      })
      .catch((error) => {
        alert("حدث خطأ أثناء تسجيل الدخول: " + error.message);
      });
}
