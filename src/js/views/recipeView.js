import { elements } from './base';
import { Fraction } from 'fractional';

export const clearRecipe = () => {
  elements.parent.innerHTML = '';
};
export const showActive = (id) => {
  let a = document.querySelector(`a[href="#${id}"]`);
  if (a) {
    a.classList.add('results__link--active');
  }
};

export const removeClass = () => {
  let arrNode = document.querySelectorAll('.results__link');
  arrNode.forEach((el) => el.classList.remove('results__link--active'));
};

const formatFraction = (count) => {
  let sep = count.toString().split('.');
  let fr = new Fraction(count - parseInt(sep[0]));
  if (sep.length === 1) return count;
  else if (sep[0] == 0) return `${fr.numerator}/${fr.denominator}`;
  else {
    return `${parseInt(sep[0])} ${fr.numerator}/${fr.denominator}`;
  }
};

const constructIngredient = (ingredient) =>
  `
<li class="recipe__item">
<svg class="recipe__icon">
    <use href="img/icons.svg#icon-check"></use>
</svg>
<div class="recipe__count">${formatFraction(ingredient.count)}</div>
<div class="recipe__ingredient">
    <span class="recipe__unit">${ingredient.unit}</span>
    ${ingredient.ingredientName}
</div>
</li>
`;

export const renderRecipe = (recipe, isLiked) => {
  const uiItems = `
<figure class="recipe__fig">
                <img src="${recipe.image}" alt="${
    recipe.title
  }" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${
                      recipe.timeOfServing
                    }</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${
                      recipe.serving
                    }</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#${
                          isLiked ? 'icon-heart' : 'icon-heart-outlined'
                        }"></use>
                    </svg>
                </button>
            </div>



            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                ${recipe.ingredients
                  .map((el) => constructIngredient(el))
                  .join('')} 
                </ul>

                <button class="btn-small recipe__btn addList">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">The Pioneer Woman</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${
                  recipe.url
                }" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
`;

  elements.parent.insertAdjacentHTML('afterbegin', uiItems);
};

export const updateCountAndServ = (recipe) => {
  document.querySelector('.recipe__info-data--people').textContent =
    recipe.serving;

  let countElements = Array.from(document.querySelectorAll('.recipe__count'));
  countElements.forEach((el, i) => {
    // console.log(formatFraction(recipe.ingredients[i].count));
    el.textContent = formatFraction(recipe.ingredients[i].count);
  });
};
