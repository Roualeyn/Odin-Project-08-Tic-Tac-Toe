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

    function markBox(x, y) {
        if (gameArray[y][x] == "") {
            gameArray[y][x] = gameLogic.getCurrentMarker();
            checkWinners();
            gameLogic.updateCurrentPlayer();
            updateBoard();
        }
    }

    function checkWinners() {
        let symbols = gameLogic.getPlayerSymbols();
        // Check if either player has won.
        for (let player of symbols) {
            let victorious = false;
            //Check Rows
            for (let y = 0; y < 3; y++){
                victorious = (gameArray[y][0] == gameArray[y][1] && gameArray[y][1] == gameArray[y][2] && gameArray[y][2] == player);
                if (victorious) {
                    console.log(`The winner is ${player}`);
                    return victorious;
                }
            }
            // Check Columns
            for (let x = 0; x < 3; x++){
                victorious = (gameArray[0][x] == gameArray[1][x] && gameArray[1][x] == gameArray[2][x] && gameArray[2][x] == player);
                if (victorious) {
                    console.log(`The winner is ${player}`);
                    return victorious;
                }
            }
            
            //Check diagonals
            victorious = (gameArray[0][0] == gameArray[1][1] && gameArray[1][1] == gameArray[2][2] && gameArray[2][2] == player);
            if (victorious) {
                console.log(`The winner is ${player}`);
                return victorious;
            }
            victorious = (gameArray[0][2] == gameArray[1][1] && gameArray[1][1] == gameArray[2][0] && gameArray[2][0] == player);
            if (victorious) {
                console.log(`The winner is ${player}`);
                return victorious;
            }
        }
        if (!gameArray[0].includes("") && !gameArray[1].includes("") && !gameArray[2].includes("")){
            console.log("There is a tie.");
        }
    }

    return {
        updateBoard: updateBoard
    };
})(gameLogic);




// Initial Code Starts Here
gameBoard.updateBoard();