// //MAIN GAME setting and functions
// Setting The Game
// squares
let c1 = document.querySelector("#case1");
let c2 = document.querySelector("#case2");
let c3 = document.querySelector("#case3");
let c4 = document.querySelector("#case4");
let c5 = document.querySelector("#case5");
let c6 = document.querySelector("#case6");
let c7 = document.querySelector("#case7");
let c8 = document.querySelector("#case8");
let c9 = document.querySelector("#case9");
let c10 = document.querySelector("#case10");
let c11 = document.querySelector("#case11");
let c12 = document.querySelector("#case12");
let c13 = document.querySelector("#case13");
let c14 = document.querySelector("#case14");
let c15 = document.querySelector("#case15");
let c16 = document.querySelector("#case16");

let cases = [c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16];

// rpc case animate
let rpcIcon = document.querySelector('#case16').querySelector('i');
let rpcTb = ['fas fa-hand-rock','fas fa-hand-scissors','fas fa-hand-paper']
let changeRpc = () => {
    for (let i = 0; i < rpcTb.length; i++) {
        const element = rpcTb[i];
        (function(i) {
            setTimeout(function(){
                rpcIcon.removeAttribute('class');
                rpcIcon.setAttribute('class',rpcTb[i])
            }, i * 300);
        })(i);
    };
};
window.setInterval(changeRpc, 900);


// start btn
let start = document.querySelector('#start');
// number of players
let nPlayers = 0;
let playersChoice = document.querySelectorAll('.player');

for (let i = 0; i < playersChoice.length; i++) {
    playersChoice[i].addEventListener('click',function(){
        nPlayers = Number(playersChoice[i].textContent);
    });
};

// pawns
// see for number of players (later)
let pawn = document.createElement('i');
pawn.setAttribute('class','fas fa-chess-pawn fa-3x');



// let pawnPos = -1;
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

class Player {
    constructor(pawn,color) {
        this.pawn = pawn;
        this.pawnPos = -1;
        this.score = 0;
        this.color = color;
    }
};

var player1 = new Player (pawn1,"blue");
var player2 = new Player (pawn2,"orange");
var player3 = new Player (pawn3,"red");
var player4 = new Player (pawn4,"violet");
var allPlayers = [player1,player2,player3,player4];

let whoseTurn = -1;
// dice
let dice = document.querySelector('#rollDice');
let steps = 0;

// score
let scores = document.querySelectorAll('.score');
for (let i = 0; i < scores.length; i++) {
    scores[i].style.color = allPlayers[i].color;
};

let printScore = (who) => {
    scores[who].textContent = allPlayers[who].score;
};


// get a canvas 
let divAllGames = document.getElementById('allGames');
let launch = document.getElementById("launchGame");
let bricksGame = document.getElementById('canvasBricks');
let snakeGame = document.getElementById('canvasSnake');
let scrabble = document.getElementById('scrabble');
let rpc = document.getElementById('rpc');
let whichGame;

// - start mini game
let startGame = document.querySelector('#startGame');

// scrabble test

// GET GAME SWITCH
// remove display
let games = divAllGames.querySelectorAll('.game')
let removeDisplay = () => {
    for (let i = 0; i < games.length; i++) {
        games[i].classList.remove('displayBlock');
       games[i].classList.remove('displayFlex');     
    };
};
let getGame = (i) => {
    launch.style.display = "block";
    startGame.addEventListener('click',function(){
        
        switch (i+1) {
            case 5:
                    whichGame = bricksGame;
                    drawBricksGame();
                    removeDisplay();
                    whichGame.classList.add('displayBlock');
                break;
            case 13:
                    whichGame = snakeGame;
                    removeDisplay();
                    whichGame.classList.add('displayBlock');
                break;
            case 9:
                    whichGame = scrabble;
                    removeDisplay();
                    scrabble.classList.add("displayFlex");
                    newRack.style.display = "inline";
                    newRack.click();
                    newRack.style.display = "none";
                break;
            case 16:
                    whichGame = rpc;
                    removeDisplay();
                    whichGame.classList.add('displayFlex');
                break;
            default:
                console.log('error launch start mini game');
                break;
        };
        launch.style.display = "none";
    });
};

