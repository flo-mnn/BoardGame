// //MAIN GAME setting and functions
// Setting The Game
// squares
let s1 = document.querySelector("#case1");
let s2 = document.querySelector("#case2");
let s3 = document.querySelector("#case3");
let s4 = document.querySelector("#case4");
let s5 = document.querySelector("#case5");
let s6 = document.querySelector("#case6");
let s7 = document.querySelector("#case7");
let s8 = document.querySelector("#case8");
let s9 = document.querySelector("#case9");
let s10 = document.querySelector("#case10");
let s11 = document.querySelector("#case11");
let s12 = document.querySelector("#case12");
let s13 = document.querySelector("#case13");
let s14 = document.querySelector("#case14");
let s15 = document.querySelector("#case15");
let s16 = document.querySelector("#case16");

let squares = [s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16];

// rps case animate
let rpsIcon = document.querySelector('#case16').querySelector('i');
let rpsTb = ['fas fa-hand-rock','fas fa-hand-scissors','fas fa-hand-paper']
let animateRpsSquare = () => {
    for (let i = 0; i < rpsTb.length; i++) {
        (function(i) {
            setTimeout(function(){
                rpsIcon.removeAttribute('class');
                rpsIcon.setAttribute('class',rpsTb[i])
            }, i * 300);
        })(i);
    };
};
window.setInterval(animateRpsSquare, 900);

// bricks credit
let bricksCredits = document.querySelector('#bricksCredits');

// start btn
let playBtn = document.querySelector('#play');
// number of players
let nPlayers = 0;
let nplayersChoose = document.querySelectorAll('.player');

for (let i = 0; i < nplayersChoose.length; i++) {
    nplayersChoose[i].addEventListener('click',function(){
        nPlayers = Number(nplayersChoose[i].textContent);
    });
};

// pawns
// pawn model
let pawn = document.createElement('i');
pawn.setAttribute('class','fas fa-chess-pawn fa-3x');

// create 4pawns
let pawn1 = pawn.cloneNode();
pawn1.setAttribute('id','pawn1');
pawn1.style.color = "blue";
pawn1.style.right = `70%`;

let pawn2 = pawn.cloneNode();
pawn2.setAttribute('id','pawn2');
pawn2.style.color = "orange";
pawn2.style.right = `50%`;

let pawn3 = pawn.cloneNode();
pawn3.setAttribute('id','pawn3');
pawn3.style.color = "red";
pawn3.style.right = `30%`;

let pawn4 = pawn.cloneNode();
pawn4.setAttribute('id','pawn4');
pawn4.style.color = "violet";
pawn4.style.right = `10%`;

let allPawns = [pawn1,pawn2,pawn3,pawn4];

// Create Players
class Player {
    constructor(pawn,color) {
        this.pawn = pawn;
        this.pawnPos = -1;
        this.score = 0;
        this.color = color;
    }
};

// Declare 4 Players instances and assign them a pawn and its color;
let player1 = new Player (pawn1,"blue");
let player2 = new Player (pawn2,"orange");
let player3 = new Player (pawn3,"red");
let player4 = new Player (pawn4,"violet");
let allPlayers = [player1,player2,player3,player4];

// Nobody's turn yet, turns go from [0 to nPlayers]
let whoseTurn = -1;

// dice
let dice = document.querySelector('#rollDice');
let steps = 0;

// main score declaration and matching color with players' colors.
let mainScores = document.querySelectorAll('.score');
for (let i = 0; i < mainScores.length; i++) {
    mainScores[i].style.color = allPlayers[i].color;
};

// function for each action that allows player to gain/lose pawn;
let printScore = (who) => {
    mainScores[who].textContent = allPlayers[who].score;
};


// MINI GAMES 
let divAllMiniGames = document.getElementById('allGames');
let launchAnyMiniGame = document.getElementById("launchAnyMiniGame");
let bricksGame = document.getElementById('canvasBricks');
let scrabble = document.getElementById('scrabble');
let rps = document.getElementById('rps');
let whichMiniGame;

