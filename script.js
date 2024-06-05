// script.js

let books = {};
let borrowed_books = {};

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}

function addBook() {
  const bookId = parseInt(document.getElementById('book-id').value);
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const messageElement = document.getElementById('add-book-message');

  if (books[bookId]) {
    messageElement.textContent = "Book already exists!";
    return;
  }

  books[bookId] = { title, author, available: true };
  messageElement.textContent = "Book added successfully!";
}

function viewBooks() {
  const booksList = document.getElementById('books-list');
  booksList.innerHTML = '<div><strong>Book ID</strong> | <strong>Title</strong> | <strong>Author</strong></div>';

  if (Object.keys(books).length === 0) {
    booksList.innerHTML += '<div>No books in the library yet!</div>';
    return;
  }

  for (const bookId in books) {
    const book = books[bookId];
    booksList.innerHTML += `<div>${bookId} | ${book.title} | ${book.author}</div>`;
  }
}

function borrowBook() {
  const bookId = parseInt(document.getElementById('borrow-book-id').value);
  const borrowerName = document.getElementById('borrower-name').value;
  const messageElement = document.getElementById('borrow-book-message');

  if (!books[bookId]) {
    messageElement.textContent = "Book not found!";
    return;
  }

  if (!books[bookId].available) {
    messageElement.textContent = "Book is already borrowed!";
    return;
  }

  books[bookId].available = false;
  borrowed_books[bookId] = borrowerName;
  messageElement.textContent = "Book borrowed successfully!";
}

function returnBook() {
  const bookId = parseInt(document.getElementById('return-book-id').value);
  const messageElement = document.getElementById('return-book-message');

  if (!borrowed_books[bookId]) {
    messageElement.textContent = "Book not borrowed!";
    return;
  }

  books[bookId].available = true;
  delete borrowed_books[bookId];
  messageElement.textContent = "Book returned successfully!";
}

// Attach viewBooks to the button click
document.querySelector('button[onclick="showSection(\'view-books\')"]').addEventListener('click', viewBooks);
