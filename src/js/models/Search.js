import axios from 'axios';
import { apiKey } from '../config';
export default class {
  constructor(query) {
    this.query = query;
  }

  async getRecipes() {
    try {
      const recipeToReturn = 30;
      const recipeData = await axios(
        `https://api.spoonacular.com/recipes/search?query=${this.query}&number=${recipeToReturn}&apiKey=${apiKey}`
      );

      this.recipes = recipeData.data.results;
    } catch (error) {
      alert(error);
    }
  }
}
