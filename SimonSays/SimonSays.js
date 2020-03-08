let compSequence = [];
let playerSequence = [];
let flash;
let turn;
let winning;
let compTurn;
let intervalId;
let interval = 800;
let fail;
let timer;
let playing = false;

//buttons and displays that will be edited
const green = document.querySelector("#green");
const red = document.querySelector("#red");
const yellow = document.querySelector("#yellow");
const blue = document.querySelector("#blue");
const startButton = document.querySelector("#start");
const light = document.querySelector("#light");
const scoreDisplay = document.querySelector("#score");
const highScoreDisplay = document.querySelector("#highscore");

startButton.addEventListener('click', (event) => {
  //starts the game only if a game isn't in progress
  if(!playing){
    light.style.backgroundColor = "green";
    setTimeout(play,30);
  }
});

function play() {
  //setup the game
  playing = true;
  compSequence = [];
  playerSequence = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  winning = true;
  //fill up an array for a random sequence
  for (var i = 0; i < 1000; i++) {
    compSequence.push(Math.floor(Math.random() * 4));
  }
  compTurn = true;

  //start the game
  intervalId = setInterval(gameTurn, interval);
}

function gameTurn() {
  //move from computer's turn to players turn
  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    clearTimeout(timer);
    //set 5 second timer for input
    timer = setTimeout(() => {
      playerSequence.push(10);
      check();
    },5000);
  }

  if (compTurn) {
    //clear lights and play next in sequence
    clearColor();
    setTimeout(() => {
      if (compSequence[flash] == 0) flashGreen();
      if (compSequence[flash] == 1) flashRed();
      if (compSequence[flash] == 2) flashYellow();
      if (compSequence[flash] == 3) flashBlue();
      flash++;
    }, 200);
  }
}

//turns on specific button lights
function flashGreen() {
  green.style.backgroundColor = "lightgreen";
}
function flashRed() {
  red.style.backgroundColor = "tomato";
}
function flashYellow() {
  yellow.style.backgroundColor = "yellow";
}
function flashBlue() {
  blue.style.backgroundColor = "lightskyblue";
}

//turns off all button lights
function clearColor() {
  green.style.backgroundColor = "darkgreen";
  red.style.backgroundColor = "darkred";
  yellow.style.backgroundColor = "goldenrod";
  blue.style.backgroundColor = "darkblue";
}

//turns on all button lights
function flashColor() {
  green.style.backgroundColor = "lightgreen";
  red.style.backgroundColor = "tomato";
  yellow.style.backgroundColor = "yellow";
  blue.style.backgroundColor = "lightskyblue";
}


//input event listeners
green.addEventListener('click', (event) => {
    clearTimeout(timer); //stops the 5 second timer for input
    timer = setTimeout(() => {//starts the timer again
      playerSequence.push(10);
      check();
    },5000);
    playerSequence.push(0);//pushes the input onto the player stack
    check();// calls check function to decide game state e.g win, lose, timeout
    flashGreen();// flash the button
      setTimeout(() => {
        clearColor();
      }, 300);
})

red.addEventListener('click', (event) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    playerSequence.push(10);
    check();
  },5000);
    playerSequence.push(1);
    check();
    flashRed();
      setTimeout(() => {
        clearColor();
      }, 300);
})

yellow.addEventListener('click', (event) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    playerSequence.push(10);
    check();
  },5000);
    playerSequence.push(2);
    check();
    flashYellow();
      setTimeout(() => {
        clearColor();
      }, 300);
})

blue.addEventListener('click', (event) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    playerSequence.push(10);
    check();
  },5000);
    playerSequence.push(3);
    check();
    flashBlue();
      setTimeout(() => {
        clearColor();
      }, 300);
})

function check() {
  //if the player is wrong flash lights and reset everything
  if (playerSequence[playerSequence.length - 1] !== compSequence[playerSequence.length - 1] && !compTurn){
    winning = false;
    clearTimeout(timer);
    let count = 0;
    console.log(playerSequence[playerSequence.length - 1]+ " : "+ compSequence[playerSequence.length - 1]);
    fail = setInterval(() => {
      flashColor();
      setTimeout(() => {
        clearColor();
      },800);
      if(count == 4){
          clearInterval(fail);
        }
        else{
          count++;
        }
    },1000);
    light.style.backgroundColor = "red";
    scoreDisplay.innerHTML = "00";
    playing = false;
  }

  //moves on to next turn
  if (turn == playerSequence.length && winning) {
    turn++;
    playerSequence = [];
    compTurn = true;
    flash = 0;
    intervalId = setInterval(gameTurn, interval);
    scoreUp();//update score
  }

}
//converts score and highscore to numbers
//then updates these numbers
//then converts back to string and plugs them back int their displays
function scoreUp(){
  let score = Number(scoreDisplay.innerHTML);
  let highscore = Number(highScoreDisplay.innerHTML);
  score++;
  if(score < 10){
    scoreDisplay.innerHTML = "0" + String(score);
  }
  else{
    scoreDisplay.innerHTML = String(score);
  }
  if(score > highscore){
    if(score < 10){
      highScoreDisplay.innerHTML = "0" + String(score);
    }
    else{
      highScoreDisplay.innerHTML = String(score);
    }
  }
  //Speed up interval at set points
  if(score == 5 || score == 9 || score == 13){
    interval -= 150;
  }
}
