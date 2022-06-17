const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector('#resetBtn');
const winConditions = [
    [0 , 1, 2],
    [3 , 4, 5],
    [6 , 7, 8],
    [0 , 4, 8],
    [2 , 4, 6],
    [0 , 3, 6],
    [1 , 4, 7],
    [2 , 5, 8]
];

let options = ["" , "", "" ,"" ,"" ,"" ,"" ,"" ,""];
let currentPlayer = 'X';
let running = false;

initializeGame();

function initializeGame(){
    running = true;
    cells.forEach(cell=>{
        cell.addEventListener('click' , cellClicked);
    });
    restartBtn.addEventListener('click' , restart);
    statusText.innerHTML = `${currentPlayer}'s turn `;
}

function cellClicked(){
    const cellIndex = this.getAttribute('cellIndex');
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this , cellIndex);
    // changePlayer();
    checkWinner();
    // currentPlayer = changePlayer();
    // statusText.innerHTML = `${currentPlayer}'s turn`;
}

function updateCell(cell , index){
    cell.textContent = currentPlayer;
    options[index] = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == 'X')?'O':'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;
    for(let i=0;i<winConditions.length;i++){
        const position = winConditions[i];
        const cellA = options[position[0]];
        const cellB = options[position[1]];
        const cellC = options[position[2]];

        if(cellA == "" || cellB== "" || cellC =="")
            continue;
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!!`;
        running =false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw !!`;
        running =false;
    }
    else{
        changePlayer();
    }
}

function restart(){
    options = ["" , "", "" ,"" ,"" ,"" ,"" ,"" ,""];
    currentPlayer = 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}