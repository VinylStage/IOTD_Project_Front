

window.onload = async function loadArticles() {
  articles = await getAllArticles();
  follows = await getFollows(payload_parse.user_id)
  const article_list = document.getElementById("article-list");
  articleList(articles, article_list, follows);
};
