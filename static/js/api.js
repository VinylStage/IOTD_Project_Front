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

// 팔로우, 좋아요 피드 들고오기
async function getFeed(e) {
  let link = `${backend_base_url}/users/myfeed/`;
  if (e.id == "like-btn") {
    link = `${backend_base_url}/users/myfeed/like/`;
  }
  const response = await fetch(`${link}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
  });

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

async function getAllArticles() {
  const response = await fetch(`${backend_base_url}/`);

  if (response.status == 200) {
    const response_json = await response.json();
    console.log(response_json);
    return response_json;
  } else {
    alert("불러오는 데 실패했습니다");
  }
}

// 유저 정보 조회
async function getUser() {
  const payload = localStorage.getItem("payload");
  const payload_parse = JSON.parse(payload);
  let token = localStorage.getItem("access");

  const response = await fetch(
    `${backend_base_url}/users/${payload_parse.user_id}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  if (response.status == 200) {
    response_json = await response.json();
    return response_json;
  } else {
    alert(response.statusText);
  }
}

// 상세 게시글 조회
async function getArticle(articleId) {
  const response = await fetch(`${backend_base_url}/${articleId}/`);
  console.log(response);
  if (response.status == 200) {
    response_json = await response.json();
    return response_json;
  } else {
    alert(response.statusText);
  }
}

// 로그인 상태에서 로그인, 회원가입 페이지 접속 시 홈으로 이동하는 함수
function checkLogin() {
  const payload = localStorage.getItem("payload");
  if (payload) {
    window.location.replace(`${frontend_base_url}/`);
  }
}

// 비로그인 상태에서 글쓰기 페이지 접속 시 홈으로 이동하는 함수
function checkNotLogin() {
  const payload = localStorage.getItem("payload");
  if (payload == null) {
    alert("로그인이 필요합니다.");
    window.location.replace(`${frontend_base_url}/`);
  }
}

async function createArticle(url) {
  const urlParams = new URLSearchParams(url);
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const image = document.getElementById("addimage").files[0];

  const formdata = new FormData();

  formdata.append("title", title);
  formdata.append("content", content);
  formdata.append("image", image || "");

  let token = localStorage.getItem("access");

  const response = await fetch(`${backend_base_url}/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formdata,
  });

  if (response.status == 200) {
    alert("게시글 작성 완료!");
    window.location.replace(`${frontend_base_url}/`);
  } else {
    alert("제목, 내용은 필수항목입니다!");
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
}
