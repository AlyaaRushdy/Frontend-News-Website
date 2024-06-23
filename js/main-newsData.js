// let category;

// async function getNews() {
//   const apikey = "pub_46133b31e7383840e48b39ba5024eca621e96";
//   const url = `https://newsdata.io/api/1/latest?country=eg&language=ar&apikey=${apikey}&category=${
//     category || "top"
//   }`;
//   console.log(url);
//   const response = await fetch(url)
//     .then((res) => res.json())
//     .then((data) => data.results)
//     .catch((err) => console.error(err));
//   return response;
// }

// async function showNews() {
//   const news = await getNews();
//   const headLines = document.getElementById("headLines");
//   const newsContainer = document.getElementById("newsContainer");

//   (newsContainer.innerHTML = ""), (headLines.innerHTML = "");

//   for (let i = 0; i < 4; i++) {
//     const publishDate = news[i].pubDate.split(" ")[0];
//     const card = document.createElement("div");
//     card.classList.add("col");
//     card.innerHTML = `
//       <div class="card h-100">
//         <img src="${news[i].image_url}" alt="${news[i].title}" class="w-100 h-100 card-img"/>
//         <div class="card-img-overlay align-content-end" style="background-color:rgba(0,0,0,.4)">
//           <p class="card-text">
//             <small
//               class="text-white-50"
//             >${publishDate}</small>
//             <small
//               class="text-white-50"
//             >${news[i].category}</small>
//           </p>
//           <h2 class=" h3">
//             <a href="${news[i].link}" target="_blank" class="card-title text-white link-underline-light link-underline-opacity-0 link-underline-opacity-100-hover custom-shadow">${news[i].title}</a>
//           </h2>
//         </div>
//       </div>
//       `;
//     headLines.appendChild(card);
//     news.shift();
//   }

//   for (const article of news) {
//     const publishDate = article.pubDate.split(" ")[0];

//     const card = document.createElement("div");
//     card.classList.add("col");
//     card.innerHTML = `
//         <div class="card shadow-sm">
//           <a href="${article.link}" target="_blank"><img src="${article.image_url}" alt="" class="w-100 card-img-top" /></a>
//           <div class="card-body">
//             <h2 class=" h3"><a href="${article.link}" target="_blank" class="card-title link-underline-dark link-underline-opacity-0 link-underline-opacity-100-hover">${article.title}</a></h2>
//             <p class="card-text w-100">${article.description} </p>
//               <a href="" class="text-decoration-none btn btn-outline-dark mb-2">اقرا المزيد</a>
//             <div class="d-flex justify-content-between align-items-center">
//               <p> المصدر: <a href="${article.source_url}" target="_blank">${article.source_id}</a></p>
//               <small
//                 class="text-body-secondary"
//                 aria-details="date"
//               >${publishDate}</small>
//             </div>
//           </div>
//         </div>
//       `;
//     newsContainer.appendChild(card);
//   }
// }

const searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const searchQuery = document.querySelector(".search-input").value.toString();
  const apikey = "pub_46133b31e7383840e48b39ba5024eca621e96";
  const url = `https://newsdata.io/api/1/latest?&language=ar&q=${searchQuery}&apikey=${apikey}`;
  console.log(url);
  const searchResults = await fetch(url)
    .then((res) => res.json())
    .then((res) => res.results)
    .catch((error) => {
      console.error(error);
    });

  console.log(searchResults);

  const headLines = document.getElementById("headLines");
  const newsContainer = document.getElementById("newsContainer");

  headLines.innerHTML = `<h2> نتائج البحث عن: ${searchQuery} <h2>`;
  newsContainer.innerHTML = "";

  for (const article of searchResults) {
    const publishDate = article.pubDate.split(" ")[0];

    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
      <div class="card shadow-sm">
        <a href="${article.link}" target="_blank"><img src="${article.image_url}" alt="" class="w-100 card-img-top" /></a>
        <div class="card-body">
          <h2 class=" h3"><a href="${article.link}" target="_blank" class="card-title link-underline-dark link-underline-opacity-0 link-underline-opacity-100-hover">${article.title}</a></h2>
          <p class="card-text w-100">${article.description} </p>
          <a href="" class="text-decoration-none btn btn-outline-dark mb-2">اقرا المزيد</a>
          <div class="d-flex justify-content-between align-items-center">
            <p> المصدر: <a href="${article.source_url}" target="_blank">${article.source_id}</a></p>
            <small
              class="text-body-secondary"
              aria-details="date"
            >${publishDate}</small>
          </div>
        </div>
      </div>`;
    newsContainer.appendChild(card);
  }
});

// const categoryHeading = document.querySelector(".categoryHeading");
// const listItems = document.querySelectorAll(".nav-item");
// listItems.forEach((li) => {
//   li.addEventListener("click", (event) => {
//     if (window.location.href.endsWith("category.html")) {
//       event.preventDefault();
//     }
//     switch (event.target.innerText) {
//       case "تكنولوجيا":
//         categoryHeading.textContent = "تكنولوجيا";
//         category = "technology";
//         break;

//       case "رياضه":
//         categoryHeading.textContent = "رياضه";
//         category = "sports";
//         break;

//       case "اخر الاخبار":
//         categoryHeading.textContent = "اخر الاخبار";
//         category = "nation";
//         break;

//       case "اقتصاد":
//         categoryHeading.textContent = "اقتصاد";
//         category = "business";
//         break;

//       default:
//         break;
//     }
//     showNews();
//   });
// });

// document.addEventListener("DOMContentLoaded", showNews);
