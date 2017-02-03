
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

var resetSquares = function(){
  $('.box-container').html('');
  for (var i = 1; i <= 9; i++) {
    var box = '<li class="box-'+ i + '"></li>';
    $('.box-container').append(box);
  }
};

var resetBoard = function(){
  for (var i = 1; i <= 9; i++) {
    board[i] = '';
    $('.box-container .box-'+i).text('');
  }
};

var randomizePlayer = function(){
  var random = Math.floor(Math.random() * 2 + 1);
  return random;
}

var checkWin = function(symbol){
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

var resetGame = function(){ //Reset current board and continue play
//reset board | remove player prompts | remove message | start play
resetSquares();
resetBoard();
numPositionsFilled = 0;

$('.player1Prompt, .player2Prompt').animate({'margin-top': '0'}, 500);
$('.winDrawMessage').fadeOut(500);
setTimeout(function(){
    play();
}, 600);


}

var resetAll = function(){ //Full reset
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

var initializeGame = function(){

  resetSquares();

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

  $('.mode').click(function(e){
    e.stopPropagation();
    $('.gameMode').fadeOut(500);
    $('.symbol-selection').fadeIn(600);
    var choice = $(this).text();

      secondPlayer = function(){
        if (choice === 'AI') {
          $('.player-2 .label').text('Computer');
          return false;
        } else {
          $('.player-2 .label').text('Player2');
          return true;
        }
      }

      $('.go-back').click(function(e) {
          e.stopPropagation();
          $('.gameMode').fadeIn(500); //***
          $('.symbol-selection').fadeOut(300);
        });
  });


  $('.symbol-x, .symbol-o').click(function(e){
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

  $('.resetAll').click(function(){
    resetAll();
  });


}

var play = function(){
  $('.box-container').fadeIn(600);
  $('.score-panel').animate({'margin-top': '0'}, 500);
  $('.scores').children().fadeIn(500);
  $('.box-container, .score-panel').children().css({"pointer-events": 'all'});

  //display player scores based on selection
  //decide whose turn it is and prompt that player
  turn = randomizePlayer();

  inGame = true;
    //Initialize player turn animation
    if (turn === 1) {
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


  $('.box-container li').click(function(e){
    e.stopPropagation();
    /*
    console.log("Turn: "+turn);
    console.log("Human Opp: "+secondPlayer());
    console.log("Player1: "+player1Symbol);
    console.log("Player2: "+player2Symbol);
    */

    var symbol = turn === 1 ? player1Symbol : player2Symbol;
    var box = $(this);

    if (box.text() === '' && inGame && (turn === 1 || (turn === 2 && secondPlayer))) {
      box.text(symbol); //Inserts symbol in the box

      //Check for win draw for every turn - More if conditions before switching turns - Update scores
      //Write this code yourself..

      numPositionsFilled += 1;      //Updates board and positions filled
      var currentBox = $(this).attr('class')
          currentBox = currentBox[currentBox.length - 1];
          board[currentBox] = symbol;




      if (inGame) {
        //checkWin(symbol);
        if (checkWin(symbol)[0]) {  /*Winner | loop through each winning combo to check symbol*/
          //update score
          var currentScore = turn === 1 ? player1Score +=1 : player2Score +=1;
          $('.score-'+turn).text(currentScore);
              if (secondPlayer()) {
                //display message for that player
                var winner = turn === 1 ? 'Player 1 Wins!' : 'Player 2 Wins!';
                $('.winDrawMessage').text(winner);
                $('.winDrawMessage').fadeIn(600);
              } else {
                //computer win case - lose message
                var winner = turn === 1 ? 'You Win!' : 'You lose!';
                $('.winDrawMessage').text(winner);
                $('.winDrawMessage').fadeIn(600);
              }
          //Show winning combo
          //reset game and start playing

          for (var i = 0; i < checkWin(symbol)[1].length; i++) {
            $('.box-'+checkWin(symbol)[1][i]).css({'background':'#00ffd1','color':'black'});
          }

          $('.resetAll').css({'pointer-events': 'none'});
          setTimeout(function(){
            resetGame();
            $('.resetAll').css({'pointer-events': 'all'});
          }, 3000);


        } else if (numPositionsFilled === 9) {  /*Draw | numPositionsFilled = 9*/
          //reset game and start playing
          $('.winDrawMessage').text("It was a draw!");
          $('.winDrawMessage').fadeIn(300);

          $('.resetAll').css({'pointer-events': 'none'});
          setTimeout(function(){
            resetGame();
            $('.resetAll').css({'pointer-events': 'all'});
          }, 3000);

        } else {
          if (turn === 1) {  //Switching turns
            turn = 2;
            //switch animation to player 2
            if (secondPlayer()) {
              $('.player2Prompt').text('Go Player 2');
            }else {
              $('.player2Prompt').text('Computer!');
            }
            $('.player1Prompt').animate({'margin-top': '0'}, 500);
            $('.player2Prompt').animate({'margin-top': '-35px'}, 500);

            if (!secondPlayer()) {
              //computerPlay();
            }


          } else if (turn === 2) {
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
    }

  });
}






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
