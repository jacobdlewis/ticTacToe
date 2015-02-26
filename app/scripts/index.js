'use strict';

var fbUrl = 'https://jdtictactoe.firebaseio.com/games',
       fb = new Firebase(fbUrl),
       game = {
       	            user1:"",
       	            user2:"",
       	            board:[['', '', ''], ['', '', ''], ['', '', '']],
       	            isPlayer1Turn: true
       },
     player = 'Player 1',
     gameList;

drawBoard(game.board);

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

function resetGame () {
	game.board = [['', '', ''], ['', '', ''], ['', '', '']];
	$('.game_board').remove();
	drawBoard(game.board);
};

$('.container').on('click', 'td', function() {
  var cellCoord  = $(this).index(),
      rowCoord = $(this).closest('tr').index();
  $('.wrongMove').remove();
  if($(this).text()=== "X" || $(this).text()==="O") {
    $('.container').append('<span class="wrongMove">Invalid move. That space has been claimed.</span>');
  } else {
  if (game.isPlayer1Turn === true){
     game.board[rowCoord][cellCoord] = 'X';
   } else {
     game.board[rowCoord][cellCoord] = 'O';
   }
  $('.game_board').remove();
  drawBoard(game.board);
  checkWinner(game.board);
  toggleTurn(game.isPlayer1Turn);
  }
});

function checkWinner(state) {
	//horizontal 1st row
  
  if (state[0][0] !== "" && state[0][0] === state[0][1] && state[0][0] === state[0][2]) {
    alert(player + ' is the winner!'),
    resetGame();
  }
  //horizontal 2nd row
  else if (state[1][0] !== "" && state[1][0] === state[1][1] && state[1][0] === state[1][2]) {
    alert(player + ' is the winner!'),
    resetGame();
  }
  //horizontal 3rd row
  else if (state[2][0] !== "" && state[2][0] === state[2][1] && state[2][0] === state[2][2]) {
    alert(player + ' is the winner!'),
    resetGame();
  }
  //vertical 1st column
  else if (state[0][0] !== "" && state[0][0] === state[1][0] && state[1][0] === state[2][0]) {
    alert(player + ' is the winner!'),
    resetGame();
  }
  //vertical 2nd column
  else if (state[0][1] !== "" && state[0][1] === state[1][1] && state[0][1] === state[2][1]) {
    alert(player + ' is the winner!'),
    resetGame();
  }
  //vertical 3rd column
  else if (state[0][2] !== "" && state[0][2] === state[1][2] && state[0][2] === state[2][2]) {
    alert(player + ' is the winner!'),
    resetGame();
  }
  //diagonal right
  else if (state[0][0] !== "" && state[0][0] === state[1][1] && state[0][0] === state[2][2]) {
    alert(player + ' is the winner!'),
    resetGame();
  }
  //diagonal left
  else if (state[0][2] !== "" && state[0][2] === state[1][1] && state[0][2] === state[2][0]) {
    alert(player + ' is the winner!'),
    resetGame();
  }
  //Draw
  else if (state[0][0] !== "" && state[0][1] !== "" && state[0][2] !== "" && state[1][0] !== "" && state[1][1] !== "" && state[1][2] !== "" && state[2][0] !== "" && state[2][1] !== "" && state[1][1] !== "") {
  	alert('DRAW'),
  	resetGame();
  	 }
};

function toggleTurn (userTurn) {
  if (userTurn) {
    game.isPlayer1Turn = false,
    player = 'Player 2';
  } else if (userTurn === false) {
    game.isPlayer1Turn = true,
    player = 'Player 1';;
  }
}

$('#CreateGame').on('click', function(evt){
	//User enters name.
	event.preventDefault();
	game.user1 = $('#userNameInput').val();
  var newGame = fb.push();
  newGame.set(game);
  });
  //ask FB for games
      // fb.once('value', function(snap){
      //  gameList = snap.val();
      //  console.log(gameList);
      // });


    // else {
    //   debugger;
    // 	_.forEach(gameList, function(g){
    // 		if (game.user1 === "") {
    // 			game.user1 = enteredUserName;
    // 			fb.set(game);
    // 		} else if (game.user2 === "") {
    //             game.user2 = enteredUserName;
    // 			fb.set(game);
    // 		};
    // 	})
    // }



//below was for original color styling prior to X and O
  // if(game.isPlayer1Turn) {
  //   $(this).addClass('red_background');
  // } else {
  //   $(this).addClass('blue_background');
  // }
