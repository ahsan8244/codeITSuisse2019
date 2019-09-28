var Sentiment = require('sentiment');

const express = require('express');

const router = express.Router();
router.use(express.json({limit: '50mb'}));

router.get('/', (req, res) => {
  res.send('It works!');
});

router.post('/exponent', (req, res) => {
  let input = req.body;

  let lastNumber = {
      '0' : [0],
      '1' : [1],
      '2' : [2,4,8,6],
      '3' : [3,9,7,1],
      '4' : [4,6],
      '5' : [5],
      '6' : [6],
      '7' : [7,9,3,1],
      '8' : [8,4,2,6],
      '9' : [9,1]
  }
  let output = [];
  if(input.p === 0){
      output = [1,1,1];
  }else if(input.n === 0 ){
      output = [0,1,0];
  }
  else{
      let nString = input.n.toString();
      let lastDigit = nString[nString.length - 1];
      let arr = lastNumber[lastDigit];
      let ind = input.p % arr.length;
      console.log(ind);
      ind === 0 ? ind = 1 : ind = ind;
      lastDigit = arr[ind-1];
      
      //let's find first digit
      let temp = input.p*Math.log10(input.n);
      let rounded = Math.floor(temp);
      let commas = (temp) - rounded;
      let firstDigit = Math.pow(10,commas).toString();
      firstDigit = Number(firstDigit[0]);
      let digitLength = rounded + 1;
      output = [firstDigit,digitLength,lastDigit];
  }
  res.json({ result: output });
})

router.post('/wedding-nightmare', (req, res) => {
  let input = req.body;
  results=[]
  function checkEnemies(arr1, arr2){
      for(var i=0; i<arr1.length; i++){
          if(arr2.includes(arr1[i])){
              return true;
          }
      }
      return false;
  }
  function checkFriends(arr1, arr2){
      for(var i=0; i<arr1.length; i++){
          if(arr2.includes(arr1[i])){
              return true;
          }
      }
      return false;
  }  
  testcases=input.length;
  outputs=[];
  for (var x= 0; x<testcases; x++){
      wedding=input[x];
      numGuests= wedding["guests"]
      numTables= wedding["tables"]
      friends=wedding["friends"]
      enemies= wedding["enemies"]
      families= wedding["families"]
      let profile={};
      for (var i =0; i<numGuests; i++){
          idNum=i+1
          id=""+idNum;
          profile[id]= [];
          good=[];
          bad=[];
          profile[id].push(good);
          profile[id].push(bad);
          for(var y=0; y<friends.length; y++){
              if(friends[y].includes(idNum)){
                  if(friends[y][0]===idNum){
                      good.push(friends[y][1]);
                  }else{
                      good.push(friends[y][0]);
                  }
              }
          }
          for(var y=0; y<families.length; y++){
              if(families[y].includes(idNum)){
                  if(families[y][0]===idNum){
                      good.push(families[y][1]);
                  }else{
                      good.push(families[y][0]);
                  }
              }
          }
          for(var y=0; y<enemies.length; y++){
              if(enemies[y].includes(idNum)){
                  if(enemies[y][0]===idNum){
                      bad.push(enemies[y][1]);
                  }else{
                      bad.push(enemies[y][0]);
                  }
              }
          }        
      }
      isSatisfiable=true;
      tables=[]
      for(var i=0; i<numTables; i++){
          table=[]
          tables.push(table);
      }
      tables[0].push(1);
      pushed=[]
      pushed.push(1);
      for(var i=1; i<numGuests+1; i++){
          if(pushed.includes(i)){
              continue;
          }
          hasFriends=false;
          hasEnemies=false;
          if(checkEnemies(pushed, profile[i][1])){
              hasEnemies=true;
          }
          if(checkFriends(pushed, profile[i][0])){
              hasFriends=true;
          }
          for(var t=0; t<numTables; t++){
              if(hasFriends && hasEnemies){
                  if(checkFriends(tables[t], profile[i][0]) && !(checkEnemies(tables[t], profile[i][1]))){
                      tables[t].push(i);
                      pushed.push(i);
                      break;
                  }
              }
              if(hasFriends && !hasEnemies){
                  if(checkFriends(tables[t], profile[i][0])){
                      tables[t].push(i);
                      pushed.push(i);
                      break;
                  }
              }
              if(hasEnemies && !hasFriends){
                  if(!(checkEnemies(tables[t], profile[i][1]))){
                      tables[t].push(i);
                      pushed.push(i);
                      break;
                  }
              }
              if(!hasEnemies && !hasFriends){
                  tables[t].push(i);
                  pushed.push(i);
                  break;
              }
          }
      }
      persons=0;
      for(var j=0; j<tables.length; j++){
          persons+=tables[j].length;
      }
      if(persons!=numGuests){
          isSatisfiable=false;
      }
      seating=[]
      for(var l=0; l<tables.length; l++){
          table=tables[l];

          if(table.length>0){
              for(var h=0; h<table.length; h++){
                  seat=[table[h], l+1]
                  seating.push(seat);
              }
              
          }
      }
      if(!isSatisfiable){
          seating=[];
      }
      result={
          "test_case": x+1,
          "satisfiable": isSatisfiable,
          "allocation": seating,
      }
      results.push(result)
  }
  res.send(results);

});

router.get('/lottery', (req, res) => {
  let nums = [ 1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
    100 ];
  for (i = nums.length - 1; i >= 0; i--) {
    const j = getRandomInt(0, nums[i]);
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }
  const lottery = nums.slice(0, 10);
  res.send(lottery);
});

router.post('/composition', (req,res) => {
  let output = [];
  const input = req.body;
  const testId = input.setId;
  const composition = input.composition;
  const patterns = input.patterns;
  let patternFound = false;
  for(let i = 0; i<patterns.length ;++i){
    if(composition.indexOf(patterns[i]) != -1){
      patternFound = true;
    }
  }
  if(patternFound){
    output = compositionSolution(composition, patterns);
    output.sort();
    while(output[0] == 0){
      output.shift();
    }
    res.json({
      testId,
      result : Math.min(...output)
    })
  }else{
    res.json(
      {
        testId,
        result : 0
      }
    );
  }  
})

router.post('/chessgame', (req, res) => {
  const board = req.body;
  const result = chessboard(board);
  res.send(result.toString());
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
    let fixed = item.replace("<br /><br />", " ");
    fixed = fixed.replace("\\\"", "");
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
  if (main.length !== 0) {
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

function compositionSolution(composition, pattern) {
  let output = [];
  function compositionFinder(composition,patterns,count) {
    if(patterns.length <= 0 || composition.length <= 0) {
        output.push(count);
        return;
    }else{
        for(let i = 0;i<patterns.length;++i){
          const first = patterns[i][0];
          const second = patterns[i][1];
          if(composition.indexOf(first+second) != -1){ 
              const regexp = new RegExp(first+second, "g");
              const removals = (composition.match(regexp) || []).length;
              compositionFinder(composition.replace(first, ""),[...patterns.slice(0,i),...patterns.slice(i+1)], count + removals);
              compositionFinder(composition.replace(second, ""),[...patterns.slice(0,i),...patterns.slice(i+1)],count + removals);
          }else{
              compositionFinder(composition,patterns.slice(1,),count)
              continue;
          }
        }
    }
  }
  compositionFinder(composition, pattern, 0);
  return output;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = router;