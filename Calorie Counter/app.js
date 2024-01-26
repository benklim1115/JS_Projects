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
    const regex = /hello/;
    /*
    const strArr = str.split('');
    const cleanStrArr = [];

    //check for characters we don't want

    const badValues = ["+", "-", " "];
    for (let i = 0; i < strArr.length; i++) {
        if (!badValues.includes(strArr[i])) {
            cleanStrArr.push(strArr[i]);
        } 
    }

    const joinedArr = cleanStrArr.join("");

    return joinedArr;
    */
}
