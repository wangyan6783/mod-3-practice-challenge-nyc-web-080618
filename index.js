document.addEventListener("DOMContentLoaded", function() {
  const listUl = document.querySelector("#list");
  const showPanel = document.querySelector("#show-panel");
  const likeButton = document.querySelector("BUTTON");

  fetch("http://localhost:3000/books")
  .then(response => response.json())
  .then(bookObj =>
    listUl.innerHTML = bookObj.map((book) => {
    let newBook = new Book(book);
    return newBook.renderTitle();
  }).join(""))

  document.addEventListener("click", () => {
    if (event.target.className === "book-li") {
      // let bookId = parseInt(event.target.dataset.id);
      let bookId = event.target.dataset.id;
      let clickedBook = Book.find(bookId);
      showPanel.innerHTML = clickedBook.renderDetail();
    }

    if (event.target.className === "like-book") {
      // let bookId = parseInt(event.target.dataset.id);
      let bookId = event.target.dataset.id;
      let clickedBook = Book.find(bookId);
      if (event.target.innerText === "Like Book"){
        event.target.innerText = "Unlike Book"
        let newUsers = [...clickedBook.users, {id: 1, username: "pouros"}]
        fetch(`http://localhost:3000/books/${bookId}`, {
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            users: newUsers
          })
        })
        .then(response => response.json())
        .then(data => {
          clickedBook.users = data.users;
          showPanel.innerHTML = clickedBook.renderDetail();
        })
        .catch(error => console.error("here is your error", error))
      } else {
        event.target.innerText = "Like Book"
        let newUsers = clickedBook.users.filter(user => user.id !== 1)
        fetch(`http://localhost:3000/books/${bookId}`, {
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            users: newUsers
          })
        })
        .then(response => response.json())
        .then(data => {
          clickedBook.users = data.users;
          showPanel.innerHTML = clickedBook.renderDetail()
        })
        .catch(error => console.error("here is your error", error))
      }
    }
  })
});
