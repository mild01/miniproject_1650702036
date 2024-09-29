class Library {
  constructor() {
    this.books = [];
    this.nextId = 1;
  }

  add_Book(book) {
    const newBook = { ...book, id: this.nextId++ };
    this.books.push(newBook);
    return newBook;
  }

  list_Books() {
    return this.books;
  }

  search_Books(value) {
    return this.books.filter((book) => book.title.includes(value));
  }

  update_Book(id, updates) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      this.books[bookIndex] = { ...this.books[bookIndex], ...updates };
    }
  }

  deleteBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
  }
}

// Library Instance
const library = new Library();
let editBookId = null; // Track the book being edited

// Add this function in your library.js
function searchBooks() {
  const searchValue = document.getElementById("searchInput").value;
  const filteredBooks = library.search_Books(searchValue);

  // Render the book table with the filtered books
  renderBookTable(filteredBooks);
}

// Modify renderBookTable to accept books as a parameter
function renderBookTable(filteredBooks = library.list_Books()) {
  const tableBody = document.querySelector("#bookTable tbody");
  tableBody.innerHTML = "";

  filteredBooks.forEach((book) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.publishedYear}</td>
            <td>${book.available ? "Yes" : "No"}</td>
            <td>
                <button class="edit-button" data-id="${book.id}">Edit</button>
                <button class="delete-button" data-id="${
                  book.id
                }">Delete</button>
            </td>
        `;
    tableBody.appendChild(row);
  });

  // Add event listeners for Edit and Delete buttons (same as before)
  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      library.deleteBook(id);
      renderBookTable();
    });
  });

  document.querySelectorAll(".edit-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const book = library.list_Books().find((book) => book.id === id);

      document.getElementById("title").value = book.title;
      document.getElementById("author").value = book.author;
      document.getElementById("genre").value = book.genre;
      document.getElementById("publishedYear").value = book.publishedYear;
      document.getElementById("available").checked = book.available;

      // Show the form and change the title to "Edit Book"
      const form = document.getElementById("newBookForm");
      form.style.display = "block";
      const heading = form.querySelector("h2");
      heading.textContent = "Edit Book";
      editBookId = id; // Set the editing book ID
    });
  });
}

// Also, you may want to search when the user types in the input
document.getElementById("searchInput").addEventListener("input", () => {
  searchBooks();
});

// Add event listeners for Edit and Delete buttons
document.querySelectorAll(".delete-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);
    library.deleteBook(id);
    renderBookTable();
  });
});

document.querySelectorAll(".edit-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);
    const book = library.list_Books().find((book) => book.id === id);

    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("genre").value = book.genre;
    document.getElementById("publishedYear").value = book.publishedYear;
    document.getElementById("available").checked = book.available;

    // Show the form and change the title to "Edit Book"
    const form = document.getElementById("newBookForm");
    form.style.display = "block";
    const heading = form.querySelector("h2");
    heading.textContent = "Edit Book";
    editBookId = id; // Set the editing book ID
  });
});

// Handle add or update book form submission
document.getElementById("newBookForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const genre = document.getElementById("genre").value;
  const publishedYear = parseInt(
    document.getElementById("publishedYear").value
  );
  const available = document.getElementById("available").checked;

  if (editBookId) {
    // If editing, update the book
    library.update_Book(editBookId, {
      title,
      author,
      genre,
      publishedYear,
      available,
    });
    editBookId = null; // Reset after update
  } else {
    // If adding new, add the book
    library.add_Book({ title, author, genre, publishedYear, available });
  }

  renderBookTable();

  // Reset form and hide it
  document.getElementById("newBookForm").reset();
  document.getElementById("newBookForm").style.display = "none";
});

function exportBooksToJSON() {
  const dataStr = JSON.stringify(library.list_Books(), null, 2); // Convert books to JSON string
  const blob = new Blob([dataStr], { type: "application/json" }); // Create a Blob object
  const url = URL.createObjectURL(blob); // Create a URL for the Blob
  const a = document.createElement("a"); // Create an anchor element
  a.href = url; // Set the href to the Blob URL
  a.download = "books.json"; // Set the name of the downloaded file
  document.body.appendChild(a); // Append anchor to the body
  a.click(); // Programmatically click the anchor to trigger the download
  document.body.removeChild(a); // Remove the anchor from the document
  URL.revokeObjectURL(url); // Revoke the Blob URL
}

// Add event listener for the export button
document
  .getElementById("exportButton")
  .addEventListener("click", exportBooksToJSON);

// Initial render of book table
renderBookTable();
