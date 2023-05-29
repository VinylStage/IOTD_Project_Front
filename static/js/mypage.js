const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("user_id");

window.onload = async function () {
  // 로그인 한 경우 edit 띄워주기
  if (payload_parse.user_id == userId) {
    document.getElementsByClassName(
      "feed-text"
    )[0].innerHTML = `<h2><a onclick="profileEdit()">Edit</a></h2>`;
  }

  // 유저의 프로필을 받아옴
  // 이후 쿼리문에서 받아올 수 있게 수정
  const profile = await getProfile(userId);
  console.log(profile);

  //   닉네임
  document.getElementById("profile-nickname").innerText = profile.nickname;
  //   프로필 이미지
  let profileImg = `${no_image}`;
  if (profile.profile_img) {
    profileImg = `${backend_base_url}${profile.profile_img}`;
  }
  document.getElementById("profile-img").setAttribute("src", `${profileImg}`);

  //   패션
  if (profile.fashion) {
    document.getElementById(
      "profile-fashion"
    ).innerText = `Fashion : ${profile.fashion}`;
  } else {
    document.getElementById("profile-fashion").innerText = `Fashion : None`;
  }

  // 팔로워
  const follower = document.getElementById("profile-follower");
  follower.innerText = `Follower ${profile.followers.length}`;
  follower.setAttribute("onclick", `moveFollow(${userId})`);
  // 팔로잉
  const following = document.getElementById("profile-following");
  following.innerText = `Following ${profile.followings.length}`;
  following.setAttribute("onclick", `moveFollow(${userId})`);

  const feed = document.getElementById("profile-feed")
  feed.setAttribute("href", "/view/feed.html")
  feed.innerText = "feed (Like/Follow)"

  // 유저 게시글 부분
  // const postBox = document.getElementsByClassName("main-posts")[0];
  // postBox.innerHTML = "";
  // console.log(profile);
  // if (profile.articles) {
  //   profile.articles.forEach((article) => {
  //     let articleImg = `${no_image}`;
  //     if (article.image) {
  //       articleImg = `${backend_base_url}${article.image}`;
  //     }
  //     postBox.insertAdjacentHTML(
  //       "beforeend",
  //       `<div class="post-box" onclick="articleDetail(${article.id})">
  //   <img src="${articleImg}" alt="" />

  //   <div class="post-info">
  //     <div class="post-profile">
  //       <div class="post-img">
  //         <img src="${profileImg}" alt="" />
  //       </div>
  //       <h3>${profile.nickname}</h3>
  //     </div>
  //     <!-- like, bookmark -->
  //     <div class="likes">
  //       <i class="ri-heart-3-fill"></i>
  //       <i class="ri-bookmark-fill"></i>
  //     </div>
  //   </div>
  // </div>`
  //     );
  //   });
  // } else {
  //   postBox.innerHTML = "No articles available";
  // }
};
