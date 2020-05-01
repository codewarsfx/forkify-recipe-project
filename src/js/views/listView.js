import { elements } from './base';

//public method for rendering list item
export const renderlistUi = (item) => {
  //create ui component
  const listUi = `
    <li class="shopping__item item" data-item="${item.id}" >
    <div class="shopping__count">
        <input type="number" value="${item.count}" class="inputList" step="${item.count}"  >
        <p>${item.unit}</p>
    </div>
    <p class="shopping__description">${item.ingredient}</p>
    <button class="shopping__delete btn-tiny " >
        <svg>
            <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
    </button>
    </li>`;

  //add component to ui

  elements.shoping.insertAdjacentHTML('beforeend', listUi);
};

//public method for removing list from interface
export const removeListUi = (id) => {
  //find element node with the giveen id
  const listElement = document.querySelector(`[data-item="${id}"]`);
  //remove element from ui
  listElement.parentNode.removeChild(listElement);
};
//clearing list
export const clearList = () => {
  elements.shoping.innerHTML = '';
};
