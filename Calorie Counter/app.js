const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;


//convert user input to number 
function cleanInputString(str) {
    //use regex instead to help with memory and runtime performance
    //check for character set of +, - or a space globally
    const regex = /[+-\s]/g;
    return str.replace(regex, '');
}

function isInvalidInput(str) {
    //check for the letter e case-insensitive as exponent between any digit
    //check for the pattern one or more times
    const regex = /\d+e\d+/i;
    return str.match(regex);
}

//concatenating # sign to value of entryDropdown list
//this will assign an the value as the corresponding ID in our list
function addEntry() {
    //use the dropdown value with the .input-container class to get our specific input we need
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
}

