const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
let body = document.querySelector("body");
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];
let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;

initializeGame();

// function to initialize game
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click",cellClicked));
    restartBtn.addEventListener("click",restartGame);
    statusText.textContent = `${currentPlayer}'s Turn `;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return; //not do anything
    }
    // console.log(this);
    updateCell(this,cellIndex);
    // changePlayer();
    checkWinner();
}
function updateCell(cell,index){
options[index] = currentPlayer;
cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X")? "0" : "X";
    statusText.textContent = `${currentPlayer}'s Turn `;
}   
function checkWinner(){
    let roundWon = false;
    for(let i = 0;i<winConditions.length;i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        if(cellA == "" || cellB =="" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent =`${currentPlayer} Win :) `;
        running = false;
        body.style.backgroundColor = "green";
        setTimeout(function(){
            body.style.backgroundColor = "antiquewhite";
        },1000);
    }
    else if(!options.includes("")){
        statusText.textContent ="draw";
        body.style.backgroundColor = "orange";
        setTimeout(function(){
            body.style.backgroundColor = "antiquewhite";
        },1000);
    }
    else{
        changePlayer();
    }
}
function restartGame(){
currentPlayer = "X";
options = ["","","","","","","","",""];
statusText.textContent = `${currentPlayer}'s turn`;
cells.forEach(cell => cell.textContent ="");
running=true;
}
