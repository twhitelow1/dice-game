class Die {
    constructor(id, color){
        this.face = 1;
        this.id = id;
        this.color = color;
    }

        // This method takes in the face AKA side of the die. 
        // Depending
        showDice(face){

            //subtract 1 from the die id because the first occuring first-face class is the first die. 
            // the index starts at 0
            const die = this.id - 1;
            //console.log(`Show ${face} of die ${die}`);
            switch(face){
                case 1:
                    document.getElementsByClassName('first-face')[die].style.display = 'flex';
                    break;
                case 2:
                    document.getElementsByClassName('second-face')[die].style.display = 'flex';
                    break;
                case 3:
                    document.getElementsByClassName('third-face')[die].style.display = 'flex';
                    break;
                case 4:
                    document.getElementsByClassName('fourth-face')[die].style.display = 'flex';
                    break;
                case 5:
                    document.getElementsByClassName('fifth-face')[die].style.display = 'flex';
                    break;
                case 6:
                    document.getElementsByClassName('sixth-face')[die].style.display = 'flex';
                    break;
            }
        };

        hideDice(face){
            const die = this.id - 1;
            //console.log(`Hide face of ${this.id}`)
            switch(face){
                case 1:
                    document.getElementsByClassName('first-face')[die].style.display = 'none';
                    break;
                case 2:
                    document.getElementsByClassName('second-face')[die].style.display = 'none';
                    break;
                case 3:
                    document.getElementsByClassName('third-face')[die].style.display = 'none';
                    break;
                case 4:
                    document.getElementsByClassName('fourth-face')[die].style.display = 'none';
                    break;
                case 5:
                    document.getElementsByClassName('fifth-face')[die].style.display = 'none';
                    break; 
                case 6:
                    document.getElementsByClassName('sixth-face')[die].style.display = 'none';
                    break;   
            }
        };

        rollDice(){
            //console.log(`Die ${this.id} Rolled `);
            const dieRoll = Math.floor(Math.random() * 6) + 1;
            //console.log(`New Face = ${dieRoll}`);
            this.hideDice(this.face);
            this.face = dieRoll;
            this.showDice(dieRoll);
        }
}

let die1 = new Die(1, 'red');
let die2 = new Die(2, 'blue');

class Game {
    constructor(playerNames, numOfPlayers, knockOutNumbers  ){
    this.numOfPlayers = numOfPlayers;
    this.playerNames = playerNames;
    this.knockOutNumbers = knockOutNumbers;
    }

    currentPlayerNum = 1;
    isOver = true;
    winner = '';
    winnerScore = 0;
    get isOver(){
        return this.isOver;
    }
    set isOver(state){
        this.isOver = state;
    }
    get winner(){
        return this.winner;
    }
    set winner(winner){
        this.winner = winner;
    }  
    set currentPlayerNum(playerNum){
        this.currentPlayerNum = playerNum;
    }
    get currentPlayerNum(){
        return this.currentPlayerNum
    }
}


newGame = new Game([], 0, []);

/**
 *      Player Class
 */

class Player{
    constructor(playerNum, playerName, knockOutNum){
        this.playerNum = playerNum;
        this.playerName = playerName;
        this.knockOutNum = knockOutNum;
    }
    _isKO = false;
    _isTurn = false;
    _score = 0;

    get isTurn(){
        return this._isTurn;
    }
    set isTurn(isTurn){
        this._isTurn = isTurn;
    }
    get isKO(){
        return this._isKO;
    }
    set isKO(isKO){
        this._isKO = isKO;
    }
    get score(){
        return this._score;
    }
    set score(score){
        this._score = score;
    }
}

/**
 * 
 * Game Functions
 * Functions that interact witht he objects
 * 
 */


