allBooks = [];
class Book{
  constructor(bookObj){
    this.id = bookObj.id;
    this.title = bookObj.title;
    this.description = bookObj.description;
    this.img_url = bookObj.img_url;
    this.users = bookObj.users;
    allBooks.push(this);
  }
  renderTitle(){
    return `
    <li class="book-li" data-id="${this.id}">${this.title}</li><br>
    `
  }

  renderDetail(){
    return `
    <h2>${this.title}</h2>
    <img src="${this.img_url}" alt="">
    <p>${this.description}</p>
    Users:
    <ul>
    ${this.users.map((user) => `<li>${user.username}</li>`).join("")}
    </ul>
    <button type="button" name="button" class="read-book" data-id="${this.id}">Read Book</button>
    `
  }
}
