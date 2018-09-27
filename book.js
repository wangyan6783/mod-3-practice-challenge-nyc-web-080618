let allBooks = [];

class Book {
  static all(){
    return allBooks;
  }

  static find(id){
    return allBooks.find((book) => book.id == id);
  }

  constructor(bookObj){
    this.id = bookObj.id;
    this.title = bookObj.title;
    this.description = bookObj.description;
    this.img_url = bookObj.img_url;
    this.users = bookObj.users;
    allBooks.push(this);
    // Book.all.push(this);
  }

  renderTitle(){
    return `
    <li class="book-li" data-id="${this.id}">${this.title}</li><br>
    `
  }

  renderDetail(){
    if (this.users.some(user => user.id === 1)) {
      return `
      <h2>${this.title}</h2>
      <img src="${this.img_url}" alt="">
      <p>${this.description}</p>
      Users:
      <ul>
      ${this.users.map((user) => `<li>${user.username}</li>`).join("")}
      </ul>
      <button type="button" name="button" class="like-book" data-id="${this.id}">Unlike Book</button>
      `
    } else {
      return `
      <h2>${this.title}</h2>
      <img src="${this.img_url}" alt="">
      <p>${this.description}</p>
      Users:
      <ul>
      ${this.users.map((user) => `<li>${user.username}</li>`).join("")}
      </ul>
      <button type="button" name="button" class="like-book" data-id="${this.id}">Like Book</button>
      `
    }
  }
}
