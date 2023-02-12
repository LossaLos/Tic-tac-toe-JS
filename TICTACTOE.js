//information
const state = document.querySelector("h2")
let goGame = true
let goPlayer = "X"
let gameState = ["", "", "", "", "", "", "", "", ""]

//win condition
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// messages
const win = () => `Player ${goPlayer} has win`
const draw = () => "It's a draw"
const playerTurn = () => `Player ${goPlayer} turn`

// start player
state.innerHTML = playerTurn()

// listen event
document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase))
document.querySelector("#restart").addEventListener("click", restart)

 //click
function gestionClicCase(){
    // get index
    const indexCase = parseInt(this.dataset.index)
    
    if(gameState[indexCase] !== "" || !goGame){
        return
    }

    gameState[indexCase] = goPlayer
    this.innerHTML = goPlayer

    winVerif()
}

//if player win
function winVerif(){
    let winTurn = false

    //get victory condition
    for(let winCondition of winConditions){
        
        let val1 = gameState[winCondition[0]]
        let val2 = gameState[winCondition[1]]
        let val3 = gameState[winCondition[2]]

        
        if(val1 === "" || val2 === "" || val3 === ""){
            continue
        }

        // if 3 same case
        if(val1 === val2 && val2 === val3){
            winTurn = true
            break
        }
    }

    //if win
    if(winTurn){
        state.innerHTML = win()
        goGame = false
        return
    }

    //if draw
    if(!gameState.includes("")){
        state.innerHTML = draw()
        goGame = false
        return
    }

    //change player
    goPlayer = goPlayer === "X" ? "O" : "X"
    state.innerHTML = tourJoueur()
}

 //restart game
function restart(){
    goPlayer = "X"
    goGame = true
    gameState = ["", "", "", "", "", "", "", "", ""]
    state.innerHTML = playerTurn()
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "")
}