let removeGame = () => {
    divAllGames.style.display = "none";
    removeDisplay();
    whichGame = undefined;
};

// square action

let squareAction = (who) => {
    // let getOrLose = 0;
    for (let i = 0; i < cases.length; i++) {
        if (i === allPlayers[who].pawnPos) {
          switch (i+1) {
              case 1:
                  allPlayers[who].bonus = true;
                  setTimeout(() => {
                      alert(`Tu as gagné une carte "Bonus", conserve la précieusement, elle te permettra de doubler les points reçu à ton nouveau passage par la case 1.`)
                  }, 700);
                  break;
              case 3: case 6: case 11: case 15:
                  allPlayers[who].score += 5;
                  printScore(who);
                  setTimeout(() => {
                      alert('Tu as gagné 5 points !')
                  }, 700);
                  break;
              case 2: case 7: case 10: case 14:
                  allPlayers[who].score -= 3;
                  printScore(who);
                  setTimeout(() => {
                      alert('Tu as perdu 3 points...')
                  }, 700);
                  break;
              case 4: case 8: case 12:
                  allPlayers[who].score += 0;
                  setTimeout(() => {
                      alert(`Relax & Chill au soleil`);
                  }, 700);
                  break;
              case 5: case 9: case 13: case 16:
                  setTimeout(() => {
                      divAllGames.style.display = "block";
                      getGame(i);
                  }, 700);
                //   bricks
                  break;
              default:
                  break;
          }  
        };
        
    }
};


// PLAYING
// change pawn Position

let pawnMove = (whoseTurn) => {
    let player = allPlayers[whoseTurn];
    let pawnPos = player.pawnPos;
    let tempPawnPos = player.pawnPos;
    pawnPos += steps;
    // start a new board tour
    if (pawnPos >= 16){
        let stepsLeft = 15 - tempPawnPos;
        let newSteps = steps - stepsLeft;
        pawnPos = -1;
        pawnPos += newSteps;
        // add points To player
        if (player.bonus === true) {
            player.score += (10*2);
            setTimeout(() => {
                alert(`Tu as complété un tour, tu gagnes 20points grâce à ta carte "Double".`);
            }, 700);
        } else {
            player.score += 10;
            setTimeout(() => {
                alert(`Tu as complété un tour, tu gagnes 10points.`);
            }, 700);
        };

    };

    // move pawn;
    player.pawnPos = pawnPos;
    cases[player.pawnPos].insertBefore(allPlayers[whoseTurn].pawn,cases[player.pawnPos].lastChild);
    printScore(whoseTurn);

};


// roll dice 
let allDices = ['fas fa-dice-one fa-2x',"fas fa-dice-two fa-2x","fas fa-dice-three fa-2x","fas fa-dice-four fa-2x","fas fa-dice-five fa-2x","fas fa-dice-six fa-2x"];
let icon = dice.querySelector('i');

let diceAnim = () => {
    for (let i = 0; i < 10; i++) {
        let random = Math.floor(Math.random()*allDices.length);
        (function(i) {
            setTimeout(function(){
             icon.removeAttribute('class');
             icon.setAttribute('class',allDices[random]);
             }, i * 300);
         })(i);
    };
};

let rollDice = () => {
    // whoseTurn
    if(whoseTurn === nPlayers -1) {
        whoseTurn = -1;
    };
    steps = Math.ceil(Math.random()*6);
    steps = 16;
    whoseTurn ++;
    icon.removeAttribute('class');
    icon.setAttribute("class",allDices[steps -1]);
};

// change color according to whoseTurn
let changeColor = () => {
    if (whoseTurn +1 < nPlayers) {
        document.documentElement.style.setProperty('--turn', allPlayers[whoseTurn +1].color);
        document.documentElement.style.setProperty('--turnPrev', allPlayers[whoseTurn].color);
    } else {
        document.documentElement.style.setProperty('--turn', allPlayers[0].color);
        document.documentElement.style.setProperty('--turnPrev', allPlayers[nPlayers -1].color);
    };
    // get the dice back
    icon.removeAttribute('class');
    icon.setAttribute('class','fas fa-dice fa-2x');
};





