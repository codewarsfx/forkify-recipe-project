import { elements } from './base';
export const toggleLike = (isLiked) => {
  const likeSvg = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document
    .querySelector('.recipe__love use')
    .setAttribute('href', `img/icons.svg#${likeSvg}`);
};

export const toggleLikeMenu = (numberOfLikes) => {
  elements.likes.style.visibility = numberOfLikes > 0 ? 'visible' : 'hidden';
};

export const renderLikes = (like) => {
  const likeUi = `      <li>
                            <a class="likes__link" href="#${like.id}">
                                <figure class="likes__fig">
                                    <img src="${like.img}" alt="${like.img}">
                                </figure>
                                <div class="likes__data">
                                    <h4 class="likes__name">${like.title}</h4>
                                    <p class="likes__author">The Pioneer Woman</p>
                                </div>
                            </a>
                        </li>`;

  elements.likesContainer.insertAdjacentHTML('beforeend', likeUi);
};

export const removeFromUi = (id) => {
  const uiElement = document.querySelector(`.likes__link[href *="${id}"]`);
  uiElement.parentNode.removeChild(uiElement);
};

export const removeActiveLike = () => {
  const el = document.querySelectorAll('.likes__link');
  Array.from(el).forEach((el) => {
    el.classList.remove('results__link--active');
  });
};
