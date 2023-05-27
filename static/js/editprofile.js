window.onload = async function () {
  const payload = localStorage.getItem("payload");
  const payload_parse = JSON.parse(payload);
  let token = localStorage.getItem("access");

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

  console.log(myprofile_response);
  const profile_image = document.getElementById("profileimage");
  profile_image.setAttribute("value", `${myprofile_response.profileimage}`);
  const profile_nickname = document.getElementById("nickname");
  profile_nickname.setAttribute("value", `${myprofile_response.nickname}`);
  const profile_email = document.getElementById("email");
  profile_email.setAttribute("value", `${myprofile_response.email}`);
  const profile_password = document.getElementById("password");
  profile_password.setAttribute("value", `${myprofile_response.password}`);
};

async function handleUpdateButton() {
  const payload = localStorage.getItem("payload");
  const payload_parse = JSON.parse(payload);
  let token = localStorage.getItem("access");
  console.log(payload_parse.user_id);

  const profileimage = document.getElementById("profileimage").value;
  console.log(profileimage);
  const nickname = document.getElementById("nickname").value;
  console.log(nickname);
  const email = document.getElementById("email").value;
  console.log(email);
  const password = document.getElementById("password").value;
  console.log(password);

  const my_profile_modify = await fetch(`${backend_base_url}/users/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      profileimage: profileimage,
      nickname: nickname,
      email: email,
      password: password,
    }),
  });
  window.location.replace(`${frontend_base_url}/users/mypage.html`);
}
