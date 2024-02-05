const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;


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

//concatenating # sign to value of entryDropdown list, assigning value as ID
function addEntry() {
    //use the dropdown value with the .input-container class to get our specific input we need
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    //grab all of our text inputs, return a nodelist to track number of entries
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
    //dynamically create labels and inputs for the name and calories of each meal added
    const HTMLString = 
    `<label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label> 
    <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name" />
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories">`;

    //takes two arguments: 
    //string to specify position of inserted element, string containing HTML to be inserted
    targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

//adding event listener for button, passing function as reference to run on click
addEntryButton.addEventListener('click', addEntry);


//get calorie count from user entries
function getCaloriesFromInputs(list) {
    let calories = 0;

    //loop through nodelist of inputs, clean inputs, filter out bad inputs
    for (let i = 0; i < list.length; i++) {
        let currVal = list[i].value;
        currVal = cleanInputString(list[i].value);
        let badInputs = isInvalidInput(currVal);
        console.log(currVal);
        //if we have bad inputs display this to the user,
        if (badInputs) {
            alert(`Invalid Input: ${badInputs[0]}`);
            isError = true;
            return null;
        }

        calories += Number(currVal);
        console.log(`Calorie Count: ${calories}`);
    }

    return calories;
}

//event listener function, attaching to submit event
function calculateCalories(e) {
    preventDefault(e);
    isError = false;

    //track all of our inputs to be calculated
    const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
    const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
    const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
    const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
    const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

    //run all inputs through function to get calories from them
    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
}

