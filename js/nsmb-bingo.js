const newSupSpeedOptions = [
    "Donuts at end to waste time",
    "Spin jump on pirahnas",
    "Weave between thwomps (with conveyor)",
    "Star run with enemy spam",
    "Shell + Music block",
    "Muncher killed via bomb/shell right before you touch it",
    "triple jump sound FX",
    "Bruce Springstairs",
    "Conveyor to slow you down",
    "Revisiting old paths",
    "Level name says # of seconds",
    "Weaving between springs",
    "Blind jump",
    "Blind doors",
    "? blocks that have pirahnas",
    "1 frame jump at the end",
    "Starting spring",
    "Air stalling",
    "buttslamming up clouds",
    "Jumping over munchers (2-high corridor)",
    "Jumping over spikes (2-high corridor)",
    "Semisolid over munchers",
    "Spike maze",
    "coin trail"
];

function randomizeCards(array) {
    let newArray = [];
    let clonedArray = array.slice();

    for (var i = 0; i < array.length; i++) {
        let rando = Math.floor(Math.random() * clonedArray.length)
        newArray.push(clonedArray[rando])
        clonedArray.splice(rando, 1)
    }

    newArray.splice(12, 0, "Wall Jumps");

    return newArray;
};

function fillTable() {
    let table = document.getElementById('bingo-cards');
    let cardsArray = randomizeCards(newSupSpeedOptions);

    for (var i = 0; i < 5; i++) {
        let row = makeTableRow(cardsArray, i * 5)
        table.appendChild(row)
    }
}

function makeTableRow(array, startIndex) {
    let row = document.createElement('tr');

    for (var i = 0; i < 5; i++) {
        let cell = document.createElement('td');
        cell.addEventListener('click', function (e) {
            toggleClickedClass(e.target)
        })
        cell.innerText = array[startIndex + i];
        row.appendChild(cell);
    }

    return row;
}

function toggleClickedClass(el) {
    el.classList.toggle("clicked");
}

fillTable();