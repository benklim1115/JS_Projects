//variables 
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text"); 
const xpText = document.querySelector("#xpText"); 
const healthText = document.querySelector("#healthText"); 
const goldText = document.querySelector("#goldText"); 
const monsterStats = document.querySelector("#monsterStats"); 
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

//all my images I will need
const townImage = document.querySelector("#town_image");
const shopImage = document.querySelector("#shop_image");
const caveImage = document.querySelector("#cave_image");
const beastImage = document.querySelector("#beast_image");
const slimeImage = document.querySelector("#slime_image");
const dragonImage = document.querySelector("#dragon_image");

//all our weapons
const weapons = [
{
    name: "stick",
    power: 5   
},
{
    name: "dagger",
    power: 30  
},
{
    name: "claw hammer",
    power: 50  
},
{
    name: "sword",
    power: 100  
}];

//all of our monsters
const monsters = [
{
    name: "slime",
    level: 2,
    health: 15
},
{
    name: "fanged beast",
    level: 8,
    health: 60
},
{
    name: "dragon",
    level: 20,
    health: 300
}];

//all the locations we have and their functions 
const locations = [
{
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
},
{
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
},
{
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
},
{
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
},
{
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: "The monster screams \"Arg!\" as it dies. You gain experience points and find gold."
},
{
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. ☠️"
},
{
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeated the dragon! YOU WIN THE GAME! 🎉"
},
{
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
}];

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//locations
function goTown() {
    update(locations[0]);
    shopImage.style.display = "none";
    townImage.style.display = "block";
    caveImage.style.display = "none";
    beastImage.style.display = "none";
    slimeImage.style.display = "none";
    dragonImage.style.display = "none";
}

function goStore() {
    update(locations[1]);
    shopImage.style.display = "block";
    townImage.style.display = "none";
    caveImage.style.display = "none";
    beastImage.style.display = "none";
    slimeImage.style.display = "none";
    dragonImage.style.display = "none";
}

function goCave() {
    update(locations[2]);
    shopImage.style.display = "none";
    townImage.style.display = "none";
    caveImage.style.display = "block";
    beastImage.style.display = "none";
    slimeImage.style.display = "none";
    dragonImage.style.display = "none";
}

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

//store actions
function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "You do not have enough gold to buy health."
    }
}

function buyWeapon() {
    //check if we have the best weapon
    if (currentWeapon < 3) {
        //check if the currentWeapon is less than the weapons index
        if (currentWeapon < weapons.length - 1) {
            gold -= 30;
            currentWeapon++;
            let newWeapon = weapons[currentWeapon].name;
            goldText.innerText = gold;
            text.innerText = `You now have a ${newWeapon}.`;
            inventory.push(newWeapon);
            text.innerText += ` In your inventory you have: ${inventory}`;
        } else {
            text.innerText = "You do not have enough gold to buy a weapon.";
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon;
        currentWeapon = inventory.shift();
        text.innerText = `You sold a ${currentWeapon}.`;
        text.innerText += ` In your inventory you have: ${inventory}`;
    } else {
        text.innerText = "You can't sell your only weapon!";
    }
}

//have picture show up here for monster? Pass into goFight function?
//fighting monsters and fighting actions
function goFight() {
    //alter the buttons to show we are fighting, 
    //assign the specific monster and display the monster stats
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    //change the text for these id's to reflect whats in the monsters object
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

//show picture of each monster when we fight them?
//add audio snippets for each when they show up
function fightSlime() {
    fighting = 0;
    goFight();
    shopImage.style.display = "none";
    townImage.style.display = "none";
    caveImage.style.display = "none";
    beastImage.style.display = "none";
    slimeImage.style.display = "block";
    dragonImage.style.display = "none";
}

function fightBeast() {
    fighting = 1;
    goFight();
    shopImage.style.display = "none";
    townImage.style.display = "none";
    caveImage.style.display = "none";
    beastImage.style.display = "block";
    slimeImage.style.display = "none";
    dragonImage.style.display = "none";
}

function fightDragon() {
    fighting = 2;
    goFight();
    shopImage.style.display = "none";
    townImage.style.display = "none";
    caveImage.style.display = "none";
    beastImage.style.display = "none";
    slimeImage.style.display = "none";
    dragonImage.style.display = "block";
}

//break up into two functions so that we can separate the monster and person attacking?
//my function, in case i want to tinker with this in the future
/*
function attack() {
    //can we first declare the damage dealt outside the conditional?
    let damageDealt = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    //only allow this attack to happen if the monster has health left
    if(monsterHealth >= 0) {
        //see if we can stop the value going into the negative for attacking the monster
        if(damageDealt > monsterHealth) {
            text.innerText = `The ${monsters[fighting].name} attacks.`;
            text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
            //make sure we can't continue to lose health after we beat a monster
            if(monsterHealth !== 0) {
                health -= monsters[fighting].level;
            }
            //subtract from monster health with weapon power, add random value times xp
            monsterHealth = 0;
            healthText.innerText = health;
            monsterHealthText.innerText = monsterHealth;
        } else {
            text.innerText = `The ${monsters[fighting].name} attacks.`;
            text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
            health -= monsters[fighting].level;
            monsterHealth -= damageDealt;
            healthText.innerText = health;
            monsterHealthText.innerText = monsterHealth;
        }
    }
    //call this lose function here?
    if (health <= 0) {
        lose();
    }
}
*/

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= getMonsterAttackValue(monsters[fighting].level);
    //did we hit the monster variance
    if (isMonsterHit()) {
        //subtract from monster health with weapon power, add random value times xp
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    } else {
        text.innerText += " You miss!";
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    //check to see if our health is at 0 otherwise,
    //check if we won the game or beat monster
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }
    //see if our weapon breaks or not, pop the current weapon off inventory
    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += ` Your ${inventory.pop()} breaks.`;
        currentWeapon--;
    }
}

//variance to monster's attack damage, monster level * 5 - our xp level. 
//as we get stronger the strength of their attacks should lessen
function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    //check to make sure attack doesn't add to our health if our xp is too high
    return hit > 0 ? hit : 0;
}

function dodge() {
    text.innerText = "You dodged the attack from the " + monsters[fighting].name;
}

function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}

//end fight functions
//adds gold, xp and updates button text
function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function restart() {
    //restart the game with the original criteria
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    xpText.innerText = xp;
    healthText.innerText = health;
    goldText.innerText = gold;
    goTown();
}

//easter egg functions
function easterEgg() {
    update(locations[7]);
}

function pick(guess) {
    const numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = `You picked ${guess}. Here are the random numbers:\n`;
    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }
    //is the number we chose in the numbers array?
    if (numbers.includes(guess)) {
        text.innerText += "Right! You win 20 gold!";
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Wrong! You lose 10 health!";
        health -= 10;
        healthText.innerText = health;
        //check if this made us lose the game
        if (health <= 0) {
            lose();
        }
    }
}

function pickTwo(guess) {
    pick(2);
}

function pickEight(guess) {
    pick(8);
}

//Image change functionality
//not working yet, can I hide others dynamically and show specific one through param?
function changeImage(newImageSource) {
    image.src = newImageSource;
    /*
    townImage.style.display = "none";
    shopImage.style.display = "none";
    caveImage.style.display = "none";
    slimeImage.style.display = "none";
    beastImage.style.display = "none";
    */
}

//test randomizer
/*
let rand = Math.floor(Math.random() * 5) + 1;
console.log(rand);
*/
