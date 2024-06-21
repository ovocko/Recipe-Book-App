document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipe-form');
    const recipeNameInput = document.getElementById('recipe-name');
    const recipeIngredientsInput = document.getElementById('recipe-ingredients');
    const recipeList = document.getElementById('recipe-list');

    // Load recipes from local storage
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Function to add a recipe
    const addRecipe = (name, ingredients) => {
        const recipe = { name, ingredients };
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        renderRecipes();
    };

    // Function to delete a recipe
    const deleteRecipe = (index) => {
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        renderRecipes();
    };

    // Function to render recipes
    const renderRecipes = () => {
        recipeList.innerHTML = '';
        recipes.forEach((recipe, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${recipe.name}</h3>
                <p>${recipe.ingredients}</p>
                <button onclick="deleteRecipe(${index})">Delete</button>
            `;
            recipeList.appendChild(li);
        });
    };

    // Handle form submission
    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = recipeNameInput.value;
        const ingredients = recipeIngredientsInput.value;
        addRecipe(name, ingredients);
        recipeNameInput.value = '';
        recipeIngredientsInput.value = '';
    });

    // Initial render
    renderRecipes();
});

// Expose deleteRecipe function to global scope
window.deleteRecipe = deleteRecipe;

