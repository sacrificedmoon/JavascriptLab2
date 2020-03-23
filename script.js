const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + apiKey;
var apiKey;
const maxAttempts = 10;
let numOfAttempts = 0;

function getAPIKey () {
    let APIUrl = "https://www.forverkliga.se/JavaScript/api/crud.php?requestKey";
    let apiKeyResult = document.getElementById("keyResult");
    fetch(APIUrl)
        .then((response) => response.json())
        .then((jsonResponse) => {apiKeyResult.innerHTML = jsonResponse.key; apiKey = jsonResponse.key});
};