let apiKey = localStorage.getItem('accessKey');
let baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + apiKey;
let maxAttempts = 10;
let numOfAttempts = 0;
let bookList;
let savedBooks;
let bookMessage; 
let bookTitle;
let authorName;
let fetchBooks = baseUrl + '&op=select';
let APIUrl = "https://www.forverkliga.se/JavaScript/api/crud.php?requestKey";
let addBooksQuery = baseUrl + '&op=insert' + '&title=' + bookTitle + '&author=' + authorName;

window.addEventListener('load', () => {
    savedBooks = document.getElementById('savedBooks');
    bookMessage = document.getElementById('statusReport')
    bookTitle = document.getElementById('titleForm').value;
    authorName = document.getElementById('authorForm').value;
})

function getAPIKey () {
    fetch(APIUrl)
        .then((response) => response.json())
        .then((json) => {
            if (json.status === "success") {
                apiKey = json.key;
                document.getElementById('keyResult').innerHTML = ('Your key is ' + apiKey);
                savedBooks.innerHTML = '';
            }
            
        });
}

function viewBooks () {
    if (savedBooks !== null) {
        savedBooks.innerHTML = '';
    }
    fetch(fetchBooks)
    .then(response => 
        response.json())
    .then(json => {
        if (json.status === 'success') {
            bookList = [];
            json.data.forEach(element => {
                bookList.push({
                    title: element.title, author: element.author, id: element.id
                });
                savedBooks.innerHTML = '';
                for(let i=0; i < bookList.lenght; i++) {
                  let id = bookList[i].id;
                  let author = bookList[i].author;
                  let title = bookList[i].title;
                  let createLi = document.createElement('li');
                  createLi.innerHTML = ' | ' + id + ' | ' + author + ' | ' + title + ' | ';
                  savedBooks.appendChild(createLi);
                }
            });
        } else {
           console.log('Failed');
           return viewBooks(numOfAttempts++);
        } 
          
    })
}

function addBook () {
    numOfAttempts++;
    if (numOfAttempts >= maxAttempts) {
        bookMessage.innerHTML = 'Failed to add book';
    } 
    fetch(addBooksQuery)
    .then((response) => response.json())
    .then((json) => {
        if (json.status === 'success') {
            bookMessage.innerHTML = (`Book added.`);
            console.log('Operation was a success');
            document.getElementById('titleForm').value = '';
            document.getElementById('authorForm').value = '';
            numOfAttempts = 0;
        } else {
           return addBook(); 
        }
    });
}

