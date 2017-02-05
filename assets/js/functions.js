
// initialize vars
var board = {1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: ''};
var winCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [7, 5, 3]];
var secondPlayer = false;
var inGame = false;
var player1Score = 0;
var player2Score = 0;
var turn;
var player1Symbol = '';
var player2Symbol = '';
var numPositionsFilled = 0;


var resetSquares = function(){ //Append boxes
  $('.box-container').html('');
  for (var i = 1; i <= 9; i++) {
    var box = '<li class="box-'+ i + '"></li>';
    $('.box-container').append(box);
  }
};

var resetBoard = function(){ //Reset Board values/symbols
  for (var i = 1; i <= 9; i++) {
    board[i] = '';
    $('.box-container .box-'+i).text('');
  }
};

var randomizePlayer = function(){ //Who goes first?
  var random = Math.floor(Math.random() * 2 + 1);
  return random;
}

var checkWin = function(symbol){ //For every click check the entire board for wincombos
  var currentBoard = board;
  var wins = winCombos;
  var winningCombo = [];
  winner = wins.some(function(combo){
    var winning = true;
    for (var i = 0; i < combo.length; i++) {
      if (currentBoard[combo[i]] !== symbol) {
        winning = false;
      }
      if (winning) {
        winningCombo = combo;
      }
    }
    return winning;
  });
  return [winner, winningCombo];
};

var resetGame = function(){ //Reset current board and continue game with scores updated
  resetSquares();
  resetBoard();
  numPositionsFilled = 0;
  $('.player1Prompt, .player2Prompt').animate({'margin-top': '0'}, 500);
  $('.winDrawMessage').fadeOut(500);

  setTimeout(function(){
      play();
  }, 600);

}

var resetAll = function(){ //Full reset - go to main screen
    $('.player1Prompt, .player2Prompt').animate({'margin-top': '0'}, 500);
    $('.score-panel').animate({'margin-top': '-35px'}, 500);
    $('.winDrawMessage').hide();
    $('.box-container').hide();
    $('.symbol-selection').hide();

    inGame = false;
    resetBoard();
    resetSquares();
    numPositionsFilled = 0;
    player1Symbol = '';
    player2Symbol = '';

    player1Score = 0;
    player2Score = 0;
    $('.score-1, .score-2').text(0);
    turn = 0;

    $('.gameMode').fadeIn();
}

var initializeGame = function(){ //Main function

  resetSquares(); //Animate intro and fade all except gameMode selection
  $('.gameMode').hide();
  $('.symbol-selection').hide();
  $('.scores').children().hide();
  $('.winDrawMessage').hide();

  $('.prompt').animate({'margin-top': '-35px'}, 500);
  $('.score-panel').animate({'margin-top': '0'}, 500);
  $('.box-container').fadeIn(500);
  $('.box-container, .score-panel').children().css({"pointer-events": 'none'});

  setTimeout(function(){
    $('.gameMode').fadeIn(1000);
    $('.box-container').fadeOut();
    $('.prompt').animate({'margin-top': '0'}, 800);
    $('.score-panel').animate({'margin-top': '-35px'}, 800);
  }, 1500);

  $('.mode').click(function(e){ //Human or AI mode selection
    e.stopPropagation();
    $('.gameMode').fadeOut(500);
    var choice = $(this).text();

      secondPlayer = function(){ // if two player?
        if (choice === 'AI') {
          $('.player-2 .label').text('Computer');
          return false;
        } else {
          $('.player-2 .label').text('Player2');
          return true;
        }
      }

      $('.symbol-selection').fadeIn(600); //Symbol selection
      if (choice === 'Human') {
        $('.symbol-selection .label').text('Player1, Would you like to be..');
      } else {
        $('.symbol-selection .label').text('Would you like to be..');
      }
  });

      $('.symbol-x, .symbol-o').click(function(e){ //Symbol assignment
        e.stopPropagation();
        $('.symbol-selection').fadeOut(500);
        if (secondPlayer) {
          $('.player-2 .label').text('Player2');
        } else {
          $('.player-2 .label').text('Computer');
        }
        player1Symbol = $(this).text();
        player2Symbol = player1Symbol === 'X' ? 'O': 'X';
        play();
      });

  $('.go-back').click(function(e) {
      e.stopPropagation();
      $('.gameMode').fadeIn(500);
      $('.symbol-selection').fadeOut(300);
    });

  $('.resetAll').click(function(){
    resetAll();
  });
}


var play = function(){ //Game play logic
  $('.box-container').fadeIn(600);
  $('.score-panel').animate({'margin-top': '0'}, 500);
  $('.scores').children().fadeIn(500);
  $('.box-container, .score-panel').children().css({"pointer-events": 'all'});

  turn = randomizePlayer(); // Random turn

  inGame = true;

    if (turn === 1) { //Initialize player turn animation
      if (secondPlayer()) {
        $('.player1Prompt').text('Go Player 1');
      } else {
        $('.player1Prompt').text('Your Turn!')
      }
      $('.player1Prompt').animate({'margin-top': '-35px'}, 500);
    }
    else if (turn === 2) {
      if (secondPlayer()) {
        $('.player2Prompt').text('Go Player 2');
      } else {
        $('.player2Prompt').text('Computer!')
      }
      $('.player2Prompt').animate({'margin-top': '-35px'}, 500);
    }

    if (turn === 2 && !secondPlayer()) {
        computerPlay();
      }

    $('.box-container li').click(function(e){ //Game
      e.stopPropagation();
      playerTurn(this);
    });


} // Play() end

