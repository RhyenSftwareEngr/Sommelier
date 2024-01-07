// Function to extract a query parameter from the URL
function getQueryParam(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}

// Get the 'dishName' from the URL
const dishName = getQueryParam('dishName');

// Display the dish name
const dishNameElement = document.getElementById('dishNameElement');

// Fetch and display the recipe information based on 'dishName'
fetchRecommendedDish(dishName);
dishNameElement.textContent = dishName;

// Function to fetch recommended dish information
function fetchRecommendedDish(dishName) {
    const apiKey = '6889c76ff69c4a49aa7f5c9d4c6dd71c';
    const apiUrl = `https://api.spoonacular.com/recipes/search?query=${dishName}&number=1&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.results && data.results.length > 0) {
                const recipeName = data.results[0].title;

                // Display the recipe name
                dishNameElement.textContent = recipeName;

                const recipeID = data.results[0].id;

                // Fetch and display additional recipe information
                fetchRecipeInformation(recipeID);
            } else {
                dishNameElement.textContent = `No recipe found for ${dishName}`;
                console.log(`No recipe found for ${dishName}`);
            }
        })
        .catch(error => {
            console.error('Error fetching recipe information:', error);
        });
}

// Function to fetch recipe information by ID
function fetchRecipeInformation(recipeID) {
    const apiKey = '6889c76ff69c4a49aa7f5c9d4c6dd71c';
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${apiKey}`;

    console.log(apiUrl)
    fetch(apiUrl)
        .then(response => response.json())
        .then(recipeData => {
            // modify this as needed
            if (recipeData) {
                const recipeContainer = document.getElementById('recipe-container');

                // Display the recipe image if available
                if (recipeData.image) {
                    const recipeImageElement = document.createElement('img');
                    recipeImageElement.src = recipeData.image;
                    recipeImageElement.alt = 'Recipe Image';
                    recipeImageElement.className = 'recipe-image';
                    recipeContainer.appendChild(recipeImageElement);
                }
                
                // Display the description
                const descriptionP = document.createElement('p');
                descriptionP.innerHTML = recipeData.winePairing.pairingText;
                descriptionP.className = "description-p"
                recipeContainer.appendChild(descriptionP)
        
                // Create a div element for ingredients
                const ingredientsSection = document.createElement('div');
                ingredientsSection.className = "ingredient-section"
                ingredientsSection.innerHTML = '<h3>Ingredients:</h3>';
                const ingredientsList = document.createElement('ul');
                ingredientsList.className = "ingredient-ul"

                recipeData.extendedIngredients.forEach(ingredient => {
                    const ingredientItem = document.createElement('li');
                    ingredientItem.className = "ingredients-li"
                    ingredientItem.textContent = ingredient.original;
                    ingredientsList.appendChild(ingredientItem);
                });
                ingredientsSection.appendChild(ingredientsList);
                recipeContainer.appendChild(ingredientsSection);

                function displayDataPoint(label, value) {
                    const dataPointElement = document.createElement('p');
                    let text = value;

                    if (typeof value === 'boolean') {
                        text = value ? 'Yes' : 'No';
                    }

                    dataPointElement.textContent = `${label}: ${text}`;
                    dataPointElement.classList.add('data-point');
                    recipeContainer.appendChild(dataPointElement);
                    
                }

                if (recipeData.servings) {
                    displayDataPoint('Servings', recipeData.servings);
                }

                if (recipeData.readyInMinutes) {
                    displayDataPoint('Ready in Minutes', recipeData.readyInMinutes);
                }

                if (recipeData.healthScore) {
                    displayDataPoint('Health Score', recipeData.healthScore);
                }

                if (recipeData.spoonacularScore) {
                    displayDataPoint('Spoonacular Score', recipeData.spoonacularScore);
                }

                if (recipeData.pricePerServing) {
                    displayDataPoint('Price Per Serving', recipeData.pricePerServing);
                }

                if (recipeData.cheap) {
                    displayDataPoint('Cheap', recipeData.cheap);
                }

                if (recipeData.dairyFree) {
                    displayDataPoint('Dairy Free', recipeData.dairyFree);
                }

                if (recipeData.glutenFree) {
                    displayDataPoint('Gluten Free', recipeData.glutenFree);
                }

                if (recipeData.ketogenic) {
                    displayDataPoint('Ketogenic', recipeData.ketogenic);
                }

                if (recipeData.sustainable) {
                    displayDataPoint('Sustainable', recipeData.sustainable);
                }

                if (recipeData.vegan) {
                    displayDataPoint('Vegan', recipeData.vegan);
                }

                if (recipeData.vegetarian) {
                    displayDataPoint('Vegetarian', recipeData.vegetarian);
                }

                if (recipeData.veryHealthy) {
                    displayDataPoint('Very Healthy', recipeData.veryHealthy);
                }

                if (recipeData.veryPopular) {
                    displayDataPoint('Very Popular', recipeData.veryPopular);
                }

                if (recipeData.whole30) {
                    displayDataPoint('Whole30', recipeData.whole30);
                }

                if (recipeData.dishTypes && recipeData.dishTypes.length > 0) {
                    displayDataPoint('Dish Types', recipeData.dishTypes.join(', '));
                }

                //Scroll to top
                window.scrollTo(0, 0);

                // Code that removes loading screen
                let loadingDiv = document.querySelector("[loading]")
                setTimeout(function () { 
                    loadingDiv.style.opacity = "0"
                    setTimeout(function() {
                        loadingDiv.style.display = "none"
                    }, 510)
                }, 0);

                // Code that reveals content on load
                var reveals = document.querySelectorAll(".reveal");
                for(var i = 0; i < reveals.length; i++){
                    var windowHeight = window.innerHeight;
                    var revealTop = reveals[i].getBoundingClientRect().top;
                    var revealPoint = 50;

                    if(revealTop < windowHeight - revealPoint){
                    reveals[i].classList.add("active");
                    }
                }
            } else {
                console.log('No additional recipe information found.');
            }
        })
        .catch(error => {
            console.error('Error fetching recipe information:', error.message);
        });
}
fetchRecipeInformation(dishName);