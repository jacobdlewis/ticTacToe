'use strict';

var fbUrl = 'https://jdtictactoe.firebaseio.com/games',
       fb = new Firebase(fbUrl),
       game = {
       	            user1:"",
       	            user2:"",
       	            board:[]
       },
     isPlayer1Turn = true,
     gameList,
     board = [['', '', ''], ['', '', ''], ['', '', '']];

drawBoard(board);

function drawBoard(boardArray) {
  var $table = $('<table class="game_board table-bordered"></table>');
  boardArray.forEach(function(row) {
    var $row = $('<tr></tr>');
    row.forEach(function(cell){
      $row.append('<td>'+ cell +'</td>');
    });
    $table.append($row);
  });
  $('.container').append($table);
};



$('.game_board').on('click', 'td', function() {
	console.log($(this).index());
  if($(this).hasClass('red_background') || $(this).hasClass('blue_background')) {
    $('.container').append('<span class="wrongMove">Invalid move. That space has been claimed.</span>');
  } else {
	  if(isPlayer1Turn) {
	    $(this).addClass('red_background'),
	    $('.wrongMove').remove();
	  } else {
	    $(this).addClass('blue_background'),
	    $('.wrongMove').remove();;
	  }
	  toggleTurn(isPlayer1Turn);
  }
});

//$('form').submit(function(evt){
//	//User enters name.
//	event.preventDefault();
	// var enteredUserName;
	// enteredUserName = $('#userNameInput').val();
	// //ask FB for games
 //    fb.once('value', function(snap){
 //    	gameList = snap.val();
 //    	console.log(gameList);
 //    });
 //    //if game list is empty, create game.
 //    debugger;
 //    if (gameList === null) {
 //    	game.user1 = enteredUserName;
 //    	fb.push(game);
 //    } 
    //else {
    // //	_.forEach(gameList, function(g){
    // 		if (g.user1 === "") {
    // 			g.user1 = enteredUserName;
    // 			fb.set(g);
    // 		} else if (g.user2 === "") {
    //             g.user2 = enteredUserName;
    // 			fb.set(g);
    // 		};
    // 	});
    // }
//});

function toggleTurn (userTurn) {
  if (userTurn) {
    isPlayer1Turn = false;
  } else if (userTurn === false) {
    isPlayer1Turn = true;
  }
}
