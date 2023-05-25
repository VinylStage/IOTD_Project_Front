async function injectHeader() {
  fetch("/nav/header.html")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.querySelector("header").innerHTML = data;
    });

  let navbarHtml = await fetch("/nav/header.html");
  let data = await navbarHtml.text();
  document.querySelector("header").innerHTML = data;
}

async function injectFooter() {
  fetch("/nav/footer.html")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.querySelector("footer").innerHTML = data;
    });

  let navbarHtml = await fetch("/nav/footer.html");
  let data = await navbarHtml.text();
  document.querySelector("footer").innerHTML = data;
}

injectHeader();
injectFooter();
