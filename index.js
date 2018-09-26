document.addEventListener("DOMContentLoaded", function() {
  const listUl = document.querySelector("#list");
  const showPanel = document.querySelector("#show-panel");
  const readBookBtn = document.querySelector("#read-book");

  fetch("http://localhost:3000/books")
  .then(response => response.json())
  .then(bookObj =>
    listUl.innerHTML = bookObj.map((book) => {
    let newBook = new Book(book);
    return newBook.renderTitle();
  }).join(""))

  document.addEventListener("click", () => {
    if (event.target.className === "book-li") {
      let bookId = parseInt(event.target.dataset.id);
      let clickedBook = allBooks.find((book) => book.id === bookId);
      showPanel.innerHTML = clickedBook.renderDetail();
      // debugger
    }

    // fetch(`http://localhost:3000/books/9`, {
    //   method: "PATCH",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     users: [
    //   {
    //     "id": 8,
    //     "username": "goodwin"
    //   },
    //   {
    //     "id": 6,
    //     "username": "steuber"
    //   },
    //   {
    //     "id": 5,
    //     "username": "king"
    //   }
    // ]
    //   })
    // })


    if (event.target.className === "read-book") {
      let bookId = parseInt(event.target.dataset.id);
      let clickedBook = allBooks.find((book) => book.id === bookId);
      let currentUsers = clickedBook.users;
      if (!currentUsers.some(user => user.id === 1)){
        clickedBook.users.push({id: 1, username: "pouros"})
        fetch(`http://localhost:3000/books/${bookId}`, {
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            users: currentUsers
          })
        })
        .then(response => response.json())
        .then(data => showPanel.innerHTML = clickedBook.renderDetail())
      } else {
        alert("You read this already!")
      }
    }
  })

});