// - start mini game
let startMiniGame = document.querySelector('#startMiniGame');

// GET GAME SWITCH

// remove display from all mini games (in order to display only one)
let miniGames = divAllMiniGames.querySelectorAll('.game')
let removeDisplay = () => {
    for (let i = 0; i < miniGames.length; i++) {
        miniGames[i].classList.remove('displayBlock');
       miniGames[i].classList.remove('displayFlex');     
    };
};

// function to display and launch each mini game (see squareAction)
let getGame = (i) => {
    // presentation of a mini game coming
    launchAnyMiniGame.style.display = "block";
    // click on start on the launch display to start the mini game :
    startMiniGame.addEventListener('click',function(){  
        // i = square's index (allPlayers[whoseTurn].pawnpos)  
        switch (i+1) {
            case 5:
                    whichMiniGame = bricksGame;
                    // get bricks Game playing :
                    drawBricksGame();
                    // display bricks Game :
                    removeDisplay();
                    whichMiniGame.classList.add('displayBlock');
                    bricksCredits.classList.add('displayBlock');
                break;
            case 9:
                    whichMiniGame = scrabble;
                    removeDisplay();
                    scrabble.classList.add("displayFlex");
                    // automatic clic on "new letters" btn (btn not visible for player);
                    newScrabbleRack.style.display = "inline";
                    newScrabbleRack.click();
                    newScrabbleRack.style.display = "none";
                break;
            case 16:
                    whichMiniGame = rps;
                    removeDisplay();
                    whichMiniGame.classList.add('displayFlex');
                break;
            default:
                console.log('error launch start mini game');
                break;
        };
        // remove the launching page to get to the mini game;
        launchAnyMiniGame.style.display = "none";
    });
};

let removeMiniGame = () => {
    divAllMiniGames.style.display = "none";
    bricksCredits.classList.remove('displayBlock');
    removeDisplay();
    whichMiniGame = undefined;
};

// square action - on which square the player has it landed?
// alert time out function -> to give the time to the user to see its pawn moving and the dice result
let alertTimeOut = (message) => {
    setTimeout(() => {
        alert(message)
    }, 700);
};
// defin which action
let squareAction = (who) => {
    for (let i = 0; i < squares.length; i++) {
        // check on which square the player is:
        if (i === allPlayers[who].pawnPos) {
            // different action according to the square :
          switch (i+1) {
            //   bonus square:
              case 1:
                    if(allPlayers[who].bonus == true) {
                            alertTimeOut('Tu as déjà ta carte "Bonus" je vois, bonne route !')
                    } else {
                        alertTimeOut(`Tu as gagné une carte "Bonus", conserve la précieusement, elle te permettra de doubler les points reçu à ton nouveau passage par la case 1.`)
                    };
                  break;
                //   gain points squares 
              case 3: case 6: case 11: case 15:
                  allPlayers[who].score += 5;
                  printScore(who);
                  alertTimeOut('Tu as gagné 5 points !');
                  break;
                //   lose points squares
              case 2: case 7: case 10: case 14:
                  allPlayers[who].score -= 3;
                  printScore(who);
                  alertTimeOut('Tu as perdu 3 points...');
                  break;
                //   gain nothing, lose nothing squares
              case 4: case 8: case 12:
                  allPlayers[who].score += 0;
                  alertTimeOut(`Relax & Chill au soleil`);
                  break;
                //   double your points square
              case 13:
                  //   wtach out, if player is already in minuses... get him back to 0.
                  if (allPlayers[who].score <=0) {
                      alertTimeOut(`Ouille, je ne peux pas doubler un score négatif ! Voici pour toi : tu repars avec 5 points en poche !`);
                      allPlayers[who].score = 5;
                } else {
                    alertTimeOut(`JACKPOT! Tu viens de doubler tes points !`);
                    allPlayers[who].score *= 2;
                };
                  printScore(who);
                  break;
                //   mini games squares
              case 5: case 9: case 16:
                  setTimeout(() => {
                      divAllMiniGames.style.display = "block";
                      getGame(i);
                  }, 700);
                //   bricks
                  break;
              default:
                  break;
            };  
        }; 
    };
};

