const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serves frontend HTML from public/

// 🔹 In-memory book list
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Atomic Habits", author: "James Clear" }
];

// 🔹 Home route (optional)
app.get('/', (req, res) => {
  res.send('Hello from the Book API!');
});

// 🔹 GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// 🔹 POST new book (👉 PLACE THIS HERE)
app.post('/books', (req, res) => {
  const newBook = { id: Date.now(), ...req.body };
  books.push(newBook);
  console.log(books); // Debug: log the books list to terminal
  res.status(201).json(newBook);
});

// 🔹 PUT to update a book
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.map(book => book.id === id ? { ...book, ...req.body } : book);
  res.json({ message: "Book updated", books });
});

// 🔹 DELETE a book
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(book => book.id !== id);
  res.json({ message: "Book deleted", books });
});

// 🔹 Start server
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
