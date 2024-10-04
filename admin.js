const newsForm = document.getElementById('news-form');
newsForm.addEventListener('submit', (e) => {
  e.preventDefault();



  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.collection('users').doc(user.uid).get().then((doc) => {
      if (!doc.exists || !doc.data().isAdmin) {
        alert("ليس لديك الصلاحية لدخول هذه الصفحة.");
        window.location.href = "index.html"; // إعادة توجيه المستخدمين العاديين إلى الصفحة الرئيسية
      }
    });
  } else {
    alert("يجب عليك تسجيل الدخول.");
    window.location.href = "login.html"; // إعادة توجيه المستخدمين غير المسجلين إلى صفحة تسجيل الدخول
  }
});
  
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  db.collection('news').add({
    title: title,
    content: content,
    timestamp: firebase.firestore.FieldValue.serverTimestamp() // إضافة توقيت النشر
  }).then(() => {
    alert("تم نشر الخبر بنجاح!");
    newsForm.reset(); // تفريغ الحقول بعد نشر الخبر
  }).catch((error) => {
    alert("حدث خطأ أثناء نشر الخبر: " + error.message);
  });
});