// PLAYING

// roll dice 

// dice changing number animation
let diceSAllFaces = ['fas fa-dice-one fa-2x',"fas fa-dice-two fa-2x","fas fa-dice-three fa-2x","fas fa-dice-four fa-2x","fas fa-dice-five fa-2x","fas fa-dice-six fa-2x"];
let diceIcon = dice.querySelector('i');

let diceAnim = () => {
    for (let i = 0; i < 10; i++) {
        let random = Math.floor(Math.random()*diceSAllFaces.length);
        (function(i) {
            setTimeout(function(){
             diceIcon.removeAttribute('class');
             diceIcon.setAttribute('class',diceSAllFaces[random]);
             }, i * 150);
         })(i);
    };
};

let rollDice = () => {
    // whoseTurn
    if(whoseTurn === nPlayers -1) {
        whoseTurn = -1;
    };
    steps = Math.ceil(Math.random()*6);
    whoseTurn ++;
    diceIcon.removeAttribute('class');
    diceIcon.setAttribute("class",diceSAllFaces[steps -1]);
};
// change pawn Position
let pawnMove = (whoseTurn) => {
    let currentPlayer = allPlayers[whoseTurn];
    let pawnPos = currentPlayer.pawnPos;
    let tempPawnPos = currentPlayer.pawnPos;

    pawnPos += steps;
    // completing a board tour;
    if (pawnPos >= squares.length){
        // store values
        let stepsLeftToLastSq = (squares.length -1) - tempPawnPos;
        let newStepsFromSq1 = steps - stepsLeftToLastSq;
        // move the pawn out of the board, and move it from the beginning
        pawnPos = -1;
        pawnPos += newStepsFromSq1;
        // add points To player and checking if it has bonus card or not
        if (currentPlayer.bonus === true) {
            currentPlayer.score += (10*2);
            alertTimeOut(`Tu as complété un tour, tu gagnes 20points grâce à ta carte "Bonus".`)
        } else {
            currentPlayer.score += 10;
            alertTimeOut(`Tu as complété un tour, tu gagnes 10points.`)
        };
        printScore(whoseTurn);
    };
    // actually moving the pawn on the board
    // get pawnPos calculated back into the player's identity
    currentPlayer.pawnPos = pawnPos;
    // insert the said player into the square
    squares[currentPlayer.pawnPos].insertBefore(allPlayers[whoseTurn].pawn,squares[currentPlayer.pawnPos].lastChild);
};

// change color for the dice and the mini games according to whoseTurn
let changeColor = () => {
    if (whoseTurn +1 < nPlayers) {
        document.documentElement.style.setProperty('--turn', allPlayers[whoseTurn +1].color);
        // for rps mini game:
        document.documentElement.style.setProperty('--turnPrev', allPlayers[whoseTurn].color);
    } else {
        document.documentElement.style.setProperty('--turn', allPlayers[0].color);
        // for rps mini game:
        document.documentElement.style.setProperty('--turnPrev', allPlayers[nPlayers -1].color);
    };
    // get the dice back to ready to roll appearance
    diceIcon.removeAttribute('class');
    diceIcon.setAttribute('class','fas fa-dice fa-2x');
};

// play game - starting main game
playBtn.addEventListener('click',function(){
    // add nPlayer*pawns and their score
    let pawnsStock = document.querySelector('#allPawns');
    for (let i = 0; i < nPlayers ; i++) {
        let newPawn = allPawns[i];
        pawnsStock.appendChild(newPawn);
        mainScores[i].style.display = "inline";
    };

    // remove play btn and how many players choice
    if (nPlayers === 0) {
        alert('Veuillez sélectionner le nombre de joueurs')
    } else {
        playBtn.style.display = "none";
        let chooseNumber = document.querySelector('#players');
        chooseNumber.style.display = "none";
        let diceDiv = document.querySelector('#dice');
        diceDiv.style.display = "flex";
    };
});

