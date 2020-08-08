const getArticle = (id) => {
  fetch(`https://my-brand-project.firebaseio.com/articles/${id}.json`)
    .then((res) => res.json())
    .then((data) => {
      const displayImage = (url) => {
        return url
          ? `<img class='image';
              src="${url}"
              alt="article_avatar"
            />`
          : '';
      };
      selector('.article-wrap').innerHTML = `
        <h1>${data.title}</h1>
        
        <p>
          ${displayImage(data.imageUrl)}
          ${data.body}
        </p>
        `;
    });
};

function updateAllList(id, photo, title, lastEdit, views) {
  const preveiwSection = document.createElement('div');
  preveiwSection.classList.add('preveiw-wrap');
  preveiwSection.setAttribute('id', `${id}`);
  preveiwSection.innerHTML = `
    ${displayImage(photo)}
    <div class="article-preveiw">
      <h3 class="title">${title}</h3>
      <div class="article-infos">
        <div class="last-edit">
          <i class="fas fa-edit"></i>
          <p>${lastEdit || '12-jul-202'}</p>
        </div>
        <div class="views">
          <i class="far fa-eye"></i>
          <p>${views}</p>
        </div>
      </div>
    </div>
  `;
  return preveiwSection;
}

const updatePreviewSection = () => {
  postRef.on('value', (snap) => {
    const articleIds = Object.keys(snap.val());
    articleIds.forEach((a) => {
      selector('.aside').append(
        updateAllList(
          a,
          snap.val()[a].imageUrl,
          snap.val()[a].title,
          snap.val()[a].lastEdit,
          snap.val()[a].views.number
        )
      );
    });
    document.querySelectorAll('.preveiw-wrap').forEach((element) => {
      element.addEventListener('click', singleArticleRedirection);
    });
  });
};

window.onload = () => {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get('id');
  getArticle(id);
  updatePreviewSection();
};