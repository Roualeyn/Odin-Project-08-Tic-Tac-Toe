var gameLogic = (function() {
    'use strict'
    // Module for containing player data and who the current player is.
    let player1 = {name: "Xander", symbol: "X"};
    let player2 = {name: "Oscar", symbol: "O"};
    let currentMarker = player1.symbol; 

    function updateCurrentPlayer() {
        currentMarker == player1.symbol ? currentMarker = player2.symbol : currentMarker = player1.symbol;
    }

    function getCurrentMarker() {
        return currentMarker;
    }

    function getCurrentPlayer() {
        if (currentMarker == "X"){
            return player1.name;
        } else {
            return player2.name;
        }
    }
    
    return {
        getCurrentMarker: getCurrentMarker,
        updateCurrentPlayer: updateCurrentPlayer,
        getCurrentPlayer: getCurrentPlayer
    };
})();

var gameBoard = (function(gameLogicArg) {
    'use strict'
    //Module for containing and updating the board.
    let board = document.getElementById("gameBoard");
    let gameArray = [['', '', ''],
                    ['', '', ''],
                    ['', '', '']];
    let gameLogic = gameLogicArg;
    let currentPlayerSpan = document.getElementById("currentPlayerSpan");
    
    function updateBoard() {
        board.innerHTML = "";
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                let newBox = document.createElement("div");
                newBox.classList.add("gameBox");
                newBox.textContent = gameArray[y][x]
                newBox.addEventListener("click", () => {markBox(x, y);})
                board.appendChild(newBox);    
            }
        }
        currentPlayerSpan.textContent = gameLogic.getCurrentPlayer();
    }

    function getBox(x,y) {
        return gameArray[y][x];
    }

    function markBox(x, y) {
        if (gameArray[y][x] != "X" && gameArray[y][x] != "O") {
            gameArray[y][x] = gameLogic.getCurrentMarker();
            gameLogic.updateCurrentPlayer();
            updateBoard();
        }
    }

    return {
        updateBoard: updateBoard,
        getBox: getBox,
        markBox: markBox
    };
})(gameLogic);




// Initial Code Starts Here
gameBoard.updateBoard();