// //MAIN GAME END SETTING AND FUNCTIONS


// -----------------------------------------------------------------------------------------------------------------------


// // BRICKS GAME - start

// https://developer.mozilla.org/fr/docs/Games/Workflows/2D_Breakout_game_pure_JavaScript/finitions

// canvasB
var canvasB = document.getElementById("canvasBricks");
var ctxB = canvasB.getContext("2d");
// ball
var x = canvasB.width/2;
var y = canvasB.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
// colorBricks
var colorBricks = "#0095DD";
// paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvasB.width-paddleWidth)/2;

// paddleHandler
var rightPressed = false;
var leftPressed = false;
// bricks
var brickRowCount = 3;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// - each brick
var bricks = [];
// set all bricks at the beginning
let setBricks = () => {
    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
};
setBricks();
// remove all bricks at the end to get the game ready for a new set of bricks
let emptyBricks = () => {
    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 0 };
        }
    }
};

// print scores and lives
var scoreB = 0;
var livesBricks = 3;
// constant drawing while playing
function drawBall(){
    ctxB.beginPath();
    ctxB.arc(x, y, ballRadius, 0, Math.PI*2);
    ctxB.fillStyle = colorBricks;
    ctxB.fill();
    ctxB.closePath();
};
function drawPaddle() {
    ctxB.beginPath();
    ctxB.rect(paddleX, canvasB.height-paddleHeight, paddleWidth, paddleHeight);
    ctxB.fillStyle = colorBricks;
    ctxB.fill();
    ctxB.closePath();
};
// bricks
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            // position de chaque brique (if brick not crushed[status])
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctxB.beginPath();
                ctxB.rect(brickX, brickY, brickWidth, brickHeight);
                ctxB.fillStyle = "#0095DD";
                ctxB.fill();
                ctxB.closePath();
            }
        }
    }
};
// paddle handler
function keyDownHandler(e) {
    if (whichMiniGame === bricksGame) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    };
    
};
function keyUpHandler(e) {
    if (whichMiniGame === bricksGame) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        } 
    }
    
};
// function to convert vw to px
function vwTOpx(value) {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    var result = (x*value)/100;
    return result;
};
// 36.3 from the board size and one square size, in order to see the game's limit inside the board
let newOffSet = vwTOpx(36.3);
function mouseMoveHandler(e) {
    if (whichMiniGame === bricksGame) {
        var relativeX = e.clientX - newOffSet;
        if(relativeX > 0 && relativeX < canvasB.width) {
            paddleX = relativeX - paddleWidth/2;
        };
    };
};

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    scoreB ++;
                };
            };
            if(scoreB == brickRowCount*brickColumnCount) {
                // add the number of points won to the main game if all bricks are crushed
                alert(`Bravo, tu as gagné ! Voici donc ${scoreB} points pour toi`);
                allPlayers[whoseTurn].score += scoreB;
                printScore(whoseTurn);
                // reset manuel for next player
                setBricks()
                scoreB = 0;
                livesBricks = 3;
                x = canvasB.width/2;
                y = canvasB.height-30;
                // no reload possible here so, math.abs to slow the game (which is getting faster and faster at each call of the function)
                dx = Math.abs(dx)/1.4;
                dy = -(Math.abs(dy)/1.4);
                // remove the game display
                removeMiniGame();
            };
        };
    };
};

function drawScore() {
    ctxB.font = "16px Arial";
    ctxB.fillStyle = "#0095DD";
    ctxB.fillText("Score: "+scoreB, 8, 20);
};

function drawLives() {
    ctxB.font = "16px Arial";
    ctxB.fillStyle = "#0095DD";
    ctxB.fillText("Vies: "+livesBricks, canvasB.width-65, 20);
};

