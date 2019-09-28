var Sentiment = require('sentiment');

const express = require('express');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
  res.send('It works!');
});

router.post('/chessgame', (req, res) => {
  const input = req.body;
  const board = input[Object.keys(input)[0]];
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

router.post('/sentiment-analysis', (req, res) => {
  var sentiment = new Sentiment();
  const data = req.body.reviews;
  const output = []
  data.forEach((item) => {
    const fixed = item.replace("<br /><br />", " ");
    // const fixed = fixed.replace() TODO : remove slash using regex
    let result = sentiment.analyze(fixed);
    output.push(result.score >= 0 ? 'positive' : 'negative');
  });
  res.json({ response: output });
});

router.post('/generateSequence', (req, res) => {
  let input=req.body;
  let modulesArr=input["modules"];
  let depenPairs=input["dependencyPairs"];
  
  let dependees=[];
  let dependents=[];
  let mainObj={};
  let main=[];

  // Start off and create a moduleName to emptyList


  function check(arr1, arr2){
      for (var i=0, len=arr1.length; i<len; i++){
          if (!(arr2.includes(arr1[i]))){
              return false;
          }
      }
      return true;
  }

  for(var i=0, len=depenPairs.length;i<len; i++){
      dependee1=depenPairs[i]["dependee"];
      dependent1=depenPairs[i]["dependentOn"];
      dependees.push(dependee1);
      dependents.push(dependent1);
  }

  for (var i=0, len=modulesArr.length; i<len; i++){
      if (!(dependees.includes(modulesArr[i]))){
          main.push(modulesArr[i]);
      }else{
          mainObj[modulesArr[i]]=[]
      }
  }
  for(var i=0, len=depenPairs.length;i<len; i++){
      dependee1=depenPairs[i]["dependee"];
      dependent1=depenPairs[i]["dependentOn"];
      mainObj[dependee1].push(dependent1);
  }

  for (var x=0, len=Object.keys(mainObj).length; x<len; x++){
      for(var i=0, len=Object.keys(mainObj).length; i<len; i++){
          if (check(mainObj[Object.keys(mainObj)[i]], main)){
              if(!(main.includes(Object.keys(mainObj)[i]))){
                  main.push(Object.keys(mainObj)[i]);
              }
          }
      }
  }

  res.send(main);
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