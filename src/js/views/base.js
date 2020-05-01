export const elements = {
  searchButton: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  uiList: document.querySelector('.results__list'),
  loaderClass: 'loader',
  result: document.querySelector('.results'),
  pageButton: document.querySelector('.results__pages'),
  parent: document.querySelector('.recipe'),
  shoping: document.querySelector('.shopping__list'),
  likes: document.querySelector('.likes'),
  likesContainer: document.querySelector('.likes__list'),
};

//aadding loader animation

export const addLoader = (parent) => {
  const iconitem = `<div class=${elements.loaderClass}><svg><use href="./img/icons.svg#icon-cw"></use></svg></div>`;
  parent.insertAdjacentHTML('afterbegin', iconitem);
};
export const removeLoader = () => {
  const loader = document.querySelector(`.${elements.loaderClass}`);
  if (loader) {
    loader.parentNode.removeChild(loader);
  }
};
