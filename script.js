let myLibrary = [
  { id: 1, title: "Dune", author: "Frank Herbert", pages: 412, isRead: true },
  { id: 2, title: "1984", author: "George Orwell", pages: 328, isRead: false },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    isRead: true,
  },
  {
    id: 4,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 310,
    isRead: false,
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 279,
    isRead: true,
  },
];
function Book(author, title, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(author, title, pages, isRead) {
  const newBook = new Book(author, title, pages, isRead);
  myLibrary.push(newBook);
}

const tbody = document.querySelector("tbody");

function render() {
  tbody.innerHTML = "";
  for (const book of myLibrary) {
    let html = `<tr class='item' data-id=${book.id}>
    <td id="title">${book.title}</td>
    <td id="author">${book.author}</td>
        <td>${book.pages}</td>
    <td><button class="read-btn ${book.isRead ? "read" : ""}">${
      book.isRead ? "Read" : "Unread"
    }</button></td>
    <td><button class='remove-btn'>&times;</button>
    </tr>`;

    tbody.innerHTML += html;
  }
}
render();

const dialog = document.querySelector("dialog");
const openButton = document.querySelector("#open-dialog");
const closeButton = document.querySelector("#close-btn");
const form = document.querySelector("form");

openButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  data.isRead = form.querySelector('[name="isRead"]').checked;

  addBookToLibrary(data.author, data.title, data.pages, data.isRead);
  form.reset();
  dialog.close();
  render();
});

tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const row = e.target.closest("tr");
    const id = Number(row.dataset.id);
    row.remove();
    myLibrary = myLibrary.filter((ele) => ele.id !== id);
  }
});

tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("read-btn")) {
    e.target.classList.toggle("read");
    e.target.textContent = e.target.classList.contains("read")
      ? "Read"
      : "Unread";
    const row = e.target.closest("tr");
    const id = Number(row.dataset.id);
    const book = myLibrary.find((book) => book.id === id);

    book.isRead = e.target.classList.contains("read");
  }
});
