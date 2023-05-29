// 창이 로드되면 전체 게시글 불러오기
window.onload = async function loadArticles() {
  articles = await getAllArticles();
  if (payload) {
    follows = await getFollows(payload_parse.user_id);
    const article_list = document.getElementById("article-list");
    articleList(articles, article_list, follows);
  } else {
    const article_list = document.getElementById("article-list");
    articleList(articles, article_list);
  }
};
