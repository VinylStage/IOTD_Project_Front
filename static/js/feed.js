let payload = localStorage.getItem("payload");
let payload_parse = JSON.parse(payload);

async function handleFeed(e) {
  const postWrap = document.getElementsByClassName("main-posts")[0];
  postWrap.innerHTML = "";

  const response = await getFeed(e);
  let feedCategory = response.feeds;
  if (e.id == "like-btn") {
    feedCategory = response.like_articles;
  }
  feedCategory.forEach((feed) => {
    let feedImg = `${no_image}`;
    if (feed.image) {
      feedImg = `${backend_base_url}${feed.image}`;
    }

    let profileImg = `${no_image}`;
    if (feed.profile_img) {
      profileImg = `${backend_base_url}${feed.profile_img}`;
    }

    postWrap.insertAdjacentHTML(
      "beforeend",
      `<div class="post-box" onclick="articleDetail(${feed.id})">
    <img src="${feedImg}" alt="" />

    <div class="post-info">
      <div class="post-profile">
        <div class="post-img">
          <img src="${profileImg}" alt="" />
        </div>
        <h3>${feed.nickname}</h3>
      </div>
      <!-- like, bookmark -->
      <div class="likes">
        <i class="ri-heart-3-fill"></i>
        <!-- <span>49.4k</span> -->
        <i class="ri-bookmark-fill"></i>
      </div>
    </div>
  </div>`
    );
  });
}

window.onload = function () {
  const feedBox = document.getElementById("follow-btn");
  handleFeed(feedBox);
};
