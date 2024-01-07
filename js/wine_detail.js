// Get the wine ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const wineId = urlParams.get('id');
const category = urlParams.get('category'); //get the category from the URL

// Fetch the wine details based on the wineId and category
fetch(`https://api.sampleapis.com/wines/${category}/${wineId}`)
  .then(response => response.json())
  .then(data => {
    const wine = data;

    // Display wine details on the page
    document.getElementById('wine-image').src = wine.image;
    document.getElementById('wine-name').textContent = `${wine.winery} ${wine.wine}`;
    document.getElementById('wine-rating').textContent = `Rating: ${wine.rating.average} (${wine.rating.reviews})`;
    document.getElementById('wine-location').textContent = `Location: ${wine.location.replace('·', ',')}`;
  })
  .catch(error => {
    console.error('Error:', error);
  });
