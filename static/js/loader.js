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



function articleList(articles, article_list){
  
  articles.forEach(article => {
    // const newDiv = document.createElement("div");
    // newDiv.setAttribute("class", "post-box")
    // newDiv.setAttribute("onclick", `articleDetail(${article.id})`)

    // const articleImage = document.createElement("img")
    // if (article.image) {
    //   articleImage.setAttribute("src", `${backend_base_url}${article.image}`)
    // } else {
    //   articleImage.setAttribute("src", "https://cdn11.bigcommerce.com/s-1812kprzl2/images/stencil/original/products/426/5082/no-image__12882.1665668288.jpg?c=2")
    // }
    // newDiv.appendChild(articleImage)

    // const info = document.createElement("div")
    // info.setAttribute("class","post-info")
    // newDiv.appendChild(info)

    // const profile = document.createElement("div")
    // profile.setAttribute("class","post-profile")
    // info.appendChild(profile)

    // const profileDiv = document.createElement("div")
    // profileDiv.setAttribute("class","post-img")
    // profile.appendChild(profileDiv)

    // const profileImage = document.createElement("img")
    // profileImage.setAttribute("src","/static/img/mymymy.png")
    // profileDiv.appendChild(profileImage)

    // const writer = document.createElement("h3")
    // writer.innerHTML = `${article.user}`
    // profile.appendChild(writer)

    // const like = document.createElement("div")
    // like.setAttribute("class","likes")
    // info.appendChild(like)

    // const heart = document.createElement("i")
    // heart.setAttribute("class","ri-heart-3-fill")
    // like.appendChild(heart)

    // const bookmark = document.createElement("i")
    // bookmark.setAttribute("class","ri-bookmark-fill")
    // like.appendChild(bookmark)
    // article_list.appendChild(newDiv)

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
    </div>`)
    }
    else {
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
    </div>`)
    }
})
}

function articleDetail(article_id) {
  window.location.href = `${frontend_base_url}/view/detailpage.html?article_id=${article_id}`
}