window.onload = async function loadArticles() {
    articles = await getAllArticles()
    const article_list = document.getElementById("article-list")
    articleList(articles, article_list)
}