var playerTurn = function(square){
  //assign symbol
  //if turn = 1 || second player - update box
  //update board
  //switch turns
  var symbol = turn === 1 ? player1Symbol : player2Symbol;
  var box = $(square);

  if (box.text() === '' && inGame && (turn === 1 || (turn === 2 && secondPlayer))) {
    box.text(symbol); //Inserts symbol in the box

        //Updates board and positions filled
    var currentBox = $(square).attr('class')
        currentBox = currentBox[currentBox.length - 1];
        board[currentBox] = symbol;

    switchTurns(symbol);

  }
};

var computerPlay = function(){
  //assign symbol
  //Update this box with the symbol
  //Update board
  //Switch turns
  var moveToPosition;
  var move = computerMoves();
  if (turn === 2 && move) {
    moveToPosition = move;
    var box = $('.box-'+move);
    var symbol = player2Symbol;
    box.text(symbol);

    var currentBox = $(box).attr('class')
        currentBox = currentBox[currentBox.length - 1];
        board[currentBox] = symbol;

    switchTurns(symbol);

  }
};

var computerMoves = function(){
  //Implement MiniMax algorithm here
  //MiniMax() Calculates and gets the move number
  //For every player1 move run heuristics to determine the best possible move

  var count = 0;
  var boardPositions = [];
  for (var i = 1; i <= 9; i++) {
    console.log(board[i]);
    if (board[i] === '') {
      count += 1;
      boardPositions.push(i);
    }
  }
  var randomBox = Math.floor(Math.random() * count);
  console.log('count: '+count);
  console.log(boardPositions);
  console.log('randomBox: '+randomBox);
  console.log('chosenBox: '+boardPositions[randomBox]);
  return boardPositions[randomBox];



  //Return move 1 - 9
};

var switchTurns = function(symbol){
  numPositionsFilled += 1;
  if (inGame) {
    if (checkWin(symbol)[0]) {  //Winner | loop through each winning combo to check symbol
      var currentScore = turn === 1 ? player1Score +=1 : player2Score +=1; //update score
      $('.score-'+turn).text(currentScore); //display score
          if (secondPlayer()) { //display win message for that player
            var winner = turn === 1 ? 'Player 1 Wins!' : 'Player 2 Wins!';
            $('.winDrawMessage').text(winner);
            $('.winDrawMessage').fadeIn(600);
          } else { //computer win case - loser message :/
            var winner = turn === 1 ? 'You Win!' : 'You lose!';
            $('.winDrawMessage').text(winner);
            $('.winDrawMessage').fadeIn(600);
          }

      for (var i = 0; i < checkWin(symbol)[1].length; i++) { //Show winning combo
        $('.box-'+checkWin(symbol)[1][i]).css({'background':'#00ffd1','color':'black'});
      }

      $('.resetAll').css({'pointer-events': 'none'});  //block reset while animating
      setTimeout(function(){ //reset and continue playing
        resetGame();
        $('.resetAll').css({'pointer-events': 'all'}); // Allow reset after animation
      }, 3000);

    } else if (numPositionsFilled === 9) {  /*Draw if numPositionsFilled = 9*/
      $('.winDrawMessage').text("It was a draw!");
      $('.winDrawMessage').fadeIn(300);

      $('.resetAll').css({'pointer-events': 'none'});
      setTimeout(function(){ //reset game and continue playing
        resetGame();
        $('.resetAll').css({'pointer-events': 'all'});
      }, 3000);

    } else {
      if (turn === 1) {  //Switching turns
        turn = 2;
        if (secondPlayer()) { //switch animation to player 2
          $('.player2Prompt').text('Go Player 2');
        }else {
          $('.player2Prompt').text('Computer!');
        }
        $('.player1Prompt').animate({'margin-top': '0'}, 500);
        $('.player2Prompt').animate({'margin-top': '-35px'}, 500);

        if (!secondPlayer()) { //computerPlay();
          computerPlay();
        }

      } else if (turn === 2) { //switch animation to player 1
        turn = 1;
        if (secondPlayer()) {
          $('.player1Prompt').text('Go Player 1');
        }else {
          $('.player1Prompt').text('Your Turn!');
        }
        $('.player2Prompt').animate({'margin-top': '0'}, 500);
        $('.player1Prompt').animate({'margin-top': '-35px'}, 500);
      }
    }
  }
};


$(document).ready(function(){

initializeGame();

});


/*

Present the UI
  Game selection mode

  Symbol selection

  Board grid

  Scores and reset

  Animate welcome
    slide down scores
    slide up player prompts
    fadein board grid

    put everything back inside and fadeIn gameMode

  On gameMode selection, present symbol-selection
    On symbol selection start game

  Game start
    initialize all variables




*/
