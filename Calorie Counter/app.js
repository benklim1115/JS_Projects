const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

//check for character set of +, - or a space globally
function cleanInputString(str) {
    const regex = /[+-\s]/g;
    return str.replace(regex, '');
}

//check for the letter e case-insensitive as exponent between any digit, check for one or more times
function isInvalidInput(str) {
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

    //string to specify position of inserted element, string containing HTML to be inserted
    targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

addEntryButton.addEventListener('click', addEntry);


function getCaloriesFromInputs(list) {
    let calories = 0;

    for (let i = 0; i < list.length; i++) {
        let currVal = list[i].value;
        currVal = cleanInputString(list[i].value);
        let badInputs = isInvalidInput(currVal);
        console.log(currVal);

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

calorieCounter.addEventListener("submit", calculateCalories);


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
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

    if (isError) {
        return;
    }

    //calculate calories
    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const remainingCalories = (budgetCalories - consumedCalories) + exerciseCalories;
    //check if user is in caloric surplus or deficit
    const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";

    //surplusOrDeficit to lowercase to assign class characteristics for if its truthy or falsy
    output.innerHTML = 
    `<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr />
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>
    `;

    output.classList.remove("hide");
}


function clearForm() {
    const inputContainers = Array.from(document.querySelectorAll(".input-container"));
}