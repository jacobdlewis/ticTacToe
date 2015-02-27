/* jshint jquery: true */
'use strict';

var fbUrl = 'https://quic-tac-toe.firebaseio.com/games',
       fb = new Firebase(fbUrl),
       game = {
       	            gameId       : null,
                    user1        :"",
       	            user2        :"",
       	            board        :[['', '', ''], ['', '', ''], ['', '', '']],
       	            isPlayer1Turn: true
       },
     player = 'Player 1',
     gameList,
     currentGameState;

  fb.on('value', function(snap){
  var dbSnap = snap.val();
  currentGameState = dbSnap[game.gameId];
  console.log(currentGameState);
  });

drawBoard(game.board);

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
  checkWinner(game.board);
  toggleTurn(game.isPlayer1Turn);
  updateGameInDb(game);
  drawBoard(currentGameState.board);
  }
});

function toggleTurn (userTurn) {
  if (userTurn) {
    game.isPlayer1Turn = false,
    player = 'Player 2';
  } else if (userTurn === false) {
    game.isPlayer1Turn = true,
    player = 'Player 1';;
  }
}

updateGameList();
//create a game if none exist
$('#playGame').on('click', function(event){
  if (gameList === null) {
    game.user1 = $('#userNameInput').val();
    var newGame = fb.push();
    game.gameId = newGame.key();
    newGame.set(game);
    updateGameList();
    $('.status_update').append('<div>Player1, ' + game.user1 + ', has joined the game.</div>');
  //join a game if a game w/ an opening exists
  } else if (gameList !== null) {
  _.forEach(gameList, function(item) {
      if (item && item.user2 === "") {
        item.user2=$('#userNameInput').val();
        $('.status_update').append('<div>Player2, ' + item.user2 + ', has joined the game.</div>');
        var fbToUpdate = new Firebase(fbUrl + '/' + item.gameId);
        fbToUpdate.set(item);
      }
      else if (item && item.user1 && item.user2) {
        game.user1 = $('#userNameInput').val();
        var newGame = fb.push();
        newGame.set(game);
      }
    });
  }
});

function updateGameList () {
  fb.once('value', function(snapshot){
    gameList = snapshot.val();
  });
}

function updateGameInDb (gameStatus){
  var updatedGame = new Firebase (fbUrl + '/' + game.gameId);
  updatedGame.set(gameStatus);
}

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
}

//below was for original color styling prior to X and O
  // if(game.isPlayer1Turn) {
  //   $(this).addClass('red_background');
  // } else {
  //   $(this).addClass('blue_background');
  // }
