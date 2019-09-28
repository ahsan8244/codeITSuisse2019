const express = require('express');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
  res.send('It works!');
});

router.post('/chessgame', (req, res) => {
  const input = req.body;
  const board = obj[Object.keys(obj)[0]];
  const result = chessboard(board);
  res.json({result});
});

router.post('/readyplayerone', (req, res) => {
  const input = req.body;
  const N = input.maxChoosableInteger;
  const T = input.desiredTotal;
  let p1Start = 0;
  T - N < N ? p1Start = T - N - 1 : p1Start = N;
  
  let jar1 = [];
  let jar2 = [];
  for(i = 1; i <= N; i++) {
    jar1.push(i);
  }

  while (jar1.length !== 0) {

  }
});

const chessboard = (chessboard) => {
  let queen = []

  for (let i = 0;i<chessboard.length;++i){
      for(let j = 0;j<chessboard.length;++j){
          if(chessboard[i][j] === "K"){
              queen.push(i+1);
              queen.push(j+1)
          }
      }
  }
  let output = 0;
  let i = queen[1];
  let j = 0;
  while(i<chessboard.length && chessboard[queen[0]-1][i] != "X" ){
      output+=1
      i+=1
  }
  i = queen[1] - 2
  while(i>=0 && chessboard[queen[0]-1][i] != "X" ){
      output+=1
      i-=1
  }
  i = queen[0]
  while(i<chessboard.length && chessboard[i][queen[1]-1] != "X" ){
      output+=1
      i+=1
  }
  i = queen[0] - 2
  while(i>=0 && chessboard[i][queen[1]-1] != "X" ){
      output+=1
      i-=1
  }
  i = queen[0]
  j = queen[1]
  while(i<chessboard.length && j<chessboard.length && chessboard[i][j] != 'X'){
      output+=1
      i+=1
      j+=1
  }
  i = queen[0] - 2
  j = queen[1] - 2
  while(i>=0 && j>=0 && chessboard[i][j] != 'X'){
      output+=1
      i-=1
      j-=1
  }
  i = queen[0]
  j = queen[1] - 2
  while(i<chessboard.length && j>=0 && chessboard[i][j] != 'X'){
      output+=1
      i+=1
      j-=1
  }
  i = queen[0] - 2
  j = queen[1]
  while(i>=0 && j<chessboard.length && chessboard[i][j] != 'X'){
      output+=1
      i-=1
      j+=1
  }

  return output
}


module.exports = router;