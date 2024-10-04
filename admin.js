const newsForm = document.getElementById('news-form');
newsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
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
