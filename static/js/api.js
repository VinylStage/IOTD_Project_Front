const frontend_base_url = "http://127.0.0.1:5500";
const backend_base_url = "http://127.0.0.1:8000";
const no_image =
  "https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png";

let payload = localStorage.getItem("payload");
let payload_parse = JSON.parse(payload);
let token = localStorage.getItem("access");

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
  console.log(e);
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

// 회원 탈퇴
async function deleteUser() {
  const response = await fetch(
    `${backend_base_url}/users/profile/${payload_parse.user_id}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    }
  );

  if (response.status == 204) {
    alert("회원 탈퇴에 성공했습니다.");
    handleLogout();
    window.location.replace(`${frontend_base_url}`);
  }
}

// 패스워드 변경 이메일 전송
async function changePassword() {
  const email = document.getElementById("email").value;

  const response = await fetch(`${backend_base_url}/users/password/`, {
    headers: {
      "content-type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      email: email,
    }),
  });

  if (response.status == 200) {
    alert("비밀번호 변경 이메일을 발송했습니다!");
    window.location.replace(`${frontend_base_url}/users/login.html`);
  } else {
    alert("이메일 발송에 실패했습니다.");
  }
}

// 전체 게시글 들고오기
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
  const response = await fetch(
    `${backend_base_url}/users/profile/${payload_parse.user_id}/`,
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

// 게시글 작성
async function createArticle() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const image = document.getElementById("image").files[0];

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

  if (response.status == 201) {
    alert("게시글 작성 완료!");
    window.location.replace(`${frontend_base_url}/`);
  } else {
    alert("제목, 내용은 필수항목입니다!");
  }
}

// 게시글 수정
async function updateArticle(url) {
  const urlParams = new URLSearchParams(url);
  const articleId = urlParams.get("article_id");

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const image = document.getElementById("image").files[0];

  const formdata = new FormData();

  formdata.append("title", title);
  formdata.append("content", content);
  formdata.append("image", image || "");

  let token = localStorage.getItem("access");

  const response = await fetch(`${backend_base_url}/${articleId}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formdata,
  });
  console.log(response);
  if (response.status == 200) {
    alert("게시글 수정 완료!");
    window.location.replace(
      `${frontend_base_url}/view/detailpage.html?article_id=${articleId}`
    );
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
  const fashion = document.getElementsByClassName("Categories").value;
  if (password == passwordCheck) {
    const response = await fetch(`${backend_base_url}/users/signup/`, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        nickname: nickname,
        email: email,
        password: password,
        fashion: fashion,
      }),
    });
    return response;
  } else {
    alert("비밀번호 체크가 일치하지 않습니다.");
  }
}

// 게시글 삭제
async function deleteArticle(url) {
  const urlParams = new URLSearchParams(url);
  const articleId = urlParams.get("article_id");

  let token = localStorage.getItem("access");
  const response = await fetch(`${backend_base_url}/${articleId}/`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  if (response.status == 204) {
    alert("게시글 삭제 완료!");
    window.location.replace(`${frontend_base_url}/`);
  }
}

// 댓글 수정
async function updateComment(commentId, Comment) {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("article_id");

  let newComment = prompt("수정할 댓글을 입력하세요.", Comment);

  if (newComment) {
    let token = localStorage.getItem("access");

    const response = await fetch(`${backend_base_url}/comments/${commentId}/`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify({
        content: newComment,
      }),
    });

    if (response.status == 200) {
      alert("댓글 수정이 완료되었습니다!");
      window.location.replace(
        `${frontend_base_url}/view/detailpage.html?article_id=${articleId}`
      );
    }
  } else {
    window.location.replace(
      `${frontend_base_url}/view/detailpage.html?article_id=${articleId}`
    );
  }
}

// 댓글 삭제
async function deleteComment(commentId) {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("article_id");

  let token = localStorage.getItem("access");
  const response = await fetch(`${backend_base_url}/comments/${commentId}/`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  if (response.status == 204) {
    alert("댓글 삭제 완료!");
    window.location.replace(
      `${frontend_base_url}/view/detailpage.html?article_id=${articleId}`
    );
  }
}

// 좋아요/좋아요 취소 기능
async function articleLike(article_id) {
  const response = await fetch(`${backend_base_url}/${article_id}/likes/`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
  })

  console.log(response)
  if (response.status == 200){
    document.getElementById(`likes(${article_id})`).setAttribute("style","color: red; display:flex;")
    document.getElementById(`nolikes(${article_id})`).setAttribute("style","display:none;")
  } else {
    document.getElementById(`likes(${article_id})`).setAttribute("style","color: red; display: none;")
    document.getElementById(`nolikes(${article_id})`).setAttribute("style","display: flex;")
  }
}

// 팔로우/언팔로우 기능
async function userFollow(article_id, user_id){
  const response = await fetch(`${backend_base_url}/users/follow/${user_id}/`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
  })

  console.log(response)
  if (response.status == 200) {
    document.getElementById(`unfollow(${article_id}-${user_id})`).setAttribute("style", "display: none;")
    document.getElementById(`follow(${article_id}-${user_id})`).setAttribute("style", "display:flex;")
  } else if (response.status == 204) {
    document.getElementById(`unfollow(${article_id}-${user_id})`).setAttribute("style", "display: flex;")
    document.getElementById(`follow(${article_id}-${user_id})`).setAttribute("style", "display: none;")
  } else {
    alert("자기 자신은 팔로우 할 수 없습니다!")
  }
  window.location.reload()
}
