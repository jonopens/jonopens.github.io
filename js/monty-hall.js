const results = {
  wonGames: 0,
  lostGames: 0
}

const chooseDoor = (n) => {
  return Math.floor(Math.random() * n);
}

const runMontyHallProblemTests = (n) => {
  for(var i = 0; i < n; i++){
    // assign first choice, winner and door switch choices
    let initialChoiceDoor = chooseDoor(3),
        winnerDoor        = chooseDoor(3),
        remainingDoors    = [0,1,2].filter(
          (d) => d !== initialChoiceDoor
        );

    // remove a 'goat' door from switch choices
    if(remainingDoors[0] === winnerDoor){
      remainingDoors.pop();
    } else {
      remainingDoors.shift();
    }

    // increment the winner or loser
    if(remainingDoors[0] === winnerDoor){
      results.wonGames++;
    } else {
      results.lostGames++;
    }
  }

  // after for loop completes, log the results
  console.log(
    `${results.wonGames / (results.wonGames + results.lostGames) * 100}% of switches resulted in wins. ${results.lostGames / (results.wonGames + results.lostGames) * 100}% resulted in losses.`
  )
}
