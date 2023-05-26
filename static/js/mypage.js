window.onload = async function () {
  // 유저의 프로필을 받아옴
  // 이후 쿼리문에서 받아올 수 있게 수정
  const profile = await getProfile(1);
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
  document.getElementById(
    "profile-fashion"
  ).innerText = `Fashion : ${profile.fashion}`;
  // 팔로워
  document.getElementById(
    "profile-follower"
  ).innerText = `Follower ${profile.followers_count}`;
  // 팔로잉
  document.getElementById(
    "profile-following"
  ).innerText = `Following ${profile.followings_count}`;

  // 유저 게시글 부분
  const postBox = document.getElementsByClassName("main-posts")[0];
  postBox.innerHTML = "";
  profile.articles.forEach((article) => {
    let articleImg = `${no_image}`;
    if (article.img) {
      articleImg = `${backend_base_url}${user.profile_img}`;
    }
    postBox.insertAdjacentHTML(
      "beforeend",
      `<div class="post-box">
    <img src="${articleImg}" alt="" />

    <div class="post-info">
      <div class="post-profile">
        <div class="post-img">
          <img src="${profileImg}" alt="" />
        </div>
        <h3>${profile.nickname}</h3>
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
};
