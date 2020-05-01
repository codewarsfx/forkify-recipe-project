import Search from './models/Search';
import { elements, addLoader, removeLoader } from './views/base';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView';
import List from './models/List';
import { renderlistUi, removeListUi, clearList } from './views/listView';
import Likes from './models/Likes';
import * as likeView from './views/likeView';

//declare a state object ehich descibes the data available in the app at any given moment

/*
SEARCH CONTROLLER 
*/

const state = {};
//function which describes what happens when the form is submitted
let search = async () => {
  searchView.clearResults();
  //1.get the user input from input field
  const query = searchView.searchInput();
  searchView.clearInputField();
  //2.using the user input create  new search object and add it to the current app state
  try {
    if (query) {
      state.search = new Search(query);
      //3.prepare the ui for recieving the search results
      addLoader(elements.result);
      //4.perform the search
      await state.search.getRecipes();
      //=5.render search results on ui
      removeLoader();
      searchView.renderUi(state.search.recipes);
    }
  } catch (e) {
    alert(`recipe couldnt be found..try another`);
  }
};

//add event listener to handle search

elements.searchButton.addEventListener('submit', (e) => {
  e.preventDefault();
  search();
});
document.addEventListener('keypress', (e) => {
  if (e.keycode === 13 || e.which === 13) {
    search;
  }
});

//event listener for naviagating through pages
elements.pageButton.addEventListener('click', (e) => {
  const buttonClicked = e.target.closest('.btn-inline');
  if (buttonClicked) {
    const pageNo = parseInt(buttonClicked.dataset.go, 10);
    searchView.clearResults();
    searchView.renderUi(state.search.recipes, pageNo);
  }
});
//END OF SEARCH CONTROLLER

/*
RECIPE CONTROLLER
*/
state.like = new Likes();
const recipeController = async () => {
  //1. prepare the ui for the new recipe
  //1.1 remove previous result
  recipeView.clearRecipe();
  recipeView.removeClass();
  //1.2  add loader
  addLoader(elements.parent);
  try {
    //2.get id for recipe
    const id = window.location.hash.replace('#', '');
    //3.create a new instance of the recipe class and save in state
    if (id) {
      state.recipe = new Recipe(id);
      //4.get recipe data,calculate serving time and calcute the number of servings
      await state.recipe.getRecipe();
      state.recipe.evalIngredients();
      state.recipe.calculateServingTime();
      state.recipe.calculateServing();
      //4.render the created recipe to the ui
      //4.1 remove loader
      removeLoader();
      //4.2 render recipe
      recipeView.showActive(state.recipe.id);
      recipeView.renderRecipe(
        state.recipe,
        state.like.isLiked(state.recipe.id)
      );
    }
  } catch (e) {
    alert(e);
    alert(`an error  occured while loading the recipe resource`);
  }
};

//end of recipe controller

//event listener for recipe selection and load
['hashchange', 'load'].forEach((e) =>
  window.addEventListener(e, recipeController)
);

/*
  LIST CONTROLLER
 */
const ListController = () => {
  //create new list instance
  if (!state.list) {
    state.list = new List();
    //add to the items array
    state.recipe.ingredients.forEach((el) =>
      state.list.addList(el.count, el.unit, el.ingredientName)
    );
    //add to ui
    state.list.items.forEach((el) => renderlistUi(el));
  } else {
    state.list = 0;
    clearList();
    ListController();
  }
};

/*

      LIKES CONTROLLER

*/

const likesController = () => {
  // if (!state.like) state.like = new Likes();
  const currId = state.recipe.id;
  // operation to be carried out if recipe has not been liked
  if (!state.like.isLiked(currId)) {
    //create a new like item and add to likes list
    const newLike = state.like.addNewLike(
      state.recipe.image,
      state.recipe.title,
      currId
    );

    //toggle the like ui
    likeView.toggleLike(true);
    //render like to ui
    likeView.renderLikes(newLike);
  }
  //operation to be carried out if recipe has  been liked
  else {
    //remove like from likes model
    state.like.removeLike(currId);

    //toggle the likes
    likeView.toggleLike(false);
    //remove from ui
    likeView.removeFromUi(currId);
  }
  likeView.toggleLikeMenu(state.like.countLikesLength());
};

//event listener for buttons within the recipe ui
elements.parent.addEventListener('click', (e) => {
  if (
    e.target.matches('.btn-decrease,.btn-decrease *') &&
    state.recipe.serving > 1
  ) {
    //1 update the servings and ingredient counts
    state.recipe.updateServing('dec');
    //2. update ui
    recipeView.updateCountAndServ(state.recipe);
  } else if (
    e.target.matches('.btn-increase, .btn-increase *') &&
    state.recipe.serving < 27
  ) {
    //1 update the servings and ingredient counts
    state.recipe.updateServing('inc');
    //2. update ui
    recipeView.updateCountAndServ(state.recipe);
  } else if (e.target.matches('.addlist,.addList *')) {
    ListController();
  } else if (e.target.matches('.recipe__love,.recipe__love *')) {
    likesController();
  }
});

//event listeners for updating count and removing items from list

elements.shoping.addEventListener('click', (e) => {
  //firstly we get the unique id of the element clicked
  const uniqueId = e.target.closest('.item').dataset.item;
  // check for the kind of button clicked and then perform the correct action
  if (e.target.matches('.shopping__delete,.shopping__delete *')) {
    //remove from list model
    state.list.removeList(uniqueId);
    //remove from list ui
    removeListUi(uniqueId);
  } else if (e.target.matches('.inputList,.inputList *')) {
    const ListValue = e.target.value;
    state.list.updateCount(uniqueId, ListValue);
  }
});
//event Listener to remove ative status from  likes panel
elements.likesContainer.addEventListener('click', (e) => {
  if (e.target.matches('.likes__link,.likes__link *')) {
    likeView.removeActiveLike();
  }
});

// event listener  for page load

window.addEventListener('load', (e) => {
  //create like on load
  state.like = new Likes();

  //return the locally stored data for the likes
  state.like.returnStored();
  //render
  state.like.likes.forEach((e) => likeView.renderLikes(e));
});
