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
  
  const planetName = prompt("Enter a planet name (e.g., Mars, Earth, Jupiter):");
  
  if (!planetName) {
    displayQuote("No planet entered. Please try again.");
    return;
  }
  
  try {

    const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${planetName.toLowerCase()}`);
    if (!response.ok) throw new Error("Planet not found. Check spelling and try again.");

    const data = await response.json();

    const facts = `
    Name: ${data.englishName}
    Mass: ${data.mass.massValue} × 10^${data.mass.massExponent} kg
    Gravity: ${data.gravity} m/s² 
    Mean Radius: ${data.meanRadius} km 
    Density: ${data.density} g/cm³ 
    Number of Moons: ${data.moons ? data.moons.length : 0} 
    Discovery Date: ${data.discoveryDate || "Unknown"} 
    `;

    displayQuote(facts);

  } catch (error) {
    displayQuote("Error: " + error.message);
  }
}

function displayQuote(text) {
  
  document.getElementById("js-fact-text").textContent = text;
}

// Add a new variable that holds the API endpoint: 
// const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";
// https://trivia.cyberwisp.com/getrandomchristmasquestion
// Change the getQuote function to use the fetch method to get a random quote from that endpoint.


// If successful, output the quote to the console
// If it fails, output an error message to the console AND via alert
// Write a second function called "displayQuote" that will display the text of a fetched quote in the HTML element with an id of js-quote-text.
// Adjust getQuote to run displayQuote at the proper place in the code.
// Notice when you refresh that a quote isn't displayed. Fix that.