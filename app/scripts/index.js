'use strict';

var fbUrl = 'https://jdtictactoe.firebaseio.com/',
       fb = new Firebase(fbUrl),
       game = {
       	            user1:"",
       	            user2:"",
       	            board:[]
       };

console.log('JS loaded');
$('#newGame').on('click', function() {
    fb.push(game);
    console.log('clicked');
	});

$('.game_board').on('click', 'td', function() {
  $(this).addClass('red_background');
})