import { elements } from './base';

//public mehod responsible for getting the value inputted into  the text field
export const searchInput = () => elements.searchInput.value;

//public function for clearing the input text field after submitting form
export const clearInputField = () => {
  elements.searchInput.value = '';
};

//public function for clearing the resullt section .

export const clearResults = () => {
  elements.uiList.innerHTML = '';
  elements.pageButton.innerHTML = '';
};

//private function for formatting text

const textFormat = (title, limit = '17') => {
  if (title.length > limit) {
    const newTitle = [];
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= 17) {
        acc += cur.length;
        // console.log(acc);
        newTitle.push(cur);
        return acc;
      }
    }, 0);
    // console.log(newTitle.join(' '));
    return `${newTitle.join(' ')}...`;
  }
  return title;
};

//pivate function for returning the button element
const button = (type, page) => `
<button class="btn-inline results__btn--${type}" data-go="${
  type === 'next' ? page + 1 : page - 1
}">
<span>Page ${type === 'next' ? page + 1 : page - 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${
          type === 'next' ? 'right' : 'left'
        }"></use>
    </svg>
`;

//private function for rendering buttons
const renderButton = (page, noOfRec, numPerPage) => {
  const pages = Math.ceil(noOfRec / numPerPage);
  let buttona;
  if (page === 1 && pages > 1) {
    // button on the right to move to next page
    buttona = button('next', page);
  } else if (page > 1 && page < pages) {
    buttona = `${button('prev', page)}${button('next', page)}`;
    //button that moves both ways
  } else if (page == pages && pages > 1) {
    // button on the left to move to previous page
    buttona = button('prev', page);
  }

  elements.pageButton.insertAdjacentHTML('afterbegin', buttona);
};

//private function for ui rendering used in the renderUi method
const printUi = (recipe) => {
  //html component that would be plugged into ui

  const uiComponent = `<li>
                    <a class="results__link" href="#${recipe.id}">
                        <figure class="results__fig">
                            <img src="https://spoonacular.com/recipeImages/${
                              recipe.image
                            }" alt=${recipe.title}>
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${textFormat(
                              recipe.title
                            )}</h4>
                            <p class="results__author">The chidera innocent Blog</p>
                        </div>
                    </a>
                </li>`;
  // adding component to the list
  elements.uiList.insertAdjacentHTML('beforeend', uiComponent);
};

//public method for  rendering the of the dta into the ui
export const renderUi = (recipeData, page = 1, recPerPage = 10) => {
  const start = (page - 1) * recPerPage;
  const end = page * recPerPage;

  if (recipeData.length < 10) {
    recipeData.forEach(printUi);
  } else {
    //function call for each item of the array that prints it to the uiq
    recipeData.slice(start, end).forEach(printUi);

    // function responsible for adding buttons
    renderButton(page, recipeData.length, recPerPage);
  }
};
