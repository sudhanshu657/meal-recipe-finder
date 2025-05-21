const searchbox = document.querySelector('.searchbox');
const searchbtn = document.querySelector('.searchbtn');
const recipecontainer = document.querySelector('.recipe-container');

// Function to get recipes
const fetchRecipe = async (query) => {
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipecontainer.innerHTML = '';

        if (response.meals === null) {
            recipecontainer.innerHTML = `<p>No recipes found for "${query}".</p>`;
            return;
        }

        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');

            // ✅ Use backticks and a valid HTML template string
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <h3>${meal.strMeal}</h3>
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
            `;

            recipecontainer.appendChild(recipeDiv);
        });

    } catch (error) {
        console.error("Error fetching recipes:", error);
        recipecontainer.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    }
};

searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchbox.value.trim();
    if (searchInput) {
        fetchRecipe(searchInput);
        console.log("button clicked");
    }
});
