var gameLogic = (function() {
    'use strict'
    // Module for containing player data and who the current player is.
    let player1 = {name: "Xander", symbol: "X"};
    let player2 = {name: "Oscar", symbol: "O"};
    let currentMarker;
    let gameOver = false;

    function updateCurrentPlayer() {
        currentMarker == player1.symbol ? currentMarker = player2.symbol : currentMarker = player1.symbol;
    }

    function getCurrentMarker() {
        return currentMarker;
    }

    function getCurrentPlayer() {
        if (currentMarker == player1.symbol){
            return player1.name;
        } else {
            return player2.name;
        }
    }

    function getPlayerSymbols() {
        return [player1.symbol, player2.symbol];
    }

    function getPlayerBySymbol(symbol) {
        if (symbol == player1.symbol) {
            return player1.name;
        } else if (symbol == player2.symbol) {
            return player2.name;
        } else {
            throw "Invalid player symbol given to getPlayerBySymbol";
        }
    }

    function setPlayers(p1, p2) {
        player1.name = String(p1.name);
        player1.symbol = String(p1.symbol);
        player2.name = String(p2.name);
        player2.symbol = String(p2.symbol);
        currentMarker = String(p1.symbol);
    }

    function resetLogic() {
        currentMarker = player1.symbol;
        gameOver = false;
   }

   function getGameState() {
    return gameOver;
   }

   function endGame() {
    gameOver = true;
   }

    return {
        getCurrentMarker: getCurrentMarker,
        updateCurrentPlayer: updateCurrentPlayer,
        getCurrentPlayer: getCurrentPlayer,
        getPlayerSymbols: getPlayerSymbols,
        setPlayers: setPlayers,
        resetLogic: resetLogic,
        getPlayerBySymbol: getPlayerBySymbol,
        getGameState: getGameState,
        endGame: endGame
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
        if (gameArray[y][x] == "" && !gameLogic.getGameState()) {
            gameArray[y][x] = gameLogic.getCurrentMarker();
            gameLogic.updateCurrentPlayer();
            updateBoard();
            checkWinners();
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
                    announceWinner(player);
                    return victorious;
                }
            }
            // Check Columns
            for (let x = 0; x < 3; x++){
                victorious = (gameArray[0][x] == gameArray[1][x] && gameArray[1][x] == gameArray[2][x] && gameArray[2][x] == player);
                if (victorious) {
                    announceWinner(player);
                    return victorious;
                }
            }
            
            // Check diagonals
            victorious = (gameArray[0][0] == gameArray[1][1] && gameArray[1][1] == gameArray[2][2] && gameArray[2][2] == player);
            if (victorious) {
                announceWinner(player);
                return victorious;
            }
            victorious = (gameArray[0][2] == gameArray[1][1] && gameArray[1][1] == gameArray[2][0] && gameArray[2][0] == player);
            if (victorious) {
                announceWinner(player);
                return victorious;
            }
        }
        if (!gameArray[0].includes("") && !gameArray[1].includes("") && !gameArray[2].includes("")){
            announceWinner("Tie");
        }
    }

    function resetBoard() {
        gameArray = [['', '', ''],
                     ['', '', ''],
                     ['', '', '']];
        document.getElementById("currentPlayerP").classList.remove("invisible");
        document.getElementById("winningAnnouncement").classList.add("invisible");
        updateBoard();
    }

    function announceWinner(winnerSymbol) {
        let winningBar = document.getElementById("winningAnnouncement")
        winningBar.classList.remove("invisible");
        document.getElementById("currentPlayerP").classList.add("invisible");
        if (winnerSymbol != "Tie") {
            let winnerName = gameLogic.getPlayerBySymbol(winnerSymbol);
            winningBar.textContent = `The winner is ${winnerName}!`;
            gameLogic.endGame();
        } else {
            winningBar.textContent = "The game is tied..."
            gameLogic.endGame();
        }
    }

    return {
        updateBoard: updateBoard,
        resetBoard: resetBoard
    };
})(gameLogic);




// Initial Code Execution
document.getElementById("startButton").addEventListener("click", () => {
    gameLogic.setPlayers({name: document.getElementById("firstPlayerName").value, symbol: document.getElementById("firstPlayerSymbol").value},
                        {name: document.getElementById("secondPlayerName").value, symbol: document.getElementById("secondPlayerSymbol").value})
    document.getElementById("ongoingGameDiv").classList.remove("invisible");
    document.getElementById("newGameDiv").classList.add("invisible");
    gameBoard.updateBoard();
})

document.getElementById("restartButton").addEventListener("click", () => {
    gameLogic.resetLogic();
    gameBoard.resetBoard();
})