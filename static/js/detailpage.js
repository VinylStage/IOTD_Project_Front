async function loadArticles() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get("article_id");
    
    const payload = JSON.parse(localStorage.getItem("payload"));
    console.log(payload.nickname)
    if (payload) {
        articlewriter = payload.nickname
        console.log(articlewriter)
    }
    else {
        articlewriter = null
    }

    const article = await getArticle(articleId);
    console.log(article)

    const articleTitle = document.getElementById("title")
    const articleNumber = document.getElementById("number")
    const articleWriter = document.getElementById("writer")
    const articleCreateTime = document.getElementById("createtime")
    const articleLike = document.getElementById("likes")
    const articleContent = document.getElementById("content")
    const articleImg = document.getElementById("image")
    const writeImg = document.createElement("img")
    writeImg.setAttribute("src", `${backend_base_url}${article.image}`)
    writeImg.setAttribute("style", "width: 50%;")
    articleImg.appendChild(writeImg)

    articleTitle.innerHTML = article.title
    articleNumber.innerHTML = article.id
    articleWriter.innerHTML = article.user
    articleCreateTime.innerHTML = article.created_at.split("T")[0]
    articleLike.innerHTML = article.likes.length
    articleContent.innerHTML = article.content

    const editButton = document.getElementById("editbutton")
    const deleteButton = document.getElementById("deletebutton")

    if (article.user == articlewriter) {
        editButton.style.display = "block";
        deleteButton.style.display = "block";
    } else {
        editButton.style.display = "none";
        deleteButton.style.display = "none";
    }

}

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get("article_id");

    const article = await getArticle(articleId);

    await loadArticles(articleId);
}
