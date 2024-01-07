//6889c76ff69c4a49aa7f5c9d4c6dd71c - test key di sa atin
//af239b51355b4acba3d46a8abf5860e7 - our legit key
//50e942eafbb0432890384d40751871de - extra key

const searchInput = document.getElementById('search-bar');
const spoonacularOutput = document.getElementById('description-output'); 
const dishPairingsOutput = document.getElementById('dish-pairings-output'); //dish pairings
const searchButton = document.getElementById('search-button'); // search button
const recommendedDishContainer = document.getElementById('recommended-dish-container');
const apiKey = 'af239b51355b4acba3d46a8abf5860e7';

//search button
searchButton.addEventListener('click', function () {
    const wineName = searchInput.value;

    if (wineName) {
        fetchWineDescription(wineName);
        fetchDishPairings(wineName);
        // Show the container
        container.style.display = 'block';
    } else {
        spoonacularOutput.textContent = 'Enter a wine name to search.';
        dishPairingsOutput.textContent = ''; // Clear
        // Hide the container
        container.style.display = 'none';
    }
});

//fetch description
function fetchWineDescription(wineName) {
  const apiKey = '6889c76ff69c4a49aa7f5c9d4c6dd71c';
  const apiUrl = `https://api.spoonacular.com/food/wine/description?apiKey=${apiKey}&wine=${wineName}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data && data.wineDescription) {
        spoonacularOutput.textContent = data.wineDescription;

        // Display the wine image if available
        if (data.wineImage) {
          const wineImageElement = document.createElement('img');
          wineImageElement.src = data.wineImage;
          wineImageElement.alt = 'Wine Image';
          wineImageElement.className = 'wine-image'; // You can define a CSS class for styling
          spoonacularOutput.appendChild(wineImageElement);
        }
      } else {
        spoonacularOutput.textContent = 'Wine description not found.';
      }
    })
    .catch(error => {
      console.error('Error fetching wine description:', error);
    });
}


 // caps the first letter
 function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

//fetch pairings
function fetchDishPairings(wineName) {
    const apiKey = '6889c76ff69c4a49aa7f5c9d4c6dd71c';
    const apiUrl = `https://api.spoonacular.com/food/wine/dishes?apiKey=${apiKey}&wine=${wineName}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const dishPairingsList = document.getElementById('dish-pairings-output');
        dishPairingsList.innerHTML = ''; // Clear the existing list
  
        if (data && data.pairings) {
          const pairings = data.pairings;
  
          //div for the "Best Paired with" label
          const bestPairedWithDiv = document.createElement('div');
          bestPairedWithDiv.textContent = 'Best Paired with:';
          bestPairedWithDiv.style.fontWeight = 'bold';
          dishPairingsList.appendChild(bestPairedWithDiv);
  
          // Add each pairing as list items
          pairings.forEach(pairing => {
            const li = document.createElement('li');
            li.textContent = capitalizeFirstLetter(pairing);
            dishPairingsList.appendChild(li);
          });
          
        } else {
          dishPairingsList.style.listStyleType = 'none';
          const li = document.createElement('li');
          li.textContent = 'Dish pairings not found for this wine.';
          dishPairingsList.appendChild(li);
        }
      })
      .catch(error => {
        console.error('Error fetching dish pairings:', error);
      });
  }

  //clickable pairings
  dishPairingsOutput.addEventListener('click', function (e) {
    if (e.target && e.target.nodeName === 'LI') {
      const dishName = e.target.textContent;
      navigateToRecommendedDishPage(dishName);
    }
  });
  
  //opens to new url
  function navigateToRecommendedDishPage(dishName) {
    const recommendedDishPageUrl = `../html/dish_recipe.html?dishName=${dishName}`;
    window.location.href = recommendedDishPageUrl;
  }
