const game = (() => {
    let gameArray = Array(9);
    let winCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    let currentPlayer = "X"
    let ai = false

   
    let squares = Array.from(document.getElementsByClassName('square'));
    let winScreen = document.querySelector(".modal")
    let playAgainBtn = document.getElementById('playAgainBtn')
    let gameOverText = document.getElementById('gameOverText')
    let aiToggleBtn = document.getElementById('aiToggleBtn')

    //AI Toggle
    aiToggleBtn.addEventListener('click',aiToggleBtnClick)

    function aiToggleBtnClick(){
        if (aiToggleBtn.classList.contains("aiOff")){
            aiToggleBtn.classList.remove("aiOff")
            aiToggleBtn.classList.add('aiOn')
            aiToggleBtn.textContent = "AI On"
            ai = true
        } else if (aiToggleBtn.classList.contains("aiOn")){
            aiToggleBtn.classList.remove("aiOn")
            aiToggleBtn.classList.add('aiOff')
            aiToggleBtn.textContent = "AI Off"
            ai = false
        }
    }

    //Starts game by adding listener to each square and resetting X's and O's 
    //on the squares
    function initializeGame(){
        currentPlayer = "X"
        winScreen.style.display = "none"
        squares.forEach(square => {
            square.addEventListener('click', handleClick, {once: true})
            square.textContent = ""
            square.classList.remove("X")
            square.classList.remove("O")
        })
    }
    
    //Check for end game, by checking for win or draw
    function checkForGameOver(){
        if(checkForWin(currentPlayer)){
            gameOver(true)
        } else if (checkForDraw()){
            gameOver(false)
        }
    }

    //Used by initializeGame
    //When square is clicked, its class name is updated based on whose turn it is
    function handleClick(e) {
        updateSquare(e)
        updateGameArray(squares)
        checkForGameOver()
        if(ai && !checkForWin(currentPlayer) && !checkForDraw()) {
            switchPlayers()
            let aiSquare = aiMove()
            gameArray[aiSquare] = currentPlayer
            squares[aiSquare].textContent = currentPlayer
            squares[aiSquare].classList.add(currentPlayer)
            squares[aiSquare].removeEventListener('click', handleClick, {once: true})
            checkForGameOver()
            switchPlayers()
        } else {
            switchPlayers()
        }
    } 

    //makes array of indices of empty squares, randomly picks one, and returns that value (0-8)
    function aiMove() {
        let emptySquares = []
        gameArray.forEach((square, index) => {
            if(square == ""){
                emptySquares.push(index)
            }
        })
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
          }
        let emptyIndexPos = getRandomInt(0,emptySquares.length)
        let aiPlay = emptySquares[emptyIndexPos]
        return aiPlay
    }

    //
    function updateSquare(e) {
        if (e.target.className == "square"){  //As in, if it doesn't have X or O
            e.target.classList.add(currentPlayer)
            e.target.textContent = currentPlayer
        }
    }

    //Used by handleClick
    function switchPlayers(){
        if (currentPlayer == "X"){
            currentPlayer = "O"
        } else if (currentPlayer == "O"){
            currentPlayer = "X"
        }
    }

    //Returns true if there are no empty spaces left
    function checkForDraw(){
        if(!gameArray.includes("")){
            return true
        }
    }

    //Used by handleClick. Receives true: a player has won. False: game was a draw
    function gameOver(condition){
        if(condition){gameOverText.textContent = `${currentPlayer} wins!`}
        if(!condition){gameOverText.textContent = "Draw!"}
        winScreen.style.display = "flex"
        playAgainBtn.addEventListener('click',initializeGame,{once: true})
    }

    //Used by handleClick
    function updateGameArray(squares) {
        squares.forEach((square, index) => {
            if (square.classList.contains("X")){
                gameArray[index] = "X"
            } else if (square.classList.contains('O')){
                gameArray[index] = "O"
            } else {
                gameArray[index] = ""
            }
            
        })
    }

    //used by handleClick
    function checkForWin(currentPlayer) {
        let win = false;
        winCombos.forEach((winCombo) => {
            let matchCounter = 0 

            //For each of the three numbers in each win combo,
            //Compare it to each element in gameArray
            //If three matches, then that means a win
            //If not, move to next winCombo and reset counter
            winCombo.forEach(squareNumber => {
                if(gameArray[squareNumber] == currentPlayer){
                    matchCounter += 1
                }
            })
            if(matchCounter == 3){
                win = true
            }
        })
        return win;
    }

    return {initializeGame,
            gameArray}

})()
game.initializeGame()

let aiMove = ((array) => {
    let emptySquares = []

    game.gameArray.forEach((square, index) => {
        if(square == ""){
            emptySquares.push(index)
        }
    })

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
      }

    
    let emptyIndexPos = getRandomInt(0,emptySquares.length)
    let aiPlay = emptySquares[emptyIndexPos]

    return {aiPlay}
    gameArray[aiPlay] = currentPlayer
    squares[aiPlay].textContent = currentPlayer
    squares[aiPlay].classList.add(currentPlayer)
})()




























// let body = document.getElementsByTagName('body')[0];
// let teamX = Array.from(document.getElementsByClassName('teamBtn'));
// let boardContainer = document.createElement('div');
// boardContainer.id = "boardContainer";
// body.appendChild(boardContainer);


// const init = (()=>{

//     let Player = function(team){
//         return { team }
//     };
//     let player1 = Player(""); 
//     let player2 = Player("");

//     function getTeam(e){
//         if(e.target.id === "teamX"){
//             this.removeEventListener("click",getTeam);
//             teamX[1].removeEventListener("click",getTeam);
//             player1.team = "X";
//             player2.team = "O";
//         }
//         if(e.target.id === "teamO"){
//             this.removeEventListener("click",getTeam);
//             teamX[0].removeEventListener("click",getTeam);
//             player1 = Player('O');
//             player2 = Player('X');
//         };
//     };

//     let chooseTeam = teamX.forEach(btn=>{
//         btn.addEventListener('click',getTeam)
//     })

    
//     let gameArray = new Array(9).fill('');

//     let attachListener = function(square){
//         square.addEventListener('click',(e)=>{
//             console.log(gameArray);
//             if(gameArray[e.target.id] !== ""){return}
            
//             gameArray[e.target.id] = player1.team;
//         });
//     };

//     let updateBoard = function(array){
//         let i = 0;
//         array.forEach(item=>{
//             let square = document.createElement('div');
//             square.textContent = item;
//             square.className = "square";
//             square.id = i;
//             i++;
//             attachListener(square);
//             boardContainer.appendChild(square);
//         });
//     };


//     // let detectWin = function(array){
//     //     if(array[0] !== "" && array[1] !== "" && array[2] !== ""){
            
//     //     }
//     // }

//     return {chooseTeam}

// })();
// init.chooseTeam;





    






// /*
// User input will involve clicking on divs, and it will input X or O depending on which team
// they chose. Will not work if space is already taken.


// */