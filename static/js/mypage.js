const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("user_id");

// 창이 로드되면 마이 페이지 정보를 불러와서 넣어줌
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
  //피드
  const feed = document.getElementById("profile-feed");
  feed.setAttribute("href", "/view/feed.html");
  feed.innerText = "feed (Like/Follow)";
};
