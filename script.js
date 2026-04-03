const form = document.getElementById('recipe-form');
const displayArea = document.getElementById('display-area');
let currentCategory = 'Bevrages'; 

// recipe from storage or empty array 
let recipes = JSON.parse(localStorage.getItem('myRecipes')) || [];

// recipe from storage or empty array 
function renderRecipes() {
    // filter categories 
    const filteredRecipes = recipes.filter(r => r.category === currentCategory);

    // recipe dispaly outline 
    displayArea.innerHTML = filteredRecipes.map((recipe, index) => `
        <div class="recipe-card">
            <h3>${recipe.name}</h3>
            <p>${recipe.ingredients}</p>
            <p>${recipe.steps}</p>
            <button onclick="deleteRecipe(${index})">Delete</button>
        </div>
    `).join('');
}

// tab handler filter 
function openRecipe(evt, categoryName) {
    currentCategory = categoryName; 
    let tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    evt.currentTarget.className += " active";
    
    renderRecipes(); // render filtered info
}

// add recipe 
form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    // recipe values
    const newRecipe = {
        category: document.getElementById('categories').value, 
        name: document.getElementById('recipe-name').value, 
        ingredients: document.getElementById('recipe-ingredients').value, 
        steps: document.getElementById('recipe-steps').value
    }; 

    recipes.push(newRecipe); 
    localStorage.setItem('myRecipes', JSON.stringify(recipes)); 

    form.reset(); // reset form 
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

    // hide elemets: class 'tab-content'
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none'); 
     
    // remove active class buttons 
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active')); 

    // show specific tab and active button
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