function startGame(){

    /*
    **
    ** PROMPT FOR NUMBER OF PLAYERS, VERIFY THE COUNT OF THE PLAYERS
    ** 
    */

    // Ask for the number of players and parse answer as an int
    let numOfPlayers = parseInt(prompt('How Many Players?'));

    // Create variable to test the number of players
    let checkPlayerCount = numOfPlayers;


    let patt = RegExp("[^0-9]", "g");
    let res = patt.test(checkPlayerCount);
    console.log(`result of reg exp: ${res}`);

    while(res === true) {
        checkPlayerCount = prompt(' Must be a number 1 - 4. How many players?');
        patt = RegExp("[^0-9]", "g");
        res = patt.test(checkPlayerCount);

        if(res !== true){
            numOfPlayers = checkPlayerCount;
        }
    }

    // While input for how many players is less than 1 
    while(checkPlayerCount < 1){
        // Alert that you need at least 1 player. Prompt for new input. Parse the answer to Int.
        checkPlayerCount = prompt('You need at least 1 player. How many Players?');
        
        if(checkPlayerCount > 1){
            numOfPlayers = checkPlayerCount;
        }
    }
    // While the input for how many players is greater than 4. Parse the answer to Int.
    while(checkPlayerCount > 4){
        checkPlayerCount = prompt('You can only have up to 4 players. How many Players?');
        const patt = RegExp("[^0-9]", "g");
        const res = patt.test(checkPlayerCount);
        if(res === true) {
            checkPlayerCount = prompt(' Must be a number 1 - 4. How many players?');
        } else {
            checkPlayerCount = parseInt(checkPlayerCount);
        }

        if(checkPlayerCount <= 4 ){
           numOfPlayers = checkPlayerCount;
        }
    }
    console.log(`Final Number of Players: ${numOfPlayers}`);

    // Create array for playerNames and knockOutNumbers that will be passed to the game object
    const playerNames = [];
    const knockOutNumbers = [];

    /*
    **
    ** FOR EACH PLAYER GATHER NAME AND KNOCK OUT NUMBER, VEIFY KO NUMBER REQUIREMENTS, CREATE PLAYER
    ** 
    */

    
    // Prompt for user input about each player and create player in each cycle
    // using the input numOf Players to detwermine how many players we need to ask about

    for(i = 0; i < numOfPlayers; i++ ){
        const playerNum =  i + 1; // Adds one to the current iterator to set player number. iterator starts at 0

        // Ask for player name add player name to playerNames Array
        const playerName = prompt(`What is Player ${playerNum}'s Name? `);
        playerNames.push(playerName);

        // Get the knock out number from player and store in playerKO
        let playerKO = prompt(`What is the knock number for ${playerName}? (Choose 6 - 9)`);
        let checkPlayerKO = playerKO;

        let patt = RegExp("[^6-9]", "g");
        let res = patt.test(checkPlayerKO);
        console.log(`result of reg exp on knock out: ${res}`);

        while(res === true) {
            checkPlayerKO = prompt(`Must be a number 6 - 9 only. Whats the knock out number for ${playerName}`);
            patt = RegExp("[^6-9]", "g");
            res = patt.test(checkPlayerKO);

            if(checkPlayerKO >= 6 && checkPlayerKO <= 9){
                playerKO = checkPlayerKO;
            }
        }

        // Check the playerKO to make sure that it is 6 or greater and 9 or less.
        if(checkPlayerKO < 6 || checkPlayerKO > 9){
            let isWrong = true;
            while(isWrong === true){
                checkPlayerKO = parseInt(prompt(`Knock Number Is Out Of Range.
                What is the knock number for ${playerName}? (Choose 6 - 9)`));


                if(checkPlayerKO >= 6 && checkPlayerKO <= 9){
                    isWrong = false;
                    playerKO = checkPlayerKO;
                }
            }
        }
        // Add the knock out number to the knockOutNumbers Array
        knockOutNumbers.push(playerKO);
        
        // Depending on player number create a player based on that number.
        switch(playerNum){
            case 1:
                playerOne =  new Player(playerNum, playerName, playerKO) ;
                console.log(playerOne);
            break;
            case 2:
                playerTwo =  new Player(playerNum, playerName, playerKO) ;
                console.log(playerTwo);
            break;
            case 3:
                playerThree =  new Player(playerNum, playerName, playerKO) ;
                console.log(playerThree);
            break;
            case 4:
                playerFour =  new Player(playerNum, playerName, playerKO) ;
                console.log(playerFour);
            break;
        }
    }

    /*                          *
    ** CREATE THE GAME OBJECT   *
    **                          */                  
    newGame.playerNames = playerNames; 
    newGame.numOfPlayers = numOfPlayers; 
    newGame.knockOutNumbers = knockOutNumbers;
    newGame.isOver = false;
    
    console.log(newGame);
    setupScreen();
    //showScoreBoard();
    // showTurn();
}

