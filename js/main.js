let category;
const apikey = "8d0c563fe9a1e61cb69acf8707371ea7";

// get news from api
async function getNews() {
  const url = `https://gnews.io/api/v4/top-headlines?category=${
    category || "general"
  }&country=eg&apikey=${apikey}`;
  const response = await fetch(url)
    .then((res) => res.json())
    .then((data) => data.articles);
  return response;
}

// show the news as headlines and general news
async function showNews() {
  const news = await getNews();
  const headLines = document.getElementById("headLines");
  const newsContainer = document.getElementById("newsContainer");

  (newsContainer.innerHTML = ""), (headLines.innerHTML = "");

  for (let i = 0; i < 4; i++) {
    let publishDate = new Date(news[i].publishedAt).toLocaleDateString();

    const card = document.createElement("div");
    card.classList.add("col");

    card.innerHTML = `
      <div class="card h-100">
        <img src="${news[i].image}" alt="${news[i].title}" class="w-100 h-100 card-img "/>
        <div class="card-img-overlay align-content-end" style="background-color:rgba(0,0,0,.4)">
          <p class="card-text">
            <small
              class="text-white-50"
            >${publishDate}</small>
          </p>
          <h2 class=" h3">
            <a href="${news[i].url}" target="_blank" class="card-title text-white link-underline-light link-underline-opacity-0 link-underline-opacity-100-hover custom-shadow">${news[i].title}</a>
          </h2>
        </div>
      </div>
      `;

    headLines.appendChild(card);
    news.shift();
  }

  for (const article of news) {
    let publishDate = new Date(article.publishedAt).toLocaleDateString();
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
        <div class="card shadow-sm">
          <a href="${article.url}" target="_blank"><img src="${article.image}" alt="" class="w-100 card-img-top" /></a>
          <div class="card-body">
            <h2 class=" h3"><a href="${article.url}" target="_blank" class="card-title link-underline-dark link-underline-opacity-0 link-underline-opacity-100-hover">${article.title}</a></h2>
            <p class="card-text w-100">${article.description}</p>
            <a href="${article.url}" class="text-decoration-none btn btn-outline-dark mb-2">اقرا المزيد</a>
            <div class="d-flex justify-content-between align-items-baseline">
              <p> المصدر: <a href="${article.source.url}" target="_blank">${article.source.name}</a></p>
              <small
                class="text-body-secondary"
                aria-details="date"
              >${publishDate}</small>
            </div>
          </div>
        </div>
      `;
    newsContainer.appendChild(card);
  }
}

// navbars categorizing
const categoryHeading = document.querySelector(".categoryHeading");
const listItems = document.querySelectorAll(".nav-item");
listItems.forEach((li) => {
  li.addEventListener("click", (event) => {
    if (window.location.href.endsWith("category.html")) {
      event.preventDefault();
    }
    switch (event.target.innerText) {
      case "تكنولوجيا":
        categoryHeading.innerText = "تكنولوجيا";
        category = "technology";
        break;
      case "رياضه":
        categoryHeading.innerText = "رياضه";
        category = "sports";
        break;
      case "اخر الاخبار":
        categoryHeading.innerText = "اخر الاخبار";
        category = "nation";
        break;
      case "اقتصاد":
        categoryHeading.innerText = "اقتصاد";
        category = "business";
        break;
      default:
        break;
    }
    showNews();
  });
});

// get search results from the api
async function getSearchResults(query) {
  const url = `https://gnews.io/api/v4/search?q=${query}&lang=ar&apikey=${apikey}`;
  console.log(url);
  const searchResults = await fetch(url)
    .then((res) => res.json())
    .then((res) => res.articles)
    .catch((error) => {
      console.error(error);
    });
  return searchResults;
}

// display the search results
async function showSearchResults(searchQuery) {
  const searchResults = await getSearchResults(searchQuery);
  const headLines = document.getElementById("headLines");
  const newsContainer = document.getElementById("newsContainer");

  if (window.location.href.endsWith("category.html")) {
    categoryHeading.innerHTML = `<h2> نتائج البحث عن: ${searchQuery} <h2>`;
    newsContainer.innerHTML = "";
    headLines.parentNode.parentNode.style.display = "none";
    newsContainer.parentElement.parentElement.classList.remove(
      "bg-body-tertiary"
    );
  } else {
    headLines.innerHTML = `<h2> نتائج البحث عن: ${searchQuery} <h2>`;
    newsContainer.innerHTML = "";
  }

  for (const article of searchResults) {
    let publishDate = new Date(article.publishedAt).toLocaleDateString();
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
        <div class="card shadow-sm">
          <a href="${article.url}" target="_blank"><img src="${article.image}" alt="" class="w-100 card-img-top" /></a>
          <div class="card-body">
            <h2 class=" h3"><a href="${article.url}" target="_blank" class="card-title link-underline-dark link-underline-opacity-0 link-underline-opacity-100-hover">${article.title}</a></h2>
            <p class="card-text w-100">${article.description}</p>
            <a href="${article.url}" class="text-decoration-none btn btn-outline-dark mb-2">اقرا المزيد</a>
            <div class="d-flex justify-content-between align-items-baseline">
              <p> المصدر: <a href="${article.source.url}" target="_blank">${article.source.name}</a></p>
              <small
                class="text-body-secondary"
                aria-details="date"
              >${publishDate}</small>
            </div>
          </div>
        </div>
      `;
    newsContainer.appendChild(card);
  }
}

// search button
const searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const searchQuery = document.querySelector(".search-input").value.toString();
  if (window.location.href.endsWith("category.html")) {
    console.log(window.location.href);
  }
  showSearchResults(searchQuery);
});

document.addEventListener("DOMContentLoaded", showNews);
