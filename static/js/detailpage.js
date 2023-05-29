// 게시글 불러오기
async function loadArticles() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("article_id");

  if (payload_parse) {
    articlewriter = payload_parse.nickname;
  } else {
    articlewriter = null;
  }

  const article = await getArticle(articleId);

  const articleTitle = document.getElementById("title");
  const articleNumber = document.getElementById("number");
  const articleWriter = document.getElementById("writer");
  const articleCreateTime = document.getElementById("createtime");
  const articleLike = document.getElementById("likes");
  const articleContent = document.getElementById("content");
  const articleImg = document.getElementById("image");
  const writeImg = document.createElement("img");

  articleTitle.innerHTML = article.title;
  articleNumber.innerHTML = article.id;
  articleWriter.innerHTML = article.user;
  articleCreateTime.innerHTML = article.created_at.split("T")[0];
  articleLike.innerHTML = article.likes.length;
  articleContent.innerHTML = article.content;

  if (article.image) {
    writeImg.setAttribute("src", `${backend_base_url}${article.image}`);
    writeImg.setAttribute("style", "width: 50%;");
  } else {
    writeImg.setAttribute(
      "src",
      "https://cdn11.bigcommerce.com/s-1812kprzl2/images/stencil/original/products/426/5082/no-image__12882.1665668288.jpg?c=2"
    );
    writeImg.setAttribute("style", "width: 50%;");
  }
  articleImg.appendChild(writeImg);

  const editButton = document.getElementById("editbutton");
  const deleteButton = document.getElementById("deletebutton");

  if (article.user == articlewriter) {
    editButton.style.display = "block";
    deleteButton.style.display = "block";
  } else {
    editButton.style.display = "none";
    deleteButton.style.display = "none";
  }
}

// 글 수정 페이지로 이동
function updatebutton(url) {
  const urlParams = new URLSearchParams(url);
  const article_id = urlParams.get("article_id");
  window.location.href = `${frontend_base_url}/view/write.html?article_id=${article_id}`;
}

// 댓글 작성
async function commentWrite() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("article_id");
  const commentValue = document.getElementById("commentvalue").value;

  const response = await fetch(`${backend_base_url}/${articleId}/comments/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      content: commentValue,
    }),
  });

  if (response.status == 201) {
    window.location.replace(
      `${frontend_base_url}/view/detailpage.html?article_id=${articleId}`
    );
  } else if (response.status == 401) {
    alert("로그인한 사용자만 댓글을 등록할 수 있습니다");
  }
}

// 댓글 로드
async function loadComment() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("article_id");

  const response = await fetch(`${backend_base_url}/${articleId}/comments/`);

  const response_json = await response.json();

  if (payload.parse) {
    commentWriter = payload_parse.nickname;
  } else {
    commentWriter = null;
  }

  const commentContainer = document.getElementById("comments-list");

  response_json.forEach((comment) => {
    let button = "";
    if (commentWriter == comment.user) {
      button = `
            <div class="bt_wrap">
                <a class="right" id="commentDelete" onclick="deleteComment(${comment.id})">삭제</a>
                <a class="left" id="commentUpdate" onclick="updateComment(${comment.id}, '${comment.content}')">수정</a>
            </div>
            `;
    }
    commentContainer.insertAdjacentHTML(
      "beforeend",
      `
            <form>
                <textarea placeholder="Add Yor Comment" id="commentvalue">${comment.content}</textarea>
                ${button}
            </form>
            `
    );
  });
}

// 창이 열리면 게시글, 댓글 상세 내용 불러오기
window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("article_id");

  await getArticle(articleId);
  await loadArticles(articleId);
  await loadComment();
};
