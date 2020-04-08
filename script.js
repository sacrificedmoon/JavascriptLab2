const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=';
const apiKey = localStorage.getItem('accessKey');
const maxAttempts = 10;
let numOfAttempts = 0;
let bookList= [];

document.getElementById('addBookBtn').onclick = addBook();
document.getElementById('getAPIKey').onclick = getAPIKey();

function addBook () {
    numOfAttempts++;
    const addBooksQuery = '&op=insert';
    const bookTitle = document.getElementById('titleForm').value;
    const authorName = document.getElementById('authorForm').value;
    const endpoint = baseUrl + apiKey + addBooksQuery + '&title=' + bookTitle + '&author=' + authorName;
    fetch(endpoint)
    .then((response) => response.json())
    .then((json) => {
        if (json.status != "success" && numOfAttempts < maxAttempts) {
            console.log('Operation failed');
            addBook(bookTitle, authorName);
        } else if (json.status != "success" && numOfAttempts == maxAttempts) {
            console.log('Operation failed after 10 attempts');
        } else {
            viewBooks();
            document.getElementById('bookMessage').innerHTML = (`Book added.`);
            console.log('Operation was a success');
        }
    });
}

function getAPIKey () {
    numOfAttempts++
    let APIUrl = "https://www.forverkliga.se/JavaScript/api/crud.php?requestKey";
    fetch(APIUrl)
        .then((response) => response.json())
        .then((json) => {
            if (json.status != "success" && numOfAttempts < maxAttempts) {
                console.log('Operation failed');
                getAPIKey();
            } else if (json.status != "success" && numOfAttempts == maxAttempts) {
                console.log('Operation failed after 10 attempts');
            } else {
                localStorage.setItem('accessKey', json['key']);
            }
            document.getElementById('keyResult').innerHTML = ('Your key is ' + apiKey);
        });
}


function viewBooks () {
    numOfAttempts++;
    const viewBooksQuery = '&op=select';
    const endpoint = baseUrl + apiKey + viewBooksQuery;
    fetch(endpoint)
    .then(response => response.json())
    .then(json => {
        if (json.status != "success" && numOfAttempts < maxAttempts) {
            console.log('Operation failed');
            viewBooks();
        } else if (json.status != "success" && numOfAttempts == maxAttempts) {
            console.log('Operation failed after 10 attempts');
            document.getElementById('bookMessage').innerHTML = (`Could not load booklist`);
        } else {
            bookList = json['data'];
            let output = '';
            bookList.forEach(function (item) {
                output = '<ul>' +
                    '<li> ID: ' + item.id + '</li>' +
                    '<li> Title: ' + item.bookTitle + '</li>' +
                    '<li> Author: ' + item.authorName + '</li>' +
                    '</ul>';
            });
            document.getElementById('showBooksDiv').innerHTML = (output);
        }   
    });
}
