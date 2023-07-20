let currentState = "none";
let states = [
  "none",
  "ColorSelected",
  "DifficultySelected",
  "SelectAudio",
  "InGameplay",
  "Win",
  "Loss",
];
let sliderDifficulty = 0;
let difficultyLevels = ["Easy", "Hard"];
let currentDifficulty = "";
let clickedBuffer = 1;
let crazySoundTrack;
let partySoundTrack;
let trapSoundTrack;
let classicSoundTrack;
let sandBackground;
let looking;
let turned;
let frames = 0;
let redOn = false;
let isMoving = false;
let stopTimer = 60;
let distance = 700; //distance player needs to travel to win
let points = 0;
const potentialPoints = 12000; //400 seconds worth of points, more time to make it to the end = less points
let gamePoints = 0;
let timeCounter = 45;
let winnerMemes=[];
let loserMemes=[];
let wM1, wM2, wM3, wM4, wM5, lM1, lM2, lM3, lM4, lM5;
let firstRunTime=true;
let finalMeme;
let index;

function preload() {
  trapSoundTrack = loadSound("audio/trapSoundTrack.mp3");
  partySoundTrack = loadSound("audio/partySoundTrack.mp3");
  crazySoundTrack = loadSound("audio/crazyCutzSoundTrack.mp3");
  classicSoundTrack = loadSound("audio/classicSoundTrack.mp3");
  looking = loadImage("audio/squidGameLooking.jpg");
  turned = loadImage("audio/squidGameTurned.webp");
  sandBackground = loadImage("audio/sandBackground.webp");
lM1= new meme(loadImage("audio/LossCardSG.webp"), 612,408)
lM2= new meme(loadImage("audio/LossCardSG2.jpg"), 700,700)
lM3= new meme(loadImage("audio/LossCardSG3.jpg"), 700,712)
lM4= new meme(loadImage("audio/LossCardSG4.jpg"), 700, 516)
lM5= new meme(loadImage("audio/LossCardSG5.jpg"), 700, 595)
wM1= new meme(loadImage("audio/WinCardSG.jpg"), 500,700)
wM2= new meme(loadImage("audio/WinCardSG2.jpg"),700, 538)
wM3= new meme(loadImage("audio/WinCardSG3.jpg"), 704, 396)
wM4= new meme(loadImage("audio/WinCardSG4.jpg"), 700, 405)
wM5= new meme(loadImage("audio/WinCardSG5.jpg"), 700, 694)
loserMemes=[lM1, lM2, lM3, lM4, lM5];
winnerMemes=[wM1, wM2, wM3, wM4, wM5];
}

//23-26, audio code
function setup() {
  createCanvas(1200, 800);
  background(255, 255, 255);
  fill(0);
  frameRate(30);
}

