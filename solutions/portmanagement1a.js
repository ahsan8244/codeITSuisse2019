let input = {
    "startingCapital": 400,
    "stocks": [
        [
            "Sony", 
            30, 
            400  
        ],
        [
            "Dell",
            20,
            300
        ],
        [
            "Disney",
            15,
            100
        ],
        [
            "Apple",
            20,
            100
        ]
    ]
}

let capital = input.startingCapital;
let stocks = input.stocks;

let solution = []
const subsetSum = function(L, n, result, m){
    if(m == 0 || m ){
      solution.push(result);
      return;
    }
    
    if(n == 0){
      return;
    }
  
    if(L[n-1] <= m){
      subsetSum(L,n-1,[...result,L[n-1]],m-L[n-1]);
    }
  
    subsetSum(L,n-1,result,m);
  
}

subsetSum([1,2,3,4,5],5,[],12);
console.log(solution);