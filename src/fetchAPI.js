// Function to handle toggling instructions visibility
function toggleInstructions(index) {
    const instructionsElement = document.getElementById(`strInstructions${index}`);
    instructionsElement.classList.toggle("hidden");
}

// Function to handle button click
function buttonClicked() {
    var strMeal = document.getElementById("searchData").value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${strMeal}`)
        .then((response) => response.json())
        .then((data) => {
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = '';

            data.meals.forEach((meal, index) => {
                const resultDiv = document.createElement("div");
                resultDiv.className = "result";

                // Create an array of ingredients and measures
                const ingredients = [];
                for (let i = 1; i <= 20; i++) {
                    const ingredient = meal[`strIngredient${i}`];
                    const measure = meal[`strMeasure${i}`];
                    if (ingredient && measure) {
                        ingredients.push(`${measure} ${ingredient}`);
                    }
                }

                resultDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image">
                    <p id="mealName${index}">Meal Name: ${meal.strMeal}</p>
                    <p id="strArea${index}">Area: ${meal.strArea}</p>
                    <p id="strYoutube${index}">Watch: ${meal.strYoutube}</p>
                    <p id="strIngredients${index}">Ingredients: ${ingredients.join(', ')}</p>
                    <button onclick="toggleInstructions(${index})">Show Instructions</button>
                    <p id="strInstructions${index}" class="hidden">Instructions: ${meal.strInstructions}</p>
                `;

                resultsDiv.appendChild(resultDiv);
            });
        });
}