function draw() {
  if (currentState == "none") {
    clear();
    fill(0, 0, 0);
    text("Select your color: ", 100, 50);
    fill(mouseX - 120, mouseY - 220, mouseX - 220);
    ellipse(250, 250, 350, 350);
    timeCounter = 45;
    firstRunTime=true;
  } else if (currentState == "ColorSelected") {
    clear();
    sliderDifficulty = limit(mouseY, 350, 150);
    currentDifficulty =
      difficultyLevels[limit(parseInt(sliderDifficulty / 170), 1, 0)];
    fill(0);
    text("Use you slider to choose the difficulty: ", 50, 50);
    text(currentDifficulty, 300, 50);
    fill(playerOne.r, playerOne.g, playerOne.b);
    rect(200, 100, 100, 300);
    timeCounter = 45;
    firstRunTime=true
    if (currentDifficulty == "Hard") {
      //hard difficulty = more points
      fill(255, 0, 0);
      ellipse(250, sliderDifficulty, 100, 100);
      playerOne.speed = 1.5;
      distance = 800;
    } else if (currentDifficulty == "Easy") {
      fill(0, 255, 0);
      ellipse(250, sliderDifficulty, 100, 100);
      playerOne.speed = 3;
      distance = 700;
    }
   
  } else if (currentState == "DifficultySelected") {
    clear();
    //classic selection
    fill(0, 255, 0);
    rect(10, 100, 200, 100);

    //crazy selection
    fill(0, 100, 100);
    rect(210, 100, 200, 100);

    //party selection
    fill(100, 100, 0);
    rect(410, 100, 200, 100);

    //trap selection
    fill(100, 59, 255);
    rect(610, 100, 200, 100);

    //adding text overlay:
    fill(0);
    textSize(20);
    text("Classic", 30, 150);
    text("Crazy", 230, 150);
    text("Party", 430, 150);
    text("Trap", 630, 150);
    textSize(10)
    playerOne.XPos = 0;
    playerOne.YPos = 0;
    timeCounter = 45;
    firstRunTime=true;
  } else if (currentState == "InGameplay") {
    frames++;
    gamePoints--;
    fill(0, 0, 0);
    text(
      "The faster you make it to the end, the more points you get",
      100,
      100
    );
    if (frames % 30 == 0) {
      timeCounter--;
    }
    if (frames % 60 == 0) {
      redOn = true;
      redTimer = 60;
    }
    clear();
    image(sandBackground, 0, 0, 1000, 500);
    fill(playerOne.r, playerOne.g, playerOne.b);
    ellipse(playerOne.XPos, playerOne.YPos, 50, 50);
    stroke(255, 0, 0);
    strokeWeight(10);
    line(distance, 0, distance, 500);
    stroke(0);
    strokeWeight(1);
    isMoving = false;
    if (keyIsDown(RIGHT_ARROW)) {
      playerOne.XPos += playerOne.speed;
      isMoving = true;
    }
    if (keyIsDown(LEFT_ARROW)) {
      playerOne.XPos -= playerOne.speed;
      isMoving = true;
    }
    if (keyIsDown(UP_ARROW)) {
      playOne.YPos -= playerOne.speed;
      isMoving = true;
    }
    if (keyIsDown(DOWN_ARROW)) {
      playerOne.YPos += playerOne.speed;
      isMoving = true;
    }
    if (redOn) {
      fill(255, 0, 0);
      if (isMoving || timeCounter < 0) {
        //this is when the player moves during the red light
        playerOne.XPos = 75;
        currentState = states[6];
      }
      redTimer--;
      if (redTimer == 0) {
        timeCounter--;
        redOn = false;
        frames = 0;
      }
      image(looking, 800, 250, 100, 100);
    }
    if (!redOn) {
      image(turned, 800, 250, 100, 100);
      fill(0, 255, 0);
    }
    ellipse(950, 50, 100, 100);
    fill(0);
    textSize(30);
    text(timeCounter, 930, 75);
    textSize(10);
    if (playerOne.XPos >= distance) {
      //this is where the player wins
      currentState = states[5];
      points += gamePoints;
      if (currentDifficulty == "Hard") {
        points += gamePoints; //just do it twice
      }
    }
  } else if (currentState == "Win") {
    clear();
    fill(0, 0, 0);
    textSize(15)
    text("You Win! Total Points: " + str(points), 50, 15); //add points
    text("Click anywhere to restart game", 50, 40);
    textSize(10);
    playerOne.audio.stop();
    if(firstRunTime==true){
        index=Math.floor(Math.random() * 5);
        firstRunTime=false;
    }
    else{
    image(winnerMemes[index].img, 200,200,winnerMemes[index].length,winnerMemes[index].width )
    }
  } else if (currentState == "Loss") {
    clear();
    fill(0, 0, 0);
    textSize(15);
    text("You Lost! Total Points: " + str(points), 50, 15); //add points
    text("Click anywhere to restart game", 50, 40);
    textSize(10);
    playerOne.audio.stop();
    if(firstRunTime==true){
        index=Math.floor(Math.random() * 5);
        firstRunTime=false;
    }
    else{
    image(loserMemes[index].img, 150,150,loserMemes[index].length,loserMemes[index].width )
    }
  }
}

function mouseClicked() {
  if (currentState == "none") {
    playerOne.r = mouseX - 120;
    playerOne.g = mouseY - 220;
    playerOne.b = mouseX - 220;
    currentState = states[1];
  } else if (currentState == "ColorSelected") {
    playerOne.difficulty = currentDifficulty;
    currentState = states[2];
    clickedBuffer++;
  } else if (currentState == "DifficultySelected") {
    //assign the audio
    if (mouseY > 100) {
      if (mouseX < 200) {
        playerOne.audio = classicSoundTrack;
      } else if (mouseX < 400) {
        playerOne.audio = crazySoundTrack;
      } else if (mouseX < 600) {
        playerOne.audio = partySoundTrack;
      } else if (mouseX < 800) {
        playerOne.audio = trapSoundTrack;
      }
      playerOne.audio.play();
      currentState = states[3];
    }
  }
  if (currentState == "SelectAudio") {
    gamePoints = potentialPoints;
    currentState = states[4];
  }
  //to add: stop the music when we restart, otherwise the music will stack and be loud
  else if (currentState == "Win") {
    currentState = states[1];
  } else if (currentState == "Loss") {
    currentState = states[1];
  }
}

function limit(slider, lowBoundary, highBoundary) {
  if (slider > lowBoundary) {
    slider = lowBoundary;
  }
  if (slider < highBoundary) {
    slider = highBoundary;
  }
  return slider;
}

class player {
  constructor(r, g, b, difficulty, XPos, YPos, speed, audio) {
    //ADD AUDIO TO CONSTRUCTOR
    this.r = r;
    this.g = g;
    this.b = b;
    this.difficulty = difficulty;
    this.XPos = XPos;
    this.YPos = YPos;
    this.speed = speed;
    this.audio = audio;
    // this.audio=audio;
  }
}
class meme{
    constructor(img, length, width){
        this.img=img;
        this.length=length;
        this.width=width;
    }
}


let playerOne = new player(0, 0, 0, 0, 75, 250, 2, 0);
