const loadNews = () => {
  const newsContainer = document.getElementById('news-container');
  db.collection('news').get().then((querySnapshot) => {
    newsContainer.innerHTML = ''; 
    querySnapshot.forEach((doc) => {
      const news = doc.data();
      const newsDiv = document.createElement('div');
      newsDiv.classList.add('news-item');
      newsDiv.innerHTML = `
        <h3>${news.title}</h3>
        <p>${news.content}</p>
        <button onclick="showComments('${doc.id}')">عرض التعليقات</button>
        <div id="comments-${doc.id}" class="comments-section"></div>
        <textarea id="new-comment-${doc.id}" placeholder="اكتب تعليق..."></textarea>
        <button onclick="addComment('${doc.id}')">إضافة تعليق</button>
      `;
      newsContainer.appendChild(newsDiv);
    });
  });
};

const showComments = (newsId) => {
  const commentsSection = document.getElementById(`comments-${newsId}`);
  db.collection('news').doc(newsId).collection('comments').get().then((querySnapshot) => {
    commentsSection.innerHTML = ''; 
    querySnapshot.forEach((doc) => {
      const comment = doc.data();
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('comment');
      commentDiv.innerHTML = `<p>${comment.text}</p>`;
      commentsSection.appendChild(commentDiv);
    });
  });
};

const addComment = (newsId) => {
  const newCommentInput = document.getElementById(`new-comment-${newsId}`);
  const newComment = newCommentInput.value;

  if (newComment.trim() === '') {
    alert("يرجى كتابة تعليق قبل الإضافة");
    return;
  }

  db.collection('news').doc(newsId).collection('comments').add({
    text: newComment
  }).then(() => {
    alert("تم إضافة التعليق بنجاح!");
    newCommentInput.value = ''; 
    showComments(newsId); 
  }).catch((error) => {
    console.error("حدث خطأ أثناء إضافة التعليق: ", error);
  });
};

document.addEventListener('DOMContentLoaded', loadNews);