function drawBricksGame(){
    if (whichMiniGame === bricksGame) {
        colorBricks = allPlayers[whoseTurn].color;
        ctxB.clearRect(0, 0, canvasB.width, canvasB.height);
        drawBricks();
        drawBall();
        collisionDetection();
        drawPaddle();
        drawScore();
        drawLives();
        // move
        x += dx;
        y += dy;
        // walls
        // x axis walls
        if (x + dx < ballRadius || x + dx > canvasB.width-ballRadius) {
            dx = -dx;
        };
        // paddle position
        if(rightPressed) {
            paddleX += 7;
            if (paddleX + paddleWidth > canvasB.width){
                paddleX = canvasB.width - paddleWidth;
            }
        }
        else if(leftPressed) {
            paddleX -= 7;
            if (paddleX < 0){
                paddleX = 0;
            };
        };
        // y axis walls
        if(y + dy < ballRadius) {
            dy = -dy;
        } else if(y + dy > canvasB.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                //bottom wall so losing the ball,
                livesBricks--;
                // no reload possible her so, math.abs to slow the game
                let tempdx = Math.abs(dx);
                let tempdy = -(Math.abs(dy));
                
                if(!livesBricks) {
                    // losing the game
                    alert(`GAME OVER, tu avais une carte "Bonus" ? Remets la moi`);
                    allPlayers[whoseTurn].bonus = false;
                    // reset manuel
                    emptyBricks();
                    setBricks();
                    scoreB = 0;
                    livesBricks = 3;
                    x = canvasB.width/2;
                    y = canvasB.height-30;
                    dx = Math.abs(dx)/1.4;
                    dy = -(Math.abs(dy)/1.4);
                    removeMiniGame();
                } else {
                    // losing a live, and resetting the ball and the paddle
                    x = canvasB.width/2;
                    y = canvasB.height-30;
                    dx = tempdx;
                    dy = tempdy;
                    paddleX = (canvasB.width-paddleWidth)/2;
                };
            };
        };

        // au lieu du set Inteval, pour que la fonction soit appelée en boucle
        requestAnimationFrame(drawBricksGame);
    };   
};
// event listeners for bricks game
document.addEventListener('keydown',keyDownHandler,false);
document.addEventListener('keyup',keyUpHandler,false);
document.addEventListener("mousemove", mouseMoveHandler, false);

// // BRICKS GAME - end
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// //SCRABBLE GAME
// jeu de lettres // all letters in French version
let allLetters = ["*","*","A","A","A","A","A","A","A","A","A","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","I","I","I","I","I","I","I","I","N","N","N","N","N","N","O","O","O","O","O","O","R","R","R","R","R","R","S","S","S","S","S","S","T","T","T","T","T","T","U","U","U","U","U","U","L","L","L","L","L","D","D","D","M","M","M","G","G","B","B","C","C","P","P","F","F","H","H","V","V","J","Q","K","W","X","Y","Z"];

let rack = [];
let givenLetters = document.querySelector('#givenLetters').querySelector('.letters');
let scrabblePoints = 0;
let totalScore = 0;
let scrabbleAnswer = "to define";
let givenWord = document.querySelector('#givenWord').querySelector('.letters');
let newScrabbleRack = document.getElementById('newRack');
let submitWord = document.querySelector('#submitWord');

// move letters VIA sortable.js library between to "lists"
new Sortable(givenLetters, {
    group: 'shared', // set both lists to same group
    animation: 150
});

