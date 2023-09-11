const URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
const SEARCH_BY_NAME = 'search.php?s=';

const input = document.getElementById('input-search');
const btnSearch = document.getElementById('submit');

let data = [];
let drinksID = [];
let drinksFound = [];

const getJSONData = async (URL) => {
  return fetch(URL)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.error(error));
};

const getIngredients = (drink) => {
  let ingredientArr = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    if (ingredient != null) {
      ingredientArr.push(ingredient);
    }
  }

  return ingredientArr;
};

const showIngredientList = (drinks) => {
  drinks.forEach((drink) => {
    const { idDrink } = drink;
    const ingredients = getIngredients(drink);
    const drinkDOM = document.getElementById(`drink${idDrink}`);
    showIngredients(ingredients, drinkDOM);
  });
};

const showIngredients = (ingredients, parent) => {
  ingredients.forEach((ingredient) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerText = `${ingredient}`;

    // console.log(parent);
    parent.appendChild(li);
  });
};

const showDrinks = (drinks) => {
  const container = document.getElementById('drink-container');
  let HTMLToAppend = '';

  drinks.forEach((drink) => {
    const { idDrink, strDrink, strDrinkThumb } = drink;

    HTMLToAppend += `
    <div class="col">
      <div class="card" style="width: 18rem;">
        <img src="${strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${strDrink}</h5>
          <h6 class="text-body-secondary">Ingredients</h6>
          <ul class="list-group list-group-flush mt-2 mb-2" id="drink${idDrink}">
          
          </ul>
        </div>
      </div>
    </div>
    `;
  });

  container.innerHTML = HTMLToAppend;
};

document.addEventListener('DOMContentLoaded', async () => {
  data = await getJSONData(URL + SEARCH_BY_NAME);
});

btnSearch.addEventListener('click', async (e) => {
  e.preventDefault();
  data = await getJSONData(URL + SEARCH_BY_NAME + input.value);
  showDrinks(data.drinks);
  showIngredientList(data.drinks);
});
