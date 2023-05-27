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
  document.querySelector("header").innerHTML = data; //사용자님이 이거니?

  const payload = localStorage.getItem("payload");
  if (payload) {
    const payload_parse = JSON.parse(payload);

    const intro = document.getElementById("intro");
    intro.innerHTML = `${payload_parse.nickname}님`;

    document
      .getElementById("my-page")
      .setAttribute("onclick", `userProfile(${payload_parse.user_id})`);

    loginbutton.style.display = "none";
  } else {
    logoutbutton.style.display = "none";
    myprofilebutton.style.display = "none";
  }
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
    let articleImg = `${no_image}`;
    if (article.image) {
      articleImg = `${backend_base_url}${article.image}`;
    }

    let profileImg = `${no_image}`;
    if (article.profile_img) {
      profileImg = `${backend_base_url}${article.profile_img}`;
    }
    article_list.insertAdjacentHTML(
      "beforeend",
      `<div class="post-box">
      <img src="${articleImg}" onclick="articleDetail(${article.id})" alt="" />
      <div class="post-info">
        <div class="post-profile" onclick="userProfile(${article.user})">
          <div class="post-img">
            <img src="${profileImg}" alt="" />
          </div>
          <h3>${article.nickname}</h3>
        </div>
        <div class="likes">
          <i class="ri-heart-3-fill" ></i>
          <i class="ri-bookmark-fill"></i>
        </div>
      </div>
    </div>`
    );
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

function findPassword() {
  window.location.href = `${frontend_base_url}/users/password.html`;
}

function moveSignin() {
  window.location.href = `${frontend_base_url}/users/signup.html`;
}

function checkPassword() {
  window.location.href = `${frontend_base_url}/users/checkpassword.html`;
}
