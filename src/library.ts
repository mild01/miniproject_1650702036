import { Book, Genre } from "./book";
import * as fs from "fs";

export class Library {
  private books: Book[] = [];
  private nextId: number = 1;

  add_Book(book: Omit<Book, "id">): Book {
    const newBook = { ...book, id: this.nextId++ };
    this.books.push(newBook);
    return newBook;
  }

  list_Books(): void {
    this.books.forEach((book) => console.log(book));
  }

  search_Books<K extends keyof Book>(value: Book[K]): Book[] {
    return this.books.filter((book) => book["title"] === value);
  }

  update_Book(id: number, updates: Partial<Omit<Book, "id">>): void {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      this.books[bookIndex] = { ...this.books[bookIndex], ...updates };
    }
  }

  deleteBook(id: number): void {
    this.books = this.books.filter((book) => book.id !== id);
  }

  saveToFile(filename: string): void {
    fs.writeFileSync(filename, JSON.stringify(this.books, null, 2));
    console.log(`Books saved to ${filename}`);
  }

  // Method to load books from a JSON file
  loadFromFile(filename: string): void {
    if (fs.existsSync(filename)) {
      const data = fs.readFileSync(filename, "utf8");
      this.books = JSON.parse(data);
      console.log(`Books loaded from ${filename}`);
    } else {
      console.log(`File ${filename} does not exist.`);
    }
  }
}