executeTurn = () =>{
    //console.log(`Die 1: ${die1.face}`);
    //console.log(`Die 2: ${die2.face}`);

    activePlayer = newGame.currentPlayerNum;
    playerCount = newGame.numOfPlayers;
    activePlayerChecker = activePlayer;
    player = playerObjectSelector(activePlayer);

    rollResult = die1.face + die2.face;
        if(player.knockOutNum === rollResult){
            player.score = 0;
            alert(`${player.playerName} rolled their knockout number so their score was reset!`)
        }
        else{
            player.score += rollResult;
        }
    

    //console.log(`Current Player at roll: ${player.playerName}`);
    //console.log(`activePlayer: ${activePlayer}`);
    //console.log(`playerCount: ${playerCount}`)

    setupScreen();

    if(player.score >= 24){
        alert(`${player.playerName} wins!`)
        document.querySelector('.roll').style.display = 'none';
        endGame();
    }

    if(activePlayer === playerCount){
        newGame.currentPlayerNum = 1;
    }else if(activePlayer < playerCount){
        newGame.currentPlayerNum ++;
    }else if(activePlayer > playerCount){
        alert('Error: active player higher than player count?!')
    }else {
        console.log(`Active player swither failed this is the current acivePlayer value: ${activePlayer}
        and this is the ${playerCount}`);
        alert('Error with active player count!');
    }

    console.log(`newGame.CurrentPlayerNum: ${newGame.currentPlayerNum}`);
    console.log(`end of turn current player number: ${newGame.currentPlayerNum}`)
    setupScreen();
    
}
clearPlayers = () =>{

    for(i = 1; i <= newGame.numOfPlayers; i++){
        player = playerObjectSelector(i);
        player.playerName = '';
        player.score = 0;
        player.knockOutNum = 0;
        rollResult = 0;
        //alert(`Cleared ${player.playerName} score(${player.score}) and knock out number(${player.knockOutNum})`)
    }
}
endGame = () =>{
    clearPlayers();
    newGame.isOver = true;
    newGame.playerNames = []; 
    newGame.numOfPlayers = 0; 
    newGame.currentPlayerNum = 0;
    newGame.knockOutNumbers = null;
    setupScreen();
    console.log(`Value of newGame.isOver is ${newGame.isOver}`);
    console.log(``)
    if(newGame.isOver === true){
        console.log('Successfully ended the game!');
    }
    
}



/**
 *  Selects player object based on id
 */

playerObjectSelector = (id) => {
    switch(id){
        case 1: 
            return playerOne ;
            break;
        case 2:
            return playerTwo;
            break;
        case 3:
            return playerThree;
            break;
        case 4:
            return  playerFour;
            break;
    }
}


/**
 *  Screen Functions
 *  ex. display scoreboard when game playing
 *      display whos turn it is or not
 *      hide gameplay buttons when no active game
 */
showScoreBoard = () =>{
    for(i = 1; i <= newGame.numOfPlayers; i++){
        //console.log('started scoreboard loop!')
        selectedPlayer = playerObjectSelector(i);
        console.log(selectedPlayer.playerName);
        //document.getElementsByClassName('scoreboard-players')[0].innerHTML = '<h3 class="player' + i +'> ' + selectedPlayer.playername + '</h3>';
        document.querySelector(`.scoreboard-players .player${i}`).innerHTML = `${selectedPlayer.playerName}: ${selectedPlayer.score} / KO Number: ${selectedPlayer.knockOutNum}`;
        document.querySelector('.game-score').style.display = 'flex'; 
    }
}
hideScoreBoard = () =>{
    document.querySelector('.game-score').style.display = 'none';
    for(i = 1; i < 5; i++) {
        document.querySelector(`.scoreboard-players .player${i}`).innerHTML = ` `; 
    }
}

showTurn = () =>{
        //console.log('Show Turn!')
        let currentNumber = newGame.currentPlayerNum
        selectedPlayer = playerObjectSelector(currentNumber);
        //console.log(`Current Player Object: ${selectedPlayer} `);
        document.querySelector('.game-info').innerHTML = `<h2> ${selectedPlayer.playerName}'s turn </h3>`;
        document.querySelector('.game-info').style.display = 'flex';   
}

hideTurn = () =>{
    document.querySelector('.game-info').style.display = 'none'; 
}

setupScreen = () =>{
    if(newGame.isOver === true){
        document.querySelector('.startGame').style.display = 'flex';
        document.querySelector('.endGame').style.display = 'none';  
        document.querySelector('.roll').style.display = 'none'; 
        hideTurn();
        hideScoreBoard(); 
    } else {
        document.querySelector('.startGame').style.display = 'none';
        document.querySelector('.endGame').style.display = 'flex';  
        document.querySelector('.roll').style.display = 'flex'; 
        showScoreBoard();
        showTurn();
    }    
    
}
