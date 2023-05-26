async function injectHeader() {
  fetch("/nav/header.html")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.querySelector("header").innerHTML = data;
    });

  let navbarHtml = await fetch("/nav/header.html");
  let data = await navbarHtml.text();
  document.querySelector("header").innerHTML = data;
}

async function injectFooter() {
  fetch("/nav/footer.html")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.querySelector("footer").innerHTML = data;
    });

  let navbarHtml = await fetch("/nav/footer.html");
  let data = await navbarHtml.text();
  document.querySelector("footer").innerHTML = data;
}

injectHeader();
injectFooter();

function articleList(articles, article_list) {
  articles.forEach((article) => {
    if (article.image) {
      article_list.insertAdjacentHTML(
        "beforeend",
        `<div class="post-box" onclick="articleDetail(${article.id})">
  
      <img src="${backend_base_url}${article.image}" alt="" />
  
      <div class="post-info">
        <div class="post-profile">
          <div class="post-img">
            <img src="/static/img/mymymy.png" alt="" />
          </div>
          <h3>${article.user}</h3>
        </div>
        <div class="likes">
          <i class="ri-heart-3-fill" ></i>
          <i class="ri-bookmark-fill"></i>
        </div>
      </div>
    </div>`
      );
    } else {
      article_list.insertAdjacentHTML(
        "beforeend",
        `<div class="post-box" onclick="articleDetail(${article.id})">
  
      <img src="https://cdn11.bigcommerce.com/s-1812kprzl2/images/stencil/original/products/426/5082/no-image__12882.1665668288.jpg?c=2" alt="" />
  
      <div class="post-info">
        <div class="post-profile">
          <div class="post-img">
            <img src="/static/img/mymymy.png" alt="" />
          </div>
          <h3>${article.user}</h3>
        </div>
        <div class="likes">
          <i class="ri-heart-3-fill"></i>
          <i class="ri-bookmark-fill"></i>
        </div>
      </div>
    </div>`
      );
    }
  });
}

function articleDetail(article_id) {
  window.location.href = `${frontend_base_url}/view/detailpage.html?article_id=${article_id}`;
}

function userProfile(user_id) {
  window.location.href = `${frontend_base_url}/users/mypage.html?user_id=${user_id}`;
}

function moveFollow(user_id) {
  window.location.href = `${frontend_base_url}/users/follow.html?user_id=${user_id}`;
}

function profileEdit() {
  window.location.href = `${frontend_base_url}/users/editprofile.html`;
}
