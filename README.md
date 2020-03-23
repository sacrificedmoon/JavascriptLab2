Lab 2 - JavaScript
Ni ska skapa en webbsida där man kan spara sina favoritböcker. Laborationen ska utföras två och två. Syftet är att träna på DOM-manipulation och AJAX med JavaScript, utan stöd av frameworks eller libraries. (Dvs jQuery, axios.js m.fl. inte tillåtna)
Uppgiften
Ni ska göra en webbsida som visar en lista med böcker. Till er hjälp har ni ett API, med dokumentation här: https://www.forverkliga.se/JavaScript/api/crud.php 
API:et har funktioner som motsvarar SQL insert, select, update och delete. Varje operation returnerar ett svar i JSON-format, som talar om ifall operationen har lyckats eller inte. Efter att ni har fått svar från API:et ska ni tala om för användaren om operationen misslyckades, eller om den lyckades och efter hur många försök.

Sidan ska vara en Single Page App (SPA) dvs inga länkar till andra HTML-filer, utan alla förändringar på sidan ska göras med JavaScript.

Ge användaren möjlighet att begära en ny API-nyckel. Ni kan spara den senaste i koden eller med localStorage.

Det ska finnas ett formulär för att lägga till en ny bok.

Existerande böcker ska visas i en lista med titel och författare.

Det ska finnas ett formulär för att ändra en bok i listan. (VG)

Det ska finnas en funktion för att ta bort en bok ur listan. (VG)

Den som vill ha en extra utmaning (inte betygsatt) kan implementera ett filter: en textruta där man skriver text; listan med böcker uppdateras så att bara de böcker som matchar texten visas. Görs bäst med higher order functions.

Tips:
börja med att göra en skiss över hur ni tänker er att sidan ska se ut. Visa den för en annan grupp, så är det större chans att ni förstår uppgiften rätt och gör ett funktionellt gränssnitt.
testa API-funktionerna genom att skriva in en URL med querystring i webbläsarens adressfält
utnyttja handledningstiden till att fråga om hjälp
felsökning: använd console.log(string) för att skriva ut värdet på variabler, med informativa meddelanden

Inlämning
Skicka en länk till webbsidan till läraren i ett gruppmeddelande på slack. Webbsidan ska vara publicerad på GitHub Pages. Se till att läsa igenom betygskriterierna en extra gång innan du lämnar in.
Inlämnad laboration ska redovisas för läraren på lektionstid, inom en vecka.
Betygskriterier

För godkänt krävs
webbsidans HTML validerar utan varken fel eller varningar
inga JavaScript-fel visas i konsolen
webappen kan begära en API-nyckel
webappen använder DOM-manipulation och AJAX med Fetch
alla AJAX-anrop som misslyckas upprepas tills de går igenom (men maximalt 10 gånger)
webappen kan lägga till böcker och visa en lista med alla böcker
projektet versionshanteras med Git
webbsidan ligger på internet (förslagsvis GitHub Pages)

För väl godkänt krävs dessutom
inga JavaScript-varningar visas i konsolen
användaren informeras när en operation har lyckats eller misslyckats
webappen kan ändra och ta bort böcker
formulärelement är bara synliga när de behövs
använder flera JavaScript-events än bara click 
.
