var Sentiment = require('sentiment');

const express = require('express');

const router = express.Router();
router.use(express.json({limit: '50mb'}));

router.get('/', (req, res) => {
  res.send('It works!');
});

router.post('/typing-contest', (req, res) => {
  input = req.body;
  console.log(input);
  stringsOriginal=input;
  strings=[...input];

  function findNext(current, strings, newStrings){
      size=strings.length;
      for(var i=0; i<strings.length; i++){
          if (newStrings.includes(strings[i])){
              strings[i]=false;
              size--;
          }
      }
      differences=[]
      for(var i=0; i<size+1;i++){
          difference=[];
          if(!strings[i]){
              continue;
          }
          diff=0;
          for (var x=0; x<current.length; x++){
              if (current[x]!=strings[i][x]){
                  diff++;
              }
          }
          difference=[strings[i], diff];
          differences.push(difference);
      }
      differences.sort(
          function(a,b){
              return(a[1]>b[1]);
          }
      )
      return differences[0];
  }

  cost=0;
  count=0;
  reach=strings.length;
  newStrings=[]
  steps=[]
  current="laziest"
  for(var i=0; i<reach; i++){
      newObj={}
      if(i===0){
          newObj["type"]="INPUT";
          newObj["value"]=strings[0];
          cost+=strings[0].length;
          steps.push(newObj);
          newStrings.push(strings[0]);
          continue;
      }else{
          current=newStrings[i-1];
          console.log(current);
          newObj={};
          newObj["type"]="COPY";
          newObj["value"]=current;
          steps.push(newObj)
          cost+=1;
          nextStringHam=findNext(current, strings, newStrings)
          newObj={};
          newObj["type"]="TRANSFORM";
          newObj["value"]=nextStringHam[0];
          steps.push(newObj);
          newStrings.push(nextStringHam[0]);
          cost+=nextStringHam[1];
      }
  }

  result={
      "cost": cost,
      "steps": steps,
  }

  console.log(result);
  res.json(result);
});

router.post('/encryption', (req, res) => {
  let input = req.body;

  let output = [];

  for (i = 0; i < input.length; i++) {
    let testinput = input[i];
    let n = testinput.n; 
    let text = testinput.text.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    //text = TOOSHORT

    let chars = text.split('');

    //chars = ['T','O',...]
    //TOOSHORT
    let ind = 0;
    let count = n;
    for (j = 1; j < text.length; j++) {
      ind = (ind + n);
      ind = ind % text.length;
      if(n % 2 === 0){
        ind -= 1;
      }
      chars[ind] = text[j]; 
    }
    output.push(chars.join(''));
  }

  console.log(output);
  res.send(output);
});

router.post('/maximise_1b', (req, res) => {
  let input = req.body;
  let capital = input.startingCapital;
  let stocks = input.stocks;

  function swap(items, firstIndex, secondIndex){
      var temp = items[firstIndex];
      items[firstIndex] = items[secondIndex];
      items[secondIndex] = temp;
  }

  function partition(items, left, right) {

      let pivot   = items[Math.floor((right + left) / 2)];
      pivot = pivot[1]/pivot[2];
      let i       = left;
      let j       = right;


      while (i <= j) {

          while (items[i][1]/items[i][2] < pivot) {
              i++;
          }

          while (items[j][1]/items[j][2] > pivot) {
              j--;
          }

          if (i <= j) {
              swap(items, i, j);
              i++;
              j--;
          }
      }

      return i;
  }

  function quickSort(items, left, right) {

      let index;

      if (items.length > 1) {

          index = partition(items, left, right);

          if (left < index - 1) {
              quickSort(items, left, index - 1);
          }

          if (index < right) {
              quickSort(items, index, right);
          }

      }

      return items;
  }

  let stocksSorted = quickSort(stocks,0,stocks.length - 1);
  let stocksSortedCost = stocksSorted.map(item => item[2]);
  let minCost = Math.min(...stocksSortedCost);
  let profit = 0;
  let portfolio = [];
  for(let i = 0 ; i<stocksSortedCost.length ; ++i){
      portfolio.push(stocksSorted[i][0]);
      profit += stocksSorted[i][1];
      capital -= stocksSorted[i][2];
  }



  function maxSum(capital,n){
      if(capital < minCost || n < 0){
          return;
      }else if(capital >= stocksSorted[n][2]){
          let numOfStocks = Math.floor(capital/stocksSorted[n][2]);
          profit += (numOfStocks*stocksSorted[n][1]);
          let stock = stocksSorted[n][0]
          for(let i = 0;i<numOfStocks; ++i){
              portfolio.push(stock);
          }
          maxSum(capital-(numOfStocks*stocksSorted[n][2]),n-1);
      }else{
          maxSum(capital,n-1);
      }
  }

  maxSum(capital,stocksSorted.length - 1);
  let output = {
      profit,
      portfolio
  }
  console.log(output);
  res.json(output);
});

