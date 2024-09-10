const accessKey = "30Y9cl4Vhp896dd8tAsO3D7P2ra42rSGTiVCf8oNNSc";

const searchForm = document.getElementById("image-search-form");
const searchInput = document.getElementById("search-input");
const imageResults = document.getElementById("image-results");
const loadMoreBtn = document.getElementById("load-more-btn");
const resetBtn = document.getElementById("reset-btn");
const placeholderContent = document.getElementById("placeholder-content");

let searchQuery = "";
let pageNumber = 1;

async function fetchImages() {
    searchQuery = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${searchQuery}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if (pageNumber === 1) {
        imageResults.innerHTML = "";
    }

    const results = data.results;
    
    results.map((result) => {
        const imageElement = document.createElement("img");
        imageElement.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(imageElement);
        imageResults.appendChild(imageLink);
    });

    loadMoreBtn.style.display = "block";
    placeholderContent.style.display = "none";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    pageNumber = 1;
    fetchImages();
});

loadMoreBtn.addEventListener("click", () => {
    pageNumber++;
    fetchImages();
});

resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    imageResults.innerHTML = "";
    loadMoreBtn.style.display = "none";
    placeholderContent.style.display = "block";
});
