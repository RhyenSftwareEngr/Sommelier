// Variables for pagination and selected category
let currentPage = 1;
let totalPage = 1;
const pageSize = 25; // items per page
let selectedCategory = 'reds'; // Default category

// Function to create and append a card for each wine
function createWineCard(wineData) {
  const card = document.createElement('div');
  card.classList.add('wine-card');

  // Create an image element
  const wineImage = document.createElement('img');
  wineImage.src = wineData.image;
  wineImage.alt = wineData.winery + ' ' + wineData.wine;
  wineImage.classList.add('wine-image');

  // Create a div for other details
  const wineDetails = document.createElement('div');
  wineDetails.classList.add('wine-details');
  wineDetails.innerHTML = `<h2>${wineData.winery} ${wineData.wine}</h2>
                          <p>Rating: ${wineData.rating.average} (${wineData.rating.reviews})</p>
                          <p>Location: ${wineData.location.replace('·', ',')}</p>`;

  // Append the image and details to the card
  card.appendChild(wineImage);
  card.appendChild(wineDetails);

  // Add a click event listener to the card to open the wine detail page
  card.addEventListener('click', () => {
    // Navigate to the wine detail page with the wine's unique identifier (e.g., ID)
    window.open(`../html/wine_detail.html?category=${selectedCategory.trim()}&id=${wineData.id}`)
});

  return card;
}

// Event listener for the "Fetch Wines" button to hide whenever it's clicked
document.getElementById('fetch-button').addEventListener('click', () => {
  const category = document.getElementById('wine-category').value;
  selectedCategory = category;
  const apiEndpoint = `https://api.sampleapis.com/wines/${category}`;
  currentPage = 1; // Reset current page when fetching new data
  fetchAndDisplayWines(apiEndpoint, currentPage, pageSize);

  // Change the style of the page-counter div to 'block' to "hide" lol
  const pageCounter = document.querySelector('.page-counter');
  pageCounter.style.display = 'block';
});

// Function to fetch and display wines based on the given API endpoint
function fetchAndDisplayWines(apiEndpoint, page, pageSize) {
  const wineList = document.getElementById('wine-list');

  fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      // Calculate the total number of pages
      totalPage = Math.ceil(data.length / pageSize);
      // Update the page counter
      updatePageCounter();

      wineList.innerHTML = ''; // Clear the previous wine list

      // Calculate the start and end
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      // Slice the data to get items for the current page
      const pageData = data.slice(startIndex, endIndex);

      pageData.forEach(wine => {
        wineList.appendChild(createWineCard(wine));
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Update the page counter
function updatePageCounter() {
  const currentPageElement = document.getElementById('current-page');
  const totalPageElement = document.getElementById('total-pages');
  currentPageElement.textContent = currentPage;
  totalPageElement.textContent = totalPage;
}

// Event listener for the "Fetch Wines" button
document.getElementById('fetch-button').addEventListener('click', () => {
  // Fetch wines based on the selected category
  const category = document.getElementById('wine-category').value;
  selectedCategory = category; // Update the category
  const apiEndpoint = `https://api.sampleapis.com/wines/${category}`;
  currentPage = 1; // Reset the current page when fetching new data
  fetchAndDisplayWines(apiEndpoint, currentPage, pageSize);
});

// Event listener for the "First Page" button
document.getElementById('first-page-button').addEventListener('click', () => {
  currentPage = 1;
  const category = document.getElementById('wine-category').value;
  const apiEndpoint = `https://api.sampleapis.com/wines/${category}`;
  fetchAndDisplayWines(apiEndpoint, currentPage, pageSize);
});

// Event listener for the "Last Page" button
document.getElementById('last-page-button').addEventListener('click', () => {
  currentPage = totalPage;
  const category = document.getElementById('wine-category').value;
  const apiEndpoint = `https://api.sampleapis.com/wines/${category}`;
  fetchAndDisplayWines(apiEndpoint, currentPage, pageSize);
});

// Event listener for the "Go Forward 5 Pages" button
document.getElementById('go-forward-button').addEventListener('click', () => {
  currentPage += 5;
  if (currentPage > totalPage) {
    currentPage = totalPage;
  }
  const category = document.getElementById('wine-category').value;
  const apiEndpoint = `https://api.sampleapis.com/wines/${category}`;
  fetchAndDisplayWines(apiEndpoint, currentPage, pageSize);
});

// Event listener for the "Go Backward 5 Pages" button
document.getElementById('go-backward-button').addEventListener('click', () => {
  currentPage -= 5;
  if (currentPage < 1) {
    currentPage = 1;
  }
  const category = document.getElementById('wine-category').value;
  const apiEndpoint = `https://api.sampleapis.com/wines/${category}`;
  fetchAndDisplayWines(apiEndpoint, currentPage, pageSize);
});

// Event listener for the "Next Page" button
document.getElementById('next-page-button').addEventListener('click', () => {
  currentPage++; // Update the current page
  // Fetch wines for the next page based on the selected category
  const category = document.getElementById('wine-category').value;
  const apiEndpoint = `https://api.sampleapis.com/wines/${category}`;
  fetchAndDisplayWines(apiEndpoint, currentPage, pageSize);
});

// Event listener for the "Previous Page" button
document.getElementById('prev-page-button').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--; // Update the current page
    // Fetch wines for the previous page based on the selected category
    const category = document.getElementById('wine-category').value;
    const apiEndpoint = `https://api.sampleapis.com/wines/${category}`;
    fetchAndDisplayWines(apiEndpoint, currentPage, pageSize);
  }
});