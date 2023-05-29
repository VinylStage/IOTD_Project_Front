// 창이 로드되면 내 프로필 정보를 불러옴
window.onload = async function () {
  const my_profile_edit = await fetch(
    `${backend_base_url}/users/profile/${payload_parse.user_id}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const myprofile_response = await my_profile_edit.json();

  const profile_nickname = document.getElementById("nickname");
  profile_nickname.setAttribute("value", `${myprofile_response.nickname}`);
  const profile_email = document.getElementById("email");
  profile_email.setAttribute("value", `${myprofile_response.email}`);
  const profile_fashion = document.getElementsByClassName("Categories")[0];
  profile_fashion.value = myprofile_response.fashion;
};

async function handleUpdateButton() {
  const profileimage = document.getElementById("profileimage").files[0];
  const nickname = document.getElementById("nickname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const fashion = document.getElementsByClassName("Categories")[0].value;

  const formdata = new FormData();

  formdata.append("nickname", nickname);
  formdata.append("email", email);
  if (password) {
    formdata.append("password", password);
  }
  if (profileimage) {
    formdata.append("profile_img", profileimage || "");
  }
  formdata.append("fashion", fashion);

  const response = await fetch(
    `${backend_base_url}/users/profile/${payload_parse.user_id}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: formdata,
    }
  );
  if (response.status == 200) {
    alert("프로필 업데이트 완료!");
    userProfile(payload_parse.user_id);
  }
}
