export default class Likes {
  constructor() {
    this.likes = [];
  }
  addNewLike(img, title, id) {
    const like = {
      img,
      title,
      id,
    };
    this.likes.push(like);
    this.storeDataLocally();
    return like;
  }
  removeLike(id) {
    const indexLike = this.likes.findIndex((el) => el.id === id);
    this.likes.splice(indexLike, 1);
    this.storeDataLocally();
  }
  isLiked(id) {
    return !(this.likes.findIndex((el) => el.id === id) === -1);
  }
  countLikesLength() {
    return this.likes.length;
  }
  storeDataLocally() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }
  returnStored() {
    const data = JSON.parse(localStorage.getItem('likes'));
    if (data) this.likes = data;
  }
}
