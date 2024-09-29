import { Library } from "./library";
import { Genre } from "./book";

const myLibrary = new Library();

// Adding books
myLibrary.add_Book({
  title: "Book One",
  author: "Author A",
  genre: Genre.Fiction,
  publishedYear: 2020,
  available: true,
});
myLibrary.add_Book({
  title: "Book Two",
  author: "Author B",
  genre: Genre.NonFiction,
  publishedYear: 2019,
  available: false,
});

// Save to file
myLibrary.saveToFile("books.json");

// Create a new library instance and load from file
const newLibrary = new Library();
newLibrary.loadFromFile("books.json");

// List books to confirm loading
newLibrary.list_Books();
