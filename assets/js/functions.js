
// initialize vars
var board = {1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: ''};
var secondPlayer = false;
var inGame = false;
var player1Score = 0;
var player2Score = 0;
var turn = 0;
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

randomizePlayer = function(){
  var random = Math.floor(Math.random() * 2 + 1);
  return random;
}

var play = function(){
  $('.box-container').fadeIn(600);
  $('.score-panel').animate({'margin-top': '0'}, 500);
  $('.scores').children().fadeIn(500);
  $('.box-container, .score-panel').children().css({"pointer-events": 'all'});

  //display player scores based on selection
  //decide whose turn it is and prompt that player
  turn = randomizePlayer();
  console.log("Turn: "+turn);
  console.log("Human Opp: "+secondPlayer);
  console.log("Player1: "+player1Symbol);
  console.log("Player2: "+player2Symbol);

  inGame = true;
    //Initialize player turn animation
    if (turn === 1) {
      if (secondPlayer) {
        $('.player1Prompt').text('Go Player 1');
      } else {
        $('.player1Prompt').text('Your Turn!')
      }
      $('.player1Prompt').animate({'margin-top': '-35px'}, 500);
    }
    else if (turn === 2) {
      if (secondPlayer) {
        $('.player2Prompt').text('Go Player 2');
      } else {
        $('.player2Prompt').text('Computer!')
      }
      $('.player2Prompt').animate({'margin-top': '-35px'}, 500);
    }


  // symbol assignment | check for winning combos | switch player turns | update scores | reset game

  $('.box-container li').click(function(e){
    e.stopPropagation();
    var symbol = turn === 1 ? player1Symbol : player2Symbol;
    var box = $(this);
    if (box.text() === '' /*add more condition*/ ) {

      box.text(symbol);

      //Check for win draw for every turn


      //Switching turns
      if (turn === 1) {
        turn = 2;
        //switch animation to player 2
        if (secondPlayer) {
          $('.player2Prompt').text('Go Player 2');
        }else {
          $('.player2Prompt').text('Computer!');
        }
        $('.player1Prompt').animate({'margin-top': '0'}, 500);
        $('.player2Prompt').animate({'margin-top': '-35px'}, 500);
      } else if (turn === 2) {
        turn = 1;
        if (secondPlayer) {
          $('.player1Prompt').text('Go Player 1');
        }else {
          $('.player1Prompt').text('Your Turn!');
        }
        $('.player2Prompt').animate({'margin-top': '0'}, 500);
        $('.player1Prompt').animate({'margin-top': '-35px'}, 500);
      }


    }

  });
}




var initializeGame = function(){

  resetSquares();

  $('.gameMode').hide();
  $('.symbol-selection').hide();
  $('.scores').children().hide();

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
    if (choice === 'Human') {
      secondPlayer = true;
    }
  });

  $('.symbol-x, .symbol-o').click(function(e){
    e.stopPropagation();
    $('.symbol-selection').fadeOut(500);
    if (secondPlayer) {
      $('.player-2 .label').text('Player2 :  ');
    } else {
      $('.player-2 .label').text('Computer :  ');
    }
    player1Symbol = $(this).text();
    player2Symbol = player1Symbol === 'X' ? 'O': 'X';

    play();

  });

  $('.resetAll').click(function(){
    resetBoard();
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
