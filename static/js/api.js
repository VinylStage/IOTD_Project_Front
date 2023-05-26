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

// 로그인
async function handleLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch(`${backend_base_url}/users/login/`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  return response;
}

// 로그인 상태에서 로그인, 회원가입 페이지 접속 시 홈으로 이동하는 함수
function checkLogin() {
  const payload = localStorage.getItem("payload");
  if (payload) {
    window.location.replace(`${frontend_base_url}/`);
  }
}

// 로그아웃
function handleLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");
  window.location.replace(`${frontend_base_url}/`);
}

// 회원가입
async function handleSignin() {
  const nickname = document.getElementById("nickname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordCheck = document.getElementById("PasswordCheck").value;

  const response = await fetch(`${backend_base_url}/users/signup/`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      nickname: nickname,
      email: email,
      password: password,
      PasswordCheck: passwordCheck,
    }),
  });

  return response;

