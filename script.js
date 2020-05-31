let APIKey;
let baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + APIKey;
let apiKeyLabel = document.getElementById('keyResult');
let savedBooks;
let bookMessage;
let authorName;
let bookTitle;
let newAuthorName;
let newBookTitle;
let bookList;
let viewRequest = baseUrl + '&op=select';
let addRequest = baseUrl + '&op=insert' + '&title=' + newBookTitle + '&author=' + newAuthorName;
let APIUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
let maxAttempts = 10;
let numOfAttempts = 0;

window.addEventListener('load', () => {
    savedBooks = document.getElementById('savedBookList');
    apiKeyLabel = document.getElementById('keyResult');
    authorName = document.getElementById('authorForm');
    bookTitle = document.getElementById('titleForm');
    bookMessage = document.getElementById('statusReport');
    });

function getAPIKey () {
    fetch(APIUrl)
        .then(response => {
            return response.json()
        })
        .then((json) => {
            if (json.status === 'success') {
                APIKey = json.key;
                baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + APIKey;
                viewRequest = baseUrl + '&op=select';
                apiKeyLabel.innerHTML = `Your API-Key is: ${APIKey}`;
                savedBookList.innerHTML = '';
            }
        })
}

function viewBooks () {
    fetch(viewRequest)
        .then(response => 
            response.json())
        .then(json => {
            if(json.status === 'success') {
                bookList = [];
                json.data.forEach(element => {
                    bookList.push({
                        title: element.title, author: element.author, id: element.id
                    });
                    savedBookList.innerHTML = '';
                    for(let i=0; i<bookList.length; i++) {
                        let id = bookList[i].id;
                        let author = bookList[i].author;
                        let title = bookList[i].title;
                        let createNewLi = document.createElement('li');
                        createNewLi.innerHTML = ' | ' + id + ' | ' + author + ' | ' + title + ' | ';
                        savedBookList.appendChild(createNewLi);
                    }
                });
            } else {
                return viewBooks(numOfAttempts ++);
            }
            numOfAttempts = 0;
        })
}

function addBook () {
    if(maxAttempts >= 10) {
        bookMessage.innerHTML = 'Failed to add the book.';
    }
    const newBookTitle = '&title=' + bookTitle.value;
    const newAuthorName = '&author=' + authorName.value;
    let request = baseUrl + '&op=insert' + newBookTitle + newAuthorName;
    fetch(request)
    .then(response => response.json())
    .then(json => {
        if(json.status === 'success') {
            bookMessage.innerHTML = `Succesfully added book!`;
            bookTitle.value = '';
            authorName.value = '';
            maxAttempts = 0;
        } else {
            return addBook(maxAttempts++);
        }
    })
}