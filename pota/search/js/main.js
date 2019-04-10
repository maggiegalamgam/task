$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getRecipes(searchText);
        e.preventDefault();
    })
});

function getRecipes(searchText){
    axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchText)
    .then((response) => {
        console.log(response);
        let recipes = response.data.meals;
        let output = '';
        $.each(recipes, (index, recipe) => {
            output += `
            <div class="col-md-3">
                <div class="well text-center">
                <img src="${recipe.strMealThumb}">
                <h5>${recipe.strMeal}</h5>
                <a onclick="recipeSelected('${recipe.idMeal}')" class="btn btn-primary" href="#">Recipe Details</a>
                </div>
            </div>
            `;
           
        });
        $('#recipes').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
    
}

function recipeSelected(id){
    sessionStorage.setItem('recipeId' , id);
    window.location = 'recipe.html';
    return false;
}

function getRecipe(){
    let recipeId = sessionStorage.getItem('recipeId');

    axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + recipeId)
    .then((response) => {
        console.log(response);
        let recipe = response.data;

        let output =`
        <div class="row">
            <div class="col-md-4">
                <img src="${recipe.strMealThumb}" class="thumbnail">
            </div>
            <div class="col-md-8">
                <h2>${recipe.strMeal}</h2>

            </div>
        </div>
        `;

        $('#recipe').html(output);
        
    })
    .catch((err) => {
        console.log(err);
    });

}