router.post('/maximise_1c', (req, res) => {
  let input = req.body;
  let capital = input.startingCapital;
  let stocks = input.stocks;

  function swap(items, firstIndex, secondIndex){
      var temp = items[firstIndex];
      items[firstIndex] = items[secondIndex];
      items[secondIndex] = temp;
  }

  function partition(items, left, right) {

      let pivot   = items[Math.floor((right + left) / 2)];
      pivot = pivot[1]/pivot[2];
      let i       = left;
      let j       = right;


      while (i <= j) {

          while (items[i][1]/items[i][2] < pivot) {
              i++;
          }

          while (items[j][1]/items[j][2] > pivot) {
              j--;
          }

          if (i <= j) {
              swap(items, i, j);
              i++;
              j--;
          }
      }

      return i;
  }

  function quickSort(items, left, right) {

      let index;

      if (items.length > 1) {

          index = partition(items, left, right);

          if (left < index - 1) {
              quickSort(items, left, index - 1);
          }

          if (index < right) {
              quickSort(items, index, right);
          }

      }

      return items;
  }

  let stocksSorted = quickSort(stocks,0,stocks.length - 1);
  let stocksSortedCost = stocksSorted.map(item => item[2]);
  let minCost = Math.min(...stocksSortedCost);
  let profit = 0;
  let portfolio = [];
  function maxSum(capital,n){
      if(capital < minCost || n < 0){
          return;
      }else if(capital >= stocksSorted[n][2]){
          let numOfStocks = Math.floor(capital/stocksSorted[n][2]);
          profit += (numOfStocks*stocksSorted[n][1]);
          let stock = stocksSorted[n][0];
          for(let i = 0;i<numOfStocks; ++i){
              portfolio.push(stock);
          }
          maxSum(capital-(numOfStocks*stocksSorted[n][2]),n-1);
      }else{
          maxSum(capital,n-1);
      }
  }

  maxSum(capital,stocksSorted.length - 1);
  let output = {
      profit,
      portfolio
  }
  console.log(output);
  res.json(output);
});

router.post('/maximise_1a', (req, res) => {
  let input = req.body;

  let capital = input.startingCapital;
  let stocks = input.stocks;
  const knapSack = function(W, wt, val, n) {  
      if (n == 0 || W == 0)  
          return 0;  
      
      // If weight of the nth item is more  
      // than Knapsack capacity W, then  
      // this item cannot be included 
      // in the optimal solution  
      if (wt[n-1] > W) {
          return knapSack(W, wt, val, n-1);  
      } 
      else{ 
          let left = val[n-1] + knapSack(W-wt[n-1], wt, val, n-1);
          let right = knapSack(W, wt, val, n-1);
          let maximum =  Math.max( left,right );
          return maximum;
      } 
  }  

  let stocksCost = stocks.map(item => item[2]);
  let stockProfit = stocks.map(item => item[1]);
  const profit = knapSack(capital,stocksCost,stockProfit,stocks.length);
  let output = {
      profit
  };
  let solution = [];
  const subsetSum = function(L, n, result, m){
  if(solution.length != 0){
      return;
  }
  if(m == 0){
      solution.push(result);
      return;
  }

  if(n == 0){
      return;
  }

  if(L[n-1][1] <= m){
      subsetSum(L,n-1,[...result,L[n-1]],m-L[n-1][1]);
  }

  subsetSum(L,n-1,result,m);

  }

  subsetSum(stocks,stocks.length,[],output.profit);
  let portfolio = solution[0].map(item => item[0]);
  output = {
      profit,
      portfolio
  }
  res.json(output);
});

