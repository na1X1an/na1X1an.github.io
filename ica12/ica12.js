// Select the new quote button using a querySelector. Assign it to a new variable.
const newQuote = document.querySelector("#js-new-quote");
const getAnswer = document.querySelector("#js-tweet");
let currentAnswer = '';
// Write an event listener to check if the button is clicked. When the button is clicked, run a function called "getQuote".
newQuote.addEventListener('click', getQuote);
getAnswer.addEventListener('click', displayAnswer);
const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

// Write the function declaration, and check the button click works by returning a message in the console everytime the button is clicked.
async function getQuote() {
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent = '';
    //console.log("testing get quote");
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }

        const json = await response.json();
        // console.log(json.question);
        // console.log(json.answer);
        displayQuote(json.question);
        currentAnswer = json.answer;
    }
    catch {
        console.log(err);
        alert('Failed to fetch trivia');
    }
    
}

function displayQuote(quote) {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;
}

function displayAnswer() {
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent = currentAnswer;
}

getQuote();

// Add a new variable that holds the API endpoint: 
// const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";
// https://trivia.cyberwisp.com/getrandomchristmasquestion
// Change the getQuote function to use the fetch method to get a random quote from that endpoint.


// If successful, output the quote to the console
// If it fails, output an error message to the console AND via alert
// Write a second function called "displayQuote" that will display the text of a fetched quote in the HTML element with an id of js-quote-text.
// Adjust getQuote to run displayQuote at the proper place in the code.
// Notice when you refresh that a quote isn't displayed. Fix that.