new Sortable(givenWord, {
    group: 'shared',
    animation: 150
});
// fonction pour définir la grille de lettres // DEFINING THE LETTERS RACK
let initiateRack = () => {
    rack.splice(0,rack.length);
    for (let i = 0; i<=6; i++) {
        let addLetter = allLetters[Math.round(Math.random()*(allLetters.length -1))];
        rack.push(addLetter);
    };
    printLetters();
};
// get the letters into the HTML
let printLetters = () => {
    // empty first line
    let oldLetters = givenLetters.children;
    let tempL = oldLetters.length;
    for (let i = 0; i < tempL; i++) {
        givenLetters.removeChild(oldLetters[0]);
    };
    // empty second line
    oldLetters = givenWord.children;
    tempL = oldLetters.length;
    for (let i = 0; i < tempL; i++) {
        givenWord.removeChild(oldLetters[0]);
    };

    // create a letter
    let letterBox = document.createElement('li');
    letterBox.setAttribute('class','letterBox');
    let insideBox = document.createElement('div');
    insideBox.setAttribute('class',"insideBox");
    let letter = document.createElement('p');
    letter.setAttribute('class','letter');
    let letterPoints = document.createElement('p');
    letterPoints.setAttribute('class','letterPoints')
    insideBox.append(letter, letterPoints);
    letterBox.appendChild(insideBox)
    // convert all letters from the rack into HTML letterBox and get them into the html:
    for (let i = 0; i < rack.length; i++) {
        letter.textContent = rack[i];
        let retrieveLetterPoint = 0;
        retrieveLetterPoint = switchPoints(retrieveLetterPoint,(rack[i]));
        letterPoints.textContent = retrieveLetterPoint;
        // GET THE LETTER WITH ITS NEW LETTER AND MATCHING POINTS INTO THE HTML;
        givenLetters.appendChild(letterBox.cloneNode(true));
    };
};
// fonction pour les points, lettre par lettre// CALCULATING THE SCORE, letter by letter
// switch points
let switchPoints =(score,scrabbleAnswer) => {
    let punten = score;
    switch (scrabbleAnswer) {
        case "A": case "E": case "I": case "N": case "O": case "R": case "S": case "T": case "U": case "L":
            punten += 1;
            break;
        case "D": case "M": case "G":
            punten += 2;
            break;
        case "B": case "C": case "P":
            punten += 3;
            break;
        case "F": case "H": case "V":
            punten += 4;
            break;
        case "J": case "Q":
            punten += 8;
            break;
        case "K": case "W": case "X": case "Y": case "Z":
            punten += 10;
            break;
    
        default:
            //blank letter (= * ) included, lettre blanche incluse
            punten +=0;
            break;
    };
    return punten
};
// HERE add the scrabble points to the main game's player's score.
let pointChecker = () => {
    scrabblePoints = 0;
    let word = givenWord.querySelectorAll('.letter');
    for (let i = 0; i < word.length; i++) {
        scrabblePoints = switchPoints(scrabblePoints,word[i].textContent);
    };
    if (scrabblePoints >0) {
        alert(`Bravo, tu as gagné ${scrabblePoints} points !`);
    } else {
      allPlayers[whoseTurn].bonus = false;  
        alert(`Tu n'as pas réussi à former un mot... Dommage.
        Remets moi ta carte "Bonus"`);
    };
    allPlayers[whoseTurn].score += scrabblePoints;
    printScore(whoseTurn);
    removeMiniGame();
};
// btn not appearing for user here, only for JS in this game;
newScrabbleRack.addEventListener('click',initiateRack);
// validate anwser for user:
submitWord.addEventListener('click',pointChecker);
// //SCRABBLE GAME END


// // rps GAME START
let battle = document.getElementById('battle');
let battleGround = battle.children;
let handsDiv = document.getElementById('handChoose');
let allHands = handsDiv.querySelectorAll('.hand');
let handsClick = [];
let manche = 1;
var player;
let rpsPl1 = {
    name: 'joueur',
    score: 0,
}

let rpsPl2 = {
    name: 'ordi',
    score:0,
};
let playersRps = [rpsPl1,rpsPl2];
let winnerRps;
// retrieveing the hands from html;
for (let i = 0; i < allHands.length; i++) {
    handsClick.push(allHands[i].querySelector('button'))  
};

// FUNCTION to translate the class names into words
let interpHands = (name) => {
    if (name.includes('fa-hand-rock')) {
        player = 'rock'; 
    } else if (name.includes('fa-hand-scissors')){
        player = 'scissors';
    } else if (name.includes('fa-hand-paper')){
        player = "paper";
    } else {
        player = "what"
    }
    return player
};

