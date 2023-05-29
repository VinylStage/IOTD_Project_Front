// 로그인 상태 확인
checkNotLogin();

window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("article_id");

  // 작성자만 수정하기 버튼이 뜨게 함
  if (articleId) {
    const exist_post = await getArticle(articleId);

    const updateTitle = document.getElementById("title");
    updateTitle.value = exist_post.title;

    const updateContent = document.getElementById("content");
    updateContent.value = exist_post.content;

    const createButton = document.getElementById("createbutton");
    createButton.style.display = "none";

    const writebutton = document.getElementById("writebtn");
    const updatebutton = document.createElement("a");
    updatebutton.setAttribute("class", "left");
    updatebutton.setAttribute(
      "onclick",
      `updateArticle(window.location.search)`
    );
    updatebutton.innerHTML = "수정하기";
    writebutton.appendChild(updatebutton);
  }
};