// event listeners
start.addEventListener('click',function(){
    // add pawn and its score
    let where = document.querySelector('#allPawns');
    for (let i = 0; i < nPlayers ; i++) {
        let newPawn = allPawns[i];
        where.appendChild(newPawn);
        scores[i].style.display = "inline";
    };

    // remove play btn
    if (nPlayers === 0) {
        alert('Veuillez sélectionner le nombre de joueurs')
    } else {
        start.style.display = "none";
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
let setBricks = () => {
    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
};
setBricks();

let emptyBricks = () => {
    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 0 };
        }
    }
};

// print
var scoreB = 0;
var lives = 3;



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
            // position de chaque brique
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
    if (whichGame === bricksGame) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    };
    
};

function keyUpHandler(e) {
    if (whichGame === bricksGame) {
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

let newOffSet = vwTOpx(36.3);

function mouseMoveHandler(e) {
    if (whichGame === bricksGame) {
        var relativeX = e.clientX - newOffSet;
        if(relativeX > 0 && relativeX < canvasB.width) {
            paddleX = relativeX - paddleWidth/2;
        }
    }
    
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
                alert(`Bravo, tu as gagné ! Voici donc ${scoreB} points pour toi`);
                allPlayers[whoseTurn].score += scoreB;
                printScore(whoseTurn);
                // reset manuel
                setBricks()
                scoreB = 0;
                lives = 3;
                x = canvasB.width/2;
                y = canvasB.height-30;
                // no reload possible her so, math.abs to slow the game
                dx = Math.abs(dx)/2;
                dy = -(Math.abs(dy)/2);
                removeGame();
            };
        }
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
    ctxB.fillText("Lives: "+lives, canvasB.width-65, 20);
};





function drawBricksGame(){
    if (whichGame === bricksGame) {
    
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

    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvasB.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            // mur du dessous
            
            // no reload possible her so, math.abs to slow the game
            let tempdx = Math.abs(dx);
            let tempdy = -(Math.abs(dy))
            lives--;
            if(!lives) {
                alert(`GAME OVER, tu avais une carte "Bonus" ? Remets la moi`);
                allPlayers[whoseTurn].bonus = false;
                emptyBricks();
                setBricks();
                scoreB = 0;
                lives = 3;
                x = canvasB.width/2;
                y = canvasB.height-30;
                dx = Math.abs(dx)/2;
                dy = -(Math.abs(dy)/2);
                removeGame();
            }
            else {
                x = canvasB.width/2;
                y = canvasB.height-30;
                dx = tempdx;
                dy = tempdy;
                paddleX = (canvasB.width-paddleWidth)/2;
            }
        }
    };

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
    // au lieu du set Inteval, pour que la fonction soit appelée en boucle
        requestAnimationFrame(drawBricksGame);
    };  
      
};
// event listener
document.addEventListener('keydown',keyDownHandler,false);
document.addEventListener('keyup',keyUpHandler,false);
document.addEventListener("mousemove", mouseMoveHandler, false);


// // draw
// // setInterval(draw,10);
// // var interval = setInterval(draw,10);
// drawBricksGame();

// // BRICKS GAME - end

// //SCRABBLE GAME
// jeu de lettres // all letters in French version
let allLetters = ["*","*","A","A","A","A","A","A","A","A","A","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","I","I","I","I","I","I","I","I","N","N","N","N","N","N","O","O","O","O","O","O","R","R","R","R","R","R","S","S","S","S","S","S","T","T","T","T","T","T","U","U","U","U","U","U","L","L","L","L","L","D","D","D","M","M","M","G","G","B","B","C","C","P","P","F","F","H","H","V","V","J","Q","K","W","X","Y","Z"];

let rack = [];
let givenLetters = document.querySelector('#givenLetters').querySelector('.letters');
let scrabblePoints = 0;
let totalScore = 0;
let answer = "to define";
let givenWord = document.querySelector('#givenWord').querySelector('.letters');
let compt = 0;
let stop = false;

