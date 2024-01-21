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
    "button functions": [goTown, goTown, goTown],
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
}];

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//locations
function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
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

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
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
    //subtract from monster health with weapon power, add random value times xp
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
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

//test randomizer
/*
let rand = Math.floor(Math.random() * 5) + 1;
console.log(rand);
*/
