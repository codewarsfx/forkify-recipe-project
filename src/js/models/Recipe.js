import { apiKey } from '../config';
import axios from 'axios';

export default class {
  constructor(id) {
    this.id = id;
  }
  async getRecipe() {
    //perform the api call
    try {
      const recipeData = await axios(
        `https://api.spoonacular.com/recipes/${this.id}/information?includeNutrition=false&apiKey=${apiKey}`
      );
      this.title = recipeData.data.title;
      this.image = recipeData.data.image;
      this.ingredients = recipeData.data.extendedIngredients;
      this.url = recipeData.data.sourceUrl;
    } catch (e) {
      alert(
        `the following error Occured while loading resource : ${e.message} `
      );
    }
  }

  evalIngredients() {
    let ingredientObj;
    this.ingredients = this.ingredients.map((cur) => {
      ingredientObj = {
        count: cur.amount,
        unit: cur.unit,
        ingredientName: cur.name,
      };
      return ingredientObj;
    });
  }
  calculateServingTime() {
    const numberOfIngredients = Math.ceil(this.ingredients.length / 3);
    this.timeOfServing = numberOfIngredients * 15;
  }
  calculateServing() {
    this.serving = 4;
  }
  updateServing(type) {
    const newServing = type === 'inc' ? this.serving + 1 : this.serving - 1;
    this.ingredients.forEach((el, i) => {
      el.count *= newServing / this.serving;
    });
    this.serving = newServing;
  }
}
