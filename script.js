const bookList = document.getElementById("book-list");
const bookForm = document.getElementById("bookForm");
const searchInput = document.getElementById("search");
// 1️⃣ Fetch and display books
function fetchBooks() {
  fetch('/books')
    .then(res => res.json())
    .then(data => {
      bookList.innerHTML = "";
      data.forEach(book => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${book.title}</strong> by ${book.author}
          <button onclick="editBook(${book.id}, '${book.title}', '${book.author}')">✏️ Edit</button>
          <button onclick="deleteBook(${book.id})">🗑 Delete</button>
        `;
        bookList.appendChild(li);
      });
      applySearchFilter();
    });
}

//  Add new books
bookForm.addEventListener("submit", e => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  fetch('/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author })
  })
  .then(() => {
    bookForm.reset();
    fetchBooks();
  });
});

// 3️⃣ Edit a book
function editBook(id, oldTitle, oldAuthor) {
  const newTitle = prompt("Edit Title:", oldTitle);
  const newAuthor = prompt("Edit Author:", oldAuthor);

  if (newTitle && newAuthor) {
    fetch(`/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, author: newAuthor })
    }).then(() => fetchBooks());
  }
}

// 4️⃣ Delete a book
function deleteBook(id) {
  fetch(`/books/${id}`, { method: 'DELETE' })
    .then(() => fetchBooks());
}

// 5️⃣ Search / filter books
searchInput.addEventListener('input', applySearchFilter);

function applySearchFilter() {
  const term = searchInput.value.toLowerCase();
  const items = document.querySelectorAll('#book-list li');
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(term) ? '' : 'none';
  });
}

// 6️⃣ Initial fetch when page loads
fetchBooks();