router.post('/gun-control', (req, res) => {
  console.log(req.body);
  let input = req.body;
  let maze = input.grid; //global varible of maze
  // maze = maze.map(item => item.split(''));
  let posX = 0;
  let posY = 0;
  let count = 0;
  let output = [];
  let positions = [];
  let id = 0;
  const bfs = function(posX,posY,count){
    //base case;
    let cond1 = posY === maze[posX].length-1 || maze[posX][posY+1] === 'X';
    let cond2 = posY === 0 || maze[posX][posY-1] === 'X';
    let cond3 = posX === maze.length-1 || maze[posX+1][posY] === 'X' ;
    let cond4 = posX === 0 || maze[posX-1][posY] === 'X';
    if(cond1 && cond2 && cond3 && cond4){
      count + 1 <= input.fuel ? output.push({cell : {x : posY+1,y : posX+1},guns : count+1}) : null;
      id+=1;
      return;
    }else{
      if (!cond1) {
        maze[posX] = maze[posX].substr(0,posY) + 'X' + maze[posX].substr(posY+1,);
        bfs(posX, posY+1, count+1);
      }
  
      if (!cond2) {
        maze[posX] = maze[posX].substr(0,posY) + 'X' + maze[posX].substr(posY+1,);
        bfs(posX, posY-1, count+1);
      }
  
      if(!cond3) {
        maze[posX] = maze[posX].substr(0,posY) + 'X' + maze[posX].substr(posY+1,);
        bfs(posX+1, posY, count+1);
      }
  
      if(!cond4) {
        maze[posX] = maze[posX].substr(0,posY) + 'X' + maze[posX].substr(posY+1,);
        bfs(posX-1, posY, count+1); 
      }
    }
  }
  
  bfs(posX, posY, count);
  
  // output = quickSort(output,0,output.length - 1);
  // L is an array of objects
  let solution = []
  const subsetSum = function(L, n, result, m){
    if(solution.length > 0){
      return;
    }
    if(m == 0){
      solution.push(result);
      return;
    }
    
    if(n == 0){
      return;
    }
  
    if(L[n-1].guns <= m){
      subsetSum(L,n-1,[...result,L[n-1]],m-L[n-1].guns);
    }
  
    subsetSum(L,n-1,result,m);
  
  }
  
  let fuel = input.fuel;
  while(solution.length === 0){
    subsetSum(output,output.length,[],fuel);
    fuel--;
  }
  res.json({hits: solution[0]});
});

router.post('/exponent', (req, res) => {
  console.log(req.body);
  let input = req.body;
  console.log(input);

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
      let ind = (input.p - 1)  % arr.length;
      lastDigit = arr[ind];
      
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
  console.log(req.body);
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
  console.log(req.headers);
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
  const lottery = [1, 5, 7, 2, 6, 5, 9, 7, 0, 8];
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
  console.log(req.body);
  let input = req.body;

  n=input["maxChoosableInteger"];
  t=input["desiredTotal"];

  function hasNumbers(diff, numbers, x, y){
      for(var i=1; i<numbers.length+1; i++){
          if((i===x) || (i===y)){
              continue;
          }
          if(i>=diff){
              return true;
          }
      }
      return false;
  }

  function trueForAll(numbers, x){
      for(var y=1; y<numbers.length+1; y++){
          diff=t-(x+y);
          if(!hasNumbers(diff, numbers, x, y)){
              return false
          }
      }
      return true
  }
  numbers=[]
  for (var i=1; i<n+1; i++){
      numbers.push(i);
  }
  notPossible=[]
  for(var i=1; i<n+1; i++){
      for(var x=1; x<n+1; x++){
          if (x===i){
              continue;
          }
          if(i+x>=t){
              notPossible.push(i)
              break;
          }
      }
  }

  firstPossible=[]

  for(var i=1; i<n+1; i++){
      if(!(notPossible.includes(i))){
          firstPossible.push(i);
      }
  }

  notPossibleTwo=[]

  yes=[]
  for(var i=0; i<firstPossible.length; i++){
      num=firstPossible[i];
      if(trueForAll(numbers, num)){
          yes.push(num);
      }
  }
  if(yes.length>0){
      result=3;
  }

  if(yes.length===0){
      result=-1;
  }

  obj={
      "res": result,
  }

  res.json(obj);
});

router.post('/sentiment-analysis', (req, res) => {
  console.log(req.body.reviews);
  var sentiment = new Sentiment();
  const data = req.body.reviews;
  const output = []
  for(i = 0; i < data.length; i++) {
    let text = data[i];
    const brRegex = new RegExp("<br /><br />", "g")
    text = text.replace(brRegex, '');
    text = text.replace(/[^a-zA-Z0-9 ]/g, '');
    text = text.replace(/  /g, ' ');
    console.log(text);
    // const fixed = fixed.replace() TODO : remove slash using regex
    let result = sentiment.analyze(text);
    output.push(result.score >= 0 ? 'positive' : 'negative');
  }
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