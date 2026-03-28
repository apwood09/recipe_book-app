const form = document.getElementById('recipe-form');
const displayArea = document.getElementById('display-area');

// recipe from storage or initialize empty array 
let recipes = JSON.parse(localStorage.getItem('myRecipes')) || [];

// recipe from storage or empty array 
function renderRecipes() {
    displayArea.innerHTML = recipes.map((recipe, index) => `
        <div class="recipe-card">
            <h3>${recipe.name}</h3>
            <p>${recipe.ingredients}</p>
            <button onclick="deleteRecipe(${index})">Delete</button>
        </div>
    `).join('');
}

// add recipe 
form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const newRecipe = {
        name: document.getElementById('recipe-name').value, 
        ingredients: document.getElementById('recipe-ingredients').value
    }; 

    recipes.push(newRecipe); 
    localStorage.setItem('myRecipes', JSON.stringify(recipes)); 

    form.reset(); 
    renderRecipes(); // show new recipes immediately 

}); 

// delete recipe 
window.deleteRecipe = function(index) {
    recipes.splice(index, 1); 
    localStorage.setItem('myRecipes', JSON.stringify(recipes)); 
    renderRecipes();
}; 

// tab switching 
window.showTab = function(tabName) {

    // hide elemets with class 'tab-content'
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none'); 
     
    // remove active class from all butons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active')); 

    // show specific tab and actie button
    if (tabName === 'add') {
        document.getElementById('add-tab').style.display = 'block'; 
        document.querySelector('button[onclick="showTab(\'add\')"]').classList.add('active');
    } else {
        document.getElementById('view-tab').style.display = 'block'; 
        document.querySelector('button[onclick="showTab(\'view\')"]').classList.add('active');
        renderRecipes(); 
    }
}

// start on view tab 
showTab('view');