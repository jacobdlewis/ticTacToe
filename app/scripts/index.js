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
  var cellCoord  = $(this).index(),
      rowCoord = $(this).closest('tr').index();
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
  if (isPlayer1Turn === true){
     board[rowCoord][cellCoord] = 'X';
   } else {
     board[rowCoord][cellCoord] = 'O';
   }
  toggleTurn(isPlayer1Turn);
  }
});

function checkWinner() {
	//horizontal 1st row
  if (state[0][0] !== "" && state[0][0] === state[0][1] && state[0][0] === state[0][2]) {
    alert(player + ' is the winner!');
  }
  //horizontal 2nd row
  else if (state[1][0] !== "" && state[1][0] === state[1][1] && state[1][0] === state[1][2]) {
    alert('Winner!');
  }
  //horizontal 3rd row
  else if (state[2][0] !== "" && state[2][0] === state[2][1] && state[2][0] === state[2][2]) {
    alert('Winner!');
  }
  //vertical 1st column
  else if (state[0][0] !== "" && state[0][0] === state[1][0] && state[1][0] === state[2][0]) {
    alert('Winner!');
  }
  //vertical 2nd column
  else if (state[0][1] !== "" && state[0][1] === state[1][1] && state[0][1] === state[2][1]) {
    alert('Winner!');
  }
  //vertical 3rd column
  else if (state[0][2] !== "" && state[0][2] === state[1][2] && state[0][2] === state[2][2]) {
    alert('Winner!');
  }
  //diagonal right
  else if (state[0][0] !== "" && state[0][0] === state[1][1] && state[0][0] === state[2][2]) {
    alert('Winner!');
  }
  //diagonal left
  else if (state[0][2] !== "" && state[0][2] === state[1][1] && state[0][2] === state[2][0]) {
    alert('Winner!');
  }
};

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
