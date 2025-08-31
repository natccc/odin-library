let myLibrary = [
  {
    author: "J.K. Rowling",
    title: "Harry Potter",
    pages: 1000,
    read: false,
    id: 1,
  },

  {
    author: "Marijn Haverbeke",
    title: "Eloquent JavaScript",
    pages: 2300,
    read: true,
    id: 2,
  },
];
function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(author, title, pages, read) {
  const newBook = new Book(author, title, pages, read);
  myLibrary.push(newBook);
}

const tbody = document.querySelector("tbody");

function render() {
  tbody.innerHTML = "";
  for (const book of myLibrary) {
    let html = `<tr class='item' data-id=${book.id}>
    <td>${book.title}</td>
    <td>${book.author}</td>
        <td>${book.pages}</td>
    <td><button class='read-btn'>${book.read ? "Read" : "Unread"}</button></td>
    <td><button class='remove'>Remove</button>
    </tr>`;

    tbody.innerHTML += html;
  }
}
render();

const dialog = document.querySelector("dialog");
const openButton = document.querySelector("#open");
const closeButton = document.querySelector("#close");
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

  data.read = form.querySelector('[name="read"]').checked;

  addBookToLibrary(data.author, data.title, data.pages, data.read);
  form.reset();
  dialog.close();
  render();
});

tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const row = e.target.closest("tr");
    const id = Number(row.dataset.id);
    row.remove();
    myLibrary = myLibrary.filter((ele) => ele.id !== id);
  }
});

tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("read-btn")) {
    console.log(e.target.textContent);
    e.target.textContent = e.target.textContent === "Read" ? "Unread" : "Read";
    const row = e.target.closest("tr");
    const id = Number(row.dataset.id);
    const book = myLibrary.find((book) => book.id === id);

    book.read = !book.read;
    console.log(book);
  }
});
