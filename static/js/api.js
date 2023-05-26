const frontend_base_url = "http://127.0.0.1:5500";
const backend_base_url = "http://127.0.0.1:8000";
const no_image =
  "https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png";

// 특정 유저의 팔로잉, 팔로워 가져오기
async function getFollows(e) {
  const response = await fetch(`${backend_base_url}/users/follow/${e}/`);

  if (response.status == 200) {
    const response_json = await response.json();
    return response_json;
  } else {
    alert("불러오기 실패!");
  }
}

// 특정 유저의 프로필 정보 가져오기
async function getProfile(e) {
  const response = await fetch(`${backend_base_url}/users/profile/${e}/`);

  if (response.status == 200) {
    const response_json = await response.json();
    return response_json;
  } else {
    alert("불러오기 실패!");
  }
}
