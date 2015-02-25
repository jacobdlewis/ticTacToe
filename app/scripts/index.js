'use strict';

var fbUrl = 'https://jdtictactoe.firebaseio.com/',
       fb = new Firebase(fbUrl),
       game = {
       	            user1:"",
       	            user2:"",
       	            board:[]
       },
       isPlayer1Turn = true;

console.log('JS loaded');
$('#newGame').on('click', function() {
    fb.push(game);
    console.log('clicked');
	});

$('.game_board').on('click', 'td', function() {
  if(isPlayer1Turn) {
    $(this).addClass('red_background');
  } else {
    $(this).addClass('blue_background');
  }
  toggleTurn(isPlayer1Turn);
  console.log(isPlayer1Turn);
});

function toggleTurn (userTurn) {
  if (userTurn) {
    isPlayer1Turn = false;
  } else if (userTurn === false) {
    isPlayer1Turn = true;
  }
}