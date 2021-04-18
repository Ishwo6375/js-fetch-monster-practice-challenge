//Make a fetch request to the monsters API for 50 monsters
let pageNumber = 4;
function fetchMonsters(pageNumber) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
        .then(resp => resp.json())
        .then(monsters => monsters.forEach(monster => appendMonsterCard(createMonsterCard(monster))))
}
fetchMonsters(pageNumber)

//Format data from monsters API
const monsterContainer = document.getElementById('monster-container');
function createMonsterCard(monster) {
    const monsterCard = document.createElement('div');
    monsterCard.innerHTML =
        `
    <h2>${monster.name}</h2>
    <h4>${monster.age}</h4>
    <p>${monster.description}</p>
    `
    return monsterCard
}

//Append monster data to DOM
function appendMonsterCard(monsterCard) {
    monsterContainer.appendChild(monsterCard)
}

//Allow User to create their own monster
const nameInput = document.getElementById('name');
const age = document.getElementById('age');
const description = document.getElementById('description');

function createUserMonster() {
    const userMonster = document.createElement('div');
    userMonster.innerHTML =
        `
    <h2>${nameInput.value}</h2>
    <h4>${age.value}</h4>
    <p>${description.value}</p>
    `
    return userMonster
}

//Append user monster to DOM when create button is clicked
const createBtn = document.getElementById('create');
createBtn.addEventListener('click', function (e) {
    e.preventDefault()
    appendMonsterCard(createUserMonster())
    saveUserMonster()
})

//Save user monster to API
function saveUserMonster() {
    const configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nameInput.value,
            age: age.value,
            description: description.value
        })
    };

    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`, configObj)
        .then(results => results.json())
        .then(request => console.log(request))
}

//Load next set of monsters when button is clicked
const back = document.getElementById('back');
const forward = document.getElementById('forward');
forward.addEventListener('click', function () {
    pageNumber += 1
    monsterContainer.innerHTML = ''
    fetchMonsters(pageNumber)
})
back.addEventListener('click', function () {
    if (pageNumber > 1) {
        pageNumber -= 1
    }
    monsterContainer.innerHTML = ''
    fetchMonsters(pageNumber)
})