// assign the classnames turned into words to the right player;
let whoseHands = () => {
    for (let i = 0; i < battleGround.length; i++) {
        let icon = battleGround[i].querySelector('i');
        let className = icon.getAttribute('class');
        switch (i) {
            case 0:
                rpsPl1.hand = interpHands(className)
                break;
            case 1:
                rpsPl2.hand = interpHands(className)
                break;
            default:
                break;
        }; 
    };
};
// once we know which player has which hand, we compare them, and assign a winner for manche (if there is one)
let winOrLose = () => {
    if (rpsPl1.hand == "rock" && rpsPl2.hand == "scissors") {
        rpsPl1.score ++;
    } else if(rpsPl1.hand =="rock" && rpsPl2.hand =="paper") {
        rpsPl2.score++
    } else if(rpsPl1.hand =="rock" && rpsPl2.hand =="rock") {
        manche --;
    } else if(rpsPl1.hand =="paper" && rpsPl2.hand =="rock") {
        rpsPl1.score++;
    } else if(rpsPl1.hand =="paper" && rpsPl2.hand =="scissors") {
        rpsPl2.score++;
    } else if(rpsPl1.hand =="paper" && rpsPl2.hand =="paper") {
        manche --;
    } else if(rpsPl1.hand =="scissors" && rpsPl2.hand =="paper") {
        rpsPl1.score++;
    } else if(rpsPl1.hand =="scissors" && rpsPl2.hand =="rock") {
        rpsPl2.score++;
    } else if(rpsPl1.hand =="scissors" && rpsPl2.hand =="scissors") {
        manche --;
    };
};
// AFTER 3hands battle, we see which player(computer or player), got the most points and we reset the game;
let finalWin = () => {
    if (rpsPl1.score > rpsPl2.score) {
        winnerRps = rpsPl1;
        alert(`Tu as gagné ${rpsPl1.score} points`);
        allPlayers[whoseTurn].score += rpsPl1.score;
        printScore(whoseTurn)
    } else if (rpsPl1.score == rpsPl2.score) {
        winnerRps = false;
        alert(`Match nul... Continuez le jeu !`);
    } else {
        winnerRps = rpsPl2;
        alert(`Tu as perdu... Remets moi ta carte "Bonus"`);
        allPlayers[whoseTurn].bonus = false;
    };
    // empty Game
    tempL = battleGround.length
    for (let i = 0; i < tempL; i++) {
        battle.removeChild(battleGround[0]);   
    };
    rpsPl1.score = 0;
    rpsPl2.score = 0;
    manche =1;
    removeMiniGame();
};

// play Rock Paper Scissors MAIN Function
let playRps =(i)=> {
    // NEW SET
    manche ++;
    battle.appendChild(allHands[i].cloneNode(true));
    setTimeout(() => {
        let random = Math.floor(Math.random()*allHands.length);
        let otherHand = allHands[random].cloneNode(true);
        battle.appendChild(otherHand);
        let gray = otherHand.querySelector('i');
        gray.style.color = "gray";
        whoseHands();
        winOrLose();
        
    }, 500);
    setTimeout(() => {
        // empty battleground
        tempL = battleGround.length
        for (let i = 0; i < tempL; i++) {
            battle.removeChild(battleGround[0]);   
        };
    }, 2000);
}
for (let i = 0; i < handsClick.length; i++) {
    handsClick[i].addEventListener('click',function(){
        if (manche<3) {
            playRps(i);
        } else if (manche ==3) {
            playRps(i);
            setTimeout(() => {
                finalWin();
            }, 2100);
        };  
    });
};
// // rps GAME END

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// // BACK TO MAIN GAME
// THE MOST IMPORTANT - ROLLING THE DICE
// each turn
dice.addEventListener('click',function(e){
    e.stopPropagation();
    diceAnim();
    setTimeout(() => {
        rollDice();
        pawnMove(whoseTurn);
        squareAction(whoseTurn);
        // console.log(allPlayers[whoseTurn]);
    }, 1800); //par rapport à diceAnim timeout (150*10=1500)
    setTimeout(() => {
        changeColor();
    }, 4000);
});
// END