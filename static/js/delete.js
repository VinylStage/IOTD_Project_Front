// 회원 삭제 기능
function handleDelete() {
  const sureValue = document.getElementById("sure-box").value;
  if (sureValue.toLowerCase() === "yes") {
    deleteUser();
  } else {
    alert("yes 또는 Yes를 입력해야 탈퇴가 가능합니다.");
    window.location.reload();
  }
}
