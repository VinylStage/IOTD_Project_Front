async function handleFollows(e) {
  console.log("버튼");
  const listWrap = document.getElementById("list-wrap");
  listWrap.innerHTML = "";

  const follows = await getFollows(1);

  const followTitle = document.getElementById("follow-title");
  followTitle.innerText = `${follows.nickname}'s Followers List`;

  let users = follows.followers;
  if (e.id == "followings") {
    users = follows.followings;
    followTitle.innerText = `${follows.nickname}'s Followings List`;
  }
  users.forEach((user) => {
    let profileImg = `${no_image}`;
    if (user.profile_img) {
      profileImg = `${backend_base_url}${user.profile_img}`;
    }
    listWrap.insertAdjacentHTML(
      "beforeend",
      `<div class="list">
    <div class="imgBx">
      <img src="${profileImg}" alt="" class="character" />
    </div>
    <div class="content">
      <h4>${user.nickname}</h4>
      <!-- <p></p> -->
    </div>
    <div class="icon"><i class="ri-user-follow-fill"></i></div>
  </div>`
    );
  });
}

window.onload = async function () {
  const followerBox = document.getElementById("followers");
  handleFollows(followerBox);
};
