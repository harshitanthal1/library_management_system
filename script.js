let library = [];

function addBook() {
    const bookId = document.getElementById("book-id").value;
    const bookTitle = document.getElementById("book-title").value;
    const authorName = document.getElementById("author-name").value;

    if (!bookId || !bookTitle || !authorName) {
        alert("Please fill in all fields.");
        return;
    }

    const newBook = {
        id: bookId,
        title: bookTitle,
        author: authorName,
        isBorrowed: false
    };

    library.push(newBook);
    saveLibraryToLocalStorage();
    displayBooks();
    clearInputFields();
}

function displayBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    library.forEach(book => {
        const li = document.createElement("li");
        li.className = "book-item";
        li.innerHTML = `<strong>${book.title}</strong> by ${book.author} (ID: ${book.id})`;

        const borrowBtn = document.createElement("button");
        borrowBtn.textContent = book.isBorrowed ? "Return" : "Borrow";
        borrowBtn.addEventListener("click", () => toggleBorrowStatus(book));
        li.appendChild(borrowBtn);

        bookList.appendChild(li);
    });
}

function toggleBorrowStatus(book) {
    book.isBorrowed = !book.isBorrowed;
    saveLibraryToLocalStorage();
    displayBooks();
}

function searchBook() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const searchResult = library.filter(book => book.title.toLowerCase().includes(searchTerm));

    if (searchResult.length === 0) {
        alert("No matching books found.");
        return;
    }

    displaySearchResult(searchResult);
}

function displaySearchResult(result) {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    result.forEach(book => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${book.title}</strong> by ${book.author} (ID: ${book.id})`;
        bookList.appendChild(li);
    });
}

function clearInputFields() {
    document.getElementById("book-id").value = "";
    document.getElementById("book-title").value = "";
    document.getElementById("author-name").value = "";
}

function saveLibraryToLocalStorage() {
    localStorage.setItem("library", JSON.stringify(library));
}

function loadLibraryFromLocalStorage() {
    const savedLibrary = localStorage.getItem("library");
    if (savedLibrary) {
        library = JSON.parse(savedLibrary);
        displayBooks();
    }
}

document.getElementById("add-book-btn").addEventListener("click", addBook);
document.getElementById("search-btn").addEventListener("click", searchBook);

loadLibraryFromLocalStorage();
