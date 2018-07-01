const coinSound = new Audio('assets/smw-coin-sound.mp3');
const oneUpSound = new Audio('assets/smw-1up.mp3');
const clicked = [];
const winConditions = [
  ['11', '12', '13', '14', '15'],
  ['21', '22', '23', '24', '25'],
  ['31', '32', '33', '34', '35'],
  ['41', '42', '43', '44', '45'],
  ['51', '52', '53', '54', '55'],
  ['11', '21', '31', '41', '51'],
  ['12', '22', '32', '42', '52'],
  ['13', '23', '43', '43', '53'],
  ['14', '24', '34', '44', '54'],
  ['15', '25', '35', '45', '55'],
  ['11', '22', '33', '44', '55'],
  ['15', '24', '33', '42', '51'],
];

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
    let rando = Math.floor(Math.random() * clonedArray.length);
    newArray.push(clonedArray[rando]);
    clonedArray.splice(rando, 1);
  }

  newArray.splice(12, 0, "Wall Jumps");

  return newArray;
};

function toggleClickedClass(el) {
  let index = clicked.indexOf(el.id);
  el.classList.toggle("clicked");
  clicked.includes(el.id) ? clicked.splice(index, 1) : clicked.push(el.id);
}

function makeTableRow(array, startIndex) {
  let row = document.createElement('tr');

  for (var i = 0; i < 5; i++) {
    let cell = document.createElement('td');
    cell.id = `${startIndex / 5 + 1}${i + 1}`
    cell.addEventListener('click', function (e) {
      toggleClickedClass(e.target);
      console.log(isWinner());
      console.log(clicked, 'clicked');
      isWinner() ? oneUpSound.play() : coinSound.play();
    });
    cell.innerText = array[startIndex + i];
    row.appendChild(cell);
  }

  return row;
}

function fillTable() {
  let table = document.getElementById('bingo-cards');
  let cardsArray = randomizeCards(newSupSpeedOptions);

  for (var i = 0; i < 5; i++) {
    let row = makeTableRow(cardsArray, i * 5);
    table.appendChild(row);
  }
}

function isWinner() {
  let bingo = false;
  if (clicked.length >= 5) {
    for (let i = 0; i < winConditions.length; i++) {
      if (bingo) {
        break;
      }
      let winSet = winConditions[i];
      for (let j = 0; j < winSet.length; j++) {
        if (!clicked.includes(winSet[j])) {
          break;
        }
        if (j == winSet.length - 1 && clicked.includes(winSet[j])) {
          bingo = true;
          break;
        }
      }
    }
    return bingo;
  } 
  return bingo;
}

fillTable();