const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=';
var apiKey;
const maxAttempts = 10;
let numOfAttempts = 0;
let bookList= [];

function getAPIKey () {
    let APIUrl = "https://www.forverkliga.se/JavaScript/api/crud.php?requestKey";
    let apiKeyResult = document.getElementById("keyResult");
    fetch(APIUrl)
        .then((response) => response.json())
        .then((jsonResponse) => {apiKeyResult.innerHTML = jsonResponse.key; apiKey = jsonResponse.key});
};

function addBook () {
    const addBooksQuery = '&op=insert';
    let bookTitle = document.getElementById('titleForm').value;
    let authorName = document.getElementById('authorForm').value;
    const endpoint = baseUrl + apiKey + addBooksQuery + '&title=' + bookTitle + '&author=' + authorName;
    fetch(endpoint)
    .then((response) => response.json())
    .then(json => {
        if (json.status === 'success') {
            document.getElementById('bookMessage').innerHTML = 'Succesfully added a book';
            viewBooks();
        } else {
            document.getElementById('bookMessage').innerHTML = 'Failed to add a book';
        }
    })
};

function viewBooks () {
    const viewBooksQuery = '&op=select';
    const endpoint = baseUrl + apiKey + viewBooksQuery;
    fetch(endpoint)
    .then(response => response.json())
    .then(json => {
        if(json.status === 'success') {            
            bookList = jsonResponse['data'];
            let output = '';
            bookList.forEach(function (element) {
                output += '<ul>' +
                    '<li> ID: ' + element.id + '</li>' +
                    '<li> Title: ' + element.title + '</li>' +
                    '<li> Author: ' + element.author + '</li>' +
                    '</ul>'; });
            document.getElementById('showBooksDiv').innerHTML = output;		
        }
    });
}

document.getElementById("viewBooksBtn").addEventListener("click", viewBooks());
document.getElementById("addBookBtn").addEventListener("click", addBook());
document.getElementById("getAPIKey").addEventListener("click", getAPIKey());