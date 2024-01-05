let playerwins = 0;
let computerwins = 0;
let roundResult = "";

function playRound(playerSelection, computerSelection) {
  /*
    Rock beats scissors
    Scissors beats paper
    Paper beats rock

    If equal play again
    */
  if (playerSelection === computerSelection) {
    roundResult = "tie";
  } else if (
    (playerSelection === "scissors" && computerSelection === "paper") ||
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock")
  ) {
    playerwins++;
    roundResult = "player";
  } else {
    computerwins++;
    roundResult = "computer";
  }
}
//randomly return either ‘Rock’, ‘Paper’ or ‘Scissors’
function getComputerChoice() {
  const choice = ["Rock", "Paper", "Scissors"]; //creating an array
  const random = Math.floor(Math.random() * choice.length); //generating random index that is in the array
  return choice[random].toLowerCase();
}
function isGameOver() {
  return playerwins === 5 || computerwins === 5;
}

//DOM elements
const rockbtn = document.getElementById("rock");
const paperbtn = document.getElementById("paper");
const scissorsbtn = document.getElementById("scissors");
const playerscore = document.getElementById("playerscore");
const computerscore = document.getElementById("computerscore");
const finalResult = document.getElementById("finalResult");
const roundinfo = document.getElementById("roundinfo");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");

image1.style.display = "none";
image2.style.display = "none";
//hiding play again button
const playagain = document.getElementById("playagain");
playagain.style.display = "none";
//button to start game
const startgame = document.getElementById("startgame");
//hiding elements
const gamebody = document.getElementById("gamebody");
gamebody.style.display = "none";
//when stargame clicked, unhide gamebody, and hide start game button
startgame.addEventListener("click", function () {
  if (gamebody.style.display === "none") {
    gamebody.style.display = "block";
    startgame.style.display = "none";
  } else {
    gamebody.style.display = "none";
    startgame.style.display = "block";
  }
});

//Events
rockbtn.addEventListener("click", () => handle("rock"));
paperbtn.addEventListener("click", () => handle("paper"));
scissorsbtn.addEventListener("click", () => handle("scissors"));

//choice function
function handle(playerSelection) {
  if (isGameOver()) {
    finalMessage();
    return;
  }
  const computerSelection = getComputerChoice();
  playRound(playerSelection, computerSelection);
  updateScore();
  if (isGameOver()) {
    finalMessage();
    return;
  }
}

function updateScore() {
  if (roundResult === "tie") {
    roundinfo.textContent = "Round Winner: Tie";
  } else if (roundResult === "player") {
    roundinfo.textContent = "Round Winner: Player";
  } else {
    roundinfo.textContent = "Round Winner: Computer";
  }
  playerscore.textContent = `Score: ${playerwins}`;
  computerscore.textContent = `Score: ${computerwins}`;
}
function finalMessage() {
  if (playerwins === 5) {
    gamebody.style.display = "none";
    image1.style.display = "block";
    finalResult.textContent = "Congrats! You won!";
    playAgain();
  } else {
    gamebody.style.display = "none";
    image2.style.display = "block";
    finalResult.textContent = "You Lost";
    playAgain();
  }
}
function playAgain() {
  playagain.style.display = "block";
  playagain.addEventListener("click", function () {
    //resetting
    playerwins = 0;
    computerwins = 0;
    roundResult = "";
    playerscore.textContent = "Player Score: 0";
    computerscore.textContent = "Computer Score: 0";
    roundinfo.textContent = "";
    finalResult.textContent = "";
    playagain.style.display = "none";
    startgame.style.display = "block"; // Show the start game button again
    gamebody.style.display = "none"; // Hide the game body
    image1.style.display = "none";
    image2.style.display = "none";
  });
}
