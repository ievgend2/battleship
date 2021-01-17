// Set everything
  let currentPlayer;
  let otherPlayer;
  let playerName1;
  let playerName2;
function setNames(){
  player1.name = prompt('Player 1 Name');
  player2.name = prompt('Player 2 Name');
}

//Gett access to all Id in HTML
  const board_Player1 = document.getElementById('board_player1');
  const board_Player2 = document.getElementById('board_player2');
  const htmlPlayer1Name = document.getElementById('name_player1');
  const htmlPlayer2Name = document.getElementById('name_player2');
  const htmlPlayer1Lives = document.getElementById('ships_player1');
  
  const htmlPlayer2Lives = document.getElementById('ships_player2');
  let turn = document.getElementById('turn_player');
//Player Objects
  const player1 = {
    name: '',
    gameBoard: board_Player1,
    lives: 4};
  const player2 = {
    name: '',
    gameBoard: board_Player2,
    lives: 4};
//Function play - logic of the game
function play (e) {
  let cell = e.target; // get the element clicked
  console.log( cell.textContent) //display the coordinates in the console
  if (cell.value === 1){ // if hit
    cell.style.background ="red";// change style of div to red
    otherPlayer.lives--;
    show();
  }
  else {
    cell.style.background ="darkblue"; //with this propertie you can change the background color of the clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes
    cell.value = 3;
    if (currentPlayer === player1){
      currentPlayer = player2;
      otherPlayer = player1;
    }
    else {
      currentPlayer = player1;
      otherPlayer = player2;
    }
    
    show();
  }
  
  winner();
}

if (Math.random() > 0.5){
  currentPlayer = player1;
  otherPlayer = player2;}
  else {
  currentPlayer = player2;
  otherPlayer = player1;
  }
//Function show refresh textcontent for HTML items
function show () {
  htmlPlayer1Lives.textContent = player1.lives;
  htmlPlayer2Lives.textContent = player2.lives;
  htmlPlayer1Name.textContent = player1.name;
  htmlPlayer2Name.textContent = player2.name;
  turn.textContent = currentPlayer.name;
}
//Function evaluate winner
function winner () {
  if (otherPlayer.lives === 0){
    turn.textContent = `Congradulations player ${currentPlayer.name} won!!!`;
  }
}
//Function creating HTML buttons
function createButtons (){
  const buttons = document.getElementById ("buttons")
  const button1 = document.createElement('button');
  button1.textContent = 'New Game';
  buttons.appendChild(button1);

  const button2 = document.createElement('button');
  button2.textContent = 'Reset Game';
  buttons.appendChild(button2);

  buttons.addEventListener ('click', (e) =>{
    if (e.target.textContent === 'New Game'){
    newGame();}
    else {
      resetGame();
    }
  })
}
//Function creating HTML list with divs
function createBoard (board) {
  board.textContent='';
  for (var x = 0; x < 4; x++) {

    const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board

    for (var y = 0; y < 4; y++) {
      cell = document.createElement('div');
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
      cell.value = 0;//state of the cell
    
      //this function adds the click event to each cell
      
    cell.addEventListener( 'click', play);
      li.appendChild(cell); //adding each cell into the row number x
    }
      board.appendChild(li); //adding each row into the board
      
  }


}
function placeShips (){
  const square = document.querySelectorAll('.square');
}
//Function set valuesof divs
function placeShip (xxx){
  
  let shipPlaced = 0;
  while (shipPlaced<4) {
    let x1 = Math.floor(Math.random()*(3-0+1))+0;
    let y1 = Math.floor(Math.random()*(3-0+1))+0;
    let row1 = xxx.getElementsByTagName('li')[x1];
    let cell1 = row1.getElementsByTagName('div')[y1];

    if (cell1.value === 0 ){
      cell1.value = 1;
      shipPlaced++;
    }
    else{
      continue
    }
  }
}
//Function change div style to black
function resetBoard (){
  for (const cell of document.querySelectorAll('#board_player1>li>div')) {
    cell.style.background ="black"
  }
  for (const cell of document.querySelectorAll('#board_player2>li>div')) {
    cell.style.background ="black"
  }
}
// Function main game
function battleship (){
  setNames();
  createBoard(board_Player1);
  createBoard(board_Player2);
  placeShip(board_Player1);
  placeShip(board_Player2);
  show();
  createButtons();
  console.log(currentPlayer)
}
battleship();
// If reset game button clicked
function resetGame (){
  resetBoard();
  resetLives();
  show();


}
// If new game button clicked
function newGame (){
  setNames();
  createBoard(board_Player1);
  createBoard(board_Player2);
  placeShip(board_Player1);
  placeShip(board_Player2);
  resetLives();
  show();
}
// Function to reset players lives
function resetLives(){
  player1.lives = 4;
  player2.lives = 4;
}
