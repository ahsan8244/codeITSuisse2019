let input = { 
    "grid":[ 
      "OOXXOO",
      "XOOOOX",
      "XOXXOX",
      "OOXOOO",
      "OXOOXO"
    ],
    "fuel":15
  }
  
  //first objective, to store all the location of guns and its value
  //its value is gonna be the number of blocks/moves it takes
  //to move from origin to the location
  
  
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
  console.log(solution);