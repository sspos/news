const newsForm = document.getElementById('news-form');
const loadingIndicator = document.getElementById('loading');

newsForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // إظهار مؤشر التحميل
  loadingIndicator.style.display = 'block';

  // التحقق من حالة تسجيل الدخول
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // التحقق مما إذا كان المستخدم أدمن
      db.collection('users').doc(user.uid).get().then((doc) => {
        if (!doc.exists || !doc.data().isAdmin) {
          alert("ليس لديك الصلاحية لدخول هذه الصفحة.");
          window.location.href = "index.html"; // إعادة توجيه المستخدمين العاديين إلى الصفحة الرئيسية
          loadingIndicator.style.display = 'none'; // إخفاء مؤشر التحميل
        } else {
          // إضافة الخبر إلى قاعدة البيانات
          const title = document.getElementById('title').value;
          const content = document.getElementById('content').value;

          db.collection('news').add({
            title: title,
            content: content,
            timestamp: firebase.firestore.FieldValue.serverTimestamp() // إضافة توقيت النشر
          }).then(() => {
            alert("تم نشر الخبر بنجاح!");
            newsForm.reset(); // تفريغ الحقول بعد نشر الخبر
            loadingIndicator.style.display = 'none'; // إخفاء مؤشر التحميل
          }).catch((error) => {
            alert("حدث خطأ أثناء نشر الخبر: " + error.message);
            loadingIndicator.style.display = 'none'; // إخفاء مؤشر التحميل
          });
        }
      }).catch((error) => {
        alert("حدث خطأ أثناء التحقق من المستخدم: " + error.message);
        loadingIndicator.style.display = 'none'; // إخفاء مؤشر التحميل
      });
    } else {
      alert("يجب عليك تسجيل الدخول.");
      window.location.href = "login.html"; // إعادة توجيه المستخدمين غير المسجلين إلى صفحة تسجيل الدخول
      loadingIndicator.style.display = 'none'; // إخفاء مؤشر التحميل
    }
  });
});
