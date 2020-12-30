// MAIN GAME
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

let pawn2 = pawn.cloneNode();
pawn2.setAttribute('id','pawn2');
pawn2.style.color = "orange";

let pawn3 = pawn.cloneNode();
pawn3.setAttribute('id','pawn3');
pawn3.style.color = "red";

let pawn4 = pawn.cloneNode();
pawn4.setAttribute('id','pawn4');
pawn4.style.color = "violet";

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
        } else {
            player.score += 10;
        };

    };

    player.pawnPos = pawnPos;
    console.log(player.pawnPos);
    cases[player.pawnPos].insertBefore(allPlayers[whoseTurn].pawn,cases[player.pawnPos].lastChild);
};

// change color according to whoseTurn
let changeColor = () => {
    if (whoseTurn +1 < nPlayers) {
        document.documentElement.style.setProperty('--turn', allPlayers[whoseTurn +1].color);
    } else {
        document.documentElement.style.setProperty('--turn', allPlayers[0].color);
    };
};


// roll dice 

let rollDice = () => {

    if(whoseTurn === nPlayers -1) {
        whoseTurn = -1;
    };
    steps = Math.ceil(Math.random()*6);
    console.log(steps);
    whoseTurn ++
    console.log(whoseTurn);
    changeColor();
};





// event listeners
start.addEventListener('click',function(){
    // e.preventDefault();
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
        let diceDiv = document.querySelector('#dice');
        diceDiv.style.display = "flex";
    };
});

dice.addEventListener('click',function(){
    console.log(allPlayers[whoseTurn]);
    rollDice();
    pawnMove(whoseTurn);

});