let newRack = document.getElementById('newRack');
let submitWord = document.querySelector('#submitWord');
// move letters
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

    for (let i = 0; i < rack.length; i++) {
        letter.textContent = rack[i];
        let p1 = 0;
        p1 = switchPoints(p1,(rack[i]));
        letterPoints.textContent = p1;
        givenLetters.appendChild(letterBox.cloneNode(true));
    };
};
// fonction pour les points, lettre par lettre// CALCULATING THE SCORE, letter by letter
// switch points
let switchPoints =(score,answer) => {
    let punten = score;
    switch (answer) {
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
    };
    allPlayers[whoseTurn].score += scrabblePoints;
    printScore(whoseTurn);
    removeGame();
};
newRack.addEventListener('click',initiateRack);
submitWord.addEventListener('click',pointChecker);
// //SCRABBLE GAME END


// // RPC GAME START



let battle = document.getElementById('battle');
let battleGround = battle.children;
let handsDiv = document.getElementById('handChoose');
let allHands = handsDiv.querySelectorAll('.hand');
let handsClick = [];
let manche = 1;
var player;
let pl1 = {
    name: 'joueur',
    score: 0,
}

let pl2 = {
    name: 'ordi',
    score:0,
}
let playersRpc = [pl1,pl2];
let winnerRpc;

for (let i = 0; i < allHands.length; i++) {
    handsClick.push(allHands[i].querySelector('button'))  
};

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
}
let whoseHands = () => {
    for (let i = 0; i < battleGround.length; i++) {
        let icon = battleGround[i].querySelector('i');
        let className = icon.getAttribute('class');
        console.log(className);
        switch (i) {
            case 0:
                pl1.hand = interpHands(className)
                console.log(pl1);
                break;
            case 1:
                pl2.hand = interpHands(className)
                console.log(pl2);
                break;
            default:
                break;
        }; 
    };
};
let finalWin = () => {
    if (pl1.score > pl2.score) {
        winnerRpc = pl1;
        alert(`Tu as gagné ${pl1.score} points`);
        allPlayers[whoseTurn].score += pl1.score;
        printScore(whoseTurn)
    } else if (pl1.score == pl2.score) {
        winnerRpc = false;
        alert(`Match nul... Continuez le jeu !`);
    } else {
        winnerRpc = pl2;
        alert(`Tu as perdu... Remets moi ta carte "Bonus"`);
        allPlayers[whoseTurn].bonus = false;
    };
    // empty Game
    tempL = battleGround.length
    for (let i = 0; i < tempL; i++) {
        battle.removeChild(battleGround[0]);   
    };
    manche =1;
    removeGame();
};
let winOrLose = () => {
    if (pl1.hand == "rock" && pl2.hand == "scissors") {
        pl1.score ++;
    } else if(pl1.hand =="rock" && pl2.hand =="paper") {
        pl2.score++
    } else if(pl1.hand =="rock" && pl2.hand =="rock") {
        manche --;
    } else if(pl1.hand =="paper" && pl2.hand =="rock") {
        pl1.score++;
    } else if(pl1.hand =="paper" && pl2.hand =="scissors") {
        pl2.score++;
    } else if(pl1.hand =="paper" && pl2.hand =="paper") {
        manche --;
    } else if(pl1.hand =="scissors" && pl2.hand =="paper") {
        pl1.score++;
    } else if(pl1.hand =="scissors" && pl2.hand =="rock") {
        pl2.score++;
    } else if(pl1.hand =="scissors" && pl2.hand =="scissors") {
        manche --;
    };
};
let playRpc =(i)=> {
    // empty battleground
    tempL = battleGround.length
    for (let i = 0; i < tempL; i++) {
        battle.removeChild(battleGround[0]);   
    };
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
}
for (let i = 0; i < handsClick.length; i++) {
    handsClick[i].addEventListener('click',function(){
        if (manche<3) {
            playRpc(i);
        } else if (manche ==3) {
            playRpc(i);
            setTimeout(() => {
                finalWin();
            }, 800);
        };  
    });
};



// // RPC GAME END








// THE MOST IMPORTANT - ROLLING THE DICE
// each turn
dice.addEventListener('click',function(e){
    e.stopPropagation();
    diceAnim()
    setTimeout(() => {
        rollDice();
        pawnMove(whoseTurn);
        squareAction(whoseTurn);
        console.log(allPlayers[whoseTurn]);
    }, 3300);
    setTimeout(() => {
        changeColor();
    }, 5000);

});