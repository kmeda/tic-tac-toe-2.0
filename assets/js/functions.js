
// initialize vars
var board = {1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: ''};
var secondPlayer = false;
var inGame = false;
var player1Score = 0;
var player2Score = 0;
var turn = 0;

var resetSquares = function(){
  $('.box-container').html('');
  for (var i = 1; i <= 9; i++) {
    box = '<li class="box-'+ i + '"></li>';
    $('.box-container').append(box);
  }
};

turn = function(){
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
  //check for winning combos | switch player turns | update scores | reset game
  turn();
  console.log(turn());
  console.log(secondPlayer);
  if (turn === 1) {
    //animate player1Prompt
    //$('.prompt .player1Prompt').animate({'margin-top': '35px'}, 500);
  } else if (turn === 2 && secondPlayer) {
    //animate player2Prompt
    //$('.prompt .player2Prompt').animate({'margin-top': '35px'}, 500);
  } else {
    //animate player2Prompt computer
    //$('.prompt .player2Prompt').animate({'margin-top': '35px'}, 500);
  }


  $('.box-container li').click(function(e){
    e.stopPropagation();


  });
}




var initializeGame = function(){

  resetSquares();

  $('.gameMode').hide();
  $('.symbol-selection').hide();
  $('.scores').children().hide();

  $('.prompt').animate({'margin-top': '0'}, 500);
  $('.score-panel').animate({'margin-top': '0'}, 500);
  $('.box-container').fadeIn(500);
  $('.box-container, .score-panel').children().css({"pointer-events": 'none'});

  setTimeout(function(){
    $('.gameMode').fadeIn(1000);
    $('.box-container').fadeOut();
    $('.prompt').animate({'margin-top': '35px'}, 800);
    $('.score-panel').animate({'margin-top': '-35px'}, 800);
  }, 1500);

  $('.mode').click(function(e){
    e.stopPropagation();
    $('.gameMode').fadeOut(500);
    $('.symbol-selection').fadeIn(600);
    if ($(this).text() === 'Human') {
      secondPlayer = true;
    }
  });

  $('.symbol').click(function(e){
    e.stopPropagation();
    $('.symbol-selection').fadeOut(500);
    if (secondPlayer) {
      $('.player-2 .label').text('Player2 :  ');
    } else {
      $('.player-2 .label').text('Computer :  ');
    }
    play();

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
